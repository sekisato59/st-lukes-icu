#!/usr/bin/env node
/**
 * audit-yellow-markers.js — 黄色/琥珀テキストボックス内のマーカー色を監査／修正する。
 *
 * 【ルール】淡いクリーム/琥珀のテキストボックス（alert-yellow / notice-box /
 *   #FFFBEB・#FEF3C7・#FFF7ED 等の暖色背景）の中では、寒色マーカー（mark-blue /
 *   mark-green / mark-pink）や、地と被って見えない mark-yellow、紛らわしい mark-orange を
 *   使わない。青・緑が琥珀地に乗ると非常に見栄えが悪く（寒色×暖色の不調和）、
 *   黄マーカーはクリーム地に埋もれて読めない。
 *
 *   → 黄箱内の強調は暖色アンバー下線マーカー mark-amber に統一する（地と同系で馴染み、
 *     かつ十分に視認できる）。mark-red のみ「意図的な警告」として残す（赤箱ルールと整合）。
 *
 * 使い方：
 *   node scripts/audit-yellow-markers.js          監査のみ（違反を一覧、終了コード1）
 *   node scripts/audit-yellow-markers.js --fix     黄箱内の非アンバー（red以外）マーカーを mark-amber に統一
 *
 * 検出対象の「黄箱」（タグ非依存・ネスト対応で対応閉じまでを範囲とする）：
 *   (a) class に alert-yellow / notice-box / alert-amber を含む要素
 *   (b) inline style の背景色が「暖色の淡色（琥珀/クリーム/桃）」の要素
 *       （hex を色値で判定。固定パレット非依存。赤・橙の濃色や寒色は対象外）
 *   黄箱内の mark-yellow / orange / green / blue / pink を mark-amber に統一する（mark-red は残す）。
 *
 * 姉妹スクリプト：scripts/audit-red-markers.js（赤箱内は mark-red のみ）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'pages');
const FIX = process.argv.includes('--fix');

// 「黄/琥珀（淡い暖色）」判定：R が高く・G も高め・B が低い（G>B で寒色/赤と区別）。
//   #FFFBEB(クリーム) / #FEF3C7(淡黄) / #FFF7ED(淡橙) 等の暖色淡色ボックスを拾い、
//   濃い赤(#FEF2F2 は R≈G≈B で除外)や寒色は含めない。
function isAmberHex(h) {
  h = h.toUpperCase();
  const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
  return r >= 230 && g >= 200 && b <= 235 && (r - b) >= 18 && (g - b) >= 10;
}
// 開始タグが「黄箱」か：(a) class に alert-yellow / notice-box / alert-amber、または
//   (b) inline style の背景が暖色淡色（hex で判定）。固定パレットに依存せず色値で判定する。
function isYellowOpenTag(tag) {
  if (/\bclass="[^"]*\b(?:alert-yellow|notice-box|alert-amber)\b[^"]*"/i.test(tag)) return true;
  const sm = tag.match(/style="([^"]*)"/i);
  if (!sm) return false;
  const bm = sm[1].match(/background(?:-color)?:\s*(#[0-9A-Fa-f]{6})/i);
  if (!bm) return false;
  return isAmberHex(bm[1]);
}

function findYellowBoxes(html) {
  const boxes = [];
  const openRe = /<(\w+)\b[^>]*>/g;
  let m;
  while ((m = openRe.exec(html))) {
    if (!isYellowOpenTag(m[0])) continue;
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

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, acc);
    else if (e.name.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

const files = walk(ROOT, []);
let total = 0, fileCount = 0;
const report = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const boxes = findYellowBoxes(html);
  if (!boxes.length) continue;
  let result = '', cursor = 0, n = 0;
  const hits = [];
  for (const b of boxes) {
    result += html.slice(cursor, b.afterOpen);
    let inner = html.slice(b.afterOpen, b.end);
    inner = inner.replace(/\bmark-(yellow|orange|green|blue|pink)\b/g, (mm, c, off) => {
      n++;
      // 違反の周辺テキスト（マーカー対象語）を抜き出してレビューしやすくする
      const ctx = inner.slice(off, off + 120).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 48);
      hits.push(`mark-${c} → ${ctx}`);
      return 'mark-amber';
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
  console.log('✅ 黄色テキストボックス内の不調和マーカー：違反なし');
  process.exit(0);
}
console.log(`${FIX ? '🔧 修正' : '⚠ 違反'}：黄箱内の非アンバーマーカー（red除く） ${total}件 / ${fileCount}ファイル`);
report.forEach((r) => console.log(' -', r));
if (FIX) {
  console.log('→ すべて mark-amber に統一しました（mark-red は警告用に保持）。');
  process.exit(0);
}
console.log('→ 修正するには: node scripts/audit-yellow-markers.js --fix');
process.exit(1);
