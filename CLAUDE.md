# 聖路加ICU ローテーターガイド — 開発ガイドライン

## プロジェクト概要
聖路加国際病院ICUのローテーション研修医向けWebガイド（静的HTML/CSS、フレームワークなし）。
GitHub Pages で公開: `https://sekisato59.github.io/st-lukes-icu/`

---

## PDFガイドライン → HTMLまとめ 制作プロセス

新しいガイドラインPDFからまとめページを作る際は、以下のプロセスに従う。

### STEP 1：PDFをテキストに変換する

MCP（opendataloader-pdf）を使ってPDFをテキストに変換する。
変換済みのテキストは `/tmp/` に保存されているが、新しいセッションでは再変換が必要。

```bash
# テキスト変換済みの場合はそのまま読む
sed -n '開始行,終了行p' /tmp/ファイル名.txt
```

PDFの章構成を把握してから作業を開始すること。
各章は独立したHTMLファイル（`ie-chapter{N}.html` 等）として出力する。

### STEP 2：対象読者と内容方針

**対象読者：** 初期・後期研修医 および 内科系集中治療医

**含める内容：**
- 研修医・ICU医がすぐに使える実践的な知識
- 感染症科に関する内容は、専門的な菌種・薬剤情報（マニアックな内容）も含めてよい

**省略する内容：**
- 循環器内科専門医向けのマニアックな術式・弁形成・手術手技の詳細
- 実臨床でほとんど遭遇しない稀少疾患の詳細

### STEP 3：コアコンテンツと＋αの区別

**白カード（コアコンテンツ）：** 研修医・ICU医が必ず知るべき内容

**紫カード（＋α）：** 以下に該当する発展的内容
- 感染症専門医・循環器専門医向けのマニアックな知識
- 特殊な菌種・稀な病態・高度な薬剤モニタリングの詳細
- 「知っておくと深い理解ができる」背景知識

### STEP 4：文量・文体の方針

- **箇条書きに頼りすぎない。** まず `<p class="prose">` または `<p class="rule-body">` で文章として説明し、表・フローは補足として使う
- **臨床的意義を必ず記述する**（「なぜ重要か」「臨床でどう使うか」を文章で示す）
- **数値・統計は stat-grid で視覚化**し、文章との重複を避ける
- カード1枚に1トピック。カードが長くなりすぎる場合は分割する
- 原文の情報量を維持する（要約しすぎない）

### STEP 5：各章のHTMLファイルを出力する

1. 下記「HTMLコンポーネント」に従い、各章を独立したHTMLファイルとして出力
2. ファイル名は `{ガイドライン略称}-chapter{N}.html`（例：`ie-chapter3.html`）
3. 各章末に **SUMMARY（5項目）** を作成する
4. 作成後、`articles-gl-{ガイドライン}.html` の一覧ページに章リンクを追加する
5. `search-index.js` にエントリを追加する

### STEP 6：既存章との整合性チェック

他の章がすでに作成されている場合は、作成前に1章分を読んで文体・文量・スタイルを揃える。

---

## 技術構成
- 共通CSS: `style-v2.css`（CSS変数・カード・アラート・マーカー等）
- 共通JS: `script.js`、`site-config.js`
- フォント: Noto Sans JP（Google Fonts）
- 検索: `search-index.js`（クライアントサイドJSON、アンカーID付き）

## デザインルール（全ページ共通）

### 禁止事項
- カードに `border-left` の太い帯を使わない
- 多色のサマリーカード（色違いボーダーで並べるデザイン）を使わない
- 凡例（白カード/紫カードの説明）を入れない
- バッジ形式のデザインは使わない（ダサい）
- シャドウ・過剰な装飾・絵文字は使わない

### 見出し階層（4レベル）
1. **大見出し**（テキストボックス外）: 2トーンのグラデーションバナー。番号+タイトル+サブタイトル
2. **中見出し**（テキストボックス内）: 色付きバンド。レター(A/B等)+タイトル
3. **小見出し**: `font-size:0.92rem; font-weight:800; border-bottom:2px solid var(--blue)`
4. **少々見出し**: 別カードに分割。青ドット + `font-size:0.88rem; font-weight:800`

### セクション見出し
```html
<h3 id="ANCHOR" style="font-size:1.1rem;font-weight:900;color:var(--text);margin:28px 0 16px;padding-left:14px;border-left:4px solid COLOR;line-height:1.4;">
  <span style="color:COLOR;font-size:0.75rem;letter-spacing:0.1em;display:block;margin-bottom:2px;">SECTION N</span>
  タイトル
</h3>
```

### カード
```html
<div class="card" style="margin-bottom:16px;">
  <div class="card-inner">
    <h3 class="rule-title">タイトル</h3>
    <p class="rule-body">本文</p>
  </div>
</div>
```

### テキストマーカー（style-v2.css のクラス）
- `mark-red` / `mark-yellow` / `mark-green` / `mark-orange` — 下線ハイライト
- 使い方: `<span class="mark-red"><strong>重要テキスト</strong></span>`

### アラートボックス（style-v2.css のクラス）
- `alert-red` / `alert-blue` — style-v2.css で定義済み
- `alert-yellow` / `alert-green` — ページ内 `<style>` で定義

### アンカーID
すべてのセクション・見出しにアンカーIDを付与する。検索インデックス (`search-index.js`) にも反映する。

---

## 「注目論文・最新ガイドラインまとめ」ページの制作ガイド

### 対象ページ
- 一覧: `pages/articles-guidelines.html`（緑テーマ、By System で10セクション）
- 個別記事: `pages/articles-gl-*.html`

### テーマカラー（緑）
- ヒーロー: `linear-gradient(150deg, #1A3A2A 0%, #2D7A4F 55%, #3D9B65 100%)`
- バナー: `linear-gradient(150deg, #1A3A2A 0%, #2D7A4F 100%)`
- セクション左ボーダー: ローテーション `#2D7A4F` → `#DC2626` → `#EA580C` → `#16A34A` → 繰り返し
- フロー番号: `background:#2D7A4F`
- サマリー番号: `color:#2D7A4F`
- 統計ボックスデフォルト: `background:#F0FDF4; border:#BBF7D0; color:#2D7A4F`

### ページ構造（個別記事）

```
ナビバー
ヒーローバナー（緑テーマ、タイトル、バッジ: 出典名+発行年月のみ）
コンテナ（max-width:1140px、flex: メインコンテンツ左 + サイドバー目次右）
  ├ メインコンテンツ（max-width:900px）
  │  ├ 章バナー（ドットグリッド付き緑グラデーション、1.3rem太字）
  │  ├ SECTION 1〜N（セクション見出し + カード群）
  │  ├ SUMMARY（灰色背景カード内の番号付きリスト）
  │  ├ 章バナー（次の章）…
  │  └ 出典注記
  └ サイドバー目次（sticky、220px、900px以下で非表示）
```

### 章バナー（大見出し）
```html
<div id="ID" style="background:linear-gradient(150deg,#1A3A2A 0%,#2D7A4F 100%);border-radius:10px;padding:18px 22px;color:#fff;position:relative;overflow:hidden;margin-top:48px;margin-bottom:0;">
  <div style="position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px);background-size:20px 20px;"></div>
  <div style="font-size:1.3rem;font-weight:900;position:relative;">第N章 タイトル</div>
  <div style="font-size:0.78rem;color:rgba(255,255,255,0.6);position:relative;">English Subtitle</div>
</div>
```
- `#1` 等の番号ラベルは不要

### コンポーネント一覧

#### テーブル
```html
<table class="ie-table">
  <thead><tr><th>見出し1</th><th>見出し2</th></tr></thead>
  <tbody>
    <tr><td>データ</td><td>データ</td></tr>
  </tbody>
</table>
```

#### フローチャート（ステップ）
```html
<div class="ie-flow">
  <div class="ie-flow-item">
    <div class="ie-flow-num">1</div>
    <div style="flex:1;"><p class="rule-body"><strong>タイトル：</strong>説明</p></div>
  </div>
  <div class="ie-flow-arrow">↓</div>
  <div class="ie-flow-item">
    <div class="ie-flow-num">2</div>
    <div style="flex:1;"><p class="rule-body"><strong>タイトル：</strong>説明</p></div>
  </div>
</div>
```

#### 統計グリッド（3列）
```html
<div class="ie-stat-grid">
  <div class="ie-stat">
    <div class="ie-stat-val">数値</div>
    <div class="ie-stat-label">ラベル1行目<br>ラベル2行目</div>
  </div>
</div>
```
- 値（ie-stat-val）は1行に収める（改行しない）
- ラベル（ie-stat-label）は2行に統一
- 赤テーマ: `style="background:#FEF2F2;border-color:#FECACA;"` + val `style="color:#DC2626;"`
- オレンジテーマ: `style="background:#FFF7ED;border-color:#FED7AA;"` + val `style="color:#EA580C;"`

#### ＋αカード（発展的内容、紫）
```html
<div class="ie-alpha">
  <div class="ie-alpha-inner">
    <div class="ie-alpha-header">
      <span class="ie-alpha-badge">＋α</span>
      <span class="ie-alpha-title">タイトル</span>
    </div>
    <p class="rule-body" style="color:#4C1D95;">本文</p>
  </div>
</div>
```

#### 2カラムグリッド
```html
<div class="ie-echo-grid">
  <div class="ie-echo-box">
    <div class="ie-echo-name">タイトル</div>
    <div class="ie-echo-body">本文</div>
  </div>
  <div class="ie-echo-box">...</div>
</div>
```

#### TDMグリッド（薬剤モニタリング）
```html
<div class="ie-tdm-grid">
  <div class="ie-tdm-box">
    <div class="ie-tdm-name">薬剤名</div>
    <div class="ie-tdm-drug">目標値</div>
    <div class="ie-tdm-note">補足</div>
  </div>
</div>
```

### SUMMARY セクション（各章末）
```html
<h3 id="ANCHOR" style="...border-left:4px solid #2D7A4F;...">
  <span style="color:#2D7A4F;...">SUMMARY</span>第N章のキーメッセージ
</h3>
<div class="card" style="margin-bottom:16px;">
  <div class="card-inner">
    <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:var(--radius);padding:14px 18px;">
      <div style="display:flex;align-items:baseline;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="color:#2D7A4F;font-weight:800;font-size:0.8rem;width:18px;flex-shrink:0;">①</span>
        <span class="rule-body"><strong>タイトル：</strong>本文</span>
      </div>
      <!-- 最後の項目は border-bottom なし -->
      <div style="display:flex;align-items:baseline;gap:10px;padding:8px 0;">
        <span style="color:#2D7A4F;font-weight:800;font-size:0.8rem;width:18px;flex-shrink:0;">⑤</span>
        <span class="rule-body"><strong>タイトル：</strong>本文</span>
      </div>
    </div>
  </div>
</div>
```
- 各章のSUMMARYは5項目を基本とする
- 多色ボーダーのカードは使わない（灰色背景の統一デザインのみ）

### サイドバー目次
```html
<aside class="ie-sidebar">
  <div class="ie-sidebar-card">
    <div class="ie-sidebar-title">目次</div>
    <a href="#ie-ch1" class="ie-toc-chapter">第1章 総論</a>
    <a href="#ie-section1" class="ie-toc-section">S1 — 感染性心内膜炎とは</a>
    ...
  </div>
</aside>
```
- スティッキー（top:80px）、220px幅、900px以下で非表示

### 新しいガイドライン記事を追加する手順
1. ソースHTML（独自スタイル）を読み取る
2. 上記のコンポーネントに変換（カード・テーブル・フロー・統計・＋α・アラート）
3. 章バナー → セクション → カード群 → SUMMARY の構成で1ページにまとめる
4. サイドバー目次に全章・全セクションのリンクを追加
5. `articles-guidelines.html` の該当セクション表に行を追加（更新日・タイトル・キーワード・リンク）
6. `search-index.js` にエントリ追加

### 文量・スタイルの方針
- 原文の情報量を維持する（要約しすぎない）
- 段落は `rule-body` クラスで統一
- カード1枚に1トピック。1カードが長くなりすぎないよう適宜分割
- テーブルは比較・分類・一覧に積極的に使用
- マーカー（mark-red/yellow/green）は重要語句に限定的に使用
- アラートボックスは注意喚起・臨床的ポイントに使用
- ＋αカードは発展的・専門的内容に限定

### 出典注記（ページ末尾）
```html
<p style="font-size:0.72rem;color:#9CA3AF;margin-top:16px;line-height:1.7;">
  出典：正式文献名（発行年月日）<br>
  本資料は教育目的で作成したサマリーです。診断・治療方針の決定には必ず原典ガイドラインを参照してください。
</p>
<p style="font-size:0.75rem;color:var(--muted);text-align:right;margin-top:8px;">制作：ICU 関谷</p>
```
- 班長名・著者名は記載しない

### DOIリンク（必須）
出典注記には必ずDOIリンクを含める。原著論文に直接アクセスできるようにする。
```html
<p style="font-size:0.72rem;color:#9CA3AF;margin-top:16px;line-height:1.7;">
  出典：正式文献名（発行年月日）<br>
  DOI：<a href="https://doi.org/XXXX" target="_blank" rel="noopener" style="color:#60A5FA;">https://doi.org/XXXX</a><br>
  本資料は教育目的で作成したサマリーです。診断・治療方針の決定には必ず原典ガイドラインを参照してください。
</p>
```

### NEW バッジ（自動）
一覧ページ (`articles-guidelines.html`) に自動スクリプトあり。更新日が2週間以内の行にはタイトル前に赤い「NEW」バッジが自動表示される。手動対応不要。

---

## 疾患トピックス（疾患・項目別まとめ）制作プロセス

### 概要
- 一覧ページ: `pages/disease-topics.html`（オレンジテーマ、By System で10セクション）
- 個別総説: `pages/disease-topics/dt-*.html`
- 注目論文・ガイドラインまとめの内容を元に、対象読者（後期研修医・フェロー）向けの総説を作成する

### 情報源の厳格管理
- **ガイドライン要約ページ（緑テーマ）：** 原著PDFの内容のみを記載する。Claudeの知識で補完しない
- **疾患トピックス総説（オレンジテーマ）：** 収録済みの論文・GLの要約ページの内容のみを組み合わせて記述する。収録外の情報は一切追加しない
- 数値・統計データは必ず原著に記載があるもののみ使用する
- 「臨床医の視点」等の補足ボックスも、原著の内容から論理的に導ける範囲に限定する

### 更新プロセス
注目論文・ガイドラインまとめに新しい論文を追加した場合：
1. その論文が既存の疾患トピックス総説に関連するか確認する
2. 関連する場合、該当する総説ページに新しい知見を追記し、論文ページへのインラインリンクを追加する
3. `disease-topics.html` の該当行の更新日を更新する
4. `search-index.js` のキーワードを必要に応じて追加する

### インラインリンクの種類
総説ページ内では3種類のリンクを使い分ける：
- **ガイドライン参照：** `<a href="../articles-gl-xxx.html#section" style="color:var(--blue);font-weight:700;">テキスト</a>`
- **他の総説への横断リンク：** `<a href="dt-xxx.html" style="color:var(--blue);font-weight:700;">テキスト</a>`
- **動画リンク：** `<a href="../video-lectures.html#vid-xxx" style="color:var(--blue);font-weight:700;">テキスト</a>`

### テーマカラー（オレンジ）
- ヒーロー: `linear-gradient(150deg, #3D1F00 0%, #B45309 55%, #D97706 100%)`
- バナー: `linear-gradient(150deg, #3D1F00 0%, #B45309 100%)`
- セクション左ボーダー: ローテーション `#B45309` → `#DC2626` → `#EA580C` → `#16A34A` → 繰り返し
- 統計ボックス: `background:#FFFBEB; border:#FDE68A; color:#B45309`
