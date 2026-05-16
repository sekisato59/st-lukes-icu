# GPT-image-2 最終画像スライド制作メモ

## 方針

HTMLスライドを最終レイアウトの正本にする。日本語の本文、ページ番号、スクリーンショットはHTML/CSSとChrome書き出しで固定し、GPT-image-2には文字を含まない背景・挿絵・アクセント画像を生成させる。

この方法にすると、日本語文字の崩れを避けながら、画像生成らしい質感と余白のリッチさを足せる。

## 生成モデルに任せるもの

- 表紙背景の別案、または既存写真の上に重ねる抽象的な医療教育ビジュアル
- 各章の右上・背景端に薄く入れる小さな挿絵
- 検索、学習、エビデンス、動画、ツール、安全性などの概念を示す文字なしイラスト
- QRコード欄の周囲に置く控えめなクロージングビジュアル

## 生成モデルに任せないもの

- 日本語本文
- 実在ページのスクリーンショット
- QRコード本体
- 細かい表、UI文字、論文名、数値の正確なレンダリング
- 病院ロゴや実在ブランドの再現

## 推奨制作手順

1. `docs/mainpage-public-slide-deck.html` を正本として調整する。
2. 下のプロンプトで、文字なしの挿絵画像を生成する。
3. 生成画像を `docs/generated-slide-assets/` に保存する。
4. HTML側に背景画像・挿絵として読み込む。
5. `scripts/export-mainpage-slides.js` で `docs/slide-exports/` にPNGを書き出す。

## 共通プロンプト部品

Use case: productivity-visual
Asset type: 16:9 medical education slide illustration asset
Primary request: Create a polished, text-free illustration asset for a Japanese ICU education portal slide deck.
Visual style: clean editorial medical illustration, warm white background, deep hospital blue and teal accents, subtle paper texture, soft depth, calm academic atmosphere, premium institutional presentation design.
Composition: leave generous empty space for Japanese text and real website screenshots; no large central text blocks; avoid clutter.
Constraints: no text, no letters, no numbers, no logo, no watermark, no patient-identifying details, no realistic patient face, no blood, no dramatic emergency scene, no dark cinematic lighting.
Palette: off-white, deep blue #0D4F8C, teal #0F766E, soft slate, small warm amber accents.
Output: wide 16:9 image or transparent-style isolated illustration on a plain light background.

## Slide 01 表紙

Create a refined wide background for a hospital ICU education portal title slide. Show an abstract view of a modern hospital chapel or quiet institutional corridor blended with subtle digital knowledge-map lines, translucent medical card shapes, and a calm teal-blue atmosphere. Keep the left half darker and uncluttered for large title text. No text, no logo, no readable signage, no people.

Suggested file: `docs/generated-slide-assets/slide-01-cover-bg.png`

## Slide 02 このページでできること

Create a subtle corner illustration showing four connected concepts: orientation guide, evidence, lecture archive, bedside tools. Use simple objects such as a folded map, document stack, play button tile, and calculator pad connected by thin teal lines. Keep it text-free and suitable as a faint right-side background accent.

Suggested file: `docs/generated-slide-assets/slide-02-overview-accent.png`

## Slide 03 トップページ

Create a small polished illustration of a desktop monitor and smartphone showing abstract blank UI cards, with a gentle navigation compass motif. No readable UI text. The asset should sit behind or beside a real screenshot without competing with it.

Suggested file: `docs/generated-slide-assets/slide-03-home-devices.png`

## Slide 04 検索機能

Create a clean search concept illustration: magnifying glass over layered medical knowledge cards, filter chips, and branching lines. All UI elements must be abstract with no text. Use blue and teal, light background, clinical education feel.

Suggested file: `docs/generated-slide-assets/slide-04-search-accent.png`

## Slide 05 当院ICUについて

Create a calm orientation illustration for new ICU rotators: hospital floor map, staff badge silhouette, schedule card, and checklist on a desk. No names, no text, no logo. Friendly but professional.

Suggested file: `docs/generated-slide-assets/slide-05-orientation-accent.png`

## Slide 06 学習コンテンツ

Create a learning pathway illustration: open notebook, lecture screen, stacked clinical manuals, and small milestone markers connected along a gentle path. No text. Light institutional palette.

Suggested file: `docs/generated-slide-assets/slide-06-learning-accent.png`

## Slide 07 治療とエビデンス

Create an evidence bridge illustration: clinical decision node connected to research papers, guideline sheets, and disease topic cards, forming a bridge-like structure. No readable text. Clean, precise, academic.

Suggested file: `docs/generated-slide-assets/slide-07-evidence-accent.png`

## Slide 08 講義動画

Create a video lecture archive illustration: large abstract play button, lecture screen, timeline markers, and notebook, with soft blue-teal lighting. No words or numbers. Polished but not entertainment-like.

Suggested file: `docs/generated-slide-assets/slide-08-video-accent.png`

## Slide 09 ID×ICU Conference

Create a conference learning illustration: two abstract clinicians discussing at a whiteboard with infection and ICU concept icons represented as simple nodes. No faces, no readable writing, no patient scene. Calm academic meeting atmosphere.

Suggested file: `docs/generated-slide-assets/slide-09-id-icu-accent.png`

## Slide 10 便利ツール

Create a bedside tools illustration: calculator, dosing slider, nutrition gauge, transfusion droplet icon, and assessment checklist arranged as abstract app tiles. No text or numbers. Efficient, practical, clean.

Suggested file: `docs/generated-slide-assets/slide-10-tools-accent.png`

## Slide 11 場面別の使い方

Create a route map illustration for clinical workflows: four branching paths from a central portal icon to abstract checkpoints. Use tiny icons for start, ward, tools, evidence, but no text. Light background and teal route lines.

Suggested file: `docs/generated-slide-assets/slide-11-use-cases-accent.png`

## Slide 12 安全に使うために

Create a safety and privacy illustration: shield, lock, clinical document, and check marks arranged in a calm institutional composition. No text, no patient data, no red warning style. Use blue and teal with a small amber accent.

Suggested file: `docs/generated-slide-assets/slide-12-safety-accent.png`

## Slide 13 まとめ

Create a closing illustration: a clean portal doorway or path leading into a calm ICU education dashboard, with subtle light rays and organized cards. Leave a clear blank area for QR code placement. No text, no logo, no people.

Suggested file: `docs/generated-slide-assets/slide-13-closing-accent.png`

## HTML合成時の配置ルール

- 挿絵は本文やスクリーンショットより背面に置く。
- 透明度は 0.10-0.22 程度を基本にする。
- 画面キャプチャが主役のスライドでは、挿絵は右上・左下などの余白に逃がす。
- 生成画像に文字らしきものが入った場合は採用しない。
- 医療現場の人物を入れる場合は、顔が特定できない抽象表現にする。

## API実行に必要なもの

CLIやAPIで一括生成する場合は `OPENAI_API_KEY` が必要。現在のシェルでは未設定。

例:

```bash
export OPENAI_API_KEY=...
```

API生成後は、生成ファイルを `docs/generated-slide-assets/` に置き、HTMLに読み込ませる。
