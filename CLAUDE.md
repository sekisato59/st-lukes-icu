# 聖路加ICU ローテーターガイド — 開発ガイドライン

## プロジェクト概要
聖路加国際病院ICUのローテーション研修医向けWebガイド（静的HTML/CSS、フレームワークなし）。
GitHub Pages で公開: `https://sekisato59.github.io/st-lukes-icu/`

---

## PDFガイドライン → HTMLまとめ 制作プロセス

新しいガイドラインPDFからまとめページを作る際は、以下のプロセスに従う。

### ⚠️ ハルシネーション厳禁ルール（最優先）

**ガイドラインまとめページ（緑テーマ）は、PDFに記載された情報のみを記述する。Claudeの知識で補完・推測することは一切禁止。**
**疾患トピックス総説（オレンジテーマ）は、収録済みGLまとめページの内容のみを使用する。**

#### 禁止事項（絶対厳守）
- PDFに記載のない試験名・論文・ガイドラインへの言及
- PDFに記載のないN数・CI・p値・サブグループ結果などの統計数値
- PDFに記載のない治療薬・手技・プロトコルの詳細
- DOIのAI自己生成（記憶から作ったDOIは必ず誤る。詳細は下記「DOIリンク」参照）
- **スコアリングシステムの構成項目・カットオフ値をAIの記憶から書くこと**（PLASMIC、FRENCH、CHA₂DS₂-VASc等は必ずソースから転記）
- **試験名と薬剤/介入の対応をAIの記憶でマッピングすること**（RE-LY=ダビガトラン等の対応は必ずソースで確認）
- **stat-gridやSUMMARYの数値を本文と別に「記憶から」書くこと**（必ず同一ページの本文からコピー）

PDFに書かれていない情報を「補完したい」衝動が生じたら、書かずに省略する。

#### 2026年4月総点検で判明した5大ハルシネーションパターン（再発防止）

**パターン1：AI知識の無意識補完（最頻出・最危険）**
PDFの記述が薄い箇所で、AIが「一般的に知られている」知識を補完してしまう。
- 例：PLASMICスコアの構成項目4/7を誤記（dic-tma2018）、スコアカットオフ値を誤記（dt-ttp）、インスリン基礎量の割合を捏造（dt-glucose）、効果方向を逆転（dt-vent-weaning）
- **対策：** 数値・スコア・用量・閾値は、PDFのテキストを目の前に置いた状態で1文字ずつ転記する。「知っている」と感じた瞬間こそ危険。知っていても必ずソースで確認してから書く。

**パターン2：DOIのAI記憶生成**
試験名からDOIを推測して生成。形式（10.1056/NEJMoa...）は正しいが中身が別論文。
- 例：EARLY-AFのDOI→実際はMANTRA-PAF、CABANAのDOI→別論文
- **対策：** DOIは①PDF記載 ②ユーザー提供 ③WebSearch確認済みの3ルートのみ。AIの記憶からDOIを書くことは100%禁止。確認できないならDOI行を省略。

**パターン3：セクション間の転記ずれ**
本文を書いた後、SUMMARY/stat-gridを作成する際に元の数値を参照せず記憶で書き直す。
- 例：ニモジピン q6h→q4h（SUMMARY転記時）、メタ解析の研究数 12→7（サブ解析の数を全体の数で上書き）
- **対策：** SUMMARYとstat-gridは、同一ページの本文からコピー＆ペーストで作成する。「だいたい同じ」ではなく完全一致を保証する。SUMMARY作成後、必ず本文の該当箇所と数値を1つずつ照合する。

**パターン4：stat-grid作成時の数値捏造**
stat-gridに入れる数値を、本文にある正確な値ではなく「見栄えの良い数値」で丸めて書く。
- 例：SA-AKI 本文25-75% → stat-box 45-70%に改変
- **対策：** stat-gridの値は本文の数値と完全に一致させる。丸めない。改変しない。

**パターン5：薬剤-試験の誤対応**
複数の薬剤・試験を列挙する際、AIの一般知識で試験名と薬剤をマッピングしてしまう。
- 例：RE-LY（ダビガトラン試験）のDOIをアピキサバンのカードに配置
- **対策：** 薬剤名と試験名の対応は必ずPDFの記述に基づく。PDFに対応が明記されていない場合はリンクを貼らない。

#### 作成後セルフチェック手順（必須）

ページ作成完了後、コミット前に以下を必ず実行する：

1. **数値照合：** ページ内のすべての数値（N数・%・OR・HR・RR・CI・p値・用量・カットオフ）をgrepで抽出し、ソースPDF/GLページの該当箇所と1つずつ突合する
2. **SUMMARY照合：** SUMMARYの各項目が本文のどこに対応するか特定し、数値が完全一致するか確認する
3. **stat-grid照合：** stat-gridの全数値が本文と完全一致するか確認する
4. **スコア照合：** スコアリングシステム（PLASMIC・FRENCH・CHA₂DS₂-VASc等）の構成項目・カットオフ値がソースと完全一致するか確認する
5. **DOI照合：** 全DOIが①PDF記載 ②ユーザー提供 ③WebSearch確認済みのいずれかであることを確認する。出所不明のDOIは削除する
6. **効果方向照合：** OR/HR/RR > 1 なら「リスク増加」、< 1 なら「リスク低下」と本文の記述が一致するか確認する

### STEP 1：PDFを読み込む

#### PDF抽出コマンド（推奨：opendataloader-pdf）

```bash
# 出力ディレクトリ作成
mkdir -p /tmp/pdf_output

# PDF → Markdown 変換（多段組・表・数式に強い）
/Users/sekiyasatoshi/Library/Python/3.9/bin/opendataloader-pdf \
  "/path/to/file.pdf" \
  -o /tmp/pdf_output/ \
  -f markdown \
  -q

# 生成ファイル名を確認（入力ファイル名.md になる）
ls /tmp/pdf_output/
```

- テーブル・多段組・複雑なレイアウトも正確に抽出される
- フルパス指定が必要（PATHに入っていないため）
- 変換済みの `/tmp/pdf_output/` があれば再変換不要（セッション間で再利用可能）
- 出力ファイルは `Read` ツールで読む。大きい場合は `limit`/`offset` で分割して読む

#### PDF抽出コマンド（フォールバック：pdftotext）

opendataloader-pdf が失敗した場合のみ使用する：

```bash
/opt/homebrew/bin/pdftotext "/path/to/file.pdf" /tmp/output.txt
cat /tmp/output.txt | head -100   # 章構成の確認
wc -l /tmp/output.txt             # 総行数の確認
```

- poppler 付属コマンド。`brew install poppler` で導入済み
- フルパス指定（`/opt/homebrew/bin/pdftotext`）が必要。`pdftotext` 単体はPATHに入っていないため

#### 全文通読（必須）

抽出後、**全文を通読してから執筆を開始すること。**
通読せずに書き始めると、後半セクション・Figure・Table・症例提示を丸ごと落とす原因になる。

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

#### ⚠️ コンテンツ充実度の基準（「内容が薄い」防止）

**PDFの全要素をカバーしているか確認する：**

| PDF要素 | 対応ルール |
|---------|-----------|
| Figure（代表症例・フローチャート・図） | 必ずカードに起こす。症例は `case-box` または詳細カードで再現する |
| Table（薬剤一覧・診断基準・機序分類） | すべて `ie-table` または `ie-score-card` に変換する |
| 歴史的経緯・モデルの変遷 | 病態生理セクションに必ず含める。「昔はXと考えられていたが、Y試験によりZに修正された」形式で記述 |
| ICU/臨床現場での pitfall・誤診 | 白カードまたは `alert-red` で明示する |
| 鑑別診断・除外すべき疾患 | 専用カードまたはテーブルを設ける |
| 治療の詳細（用量・期間・モニタリング） | 省略せず全て記述。`ie-tdm-grid` や `ie-flow` を活用 |
| 予後・長期管理 | 必ず独立セクションを設ける |
| 稀な原因・特殊病態 | ＋αカードで収録する（省略しない） |

**HTML出力量の目安：**
- 論文1本（10ページ未満）→ 600〜900行
- 論文1本（10〜20ページ）→ 900〜1400行
- ガイドライン（複数章）→ 各章500行以上

**「薄い」と判断される典型パターン（過去の失敗例）：**
- PDF中の Figure 1 代表症例を未掲載
- 病態生理の歴史的変遷を1行で済ませている
- 治療セクションが「薬剤を中止する」のみ
- 鑑別・pitfall のカードがない
- stat-grid が空または極端に少ない（統計のある論文で3個未満）

### STEP 5：各章のHTMLファイルを出力する

1. 下記「HTMLコンポーネント」に従い、各章を独立したHTMLファイルとして出力
2. ファイル名は `{ガイドライン略称}-chapter{N}.html`（例：`ie-chapter3.html`）
3. 各章末に **SUMMARY（5項目）** を作成する
4. 作成後、`articles-gl-{ガイドライン}.html` の一覧ページに章リンクを追加する
5. `search-index.js` にエントリを追加する

### STEP 6：コンテンツ充実度セルフチェック（⚠️ 提出前必須）

HTMLを書き終えたら、以下を実行してから次のステップへ進む。

```bash
# 1. HTML行数を確認（基準値以下なら内容が薄い可能性大）
wc -l pages/articles-gl-*.html

# 2. セクション数を確認
grep -c 'ie-toc-section' pages/articles-gl-xxxx.html

# 3. テーブル数を確認
grep -c 'ie-table\|ie-score-card\|ie-stat-grid' pages/articles-gl-xxxx.html
```

**チェックリスト：**
- [ ] PDFのすべてのFigure・Tableをいずれかのコンポーネントに変換した
- [ ] 代表症例（Figure 1等）を `case-box` またはカードで再現した
- [ ] 病態生理に歴史的変遷・モデルの修正経緯を記述した
- [ ] ICUでの誤診・pitfallを明示したカードがある
- [ ] stat-gridに論文の主要統計数値を入れた
- [ ] 治療セクションに用量・期間・モニタリングの詳細がある
- [ ] 予後・長期管理の独立セクションがある
- [ ] ＋αカードで稀な病態・特殊機序をカバーした

### STEP 7：既存章との整合性チェック

他の章がすでに作成されている場合は、作成前に1章分を読んで文体・文量・スタイルを揃える。

---

## 技術構成
- 共通CSS: `style-v2.css`（CSS変数・カード・アラート・マーカー等）
- 共通JS: `script.js`、`site-config.js`
- フォント: Noto Sans JP（Google Fonts）
- 検索: `search-index.js`（クライアントサイドJSON、アンカーID付き）

## デザインルール（全ページ共通）

### 禁止事項
- カードに `border-left` の太い帯を使わない（セクション見出しh3の`border-left:4px`は許可。それ以外のカード・div・ボックスに`border-left`で色帯を付けることは一切禁止。ie-echo-box等のグリッドアイテムも含む）
- 多色のサマリーカード（色違いボーダーで並べるデザイン）を使わない
- 凡例（白カード/紫カードの説明）を入れない
- バッジ形式のデザインは使わない（ダサい）
- シャドウ・過剰な装飾・絵文字は使わない

### 間隔トークン（余白の量子化・「間隔がちがう」防止）

`style-v2.css` の `:root` に **8px ベースライン・4px 刻みの間隔トークン**を定義済み。
**新規に margin / padding / gap を書くときは、生の px ではなくこの変数を使う。**
余白を 4/8px の倍数に揃えることで、「箱ごとに margin を手打ちして 14px と 16px が
混在し、見た目の間隔がズレる」類の不具合（過去に AIUEOTIPS 箱で発生）を構造的に防ぐ。

| トークン | 値 | 主な用途 |
|---|---|---|
| `--sp-1` | 4px | 行内の最小間隔・ラベル下の微調整 |
| `--sp-2` | 8px | **基準単位**。リスト項目間・箱内の標準縦間隔 |
| `--sp-3` | 12px | 小カード内パディング |
| `--sp-4` | 16px | カード間・カード内パディング標準 |
| `--sp-5` / `--sp-6` | 20 / 24px | セクション内ブロック間 |
| `--sp-8` 〜 `--sp-12` | 32〜48px | セクション間・章バナー前後 |
| `--card-gap` | 16px | カード間の標準間隔（既存慣習と一致） |
| `--row-gap` | 8px | リスト・行の標準縦間隔 |
| `--inline-gap` | 8px | ラベルと本文など横方向の標準間隔 |

```html
<!-- ✅ 新規はトークンで -->
<div class="card" style="margin-bottom:var(--card-gap);">…</div>
<div style="padding:var(--sp-4);">…</div>
<!-- ❌ 直書きで 14px・15px・18px などの半端値を散らさない -->
```

- 「2つの箱の間隔が違う」と感じたら、まず両者の margin/padding が**同じトークン**を
  指しているか確認する。`6px+8px=14px` のような“足し算でズレる”組み合わせを避ける。
- 既存ページの一括リファクタは不要（リスクが高い）。**今後の新規・修正分から**適用する。

### モバイル崩れの事前検証（`scripts/shoot-responsive.js`）

「表の文字肥大・トップバナー被り・テキストボックスのはみ出し・余白ズレ」など、
**従来は実機で見て初めて発覚していたモバイル不具合を、コミット前に自分の目で検出する**ための
スクショ撮影ツール。インストール済みの Chrome を headless 駆動するため追加依存なし。

```bash
# 既定 3 幅（375 / 768 / 1180px）でフルページ撮影
node scripts/shoot-responsive.js pages/articles-gl-xxxx.html

# 複数ページ・幅指定も可
node scripts/shoot-responsive.js pages/index.html pages/schedule-icu-conf.html
node scripts/shoot-responsive.js --widths 375,414,768 pages/foo.html

open .screenshots/index.html   # 全ページ・全幅を横並びで一覧（クリックで原寸）
```

- 出力先 `.screenshots/` は `.gitignore` 済み（コミットされない）。
- 既定幅はブレークポイント（767/900px）の**両側**を含むため、レスポンシブの境界崩れを捕まえやすい。
- 共通 CSS（`style-v2.css` / `script.js`）を編集したら、影響の大きいページを数枚撮って確認する習慣にする。
- 内部は **1 ページごとに Chrome を起動し直し**、各幅を新ターゲットで撮る（超縦長ページの連続キャプチャで
  new-headless が劣化ハングするのを避けるため）。1 ショットが 30 秒を超えたら `⚠ スキップ` して run は続行する。
- **既知の制約**：（a）一部の特殊なページはデスクトップ幅(1180)でレイアウトが収束せずスキップされることがある
  （`articles-gl-ssc2026.html` 等。モバイル幅は撮れるので**主目的のモバイル検証には影響しない**）。
  （b）`index.html` などフルビューポート構成のページはデスクトップ幅で全高が測れず途中までになることがある。
  モバイル幅(375/768)の撮影は安定しているため、モバイル崩れの確認用途では問題ない。

### abbr-tooltip と相性のあるレイアウト規則
- **`<abbr>` を含む可能性のある親要素には `display: flex` / `display: grid` を使わない。**
  `abbr-tooltip.js` が略語（SCr / AUC / TDM 等）を `<abbr>` で動的にラップするため、
  flex / grid の場合は各 `<abbr>` が個別の flex item / grid cell に押し出されて
  「英語短語が単独行になる」表示崩れが出る。
- ラベル + テキストの行は `display: block` + `<span class="ie-score-pt">` を `inline-block`
  にするシンプルな inline flow が安全（`.ie-score-item` で実装済み）

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

**⚠️ マーカー色は「意味」で選ぶ（統一ルール・必須遵守）。「ただ目立たせたい／カラフルにしたい」で色を選ばない（読者が混乱する）。**

| 色 | 意味 | 使う場面の例 |
|---|---|---|
| `mark-green`（緑） | **推奨・第一選択・良好** | 第一選択薬、有効・優位・改善・治癒、推奨される対応 |
| `mark-red`（赤） | **禁忌・不適・危険・重大警告** | 禁忌、不可逆/致死的/重篤、避ける・中止すべき、重大な落とし穴 |
| `mark-yellow`（黄） | **注意・条件付き** | 慎重投与、モニタリング必要、「〜の場合」、要確認の条件 |
| `mark-orange`（橙） | **補足的な強調** | 上記に当てはまらないが覚えておきたいキーワード・数値 |

- 1ページ内で同じ意味には同じ色を使う。色をローテーションさせて「賑やかし」にしない。
- 迷ったら「この語は推奨か／禁忌・危険か／注意条件か／単なる補足強調か」で判定する。
- アラートボックス（`alert-red`/`alert-yellow`/`alert-green`/`danger`/`keypoint`/`point`）も同じ色意味で揃える。

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

### ナビバー（必須テンプレート・全ページ共通）

**全サブページのナビバーは以下の構造で統一する。`<nav class="site-nav">` や `<ul class="nav-links">` などの旧式マークアップは使用禁止（script.js が反応せず、メニューが表示されない／古いリンク切れナビが出る）。**

```html
<!-- ===== NAVBAR（script.js が menu を差し替える） ===== -->
<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="../index.html" class="nav-logo">
      <img src="../images/logo.png" alt="ST. LUKE'S ICU" class="nav-logo-img">
      <span class="nav-logo-text">聖路加国際病院ICU</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="メニューを開く">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-menu" id="navMenu"></ul>
  </div>
</nav>
```

- `<ul id="navMenu"></ul>` は**空のまま**にする。`script.js` が起動時に統一8項目（当院ICUについて／研修される先生へ／学習コンテンツ／講義動画／論文GL(ICU)／論文GL(外来)／疾患マニュアル／検索）を注入する
- ナビ項目を変えたい時は [`script.js`](script.js) の `navMenu.innerHTML = ...` 1か所だけを編集する
- ハードコード（`<li><a>...</a></li>`）はしない。JS が動かない環境でフォールバックを出すために空の `<ul>` を残す

### ヒーローバナー（必須テンプレート）

**サブページのヒーローは必ず以下の構造を使用する。`subpage-hero-content` や `hero-content` は使用禁止（CSSにmax-widthが異なるため左寄れになる）。**

**`hero-image-bg` は全GLページで必須（`images/free-bg3-desktop.jpg` を背景とする標準ヒーロー）。省略すると青グラデーションになってしまう。**

```html
<div class="subpage-hero hero-image-bg">
  <div class="container">
    <a href="articles-guidelines.html#art-xxx" class="back-link">← 一覧へ戻る</a>
    <h1 class="subpage-title">タイトル</h1>
    <p class="subpage-subtitle">#N SYSTEM NAME</p>
    <div>
      <span class="ie-badge">出典名</span>
      <span class="ie-badge">発行年月</span>
    </div>
  </div>
</div>
```

**禁止：** `<div class="subpage-hero-content">` / `<div class="hero-content">` / `<div class="">` / `<div style="...">` をヒーロー直下に使うこと。必ず `<div class="container">` を使用する。

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

**テーブル視認性ルール（必須）：**
- 疾患名・薬剤名・スコア名・項目ラベルなどの**ラベル列**には `style="white-space:nowrap;"` を付ける（中途半端な折り返しを防止）
- ラベルが長い場合は**略語を主表示、正式名を小さく下に添える**形式にする：
  ```html
  <td style="white-space:nowrap;"><strong>APAP</strong><br><span style="font-size:0.72rem;color:var(--muted);">アセトアミノフェン</span></td>
  ```
- 予後・結果列も同様に、**結論を1語で主表示、詳細を小さく下に添える**：
  ```html
  <td style="white-space:nowrap;">良好<br><span style="font-size:0.72rem;color:var(--muted);">死亡率28%、1/3がLT</span></td>
  ```
- **列幅は中央管理されている：** `script.js` が全コンテンツ表（3列以上）に、各列の中央値文字数から算出した列幅比で `<colgroup>` を読み込み時に自動注入する。**新規表に colgroup は基本不要**（自動でバランス調整される）。自動配分が意図に合わない時だけ手書き `<colgroup>` で上書きする（＝手書きがある表はJSがスキップ＝尊重）。手書きする時は `<col>`数=ヘッダ列数・幅合計100%を守る。比較マトリクスの比較列は同幅。詳細は skill `st-lukes-table-design`、監査は `node scripts/audit-tables.js`。
- 説明列（自由テキスト）にはnowrapを付けない（自然な折り返しを許容）

**モバイル表示ルール（横スクロール優先・鬼の改行禁止）：**
- すべての `<table>` は [`script.js`](script.js) が `.ie-table-scroll`（`overflow-x:auto`）で自動ラップする。**横に長い表はモバイルで横スクロールさせてよい**（無理にスマホ幅へ収めて1〜数文字ずつ折り返す「鬼の改行」を作らない）。
- `script.js` の `applyMinWidth()` が**内容認識型**で `min-width` を自動付与する（実測しないので決定的）：
  - **2列以下**：何もしない（モバイルでも収まる）
  - **5列以上**：常に `min-width`（多列マトリクスは横スクロール）
  - **3〜4列**：colspan でない「実セル」に長文（3列は20字／4列は14字以上）がある時だけ `min-width`（横スクロール）。`colspan` セルは2列ぶん幅があり潰れないので対象外＝そのまま収まる。
- この仕組みにより、**新規表は基本そのままで適切に**（収まる表は収まり、潰れる表は横スクロール）。手動で `min-width` を付ける必要は通常ない。
- **どうしても表形式が苦しい高密度表**（4列以上×各セルが複数行の長いリスト等）は、モバイルで**カード積み重ね**に変換してよい。実装例は [note-cmv.html](pages/id-icu-notes/note-cmv.html) の `.risk-table`（`@media (max-width:767px)` で `display:block` 化し、`nth-child` でリスク区分ラベルを付与）。
  - 注意：`.ie-table-scroll > table { display:table !important }` が効くため、スタック化は `.ie-table-scroll > .yourtable { display:block !important }` のように `>`セレクタ＋`!important` で上書きする。

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

#### スコアカード（採点基準の縦リスト表示）

**ルール：スコア構成項目が3つ以上ある場合、テーブルの1セルにカンマ区切りで詰め込まない。必ず縦リスト形式（ie-score-card）を使う。**

- テーブルの「構成要素」列に複数項目をカンマ区切りで書くのは禁止
- PLASMICスコア・CHA₂DS₂-VAScスコア・qSOFAなど項目数の多いスコアはすべてこの形式を使う

**`.ie-score-*` クラスは [`style-v2.css`](style-v2.css) に既に定義済み。新規ページではページ内 `<style>` で再定義しないこと。**
特に `.ie-score-item` は `display: block` + `inline-block` ラベルのインライン flow になっている
（abbr-tooltip と共存するため）。 flex / grid に変えると略語が単独行になる。

```html
<!-- スコアカードの使い方：ie-score-pt には "+1" や略字を入れる -->
<div class="ie-score-grid">
  <div class="ie-score-card">
    <div class="ie-score-head">PLASMICスコア（7項目・各1点）</div>
    <div class="ie-score-items">
      <div class="ie-score-item"><span class="ie-score-pt">P</span>血小板 &lt;30×10⁹/L</div>
      <div class="ie-score-item"><span class="ie-score-pt">L</span>溶血所見（LDH上昇・ハプトグロビン低下）</div>
      <div class="ie-score-item"><span class="ie-score-pt">A</span>活動性癌なし</div>
      <div class="ie-score-item"><span class="ie-score-pt">S</span>造血幹細胞移植歴なし</div>
      <div class="ie-score-item"><span class="ie-score-pt">M</span>MCV &lt;90 fL</div>
      <div class="ie-score-item"><span class="ie-score-pt">I</span>INR &lt;1.5</div>
      <div class="ie-score-item"><span class="ie-score-pt">C</span>Cr &lt;2 mg/dL</div>
    </div>
    <div class="ie-score-foot">カットオフ ≥5 — 感度 99% / 特異度 57%</div>
  </div>
  <div class="ie-score-card">
    <!-- 2つ目のスコア -->
  </div>
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

### 略語一覧カード（外国語文献ページ必須）

**すべての外国語文献に基づくGLまとめページには、メインコンテンツの先頭（第1章バナーの前）に略語一覧カードを配置する。**

**目的：** 対象読者（初期・後期研修医）にとって、COR/LOE/CDL/VKA等の略語は馴染みがない。利用者フレンドリーなページにするため、ページ内で使用する略語をすべて日本語訳付きで一覧化する。

**テンプレート：**
```html
<div class="card" style="margin-bottom:24px;">
  <div class="card-inner">
    <h3 class="rule-title" style="margin-bottom:10px;">本ページで使用する略語一覧</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.8rem;line-height:1.6;">
      <tbody>
        <tr style="border-bottom:1px solid var(--border);"><td style="padding:4px 8px;font-weight:700;width:120px;color:var(--blue);">略語</td><td style="padding:4px 8px;">正式名称 — 日本語訳</td></tr>
        <!-- 以下、ページ内で使用する略語をすべて列挙 -->
      </tbody>
    </table>
  </div>
</div>
```

**ルール：**
- ページ内で3回以上使用される略語はすべて掲載する
- 医学略語（疾患名・検査名・薬剤分類）と統計略語（COR/LOE/RR/CI/OR/HR/NNT/ITT等）の両方を含める
- 略語は「英語略語 — 日本語訳（補足説明）」の形式
- エビデンスレベル系（COR/LOE/GRADE）は解釈も併記する（例：COR 1=強く推奨）
- 日本語文献のページには不要（読者が理解できる前提）
- 疾患トピックス（dt-*.html）にも同様に略語一覧カードを配置する

### 略語ツールチップ（自動適用）

略語一覧カードがあるページでは、本文中の略語にホバー/タップでツールチップ（正式名称表示）が自動適用される。

**仕組み：**
- 共通CSS: `style-v2.css` に `abbr[data-tip]` と `#abbr-tooltip` のスタイルを定義済み
- 共通JS: `abbr-tooltip.js` が略語一覧テーブルからマッピングを自動構築し、本文中の略語を `<abbr data-tip="正式名">` で自動ラップする
- PC: ホバーでツールチップ表示 / モバイル: タップで2.5秒間表示

**ページへの適用方法：**
略語一覧カードがあるすべてのページで、`script.js` の後に `abbr-tooltip.js` を読み込む：
```html
<!-- pages/ 直下のページ -->
<script src="../script.js"></script>
<script src="../abbr-tooltip.js"></script>

<!-- pages/disease-topics/ 内のページ -->
<script src="../../script.js"></script>
<script src="../../abbr-tooltip.js"></script>
```

**注意：** 略語一覧カードがないページでもJSは自動スキップされるため、全ページに入れて問題ない。

### DOIリンク（記載条件あり）

DOIは以下の場合のみ記載する：
1. **PDF内にDOIが明記されている場合** — そのまま転記する
2. **ユーザーがDOIを提供した場合** — そのまま使う
3. **WebSearchで正確なDOIを確認できた場合** — 確認後に記載する

**AIの記憶からDOIを生成することは禁止。** DOIが確認できない場合はDOI行を省略し、雑誌名・年・巻・ページのみ記載する。

DOIあり：
```html
<p style="font-size:0.72rem;color:#9CA3AF;margin-top:16px;line-height:1.7;">
  出典：正式文献名（発行年月日）<br>
  DOI：<a href="https://doi.org/XXXX" target="_blank" rel="noopener" style="color:#60A5FA;">https://doi.org/XXXX</a><br>
  本資料は教育目的で作成したサマリーです。診断・治療方針の決定には必ず原典ガイドラインを参照してください。
</p>
```

DOIなし（未確認の場合）：
```html
<p style="font-size:0.72rem;color:#9CA3AF;margin-top:16px;line-height:1.7;">
  出典：正式文献名（発行年月日）<br>
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

### カード出典タグ（dt-source）
各カード（テキストボックス）の外側右下に、そのカードの内容がどのGLまとめページに由来するかを小さく明示する。

**CSS（ページ内 `<style>` に定義）：**
```css
.dt-source { text-align:right;margin-top:-10px;margin-bottom:16px;padding-right:4px; }
.dt-source a { font-size:0.68rem;color:#9CA3AF;text-decoration:none;transition:color 0.15s; }
.dt-source a:hover { color:#2D7A4F; }
.dt-source::before { content:"出典：";font-size:0.65rem;color:#BFBFBF; }
```

**使い方：**
```html
<!-- カードの閉じタグの直後に配置。リンク先はGLページの該当セクションのアンカーIDまで指定する -->
</div>
<div class="dt-source"><a href="../articles-gl-xxx.html#section-id">論文名（雑誌 年）▸ セクション名</a></div>

<!-- 複数出典の場合は / 区切り -->
<div class="dt-source"><a href="../articles-gl-aaa.html#sec1">論文A ▸ セクション</a> / <a href="../articles-gl-bbb.html#sec2">論文B ▸ セクション</a></div>
```

**ルール：**
- すべてのコンテンツカードに出典タグを付ける（SUMMARY カードと導入部の総論カードは除く）
- 出典はカード外・右寄せ・小さなグレーテキストで、本文の邪魔にならないデザイン
- リンク先は `pages/articles-gl-*.html` のGLまとめページの**該当セクションのアンカーID**まで指定し、読者がクリックで元のテキストボックスに直接飛べるようにする
- `▸` 区切りで「論文名 ▸ セクション名」の形式とする

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

---

## 完了チェックリスト（GL記事作成時・毎回必須）

GL記事（`articles-gl-*.html`）を作成・更新した後、必ず以下を確認してからコミットする。

### ハルシネーション確認
- [ ] HTMLに書いた数値・統計（N数・CI・p値・%）はすべてPDF原文で確認済み
- [ ] DOIはPDF記載 / ユーザー提供 / PubMed MCP確認済みのもののみ使用（AI記憶から生成していない）
- [ ] PDFに記載のない試験名・論文・ガイドラインを追加していない
- [ ] インライン引用リンク（`[著者 年]`）のDOIも同様に確認済み（未確認ならリンクなし・研究名のみ）

### ファイル更新
- [ ] `pages/articles-gl-{略称}.html` が存在する
- [ ] `pages/articles-guidelines.html` の該当セクション表に行を追加した
- [ ] `search-index.js` にエントリを追加した（章・セクション単位でアンカーリンク付き）
- [ ] `recent-pages.js` は git commit 時に **自動生成**される（pre-commit hook）。カスタムタイトル等は `recent-pages-overrides.json` を編集（下記「新着コンテンツ管理」を参照）

### ページ品質
- [ ] ヒーローバナーに正しいタイトル・年月バッジがある
- [ ] 全章にバナー・セクション・カード・SUMMARYがある（各章5項目）
- [ ] サイドバー目次に全章・全セクションのリンクがある
- [ ] 外国語文献のページに略語一覧カードが配置されている
- [ ] `abbr-tooltip.js` の読み込みが追加されている（略語一覧カードがある場合）
- [ ] 出典注記が末尾にある（DOI未確認の場合はDOI行を省略）
- [ ] カードに `border-left` の太い帯・多色サマリー・バッジ・絵文字を使っていない

---

## 新着コンテンツ管理（`recent-pages.js` 自動生成）

`index.html` の「新着コンテンツ」セクションは、`recent-pages.js` の `RECENT_PAGES` 配列を `date` 降順でソートして上位6件を自動表示する。

**キャッシュバスティングは自動**：`index.html` は `recent-pages.js?v=YYYYMMDDHH` を `document.write` で動的生成し、時間ベースで cache key が毎時変わる。`?v=` を手動で bump する必要はない。

### `recent-pages.js` は手動編集禁止

`recent-pages.js` は [`scripts/sync-recent-pages.js`](scripts/sync-recent-pages.js) によって **ファイルシステム + git 履歴から自動生成** される。手動編集してもコミット時に上書きされる。

過去に「新規ページを作っても新着コンテンツに出ない」バグが何度も発生したため（`46b27ca` / `4e2956d` / `1b7430b` など）、AI/人手による更新依存を排除した。

### 新規ページを追加するときの手順
1. `pages/articles-gl-*.html` 等を作成して `git add` / `git commit` する。
2. **pre-commit hook が自動で `recent-pages.js` を再生成してステージに追加する**。何もしなくてよい。
3. push → GitHub Pages に反映される。

自動推定されるフィールド:
- `date` ← git の初回コミット日（`git log --diff-filter=A --follow`）
- `title` ← `<title>` タグから既知サフィックスを除去
- `tag` ← URL パターン + HTML 内のキーワード（`ガイドライン`/`症例報告`等）
- `thumb` ← URL パターンで振り分け（`yoshida-qa/` → `header吉田先生.png` 等）

### カスタムタイトル・タグ・サムネを設定したい場合

[`recent-pages-overrides.json`](recent-pages-overrides.json) に URL をキーとしてオーバーライドを記述する：

```json
{
  "pages/articles-gl-bccontam2025.html": {
    "title": "動脈ラインからの血液培養は汚染率が末梢穿刺と同等・静脈カテーテルより低い可能性 — SR・メタ解析（CID 2025）",
    "tag": "論文",
    "thumb": "images/IDICUtop.png"
  }
}
```

`scripts/sync-recent-pages.js` は overrides を auto-detection より優先して適用する。

### 手動で再生成したいとき

```bash
node scripts/sync-recent-pages.js          # 再生成
node scripts/sync-recent-pages.js --check  # 差分があれば終了コード 1（CI 用）
```

### pre-commit hook の有効化（リポジトリごとに1回）

```bash
git config core.hooksPath .githooks
```

> **NEW clone した直後は必ずこのコマンドを実行する**。hook が有効になっていないと recent-pages.js が古いまま push される事故が再発する。

### タグの使い分け（auto-detection の判定基準）
- **論文**：`articles-gl-*` のうちガイドライン/症例キーワード非該当
- **ガイドライン**：HTML 内に `ガイドライン` / `consensus` / `recommendation` を検出
- **解説**：`disease-topics/` / `yoshida-qa/` / `id-icu-notes/` / `karte-by-system` / `exam-*`
- **症例**：HTML 内に `症例報告` / `症例集積` / `case report` を検出

### サイト内コンテンツ検索（`pages/recent-all.html`）への自動反映

`recent-all.html` は起動時に **`all-pages.js`（手動登録ページDB）と `recent-pages.js`（新着）を URL ベースで重複排除しながらマージ** する。よって：

- **新規ページを `recent-pages.js` に追加すれば、自動的に検索 DB にも反映される。**`all-pages.js` への二重登録は不要。
- マージ時は URL パターンから genre と system を自動分類する：
  - `pages/id-icu-notes/*` → genre `板書ノート` ／ system `ID×ICU`
  - `pages/disease-topics/*` → genre `疾患マニュアル`
  - `pages/exam-*` → genre `試験ノート`
  - `pages/articles-gl-*` → genre `論文・GL`
  - `pages/{articles-guidelines,disease-topics}.html` → genre `カタログ`
- `tag` → `type` 変換：`ガイドライン`→`ガイドライン`、`症例`→`Case`、`解説`→`Review`、それ以外（`論文`等）→ 空。
- 厳密な system 分類（呼吸器系・循環器系等）が必要な GL ページは、引き続き `all-pages.js` に直接登録するほうが望ましい（重複した場合は `all-pages.js` 側のメタが優先）。

---

## 関連ページ（articles-gl-*.html 末尾の RELATED ブロック）

各 `articles-gl-*.html` の末尾に「関連ページ」セクションを自動挿入する。本文内容の類似度に基づいて全 GL ページから最大10件を抽出する。

### 仕組み

[`scripts/sync-related-articles.js`](scripts/sync-related-articles.js) が以下を実行する：

1. `search-index.js` 内の各ページのエントリ（page-level + chapter-level）から `title` / `desc` / `keywords` を集めて corpus を作成
2. 日本語向け簡易トークナイズ（漢字 2-gram + カタカナ語 + ASCII語）
3. TF-IDF + cosine similarity で全ページ間の類似度を計算
4. 類似度 `MIN_SCORE`（既定 0.08）以上の上位最大10件を選定（弱いマッチがない場合は10件未満でも OK）
5. 本文末尾の `<!-- RELATED:START -->` 〜 `<!-- RELATED:END -->` ブロック（カード形式）と、サイドバー目次の `<!-- RELATED-TOC:START -->` 〜 `<!-- RELATED-TOC:END -->` ブロック（コンパクトなリンクリスト）の両方を HTML に inject

### 手動編集禁止

`<!-- RELATED:START -->` 〜 `<!-- RELATED:END -->` と `<!-- RELATED-TOC:START -->` 〜 `<!-- RELATED-TOC:END -->` の中身は自動生成。手動編集してもコミット時に上書きされる。

### ピン留め・除外（オーバーライド）

特定の関連ページを必ず上位に出す/除外したい場合は、[`related-articles-overrides.json`](related-articles-overrides.json) を編集：

```json
{
  "pages/articles-gl-aha-pe2026.html": {
    "pin": [
      "pages/articles-gl-jcs-vte2025.html",
      "pages/articles-gl-adjust-dvt2026.html"
    ],
    "exclude": [
      "pages/articles-gl-XXX.html"
    ]
  }
}
```

- `pin`: 類似度に関わらず上位に固定（記載順）
- `exclude`: 候補から完全に除外

### 新規ページ追加時の動作

- pre-commit hook が `scripts/sync-related-articles.js` を実行し、すべての GL ページの関連ブロックを再計算してステージに追加する
- 新規ページが既存ページの top-10 を更新する場合があるため、commit に「多くの GL ページ修正」が含まれることがある（これは設計上の正常動作）
- 優先順位を細かく調整したい場合は overrides JSON で個別ピン留め

### 手動で再生成したいとき

```bash
node scripts/sync-related-articles.js                  # 再生成
node scripts/sync-related-articles.js --check          # 差分があれば終了コード 1
node scripts/sync-related-articles.js --verbose        # 各ページの top-N をログ出力
```

---

## ファイル構成マップ（AI 編集者向けクイックリファレンス）

このセクションは **AI が「どこに何があるか」で迷わないため**の地図です。新規ページを作る／既存ページを修正する前に、必ずここを参照してください。

### ルート直下（触ってよいもの）

| ファイル | 役割 | 編集頻度 |
|---|---|---|
| `index.html` | サイトのトップページ | 中（新着・ツール追加時） |
| `style-v2.css` | サイト全体の共通 CSS | 中（共通スタイル追加時） |
| `style-home.css` | トップページ専用の追加 CSS | 低 |
| `script.js` | ナビバー注入・テーブル横スクロール自動ラップ等の共通 JS | 低 |
| `site-config.js` | サイト全体の設定（年・連絡先など） | 極低 |
| `search-index.js` | サイト内検索のインデックス（GL/dt 単位＋章単位） | 高（新規ページ作成時） |
| `all-pages.js` | 検索 DB（`recent-pages.js` と URL マージ） | 低 |
| `recent-pages.js` | **自動生成・手動編集禁止**。pre-commit hook が更新 | — |
| `recent-pages-overrides.json` | recent-pages の title/tag/thumb をカスタム指定 | 低 |
| `related-articles-overrides.json` | 関連ページ自動生成の pin/exclude | 低 |
| `yoshida-qa-data.js` | 吉田先生 Q&A の関連質問・関連ページマッピング | 中（Q&A 追加時） |
| `abbr-tooltip.js` | 略語一覧テーブルから自動ツールチップを生成 | 極低 |
| `mob-toc.js` | モバイル目次のドロワー実装 | 極低 |
| `robots.txt` | 検索エンジン制御 | 極低 |
| `CLAUDE.md` | **この文書**。AI への指示集 | 構造変更時 |

### `pages/` ディレクトリ構造

```
pages/
├── articles-gl-*.html       # 論文・GL まとめ（緑テーマ・197+ ページ）
├── articles-guidelines.html # GL カタログ（#1〜#10 System 分類）
├── articles-outpatient.html # 外来 GL カタログ
├── disease-topics.html      # 疾患マニュアル カタログ
├── disease-topics/
│   └── dt-*.html            # 疾患トピックス総説（オレンジテーマ）
├── id-icu-notes/
│   └── note-*.html          # ID×ICU カンファ板書ノート（紫テーマ）
├── yoshida-qa.html          # 吉田先生 Q&A 一覧
├── yoshida-qa/
│   └── q-*.html             # Q&A 個別ページ（緑テーマ・q-nutrition-02 が完成形リファレンス）
├── bacteria-map.html        # 細菌マップ
├── bacteria/
│   └── *.html               # 細菌個別ページ（70+ 菌種）
├── exam-*.html              # 試験ノート（インディゴテーマ）
├── schedule-*.html          # 週次／勤務スケジュール
├── staff-*.html             # スタッフ紹介
├── icu-*.html               # ICU 情報系（about, policy, team 等）
├── karte-*.html             # カルテ作成ツール／略語対策
└── （ツール各種）            # apache-ii, sofa, rass, cam-icu, rrs-report 等
```

### `scripts/` — 自動化スクリプト

| スクリプト | 役割 | 起動タイミング |
|---|---|---|
| `sync-recent-pages.js` | `recent-pages.js` を git 履歴から自動生成 | pre-commit hook |
| `sync-related-articles.js` | 各 GL ページ末尾の関連ページブロックを TF-IDF で生成 | pre-commit hook |
| `audit-pages.js` | ページ構造の整合性チェック（孤児・abbr-tooltip 等） | pre-commit hook（警告のみ） |
| `sync-check.py` | dt-*.html 間の整合性チェック | 手動 |
| `export-mainpage-slides.js` | スライド書き出し | 手動 |
| `shoot-responsive.js` | 複数幅でフルページ・スクショ撮影（モバイル崩れの事前検出） | 手動 |

### コミット時に自動実行される hook

`git config core.hooksPath .githooks`（clone 直後に 1 回必須）で：
- `recent-pages.js` 再生成 → ステージに追加
- 各 GL ページの関連ページブロック再生成 → 多数ファイルがステージに乗ることあり（正常）
- `audit-pages.js` で警告表示（commit はブロックしない）

### `.gitignore` 対象（commit 禁止）

- `.claude/worktrees/` — Claude Code 自動 worktree（2.6GB 級）
- `.claude/settings.local.json` — Claude Code ローカル設定
- `*.pptx` — プレゼン資料
- `モック集/`, `抗菌薬用量/`, `注目論文ガイドラインのまとめ/` — ローカル個人参照ディレクトリ
- 一般的な OS／エディタ／ログ／キャッシュ

---

## AI 編集時の注意（必読）

### やってよいこと

- 既存 GL ページ／dt ページの本文・図表・SUMMARY 修正
- 新規 GL/dt ページの作成（既存テンプレに従う）
- 検索インデックス・カタログ・関連ページの追加
- CSS の共通スタイル追加（`style-v2.css`）
- ナビバー項目の追加（`script.js` の `navMenu.innerHTML` を編集）

### やってはいけないこと

| 行為 | 理由 |
|---|---|
| `recent-pages.js` の手動編集 | pre-commit hook で上書きされる |
| 各 GL ページ末尾 `<!-- RELATED:START -->`〜`END` の手動編集 | pre-commit hook で上書きされる |
| `<!-- RELATED-TOC:START -->`〜`END` の手動編集 | 同上 |
| `.card-inner` に `overflow-x:auto` を付ける | 過去 3 回繰り返された「テキストボックスごと動く」バグの原因。テーブル横スクロールは [[feedback-table-horizontal-scroll]] 参照 |
| テーブル自身に `display:block` を付ける | セル内 inline-block が境界を超えるなど不安定。代わりに JS が `.ie-table-scroll` ラッパで自動対応 |
| PDF にない情報を補完 | ハルシネーション禁止。CLAUDE.md 冒頭の「ハルシネーション厳禁ルール」参照 |
| DOI を記憶から生成 | 形式は合っていても中身が別論文になる。PDF/ユーザー提供/WebSearch 確認済みのみ |
| 章バナーやセクション見出しに新規スタイル定義 | 既存の緑/オレンジ/紫テーマ規約に従う |
| 吉田先生 Q&A に独自加筆（Pitfall・Pearl 等） | ユーザー原稿以外を勝手に追記しない。事故例あり（2026-05-14） |

### 編集時の参照順

新規／修正前に必ず確認：
1. **CLAUDE.md**（この文書）— サイト全体ルール
2. **対応するメモリファイル** `/Users/sekiyasatoshi/.claude/projects/.../memory/MEMORY.md` — 過去の指摘・教訓
3. **テーマ別の完成形ページ**
   - GL ページ → 任意の最新 articles-gl-*.html を参考に
   - dt ページ → 任意の dt-*.html を参考に
   - 吉田先生 Q&A → **[q-nutrition-02.html](pages/yoshida-qa/q-nutrition-02.html)（完成形リファレンス）**
   - ID×ICU ノート → [note-meningitis.html](pages/id-icu-notes/note-meningitis.html)（最新）

### キャッシュバスター運用

- `style-v2.css?v=YYYYMMDD` / `script.js?v=YYYYMMDD` を全 HTML で使用
- バージョンは「最後に共通ファイルを編集した日付」で全ページ一括統一する
- 個別ページだけ別バージョンにしない（ユーザー側 cache miss の原因）
- 統一手順は [Python ワンライナー（CLAUDE.md 改訂時に追記予定）] か単純な `find + sed`

### 新規 GL/dt ページ作成チェックリスト

- [ ] `articles-gl-{略称}.html` または `disease-topics/dt-{略称}.html` を作成
- [ ] `articles-guidelines.html` または `disease-topics.html` の適切なセクションにリンク追加
- [ ] `search-index.js` にエントリ追加（ページ単位 + 章単位）
- [ ] `<script src="../script.js?v=YYYYMMDD"></script>` を末尾に
- [ ] 略語一覧カードがあるページなら `<script src="../abbr-tooltip.js"></script>` も末尾に（全ページに入れて副作用なし）
- [ ] ヒーローバナーに `<div class="container">`（`subpage-hero-content` 等は禁止）
- [ ] ナビバー `<ul id="navMenu"></ul>` は空のまま（script.js が注入）
- [ ] 出典注記を末尾に
- [ ] commit すれば pre-commit hook が recent-pages / 関連ページを自動更新
