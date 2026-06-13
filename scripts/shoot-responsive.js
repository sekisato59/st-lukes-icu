#!/usr/bin/env node
/**
 * shoot-responsive.js — 複数ビューポート幅でのフルページ・スクリーンショット撮影ツール
 *
 * 目的：モバイル/タブレット/デスクトップの各幅でページを撮影し、コミット前に
 *   「表の文字肥大・バナー被り・テキストボックスのはみ出し・余白ズレ」を
 *   実機を待たずに自分の目で検出できるようにする。
 *
 * 設計の出典（hyperagent grid skill より移植した規律）：
 *   「VERIFY — don't trust, measure. Render at several widths including > and < the
 *    breakpoint, then eyeball the top-left crop.」
 *   → ブレークポイント(767/900)の両側を含む 375/768/1180 を既定幅とする。
 *
 * 依存ゼロ：すでにインストール済みの Google Chrome を headless で起動し、
 *   Node 24 内蔵の WebSocket で DevTools Protocol を直接叩く。npm パッケージ不要。
 *
 * 使い方：
 *   node scripts/shoot-responsive.js pages/schedule-icu-conf.html
 *   node scripts/shoot-responsive.js pages/articles-gl-ssc2026.html pages/index.html
 *   node scripts/shoot-responsive.js --widths 375,414,768 pages/foo.html
 *   node scripts/shoot-responsive.js pages/foo.html        # 既定3幅で撮影
 *
 * 出力：.screenshots/<ページ名>/<幅>.png  と
 *       .screenshots/index.html（全ページ・全幅を横並びで一覧できるコンタクトシート）
 *   .screenshots/ は .gitignore 済み（コミットされない）。
 */

'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ── 設定 ────────────────────────────────────────────────────────────────
const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(REPO_ROOT, '.screenshots');
const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEFAULT_WIDTHS = [375, 768, 1180]; // モバイル / タブレット境界 / デスクトップ
const MAX_HEIGHT = 16000; // 暴走防止：これ以上長いページは頭から16000pxまで
// 注意：deviceScaleFactor は 1 固定。レイアウト確認には十分で、@3x にすると
//   超縦長ページで巨大ビットマップ化し captureBeyondViewport がハングする。
const SHOT_TIMEOUT_MS = 30000; // 1 ショットがこれを超えたら諦めて次へ（ハング対策）
const PORT = 9222 + (process.pid % 1500);

// ── 引数パース ──────────────────────────────────────────────────────────
function parseArgs(argv) {
  const pages = [];
  let widths = DEFAULT_WIDTHS;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--widths') {
      widths = argv[++i]
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0);
    } else if (a.startsWith('--')) {
      console.error(`不明なオプション: ${a}`);
      process.exit(2);
    } else {
      pages.push(a);
    }
  }
  return { pages, widths };
}

// ── CDP over WebSocket の極小クライアント ───────────────────────────────
class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  ready() {
    return new Promise((resolve, reject) => {
      this.ws.addEventListener('open', () => resolve());
      this.ws.addEventListener('error', (e) =>
        reject(new Error('WebSocket error: ' + (e.message || 'unknown')))
      );
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId; // flatten モードのセッション宛て
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }
  close() {
    try {
      this.ws.close();
    } catch (_) {}
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`タイムアウト(${ms}ms): ${label}`)),
      ms
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function waitForDevtools(port) {
  // ブラウザ階層の WS エンドポイントを取得する。各ショットでは Target.createTarget で
  // 新しいページターゲットを作り、attachToTarget(flatten) のセッション越しに操作する。
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        const v = await res.json();
        if (v.webSocketDebuggerUrl) return v.webSocketDebuggerUrl;
      }
    } catch (_) {
      /* まだ起動中 */
    }
    await sleep(150);
  }
  throw new Error('Chrome の DevTools ブラウザエンドポイントに接続できませんでした');
}

// 1 ページ分の Chrome を起動して CDP 接続を返す。
// ★1 つの Chrome で超縦長キャプチャを数回行うと内部状態が劣化してハングするため、
//   ページ単位で必ず起動し直す（＝毎回まっさらな状態で撮る）。
async function launchChromeForPage(port) {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shoot-chrome-'));
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--hide-scrollbars',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${userDataDir}`,
      `--remote-debugging-port=${port}`,
      'about:blank',
    ],
    { stdio: 'ignore' }
  );
  const wsUrl = await waitForDevtools(port);
  const cdp = new CDP(wsUrl);
  await cdp.ready();
  const close = () => {
    try {
      cdp.close();
    } catch (_) {}
    chrome.kill('SIGKILL');
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (_) {}
  };
  return { cdp, close };
}

async function shootOne(cdp, fileUrl, width, outPath) {
  const isMobile = width <= 768;
  // 各ショットでも新しいページターゲットを生成し、専用セッションで操作してから破棄する。
  const { targetId } = await cdp.send('Target.createTarget', {
    url: 'about:blank',
  });
  let sid;
  try {
    const att = await cdp.send('Target.attachToTarget', {
      targetId,
      flatten: true,
    });
    sid = att.sessionId;
    await cdp.send('Page.enable', {}, sid);
    // ビューポートは控えめな固定高(1000)のまま開く。コンテンツ全高は getLayoutMetrics で測り、
    // 撮影は captureBeyondViewport + clip（Puppeteer の fullPage 方式）。
    // ★ビューポート自体を全高(1万px超)に拡大すると new-headless がハングするので避ける。
    await cdp.send(
      'Emulation.setDeviceMetricsOverride',
      {
        width,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: isMobile,
        screenWidth: width,
        screenHeight: 1000,
      },
      sid
    );
    await cdp.send('Page.navigate', { url: fileUrl }, sid);
    await sleep(1200); // load + webfont 反映待ち
    // 高さは 2 回（間隔をあけて）測って最大を採る。webfont/JS 後挿入で初回が
    // 過小評価され、ページ下部が切れる事象（index@1180 で発生）を防ぐ。
    let measured = 0;
    for (let k = 0; k < 2; k++) {
      const { cssContentSize } = await cdp.send('Page.getLayoutMetrics', {}, sid);
      measured = Math.max(measured, Math.ceil((cssContentSize && cssContentSize.height) || 0));
      if (k === 0) await sleep(500);
    }
    const fullHeight = Math.min(measured || 1000, MAX_HEIGHT);
    const { data } = await withTimeout(
      cdp.send(
        'Page.captureScreenshot',
        {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 },
        },
        sid
      ),
      SHOT_TIMEOUT_MS,
      `captureScreenshot @${width}px`
    );
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    return { width, height: fullHeight, bytes: fs.statSync(outPath).size };
  } finally {
    try {
      await cdp.send('Target.closeTarget', { targetId });
    } catch (_) {}
  }
}

function buildContactSheet(results) {
  // ページごとに各幅の PNG を横並びで見られる単一 HTML を生成
  const byPage = new Map();
  for (const r of results) {
    if (!byPage.has(r.page)) byPage.set(r.page, []);
    byPage.get(r.page).push(r);
  }
  let body = '';
  for (const [page, shots] of byPage) {
    body += `<section><h2>${page}</h2><div class="row">`;
    for (const s of shots.sort((a, b) => a.width - b.width)) {
      const rel = path.relative(OUT_DIR, s.outPath);
      body += `<figure><figcaption>${s.width}px &times; ${s.height}px</figcaption>` +
        `<a href="${rel}" target="_blank"><img src="${rel}" style="width:${s.width}px;max-width:100%;"></a></figure>`;
    }
    body += `</div></section>`;
  }
  const html = `<!doctype html><meta charset="utf-8"><title>レスポンシブ検証コンタクトシート</title>
<style>
  body{font-family:-apple-system,'Noto Sans JP',sans-serif;background:#1a1a1a;color:#eee;margin:0;padding:24px;}
  h1{font-size:1.1rem;}
  section{margin:32px 0;border-top:1px solid #444;padding-top:16px;}
  h2{font-size:0.9rem;color:#7dd3fc;word-break:break-all;}
  .row{display:flex;gap:24px;align-items:flex-start;overflow-x:auto;padding-bottom:12px;}
  figure{margin:0;flex:0 0 auto;}
  figcaption{font-size:0.75rem;color:#aaa;margin-bottom:6px;text-align:center;}
  img{border:1px solid #555;background:#fff;display:block;}
</style>
<h1>レスポンシブ検証コンタクトシート <span style="font-size:0.75rem;color:#888;">— クリックで原寸表示</span></h1>
${body}`;
  const sheetPath = path.join(OUT_DIR, 'index.html');
  fs.writeFileSync(sheetPath, html);
  return sheetPath;
}

async function main() {
  const { pages, widths } = parseArgs(process.argv.slice(2));
  if (pages.length === 0) {
    console.error(
      'usage: node scripts/shoot-responsive.js [--widths 375,768,1180] <page.html> [page2.html ...]'
    );
    process.exit(2);
  }
  if (!fs.existsSync(CHROME)) {
    console.error(`Google Chrome が見つかりません: ${CHROME}`);
    process.exit(1);
  }

  // 各ページの絶対パスを検証（不在は警告してスキップ。他ページの撮影は続行する）
  const targets = [];
  for (const p of pages) {
    const abs = path.isAbsolute(p) ? p : path.join(REPO_ROOT, p);
    if (!fs.existsSync(abs)) {
      console.error(`⚠ ファイルが存在しないためスキップ: ${p}`);
      continue;
    }
    targets.push({ rel: path.relative(REPO_ROOT, abs), abs });
  }
  if (targets.length === 0) {
    console.error('撮影対象のページがありません（パスは repo ルート基準。例: pages/foo.html, index.html）');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = [];

  for (let pi = 0; pi < targets.length; pi++) {
    const t = targets[pi];
    const safeName = t.rel.replace(/[\\/]/g, '__').replace(/\.html?$/i, '');
    const pageOut = path.join(OUT_DIR, safeName);
    fs.mkdirSync(pageOut, { recursive: true });
    const fileUrl = 'file://' + t.abs;
    // 重い幅（広いほど desktop レイアウトで処理が重い）から先に撮る。
    const orderedWidths = [...widths].sort((a, b) => b - a);

    // ★ページ単位で Chrome を起動し直す（劣化ハング対策）。port はページごとに変える。
    let browser;
    try {
      browser = await launchChromeForPage(PORT + pi);
    } catch (e) {
      console.error(`⚠ Chrome 起動失敗のため ${t.rel} をスキップ: ${e.message}`);
      continue;
    }
    try {
      for (const w of orderedWidths) {
        const outPath = path.join(pageOut, `${w}.png`);
        process.stdout.write(`撮影中  ${t.rel}  @${w}px ... `);
        try {
          // ショット全体（createTarget〜capture）をタイムアウトで包み、どの段階で
          // 固まっても run 全体は止めずに次へ進む。
          const r = await withTimeout(
            shootOne(browser.cdp, fileUrl, w, outPath),
            SHOT_TIMEOUT_MS,
            `shot @${w}px`
          );
          console.log(`${r.width}x${r.height}  (${Math.round(r.bytes / 1024)}KB)`);
          results.push({ page: t.rel, outPath, ...r });
        } catch (e) {
          console.log(`⚠ スキップ（${e.message}）`);
        }
      }
    } finally {
      browser.close();
    }
  }

  const sheet = buildContactSheet(results);
  console.log('\n────────────────────────────────────────');
  console.log(`✅ ${results.length} 枚を撮影しました`);
  console.log(`📄 コンタクトシート: ${path.relative(REPO_ROOT, sheet)}`);
  console.log(`   open "${sheet}"  でブラウザに全幅を一覧表示`);
}

main().catch((e) => {
  console.error('エラー:', e.message);
  process.exit(1);
});
