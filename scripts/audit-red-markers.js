#!/usr/bin/env node
/**
 * audit-red-markers.js — 赤テキストボックス内のマーカー色を監査／修正する。
 *
 * 【最優先ルール】赤いテキストボックス（alert-red / danger 等の赤箱）の中では、
 *   マーカーは mark-red のみを使う。赤箱内に mark-yellow / mark-green / mark-orange が
 *   あると非常に見栄えが悪く、意味も衝突する（赤箱＝危険/警告の文脈に「推奨(緑)」等は矛盾）。
 *
 * 使い方：
 *   node scripts/audit-red-markers.js          監査のみ（違反を一覧、終了コード1）
 *   node scripts/audit-red-markers.js --fix     赤箱内の非赤マーカーを mark-red に統一
 *
 * 検出対象の「赤箱」：class に alert-red もしくは danger を含む要素（div/p 等、タグ非依存）。
 *   ネスト対応で、開始タグと同名タグの深さを数えて対応する閉じまでを赤箱の範囲とする。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'pages');
const FIX = process.argv.includes('--fix');

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, acc);
    else if (e.name.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

function findRedBoxes(html) {
  const boxes = [];
  const openRe = /<(\w+)\b[^>]*\bclass="[^"]*\b(?:alert-red|danger)\b[^"]*"[^>]*>/g;
  let m;
  while ((m = openRe.exec(html))) {
    const tag = m[1];
    const start = m.index;
    const afterOpen = openRe.lastIndex;
    const tagRe = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
    tagRe.lastIndex = start;
    let depth = 0, end = -1, t;
    while ((t = tagRe.exec(html))) {
      if (t[0][1] === '/') depth--; else depth++;
      if (depth === 0) { end = tagRe.lastIndex; break; }
    }
    if (end < 0) continue;
    boxes.push({ start, afterOpen, end });
    openRe.lastIndex = end; // 外側の箱が内側を内包するのでネスト箱はスキップ
  }
  return boxes;
}

const files = walk(ROOT, []);
let total = 0, fileCount = 0;
const report = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const boxes = findRedBoxes(html);
  if (!boxes.length) continue;
  let result = '', cursor = 0, n = 0;
  for (const b of boxes) {
    result += html.slice(cursor, b.afterOpen);
    let inner = html.slice(b.afterOpen, b.end);
    inner = inner.replace(/\bmark-(?:yellow|green|orange)\b/g, () => { n++; return 'mark-red'; });
    result += inner;
    cursor = b.end;
  }
  result += html.slice(cursor);
  if (n) {
    total += n; fileCount++;
    report.push(`${path.relative(path.join(__dirname, '..'), f)}: ${n}件`);
    if (FIX) fs.writeFileSync(f, result);
  }
}

if (total === 0) {
  console.log('✅ 赤テキストボックス内の非赤マーカー：違反なし');
  process.exit(0);
}
console.log(`${FIX ? '🔧 修正' : '⚠ 違反'}：赤ボックス内の非赤マーカー ${total}件 / ${fileCount}ファイル`);
report.forEach((r) => console.log(' -', r));
if (FIX) {
  console.log('→ すべて mark-red に統一しました。');
  process.exit(0);
}
console.log('→ 修正するには: node scripts/audit-red-markers.js --fix');
process.exit(1);
