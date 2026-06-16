#!/usr/bin/env node
/**
 * 簡易 Markdown → DOCX 変換（このプロジェクトの報告書用サブセット対応）
 * 対応: # ## ### 見出し / 段落 / **太字** / 表 / 箇条書き(-) / 番号付き(1.) /
 *       引用(>) / コードフェンス(```) / 水平線(---)
 * 使い方: node scripts/md-to-docx.js <input.md> <output.docx>
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, LevelFormat,
} = require("docx");

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node scripts/md-to-docx.js <input.md> <output.docx>");
  process.exit(1);
}

const FONT = "Yu Gothic";          // 日本語対応・Mac/Windows共通で入手しやすい
const MONO = "Consolas";
const CONTENT_WIDTH = 9026;         // A4・上下左右1inchマージン時の本文幅(DXA)

const src = fs.readFileSync(inPath, "utf8").replace(/\r\n/g, "\n");
const lines = src.split("\n");

// ---- インライン: **太字** をパースして TextRun[] を返す ----
function inlineRuns(text, baseOpts = {}) {
  const runs = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index), font: FONT, ...baseOpts }));
    runs.push(new TextRun({ text: m[1], bold: true, font: FONT, ...baseOpts }));
    last = re.lastIndex;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last), font: FONT, ...baseOpts }));
  if (runs.length === 0) runs.push(new TextRun({ text: "", font: FONT, ...baseOpts }));
  return runs;
}

const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const cellBorders = { top: border, bottom: border, left: border, right: border };

function buildTable(headerCells, bodyRows) {
  const nCol = headerCells.length;
  // 列幅を中身の最大文字数で比例配分（最小割合あり）
  const colLens = headerCells.map((h, i) => {
    let max = h.replace(/\*\*/g, "").length;
    for (const r of bodyRows) {
      const c = (r[i] || "").replace(/\*\*/g, "");
      if (c.length > max) max = c.length;
    }
    return Math.max(max, 3);
  });
  const total = colLens.reduce((a, b) => a + b, 0);
  const colWidths = colLens.map((l) => Math.max(Math.round((l / total) * CONTENT_WIDTH), 700));
  // 合計をCONTENT_WIDTHに正規化
  const sum = colWidths.reduce((a, b) => a + b, 0);
  const diff = CONTENT_WIDTH - sum;
  colWidths[colWidths.length - 1] += diff;

  const mkCell = (txt, opts = {}) =>
    new TableCell({
      borders: cellBorders,
      width: { size: opts.width, type: WidthType.DXA },
      shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
      margins: { top: 60, bottom: 60, left: 110, right: 110 },
      children: [new Paragraph({ children: inlineRuns(txt, { size: 19 }) })],
    });

  const rows = [];
  rows.push(new TableRow({
    tableHeader: true,
    children: headerCells.map((h, i) => mkCell(`**${h.replace(/\*\*/g, "")}**`, { width: colWidths[i], fill: "1F4E5F" === "x" ? "" : "D9E8EE" })),
  }));
  for (const r of bodyRows) {
    rows.push(new TableRow({
      children: headerCells.map((_, i) => mkCell(r[i] || "", { width: colWidths[i] })),
    }));
  }
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
  });
}

const children = [];
let i = 0;
while (i < lines.length) {
  let line = lines[i];

  // 空行
  if (line.trim() === "") { i++; continue; }

  // 水平線
  if (/^---+\s*$/.test(line)) {
    children.push(new Paragraph({
      spacing: { before: 120, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "888888", space: 1 } },
      children: [new TextRun({ text: "", font: FONT })],
    }));
    i++; continue;
  }

  // コードフェンス
  if (/^```/.test(line)) {
    i++;
    const buf = [];
    while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
    i++; // 閉じ```
    for (const cl of buf) {
      children.push(new Paragraph({
        shading: { fill: "F3F3F3", type: ShadingType.CLEAR },
        spacing: { after: 0 },
        children: [new TextRun({ text: cl || " ", font: MONO, size: 18 })],
      }));
    }
    children.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }));
    continue;
  }

  // 表
  if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
    const parseRow = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((s) => s.trim());
    const header = parseRow(line);
    i += 2; // ヘッダ + 区切り
    const body = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) { body.push(parseRow(lines[i])); i++; }
    children.push(buildTable(header, body));
    children.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun("")] }));
    continue;
  }

  // 見出し
  let mh = /^(#{1,4})\s+(.*)$/.exec(line);
  if (mh) {
    const level = mh[1].length;
    const txt = mh[2];
    const headingMap = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 };
    children.push(new Paragraph({ heading: headingMap[level], children: inlineRuns(txt) }));
    i++; continue;
  }

  // 引用
  if (/^>\s?/.test(line)) {
    const buf = [];
    while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
    children.push(new Paragraph({
      shading: { fill: "FFF6E0", type: ShadingType.CLEAR },
      indent: { left: 240 },
      spacing: { before: 80, after: 80 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: "E0A800", space: 8 } },
      children: inlineRuns(buf.join(" "), { italics: false }),
    }));
    continue;
  }

  // 箇条書き
  if (/^[-*]\s+/.test(line)) {
    while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
      children.push(new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: inlineRuns(lines[i].replace(/^[-*]\s+/, "")),
      }));
      i++;
    }
    continue;
  }

  // 番号付き
  if (/^\d+\.\s+/.test(line)) {
    while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
      children.push(new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: inlineRuns(lines[i].replace(/^\d+\.\s+/, "")),
      }));
      i++;
    }
    continue;
  }

  // 通常段落（連続行を結合）
  const buf = [line];
  i++;
  while (i < lines.length && lines[i].trim() !== "" &&
         !/^(#{1,4}\s|>|[-*]\s|\d+\.\s|```|---|\|)/.test(lines[i])) {
    buf.push(lines[i]); i++;
  }
  children.push(new Paragraph({ spacing: { after: 100 }, children: inlineRuns(buf.join("")) }));
}

const doc = new Document({
  creator: "関谷 智",
  title: "ホスピタリスト病棟配置 ニーズ分析報告書",
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: FONT, color: "1F4E5F" },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 25, bold: true, font: FONT, color: "23708A" },
        paragraph: { spacing: { before: 220, after: 120 }, outlineLevel: 1,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "23708A", space: 2 } } } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: FONT, color: "333333" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
      { id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 21, bold: true, font: FONT, color: "555555" },
        paragraph: { spacing: { before: 120, after: 60 }, outlineLevel: 3 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 280 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 320 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 },
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("wrote", outPath, buf.length, "bytes");
});
