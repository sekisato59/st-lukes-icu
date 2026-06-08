# 細菌道場ページ 品質ガイド（bacteria-page-guide）

`pages/bacteria/*.html`（個別菌ページ）と、その「本サイトの関連事項」を担保するための制作・編集基準。
新規菌ページ作成・既存ページ修正・関連事項の追加/棚卸しの前に必ず読む。

> このガイドは [CLAUDE.md](../../CLAUDE.md) を細菌ページに特化して補完するもの。矛盾時は CLAUDE.md と
> メモリ（`feedback_*`）が優先。特に関連事項の性格は [[feedback_related_data_is_cross_reference]]、
> 主な感染症の簡潔ルールは [[feedback_bacteria_main_infections_brevity]]、
> 臨床安全性は [[feedback_clinical_safety_audit]] を参照。

---

## 1. ページの基本構成

```
body.bp-theme-XXX           ← グラム分類でテーマ色を切替（必須）
  nav.navbar                ← 空の <ul id="navMenu">（script.js が注入）
  section.bp-hero           ← カテゴリタグ・学名・カナ・メタ
  main.bp-page
    ① bp-block            グラム染色像（bp-gram-grid）
    ② bp-block            分類・特徴（bp-feature-grid）
    ③ bp-block            主な感染症 ← 病名のみ。説明厳禁（[[feedback_bacteria_main_infections_brevity]]）
    ④ bp-block bp-memo    ひとことメモ（任意）
    ⑤ bp-block bp-related 本サイトの関連事項 ← related-data.js が自動生成
    ⑦ bp-block            関連リンク（bp-link-list）
    ⑧ bp-block            出典（bp-ref-list、番号付き）
    bp-footer-note
  <script> script.js → abbr-tooltip.js → related-data.js → related-loader.js → bp-toc.js
```

- 共通スタイルは [bp.css](bp.css)（style-v2.css の後に読む）。
- 右サイド目次は [bp-toc.js](bp-toc.js) が `.bp-page` を `.bp-shell` でラップして動的生成（手書き不要）。

## 2. テーマカラー（body クラス）

| クラス | 分類 | 色 |
|---|---|---|
| `bp-theme-gpc` | グラム陽性球菌 | 紫 |
| `bp-theme-gpr` | グラム陽性桿菌 | 紫（濃） |
| `bp-theme-gnr` | グラム陰性桿菌 | 赤 |
| `bp-theme-gnc` | グラム陰性球菌 | ピンク |
| `bp-theme-other` | 嫌気性・抗酸菌 | ストーン |

色は `--bp-primary` / `--bp-primary-light` / `--bp-bg-soft` / `--bp-border-soft` の4変数で切替。
**関連事項・目次・各見出しはこの変数を参照**するので、body クラスを正しく付ければ全体が菌の色で揃う。
新コンポーネントを足すときも色は変数で（青などのハードコード禁止）。

## 3.「本サイトの関連事項」採用基準 ★最重要★

関連事項は **サイト内の他ページから「その菌が主役のテキストボックス」を引いてくる引用集**
（[[feedback_related_data_is_cross_reference]]）。要約を書くのではなく、元ボックスをそのまま見せる。

### 採用する（その菌固有の臨床価値があるもの）
- その菌（または属）の **標的治療・経験的治療・用量** を主題にしたボックス
- その菌の **疫学で主役**（例：肺炎球菌＝成人髄膜炎の53%、GBS＝新生児髄膜炎の58%、腸球菌＝高齢者 IE 最多）
- その菌の **マネジメントの要点**（S. aureus 菌血症のフォロー血培／CRBSI の抜去・TEE・期間 など）
- **その菌固有の分類的主張**（汎用ボックス由来でも、その菌だけの臨床メッセージなら採用）
  - 例：S. lugdunensis＝S. aureus 並みに扱う／S. gallolyticus＝血培陽性で大腸がん検索／
    Corynebacterium＝人工物がある時のみ Duke 典型菌・通常は汚染／Listeria＝50歳以上で ABPC 追加

### 採用しない（汎用ボックスにその菌が一項目として出るだけ）
- **Duke 大基準の典型菌リスト**（S. aureus が載っているだけ＝当然なので不要）
- **GPC マップ／属の一覧図**（その菌が1ノードとして並んでいるだけ）
- **広い鑑別表・経験的治療の汎用カバー一覧**（カバー対象の1つとして名前が出るだけ）
- **章 SUMMARY・チェックリスト**（その菌に固有でない総括）
- **頻度の数字だけ**（「BALANCE で CoNS 4.8%」のような、菌の主役性がない統計の一行）

### 一言テスト
> **「このボックスは、研修医にその菌のことを教えているか？」**
> Yes（その菌の治療・疫学・固有の臨床判断）→ 採用。
> No（リスト/図/基準にたまたま名前があるだけ）→ 不採用。

該当ボックスが1つも無い菌は **エントリを作らない**（loader が関連事項ブロックごと自動で隠す）。
無理にリンクを足さない（[[feedback_related_data_is_cross_reference]]）。

## 4. embed と link の使い分け（技術ルール）

related-data.js は **トピック（疾患）別セクションのグループ形式**で書く：

```js
キー: [
  { section: "感染性心内膜炎（IE）", items: [
    { embed: "../articles-gl-xxx.html#anchor", label: "出典 ▸ 内容" },  // テキストボックスを埋め込み
    { link:  "../id-icu-notes/note-xxx.html#anchor", label: "出典 ▸ 内容" } // リンクのみ
  ] },
]
```

| リンク先 | 使う | 理由 |
|---|---|---|
| `articles-gl-*.html#見出しアンカー` | **embed** | 標準クラス（card / rule-body / ie-table）で組まれ、取得してそのまま正しく描画できる |
| `disease-topics/dt-*.html#見出しアンカー` | **embed** | 同上（標準クラス） |
| `id-icu-notes/note-*.html` の見出しアンカー | **embed**（努力する） | ページ固有クラスは bp.css の `.bp-rel-embed` 配下に**移植済み**（下記）。リンクで済ませず、その菌の話なら必ずテキストボックスで見せる |
| ページ全体がその菌／見出し以外のアンカー | **link** | embed しても断片にならない |
| §3 で「不採用」だが固有主張で残す汎用ボックス（Duke 大基準・GPC 系統分類リスト 等） | **link** | 汎用ボックスは textbox にしない＝ポインタとしてのリンクのみ |

**板書ノートを embed する際の鉄則（[[feedback_related_data_is_cross_reference]] の更新点）：**
リンクのままにせず、**その菌の話を載せているノート節はテキストボックス（embed）で示す努力を怠らない**。
note のページ固有クラスは bp.css `.bp-rel-embed` 配下に移植済み：
`organism-list / note-mini / citation / note-img-wrap / case-box(-title) / labs-* / denova-* /
bundle-* / score-* / anae-cov* / mnemonic-* / tx-* / fn-org-table / drug-block 系`。
- **未移植のクラスを使う節を embed したい時は、まずそのCSSを `.bp-rel-embed` 配下に移植**してから embed に変える（移植前に embed しない＝崩れる）。
- 板書ノートの**章末の最後の節**は次章の `gl-chapter-banner` まで取り込みかける。loader は
  `gl-chapter-banner` で停止するよう対応済み（related-loader.js）。
- embed のアンカーは**節見出し（id 付き h3／h2）**。節内のカードは `<h3 class="rule-title">`（id なし）
  なので loader の兄弟走査では正しく1節分が取れる。

- **embed のアンカーは必ず見出し（h1〜h3）**。loader は「見出し直後〜次の見出しまで」の兄弟要素を複製する。
  見出しでないアンカーは中身を取れず自動でリンクにフォールバックする（＝安全だが要約ボックスは出ない）。
- 別のノート固有クラス（gpc-map-grid / case-box / score 表 等）を embed したい場合は、
  そのCSSを `.bp-rel-embed` 配下に移植してから embed に切り替える。未移植のまま embed しない。
- embed は実行時 fetch。GitHub Pages（同一オリジン）で動作。`file://` ローカルでは CORS で失敗し
  リンクにフォールバックする（本番は問題なし）。

## 5. 右サイド目次（bp-toc.js）

- `.bp-page` 直下の各 `.bp-block`（h2 を持つもの）を項目化し、`.bp-related` 内の
  `.bp-rel-section`（IE / 髄膜炎 等）をサブ項目にネスト。
- 完全自動。HTML を1枚ずつ編集しなくても全菌に効く。`≤980px` では CSS で非表示。
- スクリプトの読込順は **related-loader.js → bp-toc.js**（rel-section が生成済みになるよう後ろ）。

## 6. キャッシュバスター

bp 系4アセットは同一バージョンで揃える：`bp.css` / `related-data.js` / `related-loader.js` / `bp-toc.js`。
共通ファイル（style-v2.css / script.js）はサイト全体で別途統一（CLAUDE.md「キャッシュバスター運用」）。

```bash
# bacteria 4アセットを一括 bump（pages/bacteria で実行）
sed -i '' -E 's/(bp\.css|related-data\.js|related-loader\.js|bp-toc\.js)\?v=[0-9]+/\1?v=NEWVER/g' *.html
```

## 7. ハルシネーション・出典ルール

- 関連事項の中身は **サイト内に実在するボックス**のみ（embed は元ページを参照するので捏造の余地なし）。
  ただし **アンカーと label は実在を確認**する（見出しが存在し、その菌の話であること）。
- 菌ページ本文の数値・感受性・第一選択は **臨床安全性監査**（[[feedback_clinical_safety_audit]]）必須。
  感受性パターンと第一選択の整合・自然耐性・禁忌薬・用量を確認。取り違え事故あり（VSEfm/AMPC）。
- ③主な感染症は **病名のみ**（症状・統計・所見・予後を書かない、[[feedback_bacteria_main_infections_brevity]]）。
- 基礎微生物学（病原因子・ゲノム等）は載せない（[[feedback_no_basic_microbiology]]）。
- `border-left` の色帯禁止・絵文字/バッジ/シャドウ禁止（CLAUDE.md デザインルール）。

## 8. 検証（コミット前）

```bash
# 1) JS 構文
node --check pages/bacteria/related-data.js
node --check pages/bacteria/related-loader.js
node --check pages/bacteria/bp-toc.js

# 2) 関連事項リンクの健全性チェック（壊れアンカー・embed/link 分類の確認）
#    /tmp/analyze-anchors.js 相当：各 link の page 存在・#anchor 存在・見出し種別を検査
node /tmp/analyze-anchors.js   # missing=0 / anchorMissing=0 を確認
```

### コミット前チェックリスト
- [ ] body に正しい `bp-theme-*` が付いている
- [ ] ③主な感染症は病名のみ
- [ ] 関連事項は §3 の採用基準を満たす（汎用ボックスの一項目だけのものを入れていない）
- [ ] embed は GL/dt の見出しアンカー or 移植済み drug-block のみ。note は原則 link
- [ ] アンカー・label が実在し、その菌の話になっている（壊れリンク 0）
- [ ] 該当ボックスが無い菌はエントリを作っていない（空ブロックは loader が隠す）
- [ ] bp 系4アセットのキャッシュバスターを揃えて bump した
- [ ] `<script>` 順：script.js → abbr-tooltip.js → related-data.js → related-loader.js → bp-toc.js
```
