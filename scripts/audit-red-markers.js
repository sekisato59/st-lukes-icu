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
 * 検出対象の「赤箱」（タグ非依存・ネスト対応で対応閉じまでを範囲とする）：
 *   (a) class に alert-red もしくは danger を含む要素
 *   (b) inline style の背景色が「赤」の要素（hex / rgba を色値で判定。固定パレット非依存）
 *       ※ オレンジ・琥珀・桃（#EA580C / #F59E0B / #FED7AA 等の暖色）は赤箱に含めない
 *   赤箱内の非赤マーカー（mark-green / yellow / orange / blue / pink）を mark-red に統一する。
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

// 「赤（オレンジではない）」判定：R が高く・G/B が低く・G≈B（橙は G≫B なので除外）。
//   これにより #EA580C(橙) / #F59E0B(琥珀) / #FED7AA(桃) 等の暖色ボックスは赤箱に含めない。
function isRedHex(h) {
  h = h.toUpperCase();
  const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
  return r >= 180 && r - g >= 35 && r - b >= 35 && Math.abs(g - b) <= 25;
}
function isRedRgba(v) {
  const n = v.match(/\d+/g);
  return n && +n[0] >= 180 && +n[0] - +n[1] >= 35 && +n[0] - +n[2] >= 35 && Math.abs(+n[1] - +n[2]) <= 25;
}
// 開始タグが「赤箱」か：(a) class に alert-red / danger、または
//   (b) inline style の背景が赤（hex / rgba、橙は除外）。固定パレットに依存せず色値で判定する。
function isRedOpenTag(tag) {
  if (/\bclass="[^"]*\b(?:alert-red|danger)\b[^"]*"/i.test(tag)) return true;
  const sm = tag.match(/style="([^"]*)"/i);
  if (!sm) return false;
  const bm = sm[1].match(/background(?:-color)?:\s*(#[0-9A-Fa-f]{6}|rgba?\([^)]+\))/i);
  if (!bm) return false;
  return bm[1][0] === '#' ? isRedHex(bm[1]) : isRedRgba(bm[1]);
}

function findRedBoxes(html) {
  const boxes = [];
  const openRe = /<(\w+)\b[^>]*>/g;
  let m;
  while ((m = openRe.exec(html))) {
    if (!isRedOpenTag(m[0])) continue;
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
  const hits = [];
  for (const b of boxes) {
    result += html.slice(cursor, b.afterOpen);
    let inner = html.slice(b.afterOpen, b.end);
    inner = inner.replace(/\bmark-(yellow|green|orange|blue|pink)\b/g, (m, c, off) => {
      n++;
      // 違反の周辺テキスト（マーカー対象語）を抜き出してレビューしやすくする
      const ctx = inner.slice(off, off + 120).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 48);
      hits.push(`mark-${c} → ${ctx}`);
      return 'mark-red';
    });
    result += inner;
    cursor = b.end;
  }
  result += html.slice(cursor);
  if (n) {
    total += n; fileCount++;
    report.push(`${path.relative(path.join(__dirname, '..'), f)}: ${n}件`);
    hits.forEach((h) => report.push(`     ${h}`));
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
