#!/usr/bin/env node
/**
 * scripts/sync-related-articles.js
 *
 * 各 articles-gl-*.html の末尾に「関連ページ」セクションを自動生成して挿入する。
 *
 * 仕組み:
 *  1) search-index.js の各エントリ（title / desc / keywords）と HTML 本文テキストを
 *     ページ単位で連結して corpus を作る
 *  2) 日本語向け簡易トークナイズ（kanji 2-gram + katakana / ascii word）
 *  3) TF-IDF + cosine similarity で全ページ間の類似度を計算
 *  4) ページごとに上位 MAX_RELATED 件を抽出
 *  5) <!-- RELATED:START --> ... <!-- RELATED:END --> ブロックを inject
 *
 * 使い方:
 *   node scripts/sync-related-articles.js
 *     → 全 GL ページの関連ページブロックを上書き
 *   node scripts/sync-related-articles.js --check
 *     → 差分があれば終了コード 1（pre-commit 用）
 *
 * オーバーライド:
 *   related-articles-overrides.json に以下の形式で記述:
 *   {
 *     "pages/articles-gl-X.html": {
 *       "pin":     ["pages/articles-gl-Y.html"],  // 必ず先頭に固定
 *       "exclude": ["pages/articles-gl-Z.html"]   // 必ず除外
 *     }
 *   }
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SEARCH_INDEX_JS = path.join(ROOT, 'search-index.js');
const OVERRIDES_JSON  = path.join(ROOT, 'related-articles-overrides.json');
const PAGES_DIR       = path.join(ROOT, 'pages');

const MAX_RELATED = 10;
const MIN_SCORE   = 0.08;   // 0..1。弱い類似度は除外（10件に満たなくても揃えない）
const PAGE_PATTERN = /^articles-gl-.+\.html$/;

// ----------------------------------------------------------
// 対象ページ収集
// ----------------------------------------------------------
function listPages() {
  return fs.readdirSync(PAGES_DIR)
    .filter(n => PAGE_PATTERN.test(n))
    .map(n => `pages/${n}`)
    .sort();
}

// ----------------------------------------------------------
// search-index.js を vm で評価して SEARCH_INDEX を取り出す
//   `const SEARCH_INDEX = [...]` はレキシカルスコープなので vm context の
//   グローバルプロパティにならない。末尾で globalThis 経由で公開する。
// ----------------------------------------------------------
function loadSearchIndex() {
  const src = fs.readFileSync(SEARCH_INDEX_JS, 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src + '\nglobalThis.__SEARCH_INDEX = SEARCH_INDEX;', ctx);
  return ctx.__SEARCH_INDEX || [];
}

// ----------------------------------------------------------
// HTML 本文テキスト抽出（ナビ・サイドバー・スクリプトを除外）
// ----------------------------------------------------------
function extractBodyText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/g, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

// ----------------------------------------------------------
// 研究論文ボイラープレート用 stoplist
//   2つの異なるトピックの論文でも、研究方法・統計用語・一般医学語は共通する。
//   これらが類似度を底上げするのを防ぐ。
//   ※ dfMax で多くは既に弱められるが、希少語化した bigram（"量反"・"床的"等）は
//     IDF が大きくなりノイズが残るので明示的に除外する。
// ----------------------------------------------------------
const STOPWORDS = new Set([
  // 研究設計・統計
  '研究', '結果', '評価', '解析', '主要', '副次', '比較', '観察', '試験', '症例',
  '報告', '示唆', '閾値', '有意', '線形', '交絡', '累積', '意義', '背景', '目的',
  '方法', '考察', '結論', '対象', '集団', '群間', '一次', '二次', '介入',
  // 一般医学
  '治療', '患者', '投与', '効果', '検査', '診断', '管理', '予防', '推奨',
  '重症', '急性', '慢性', '疾患', '医療', '臨床', '入院', '退院', '死亡', '生存',
  '改善', '増加', '減少', '上昇', '低下', '関連', '関係', '影響', '誘発',
  '発生', '発症', '発現', '罹患', '症状', '徴候', '所見',
  // 用量・薬剤の汎用
  '用量', '反応', '濃度', '血中', '血液', '血清', '血漿', '採血',
  // 統計・データ
  'リスク', 'モデル', 'スコア', 'アウトカム', 'コホート', 'エビデンス',
  'ガイドライン', 'レビュー',
  // 時間・年齢
  '時間', '期間', '時点', '年齢', '年間', '日間', '週間',
  // 連語の一部だけ抜けた bigram
  '量反', '床的', '要結', '応関', '応性',
  // ASCII boilerplate
  'study', 'trial', 'analysis', 'result', 'results', 'effect', 'effects',
  'model', 'risk', 'dose', 'response', 'significant', 'increase', 'decrease',
  'chronic', 'acute', 'age', 'patient', 'patients', 'treatment', 'treat',
  'review', 'cohort', 'outcome', 'outcomes', 'evidence', 'guideline', 'guidelines',
  'and', 'the', 'for', 'with', 'into', 'from',
]);

// ----------------------------------------------------------
// 簡易トークナイズ
//   - ASCII 英数語（薬剤名・略語）length >= 2、lowercase
//   - カタカナ run length >= 2 はそのまま 1 トークン
//   - 漢字 run は 2-gram に展開（医学用語の compound 性質に合う）
//   - その他（ひらがな・記号・数字単独）は捨てる
//   - STOPWORDS に含まれるトークンは除外
// ----------------------------------------------------------
function tokenize(s) {
  const tokens = [];
  const ascii = s.match(/[A-Za-z][A-Za-z0-9\-]+/g) || [];
  for (const t of ascii) {
    if (t.length < 2) continue;
    const low = t.toLowerCase();
    if (STOPWORDS.has(low)) continue;
    tokens.push(low);
  }
  const kata = s.match(/[゠-ヿㇰ-ㇿー]+/g) || [];
  for (const t of kata) {
    if (t.length < 2) continue;
    if (STOPWORDS.has(t)) continue;
    tokens.push(t);
  }
  const kanjiRuns = s.match(/[一-鿿]+/g) || [];
  for (const run of kanjiRuns) {
    if (run.length === 1) continue; // 単漢字はノイズ
    for (let i = 0; i < run.length - 1; i++) {
      const bg = run.slice(i, i + 2);
      if (STOPWORDS.has(bg)) continue;
      tokens.push(bg);
    }
  }
  return tokens;
}

// ----------------------------------------------------------
// ページごとの corpus 構築
//   - ページレベルのエントリ（#なし URL）= ページのコア主題なので大きく重み付け
//   - 章レベルのエントリ（#anchor URL）= 個別トピック。共通薬剤名等で他ページと
//     マッチしやすいので軽めにする
//   - 本文テキストは search-index にエントリがないページのフォールバック用
// ----------------------------------------------------------
function buildCorpus(pageUrl, searchEntries, html) {
  const pageEntries    = [];
  const chapterEntries = [];
  for (const e of searchEntries) {
    const u = (e.url || '').split('#')[0];
    if (u !== pageUrl) continue;
    if ((e.url || '').includes('#')) chapterEntries.push(e);
    else                              pageEntries.push(e);
  }

  const parts = [];
  // ページレベル（コア主題）を大きく反復
  for (const e of pageEntries) {
    if (e.title)    parts.push(...Array(6).fill(e.title));
    if (e.desc)     parts.push(...Array(4).fill(e.desc));
    if (e.keywords) parts.push(...Array(5).fill(e.keywords));
  }
  // 章レベル（個別トピック）は軽め
  for (const e of chapterEntries) {
    if (e.title)    parts.push(e.title);
    if (e.keywords) parts.push(e.keywords);
  }

  if (pageEntries.length === 0 && chapterEntries.length === 0) {
    parts.push(extractBodyText(html));
  }
  return parts.join(' ');
}

// ----------------------------------------------------------
// TF-IDF ベクトル構築
// ----------------------------------------------------------
function buildVectors(docs) {
  const urls = Object.keys(docs);
  const N = urls.length;
  const df = new Map();
  const tfs = new Map();

  for (const url of urls) {
    const tf = new Map();
    for (const t of docs[url]) {
      tf.set(t, (tf.get(t) || 0) + 1);
    }
    tfs.set(url, tf);
    for (const t of tf.keys()) {
      df.set(t, (df.get(t) || 0) + 1);
    }
  }

  // 極端に希少（df=1）も極端に頻出（多くの GL に共通する構造語彙・薬剤名）も
  // 類似度シグナルとして弱いので除外。GL は約 190 件なので dfMax=20% で 38 件程度。
  const dfMin = 2;
  const dfMax = Math.floor(N * 0.20);

  const idf = new Map();
  for (const [t, dft] of df) {
    if (dft < dfMin || dft > dfMax) continue;
    idf.set(t, Math.log(N / dft) + 1);
  }

  const vectors = new Map();
  for (const url of urls) {
    const v = new Map();
    let norm = 0;
    const tf = tfs.get(url);
    for (const [t, count] of tf) {
      const w = idf.get(t);
      if (!w) continue;
      const weight = count * w;
      v.set(t, weight);
      norm += weight * weight;
    }
    vectors.set(url, { vec: v, norm: Math.sqrt(norm) });
  }
  return vectors;
}

function cosineSim(a, b) {
  if (!a.norm || !b.norm) return 0;
  // 小さい方を回すと高速
  const [small, large] = a.vec.size <= b.vec.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [t, w] of small.vec) {
    const wb = large.vec.get(t);
    if (wb) dot += w * wb;
  }
  return dot / (a.norm * b.norm);
}

// ----------------------------------------------------------
// overrides 読み込み
// ----------------------------------------------------------
function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_JSON)) return {};
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_JSON, 'utf8'));
  } catch (e) {
    console.warn(`[warn] related-articles-overrides.json parse error: ${e.message}`);
    return {};
  }
}

// ----------------------------------------------------------
// 関連ページ一覧のメタ（title / desc / 出典バッジ等）
// ----------------------------------------------------------
function buildPageMeta(searchEntries) {
  const meta = new Map();
  for (const e of searchEntries) {
    const u = (e.url || '').split('#')[0];
    if (!PAGE_PATTERN.test(path.basename(u))) continue;
    // ページレベルのエントリ（#なし）を優先
    const isPageLevel = !(e.url || '').includes('#');
    const cur = meta.get(u);
    if (!cur || (isPageLevel && !cur.isPageLevel)) {
      meta.set(u, {
        title: e.title || path.basename(u, '.html'),
        desc:  e.desc  || '',
        isPageLevel
      });
    }
  }
  return meta;
}

// 一覧ページから出典バッジ（学会・年）等を抽出するのは複雑なので、
// 今回はタイトル中の「（... 20XX）」「 — ... 20XX」を簡易的に拾う
function extractBadgeFromTitle(title) {
  const m = title.match(/[（(]([^（）()]+\d{4}[^（）()]*)[）)]/);
  return m ? m[1].trim() : '';
}

// ----------------------------------------------------------
// HTML エスケープ
// ----------------------------------------------------------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ----------------------------------------------------------
// 本文末尾用 RELATED ブロック（カード形式）
// ----------------------------------------------------------
function buildRelatedBlock(items) {
  if (items.length === 0) return '';
  const cards = items.map(it => {
    const badge = extractBadgeFromTitle(it.title);
    const cleanTitle = it.title.replace(/\s*[（(][^（）()]*\d{4}[^（）()]*[）)]\s*$/, '').trim();
    return `        <a href="${escapeHtml(path.basename(it.url))}" class="related-card">
          <div class="related-card-title">${escapeHtml(cleanTitle)}</div>
          ${badge ? `<div class="related-card-badge">${escapeHtml(badge)}</div>` : ''}
          ${it.desc ? `<div class="related-card-desc">${escapeHtml(it.desc)}</div>` : ''}
        </a>`;
  }).join('\n');
  return `      <!-- RELATED:START — auto-generated by scripts/sync-related-articles.js. Do not edit. -->
      <section id="related-articles" class="related-articles" aria-label="関連ページ">
        <h3 class="related-articles-title">関連ページ</h3>
        <div class="related-articles-grid">
${cards}
        </div>
      </section>
      <!-- RELATED:END -->
`;
}

// ----------------------------------------------------------
// サイドバー目次用 RELATED リンク（既存 TOC カード内に追加する単一リンク）
//   目次の最後に「関連ページ」というチャプターリンクを足し、クリックで
//   本文末尾の <section id="related-articles"> に飛ぶようにする。
//   詳細リストは出さない（カード形式の本体に任せる）。
// ----------------------------------------------------------
function buildRelatedSidebarBlock(items, baseIndent) {
  if (items.length === 0) return '';
  return `${baseIndent}<!-- RELATED-TOC:START — auto-generated by scripts/sync-related-articles.js. Do not edit. -->
${baseIndent}<a href="#related-articles" class="ie-toc-chapter ie-toc-related">関連ページ</a>
${baseIndent}<!-- RELATED-TOC:END -->
`;
}

// ----------------------------------------------------------
// HTML に RELATED ブロックを inject
//   - main-col の閉じタグの「直前」に入れる必要がある（外に出ると flex が崩れる）
//   - 多くのページは `</div><!-- /main-col -->` だが、コメントなしの裸 `</div>`
//     しかないページも多数あるため、サイドバー開始位置から逆方向に直近の
//     `</div>` を探すフォールバックを使う。
// ----------------------------------------------------------
function injectIntoHtml(html, block) {
  const startMarker = '<!-- RELATED:START';
  const endMarker   = '<!-- RELATED:END -->';
  const startIdx = html.indexOf(startMarker);

  if (startIdx !== -1) {
    const endIdx = html.indexOf(endMarker, startIdx);
    if (endIdx === -1) {
      throw new Error('RELATED:START found but no RELATED:END');
    }
    const before = html.slice(0, startIdx).replace(/[ \t]*$/, '');
    const after  = html.slice(endIdx + endMarker.length);
    return before + block.trimEnd() + after;
  }

  // (A) 名前付き閉じタグコメント — 最も信頼できるアンカー
  const namedPatterns = [
    /\n\s*<\/div><!--\s*\/main-col\s*-->/,
    /\n\s*<\/div><!--\s*\/ie-main-col\s*-->/,
    /\n\s*<\/div><!--\s*\/\.main-col\s*-->/,
    /\n\s*<\/main><!--\s*\/main-col\s*-->/,
    /\n\s*<\/div><!--\s*\/\.content\s*-->/,
  ];
  for (const p of namedPatterns) {
    const m = html.match(p);
    if (m) {
      return html.slice(0, m.index) + '\n' + block + html.slice(m.index);
    }
  }

  // (B) 裸の </div> + サイドバー検出
  //   サイドバー開始位置を見つけ、その直前にある `</div>` を逆方向に探す。
  //   その `</div>` が main-col の閉じタグなので、その直前に inject する。
  const sidebarRe = /<!--\s*(=+\s*)?(SIDEBAR|サイドバー|ー*\s*サイドバー)/i;
  const sidebarAside = /<aside class="ie-sidebar"/;
  let sidebarIdx = -1;
  const m1 = html.match(sidebarRe);
  if (m1) sidebarIdx = m1.index;
  const m2 = html.match(sidebarAside);
  if (m2 && (sidebarIdx === -1 || m2.index < sidebarIdx)) sidebarIdx = m2.index;

  if (sidebarIdx !== -1) {
    const upto = html.slice(0, sidebarIdx);
    const lastClose = upto.lastIndexOf('</div>');
    if (lastClose !== -1) {
      // </div> 開始位置の直前（同じ行のインデント保持）に block を入れる
      // 行頭まで戻ってインデント文字列を取得
      const lineStart = upto.lastIndexOf('\n', lastClose - 1) + 1;
      const indent = upto.slice(lineStart, lastClose);
      // block の最後の改行を維持しつつ、`</div>` 行の前に挿入
      return html.slice(0, lineStart) + block + indent + html.slice(lastClose);
    }
  }
  return null;
}

// ----------------------------------------------------------
// サイドバー目次に RELATED-TOC リンクを inject
//   <aside class="ie-sidebar"> 内の最初の <div class="ie-sidebar-card">
//   の閉じタグ直前に「関連ページ」リンク1行を挿入する。
//   別カードにすると目次の流れが分断されるためカード内に置く。
// ----------------------------------------------------------
function injectSidebarIntoHtml(html, items) {
  const startMarker = '<!-- RELATED-TOC:START';
  const endMarker   = '<!-- RELATED-TOC:END -->';
  const startIdx = html.indexOf(startMarker);

  // items が空ならブロック自体を削除（古いブロックがあれば消す）
  if (items.length === 0) {
    if (startIdx === -1) return html;
    const endIdx = html.indexOf(endMarker, startIdx);
    if (endIdx === -1) return html;
    const lineStart = html.lastIndexOf('\n', startIdx - 1) + 1;
    let after = endIdx + endMarker.length;
    while (html[after] === '\n') after++;
    return html.slice(0, lineStart) + html.slice(after);
  }

  if (startIdx !== -1) {
    // 既存ブロックを置換（同じインデントを維持）
    const lineStart = html.lastIndexOf('\n', startIdx - 1) + 1;
    const indent = html.slice(lineStart, startIdx);
    const endIdx = html.indexOf(endMarker, startIdx);
    if (endIdx === -1) {
      throw new Error('RELATED-TOC:START found but no RELATED-TOC:END');
    }
    const block = buildRelatedSidebarBlock(items, indent);
    let after = endIdx + endMarker.length;
    if (html[after] === '\n') after++;
    return html.slice(0, lineStart) + block + html.slice(after);
  }

  // 初回挿入: <aside class="ie-sidebar"> 内の最初の sidebar-card 閉じタグの直前
  const asideStart = html.search(/<aside class="ie-sidebar"/);
  if (asideStart === -1) return html;
  const asideEnd = html.indexOf('</aside>', asideStart);
  if (asideEnd === -1) return html;
  // 最初の sidebar-card の開始位置
  const cardOpen = html.indexOf('<div class="ie-sidebar-card', asideStart);
  if (cardOpen === -1 || cardOpen > asideEnd) return html;
  // そのカードの閉じ </div> を探す：</aside> までの範囲で最後の </div>
  const sidebarSlice = html.slice(cardOpen, asideEnd);
  const lastDivClose = sidebarSlice.lastIndexOf('</div>');
  if (lastDivClose === -1) return html;
  const absPos = cardOpen + lastDivClose;
  // 行頭まで戻ってインデント取得
  const lineStart = html.lastIndexOf('\n', absPos - 1) + 1;
  const indent = html.slice(lineStart, absPos);
  const block = buildRelatedSidebarBlock(items, indent);
  return html.slice(0, lineStart) + block + indent + html.slice(absPos);
}

// ----------------------------------------------------------
// メイン
// ----------------------------------------------------------
function main() {
  const checkMode = process.argv.includes('--check');
  const verbose   = process.argv.includes('--verbose');

  const pages = listPages();
  const searchEntries = loadSearchIndex();
  const overrides = loadOverrides();
  const pageMeta = buildPageMeta(searchEntries);

  // 1) 各ページの corpus を作成 → トークナイズ
  const docs = {};
  const htmls = {};
  for (const p of pages) {
    const full = path.join(ROOT, p);
    const html = fs.readFileSync(full, 'utf8');
    htmls[p] = html;
    const corpus = buildCorpus(p, searchEntries, html);
    docs[p] = tokenize(corpus);
    // pageMeta フォールバック（search-index にエントリがない場合）
    if (!pageMeta.has(p)) {
      const m = html.match(/<title>([\s\S]+?)<\/title>/);
      let title = m ? m[1].trim() : path.basename(p, '.html');
      title = title.replace(/\s*\|\s*聖路加ICU\s*$/, '').trim();
      pageMeta.set(p, { title, desc: '', isPageLevel: false });
    }
  }

  // 2) TF-IDF + cosine
  const vectors = buildVectors(docs);

  // 3) 各ページの top N
  const allChanges = [];
  let writtenCount = 0;
  for (const p of pages) {
    const ov = overrides[p] || {};
    const pin = new Set(ov.pin || []);
    const exclude = new Set([p, ...(ov.exclude || [])]);

    const me = vectors.get(p);
    const candidates = [];
    for (const other of pages) {
      if (exclude.has(other)) continue;
      if (pin.has(other)) continue;
      const score = cosineSim(me, vectors.get(other));
      if (score < MIN_SCORE) continue;
      candidates.push({ url: other, score });
    }
    candidates.sort((a, b) => b.score - a.score);

    const items = [];
    // 先に pin を入れる
    for (const u of pin) {
      if (!pageMeta.has(u)) continue;
      items.push({ url: u, score: 999, ...pageMeta.get(u) });
    }
    for (const c of candidates) {
      if (items.length >= MAX_RELATED) break;
      items.push({ ...c, ...pageMeta.get(c.url) });
    }

    const block = buildRelatedBlock(items);

    if (verbose) {
      console.log(`\n[${p}] (${items.length} items)`);
      for (const it of items) {
        const s = it.score === 999 ? 'PIN ' : it.score.toFixed(3);
        console.log(`  ${s}  ${it.url}  ${it.title.slice(0, 60)}`);
      }
    }

    let newHtml = injectIntoHtml(htmls[p], block);
    if (newHtml === null) {
      console.warn(`[warn] could not inject RELATED into ${p} (no anchor found)`);
      continue;
    }
    // サイドバー目次にも反映
    newHtml = injectSidebarIntoHtml(newHtml, items);

    if (newHtml !== htmls[p]) {
      allChanges.push(p);
      if (!checkMode) {
        fs.writeFileSync(path.join(ROOT, p), newHtml);
        writtenCount++;
      }
    }
  }

  if (checkMode) {
    if (allChanges.length > 0) {
      console.error(`❌ ${allChanges.length} GL page(s) have stale RELATED blocks. Run: node scripts/sync-related-articles.js`);
      if (verbose) for (const p of allChanges) console.error(`  - ${p}`);
      process.exit(1);
    }
    console.log('✅ All RELATED blocks are up-to-date.');
  } else {
    if (writtenCount === 0) {
      console.log('✅ RELATED blocks already up-to-date (no changes).');
    } else {
      console.log(`✅ Updated RELATED blocks in ${writtenCount} page(s).`);
    }
  }
}

main();
