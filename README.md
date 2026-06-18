# 聖路加ICU ローテーターガイド — リポジトリ構成

聖路加国際病院ICUのローテーション研修医向け Web ガイド（静的 HTML/CSS、フレームワークなし）。
GitHub Pages で公開: https://sekisato59.github.io/st-lukes-icu/

> AI 編集者向けの詳細ルール・制作プロセスは [`CLAUDE.md`](CLAUDE.md) を参照。
> この README は「どこに何があるか」を人が一目で把握するための地図です。

---

## ⚠️ 公開サイトは相対パスで動いています（移動厳禁の原則）

このサイトは静的 HTML を相対パス（`../style-v2.css`・`../script.js` など）で参照し、
さらに `search-index.js` / `recent-pages.js` / 関連ページブロックが**ファイルパスを直接持っています**。
そのため **`pages/` や `images/` 内のファイル・ルートの共通 JS/CSS を移動するとリンクが一斉に切れます**。
ディレクトリの「見た目の整理」のためにこれらを動かさないでください（整理はこの README で構造を説明する方針）。

---

## ルート直下

### サイトの中核（移動禁止）
| ファイル | 役割 |
|---|---|
| `index.html` | トップページ |
| `style-v2.css` / `style-home.css` | 共通 CSS / トップページ専用 CSS |
| `script.js` | ナビバー注入・テーブル横スクロール等の共通 JS |
| `site-config.js` | サイト全体設定（年・連絡先など） |
| `search-index.js` | サイト内検索インデックス（**パスを直接保持**） |
| `recent-pages.js` | 新着コンテンツ（**自動生成・手動編集禁止**／pre-commit hook が更新） |
| `all-pages.js` | 検索 DB（recent-pages.js と URL マージ） |
| `abbr-tooltip.js` | 略語ツールチップ自動生成 |
| `mob-toc.js` | モバイル目次ドロワー |
| `sedatives-cards.js` | 鎮静薬カードの共有データ |
| `yoshida-qa-data.js` | 吉田先生 Q&A の関連マッピング |
| `recent-pages-overrides.json` | recent-pages の title/tag/thumb カスタム |
| `related-articles-overrides.json` | 関連ページ自動生成の pin/exclude |
| `robots.txt` / `package.json` / `package-lock.json` | 公開制御 / npm メタ |

### ドキュメント
| ファイル/フォルダ | 役割 |
|---|---|
| `CLAUDE.md` | AI への指示集・制作プロセス・デザインルール |
| `README.md` | この文書（構成地図） |
| `docs/` | スライド書き出し・公開用素材の置き場（`docs/superpowers/` は gitignore） |

---

## `pages/` — 公開ページ本体（中身は移動禁止）

```
pages/
├── articles-gl-*.html        論文・GL まとめ（緑テーマ）
├── articles-guidelines.html  GL カタログ（By System）
├── articles-outpatient.html  外来 GL カタログ
├── disease-topics.html       疾患マニュアル カタログ
├── disease-topics/dt-*.html  疾患トピックス総説（オレンジテーマ）
├── id-icu-notes/note-*.html  ID×ICU カンファ板書ノート（紫テーマ）
├── yoshida-qa/q-*.html       吉田先生 Q&A（緑テーマ）
├── resident-qa/              研修医 Q&A
├── renal-notes/              腎臓ノート
├── bacteria/*.html           細菌個別ページ（70+ 菌種）
├── bacteria-map.html         細菌マップ
├── exam-*.html               試験ノート（インディゴテーマ）
├── schedule-*.html           週次／勤務スケジュール
├── staff-*.html / icu-*.html スタッフ・ICU 情報
├── karte-*.html              カルテ作成ツール／略語対策
├── assets/                   ページ用アセット（exam-patterns 等）
└── （各種ツール）            apache-ii, sofa, rass, cam-icu, rrs-report 等
```

---

## `images/` — 画像（中身は移動禁止）

- ルート直下に共通画像（ロゴ・ヘッダー等）
- `images/articles/` … 記事内の図
- `images/figures/<略称>/` … 論文ごとの Figure 切り出し
- `images/bacteria/<菌>/` … 菌のグラム染色・培地像
- `images/karte/` `images/透析の図/` `images/セット登録/` 等 … 用途別

---

## `scripts/` — 自動化スクリプト

| スクリプト | 役割 | 起動 |
|---|---|---|
| `sync-recent-pages.js` | `recent-pages.js` を git 履歴から再生成 | pre-commit hook |
| `sync-related-articles.js` | 各 GL ページ末尾の関連ページブロック生成 | pre-commit hook |
| `audit-pages.js` | ページ構造の整合性チェック（警告のみ） | pre-commit hook |
| `audit-red-markers.js` | 赤箱内マーカーの監査・統一（`--fix`） | 手動 |
| `audit-tables.js` | テーブル列幅・構造の監査 | 手動 |
| `shoot-responsive.js` | 複数幅でフルページ・スクショ撮影 | 手動 |
| `sync-check.py` / `export-mainpage-slides.js` | dt 間整合性 / スライド書き出し | 手動 |

> clone 直後に1回だけ `git config core.hooksPath .githooks` を実行（hook 有効化）。

---

## ローカル専用（公開サイトには含めない）

リポジトリのルートに置かれているが、**サイト本体ではない**フォルダ群。`.gitignore` 済み。

| フォルダ | 内容 | 備考 |
|---|---|---|
| `_local/archive/` | ルートから退避した一時ファイル（古い pptx・図チェック HTML 等） | 整理で新設。捨ててよいが念のため保管 |
| `_local/抗菌薬用量/` | UpToDate / 原典 PDF（個人参照） | 参照専用。サイトからの参照なし |
| `talk-materials/` | 講演資料の原稿・報告書 | **memory が参照**（関東甲信越講演 2026/7/11）。移動・削除しない |
| `スライド保管箱/` | スライド原稿・書き出し PDF の保管庫（大容量） | **/satoruss スキルの既定保存先**。移動・削除しない |
| `モック集/` | 古いモック HTML（公開ページに統合済み） | 孤児。tracked のまま放置（無害） |
| `注目論文ガイドラインのまとめ/` | 旧・章別 HTML | ⚠️ **`search-index.js` がまだ参照中（hn-/ie-chapter が公開中）**。検索インデックス移行まで移動禁止 |

> `スライド保管箱/` と `talk-materials/` は「ローカルだから動かしてよい」ように見えますが、
> それぞれ **skill の保存先・memory の参照先**になっているため、パスを変えると別の作業が壊れます。
