#!/usr/bin/env node
/**
 * scripts/audit-pages.js
 *
 * ページ整合性監査スクリプト。以下を一括チェックする：
 *
 * 1) Worktree leftover:
 *    .claude/worktrees/<wt>/pages/ 配下に存在するが master に取り込まれていない
 *    HTML ファイルを検出（並列エージェントが merge し忘れた記事を発掘）
 *
 * 2) 略語ポップアップ機能の欠落:
 *    HTML 内に「本ページで使用する略語一覧」「略語一覧」が存在するが、
 *    abbr-tooltip.js が読み込まれていないページを検出
 *
 * 3) abbr-tooltip.js を読み込んでいるが「略語一覧」テーブルが存在しない:
 *    無駄な script タグ（誤コピペ）を検出
 *
 * 4) recent-pages.js との同期:
 *    sync-recent-pages.js --check を呼んで差分があれば報告
 *
 * 使い方:
 *   node scripts/audit-pages.js
 *     → 全レポートを stdout に出力
 *   node scripts/audit-pages.js --strict
 *     → 問題があれば終了コード 1（CI/pre-push 用）
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
process.chdir(ROOT);

const strict = process.argv.includes('--strict');
const problems = [];

function report(category, items) {
  if (!items.length) return;
  console.log(`\n[${category}] ${items.length} 件`);
  items.forEach(i => console.log('  - ' + i));
}

// ----------------------------------------------------------
// 1) Worktree leftover の検出
// ----------------------------------------------------------
function listWorktreeFiles() {
  const wtRoot = '.claude/worktrees';
  if (!fs.existsSync(wtRoot)) return [];
  const result = [];
  for (const wt of fs.readdirSync(wtRoot)) {
    const pagesDir = path.join(wtRoot, wt, 'pages');
    if (!fs.existsSync(pagesDir)) continue;
    walkHtml(pagesDir, result);
  }
  return result;
}

function walkHtml(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '.archive') continue;
      walkHtml(fp, out);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      out.push(fp);
    }
  }
}

function isTracked(p) {
  try {
    execSync(`git ls-files --error-unmatch "${p}" 2>/dev/null`, { stdio: 'ignore' });
    return true;
  } catch (_) {
    return false;
  }
}

const wtFiles = listWorktreeFiles();
const leftover = [];
for (const wtPath of wtFiles) {
  // wtPath ex: .claude/worktrees/abc/pages/articles-gl-foo.html
  const m = wtPath.match(/^\.claude\/worktrees\/[^/]+\/(pages\/.+)$/);
  if (!m) continue;
  const masterPath = m[1];
  if (!fs.existsSync(masterPath) && !isTracked(masterPath)) {
    leftover.push(`${wtPath}  →  master 未取り込み (${masterPath})`);
  }
}

report('Worktree leftover（master 未取り込みの記事）', leftover);
if (leftover.length) problems.push('worktree leftover');

// ----------------------------------------------------------
// 2) 略語一覧があるのに abbr-tooltip.js が無いページ
// ----------------------------------------------------------
function listPageHtml() {
  const out = [];
  walkHtml('pages', out);
  return out;
}

const allPages = listPageHtml();
const missingAbbrScript = [];
const orphanAbbrScript = [];

for (const f of allPages) {
  const html = fs.readFileSync(f, 'utf8');
  const hasAbbrList = /略語一覧/.test(html);
  const hasAbbrScript = /abbr-tooltip\.js/.test(html);
  // 例外: karte-abbreviations.html は略語マスタページなので tooltip 不要
  const exempted = /karte-abbreviations\.html$/.test(f);
  if (hasAbbrList && !hasAbbrScript && !exempted) {
    missingAbbrScript.push(f);
  }
  if (hasAbbrScript && !hasAbbrList) {
    orphanAbbrScript.push(f);
  }
}

report('略語一覧あり/abbr-tooltip.js 未読込', missingAbbrScript);
report('abbr-tooltip.js 読込/略語一覧なし（無駄な script）', orphanAbbrScript);
if (missingAbbrScript.length) problems.push('missing abbr-tooltip.js');

// ----------------------------------------------------------
// 3) recent-pages.js が古くないか
// ----------------------------------------------------------
let recentSyncOk = true;
try {
  execSync('node scripts/sync-recent-pages.js --check', { stdio: 'pipe' });
} catch (_) {
  recentSyncOk = false;
}
if (!recentSyncOk) {
  console.log('\n[recent-pages.js が古い]');
  console.log('  → node scripts/sync-recent-pages.js で再生成してください');
  problems.push('recent-pages.js out of sync');
}

// ----------------------------------------------------------
// サマリ
// ----------------------------------------------------------
console.log('');
if (problems.length === 0) {
  console.log('✅ 全チェック OK');
  process.exit(0);
} else {
  console.log(`❌ 問題 ${problems.length} 件: ${problems.join(', ')}`);
  if (strict) process.exit(1);
}
