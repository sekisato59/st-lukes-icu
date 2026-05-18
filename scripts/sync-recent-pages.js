#!/usr/bin/env node
/**
 * scripts/sync-recent-pages.js
 *
 * recent-pages.js を ファイルシステム + git 履歴 から自動再生成するスクリプト。
 *
 * 目的:
 *  - 新規ページを作成 → push しても index.html の「新着コンテンツ」に表示されない
 *    不具合の根治。recent-pages.js を AI/人手で都度メンテする方式は事故が多発したため、
 *    pages/ 配下の HTML を機械的に検出して自動生成する仕様に切り替える。
 *
 * 使い方:
 *   node scripts/sync-recent-pages.js
 *     → recent-pages.js を上書き再生成
 *   node scripts/sync-recent-pages.js --check
 *     → 差分があれば終了コード 1（pre-commit/pre-push 用）
 *
 * カスタマイズ:
 *   - 個別ページのタイトル・タグ・サムネを上書きしたい場合は
 *     recent-pages-overrides.json に { "<url>": { title, tag, thumb } } を記載。
 *
 * 自動推定ロジック:
 *  - date  : git の初回コミット日 (--diff-filter=A --follow)
 *  - title : <title> タグから「| 聖路加ICU」等のサフィックスを除いた文字列
 *  - tag   : URL パターン + HTML 内のキーワードから推定
 *  - thumb : URL パターン (id-icu / yoshida-qa / karte-by-system 等) で振り分け
 *
 * 除外:
 *  - _drafts/ / .archive/ 配下
 *  - *-variations.html / header-variations.html (内部テスト用)
 *  - 全角文字を含むファイル名 (古いアーカイブ)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const RECENT_PAGES_JS = path.join(ROOT, 'recent-pages.js');
const OVERRIDES_JSON = path.join(ROOT, 'recent-pages-overrides.json');

// ----------------------------------------------------------
// 対象パターン
// ----------------------------------------------------------
const INCLUDE_PATTERNS = [
  'pages/articles-gl-*.html',
  'pages/disease-topics/dt-*.html',
  'pages/yoshida-qa/q-*.html',
  'pages/id-icu-notes/note-*.html',
  'pages/karte-by-system.html',
  'pages/exam-*.html',
];

const EXCLUDE_SUBSTRINGS = [
  '_drafts/',
  '.archive/',
  '-variations.html',
  'header-variations',
];

// ----------------------------------------------------------
// ファイル収集
// ----------------------------------------------------------
function listFiles() {
  const result = new Set();
  for (const pat of INCLUDE_PATTERNS) {
    let out = '';
    try {
      out = execSync(`ls ${pat} 2>/dev/null`, { encoding: 'utf8' });
    } catch (_) { /* no match */ }
    out.trim().split('\n').filter(Boolean).forEach(f => result.add(f));
  }
  return [...result].filter(f => !EXCLUDE_SUBSTRINGS.some(s => f.includes(s)));
}

// ----------------------------------------------------------
// git 初回コミット日時 (フル ISO datetime)
//   - 内部ソート用にフル ISO（時刻まで）を取得
//   - 出力時は .slice(0, 10) で YYYY-MM-DD に整形
// ----------------------------------------------------------
function getCreationDateTime(filepath) {
  try {
    const out = execSync(
      `git log --diff-filter=A --follow --format=%aI -- "${filepath}"`,
      { encoding: 'utf8' }
    );
    const dates = out.trim().split('\n').filter(Boolean);
    if (!dates.length) return null;
    return dates[dates.length - 1]; // 例: "2026-05-18T23:46:25+09:00"
  } catch (_) {
    return null;
  }
}

// ----------------------------------------------------------
// <title> 抽出 + 既知サフィックスの除去
// ----------------------------------------------------------
function extractTitle(filepath) {
  let html;
  try {
    html = fs.readFileSync(path.join(ROOT, filepath), 'utf8');
  } catch (_) { return path.basename(filepath, '.html'); }
  const m = html.match(/<title>([\s\S]+?)<\/title>/);
  if (!m) return path.basename(filepath, '.html');
  let title = m[1].trim();
  // 空白の有無に関わらず、末尾の「| 聖路加ICU」系サフィックスを除去
  const suffixPatterns = [
    /\s*\|\s*吉田先生のお悩み相談コーナー\s*\|\s*聖路加ICU\s*$/,
    /\s*\|\s*聖路加ICU\s*ローテーターガイド\s*$/,
    /\s*\|\s*聖路加ICU\s*$/,
    /\s*-\s*聖路加ICU\s*$/,
  ];
  for (const re of suffixPatterns) {
    title = title.replace(re, '');
  }
  return title.trim();
}

// ----------------------------------------------------------
// タグ推定
// ----------------------------------------------------------
function inferTag(url, html) {
  if (url.includes('/disease-topics/')) return '解説';
  if (url.includes('/yoshida-qa/'))     return '解説';
  if (url.includes('/id-icu-notes/'))   return '解説';
  if (url.includes('karte-by-system'))  return '解説';
  if (url.includes('/exam-'))           return '解説';
  if (url.includes('articles-gl-')) {
    const head = html.slice(0, 8000);
    if (/症例報告|症例集積|case\s*report/i.test(head)) return '症例';
    if (/ガイドライン|consensus|recommendation/i.test(head)) return 'ガイドライン';
    return '論文';
  }
  return '解説';
}

// ----------------------------------------------------------
// サムネ推定
// ----------------------------------------------------------
function inferThumb(url, html) {
  if (url.includes('/yoshida-qa/'))     return 'images/header吉田先生.png';
  if (url.includes('/id-icu-notes/'))   return 'images/IDICUtop.png';
  if (url.includes('karte-by-system'))  return 'images/header便利ツール.png';
  if (url.includes('/disease-topics/')) return 'images/icu-study.jpg';
  if (url.includes('/exam-'))           return 'images/icu-study.jpg';
  if (url.includes('articles-gl-')) {
    const head = html.slice(0, 8000);
    if (/感染症|抗菌|耐性|細菌|ウイルス|fungal|antibiotic|infection/i.test(head)) return 'images/IDICUtop.png';
    return 'images/朝カンファ風景.webp';
  }
  return 'images/icu-study.jpg';
}

// ----------------------------------------------------------
// オーバーライド読み込み
// ----------------------------------------------------------
function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_JSON)) return {};
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_JSON, 'utf8'));
  } catch (e) {
    console.warn(`[warn] recent-pages-overrides.json parse error: ${e.message}`);
    return {};
  }
}

// ----------------------------------------------------------
// メイン
// ----------------------------------------------------------
const overrides = loadOverrides();
const files = listFiles();
const entries = [];

for (const f of files) {
  const datetime = getCreationDateTime(f);
  if (!datetime) continue; // 未コミットファイルはスキップ
  const fullPath = path.join(ROOT, f);
  if (!fs.existsSync(fullPath)) continue;
  const html = fs.readFileSync(fullPath, 'utf8');
  const auto = {
    title: extractTitle(f),
    url: f,
    date: datetime.slice(0, 10), // 出力は YYYY-MM-DD
    tag: inferTag(f, html),
    thumb: inferThumb(f, html),
  };
  const ov = overrides[f] || {};
  // _sortKey はソート用の hidden field（出力には含めない）
  entries.push({ ...auto, ...ov, _sortKey: datetime });
}

// フル ISO 時刻で降順ソート（最新コミットが先頭に来る）。
// JS の Array.sort は ES2019 以降で stable のため、index.html の date のみソート
// （tie-breaker は元の配列順を維持）でもこの順序が保持される。
entries.sort((a, b) => b._sortKey.localeCompare(a._sortKey));

const output = [
  '/**',
  ' * 新着コンテンツ用 ページ一覧',
  ' *',
  ' * ⚠ このファイルは scripts/sync-recent-pages.js によって自動生成されます。',
  ' *    手動編集しないでください。エントリを上書きしたい場合は',
  ' *    recent-pages-overrides.json に { "<url>": { title, tag, thumb } } を追加し、',
  ' *    `node scripts/sync-recent-pages.js` を実行してください。',
  ' *',
  ' * fields: title / url / date (YYYY-MM-DD) / tag / thumb',
  ' */',
  'const RECENT_PAGES = [',
  entries.map(e =>
    '  {\n' +
    `    title: ${JSON.stringify(e.title)},\n` +
    `    url: ${JSON.stringify(e.url)},\n` +
    `    date: ${JSON.stringify(e.date)},\n` +
    `    tag: ${JSON.stringify(e.tag)},\n` +
    `    thumb: ${JSON.stringify(e.thumb)}\n` +
    '  }'
  ).join(',\n'),
  '];',
  '',
].join('\n');

const checkMode = process.argv.includes('--check');
const prev = fs.existsSync(RECENT_PAGES_JS) ? fs.readFileSync(RECENT_PAGES_JS, 'utf8') : '';

if (checkMode) {
  if (prev !== output) {
    console.error('❌ recent-pages.js is out of sync. Run: node scripts/sync-recent-pages.js');
    process.exit(1);
  } else {
    console.log('✅ recent-pages.js is up-to-date.');
  }
} else {
  fs.writeFileSync(RECENT_PAGES_JS, output);
  if (prev === output) {
    console.log('✅ recent-pages.js already up-to-date (no changes).');
  } else {
    console.log(`✅ recent-pages.js regenerated with ${entries.length} entries.`);
  }
}
