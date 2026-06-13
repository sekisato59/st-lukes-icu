#!/usr/bin/env node
/**
 * audit-tables.js — テーブル列幅の中央管理を補佐する監査スクリプト。
 *
 * 前提：列幅は script.js が全コンテンツ表に <colgroup> を自動注入して一括管理する
 * （内容の中央値から列幅比を算出）。よって「colgroup 無し」はもはや不具合ではなく、
 * JS による自動管理対象（INFO 表示のみ）。
 *
 * このスクリプトの主目的は「手書き <colgroup>（＝設計者の上書き指定）の不具合」を検出すること：
 *   WIDTH_SUM     幅% の合計が 100±2% から外れている（配分ミス）
 *   COL_MISMATCH  <col> の数とヘッダ列数（colspan 込み）が合わない（例: 5列定義/4列ヘッダ）
 * これらは描画の偏りを直接生むため ERROR 扱い（終了コード 1）。
 *
 * 使い方:
 *   node scripts/audit-tables.js                       # pages/ 配下の全 .html を監査
 *   node scripts/audit-tables.js pages/foo.html ...    # 指定ファイルのみ
 *
 * 依存なし（Node 標準のみ）。クラス非依存（ie-table / lax-table / 素の table すべて対象）。
 */

'use strict';
const fs = require('fs');
const path = require('path');

let files = process.argv.slice(2).filter((a) => a.endsWith('.html'));
if (files.length === 0) {
  // 既定: pages/ 配下を再帰列挙
  const root = path.join(__dirname, '..', 'pages');
  const walk = (dir) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.html')) files.push(p);
    }
  };
  try { walk(root); } catch (e) { /* pages/ が無ければ空 */ }
}

const lineOf = (html, idx) => html.slice(0, idx).split('\n').length;

function extractTables(html) {
  const tables = [];
  const re = /<table\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const end = html.indexOf('</table>', re.lastIndex);
    if (end === -1) break;
    tables.push({ open: m[0], inner: html.slice(re.lastIndex, end), start: m.index });
    re.lastIndex = end + 8;
  }
  return tables;
}

function countHeaderColumns(inner) {
  let rowHtml = null;
  const thead = inner.match(/<thead[\s\S]*?<\/thead>/i);
  if (thead) {
    const tr = thead[0].match(/<tr[\s\S]*?<\/tr>/i);
    if (tr) rowHtml = tr[0];
  }
  if (!rowHtml) {
    const tr = inner.match(/<tr[\s\S]*?<\/tr>/i);
    if (tr) rowHtml = tr[0];
  }
  if (!rowHtml) return 0;
  let cols = 0;
  const cellRe = /<(t[hd])\b([^>]*)>/gi;
  let c;
  while ((c = cellRe.exec(rowHtml)) !== null) {
    const span = c[2].match(/colspan\s*=\s*["']?(\d+)/i);
    cols += span ? parseInt(span[1], 10) : 1;
  }
  return cols;
}

function parseColgroup(inner) {
  const cg = inner.match(/<colgroup[\s\S]*?<\/colgroup>/i);
  if (!cg) return null;
  const cols = cg[0].match(/<col\b[^>]*>/gi) || [];
  const widths = cols.map((col) => {
    const w = col.match(/width\s*:\s*([\d.]+)\s*%/i);
    return w ? parseFloat(w[1]) : null;
  });
  return { count: cols.length, widths };
}

let errors = 0;
let autoManaged = 0; // colgroup 無し 3列以上（JS 自動管理対象）

for (const file of files) {
  let html;
  try { html = fs.readFileSync(file, 'utf8'); }
  catch (e) { console.error(`! cannot read ${file}: ${e.message}`); continue; }

  const issues = [];
  for (const t of extractTables(html)) {
    const cols = countHeaderColumns(t.inner);
    const cg = parseColgroup(t.inner);
    const line = lineOf(html, t.start);

    if (!cg) {
      if (cols >= 3) autoManaged++;
      continue;
    }
    // 手書き colgroup あり → 妥当性を検証
    if (cols && cg.count !== cols) {
      issues.push(`  ${file}:${line}  COL_MISMATCH   <col>×${cg.count} だがヘッダ列数=${cols}`);
      errors++;
    }
    if (cg.widths.every((w) => w !== null)) {
      const sum = cg.widths.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - 100) > 2) {
        issues.push(`  ${file}:${line}  WIDTH_SUM      幅合計=${sum.toFixed(1)}%（100% から逸脱）`);
        errors++;
      }
    }
  }
  if (issues.length) {
    console.log(`\n${file}`);
    issues.forEach((i) => console.log(i));
  }
}

console.log(
  `\n— テーブル監査 — 手書きcolgroupの不具合: ${errors} 件 / JS自動管理(colgroup無し3列以上): ${autoManaged} 表 / 対象 ${files.length} ファイル`
);
if (errors === 0) console.log('  手書き colgroup に不具合なし。列幅は script.js が中央管理しています。');
process.exit(errors > 0 ? 1 : 0);
