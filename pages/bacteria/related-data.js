/**
 * pages/bacteria/related-data.js
 * ===============================================================
 * 各菌ページの「本サイトの関連事項」データを一元管理するファイル。
 *
 * 全エントリは「トピック（疾患）別セクション」のグループ形式で記述する：
 *   BACTERIA_RELATED[菌キー] = [
 *     { section: "感染性心内膜炎（IE）", items: [
 *         { embed: "url#anchor", label }   // 元ページの該当セクションをそのまま埋め込む
 *         { link:  "url#anchor", label }   // リンクのみ
 *     ] },
 *     ...
 *   ]
 *
 * embed / link の使い分け（重要）：
 *   - articles-gl-*.html / disease-topics/dt-*.html の見出しアンカー
 *       → embed。これらは style-v2.css の標準クラス（card / rule-body / ie-table 等）で
 *         組まれているため、該当セクションを取得してそのまま正しく描画できる。
 *   - id-icu-notes/note-*.html
 *       → link。板書ノートはページ固有クラス（gpc-map-grid / drug-block / case-box 等、
 *         各ページのローカル <style> でのみ定義）で組まれており、埋め込むと無装飾で崩れる。
 *         したがってリンクのみ。
 *   - ページ全体がその菌の内容、見出し以外を指すアンカー
 *       → link。
 *
 * embed は related-loader.js が実行時に元ページを fetch して #anchor 直後の
 * カード群（次の見出しまで）を複製して表示する。取得失敗時は自動でリンクにフォールバック。
 *
 * 菌キーは bacteria/{key}.html のファイル名と一致させる。
 * セクション見出しのバーは菌のテーマカラー（bp.css の --bp-* 変数）で表示される。
 * ===============================================================
 */

window.BACTERIA_RELATED = {

  // ============ Staphylococcus aureus ============
  saureus: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section4", label: "JCS IE 2026 ▸ 標的治療：Staphylococcus（MSSA=セファゾリン／MRSA=VCM・DAP）" },
      { embed: "../articles-gl-ie2026.html#ie-section2", label: "JCS IE 2026 ▸ 疫学（MRSA 増加・急性重症化）" },
      { embed: "../id-icu-notes/note-ie.html#ie-target-mssa", label: "IE 板書ノート ▸ MSSA 標的治療" },
      { embed: "../id-icu-notes/note-ie.html#ie-target-mrsa", label: "IE 板書ノート ▸ MRSA 標的治療" }
    ] },
    { section: "カテーテル関連血流感染（CRBSI）", items: [
      { embed: "../articles-gl-idsa-crbsi2009.html#sau", label: "IDSA CRBSI 2009 ▸ S. aureus はカテーテル抜去・経食道エコー・治療期間" }
    ] },
    { section: "菌血症マネジメント", items: [
      { embed: "../articles-gl-vcm-tdm2020.html#vcm-s4", label: "VCM TDM 2020 ▸ 重症 MRSA は AUC/MIC 400–600 目標" },
      { embed: "../articles-gl-balance-bacteremia2025.html#bal-discussion", label: "BALANCE 2025 ▸ 菌血症の投与期間（S. aureus は短縮対象外）" },
      { embed: "../articles-gl-ssc2026.html#ssc-s2", label: "SSC 2026 ▸ フォロー血培でクリアランス確認" }
    ] },
    { section: "肺炎", items: [
      { embed: "../articles-gl-scap-icm2025.html#scap-common-path", label: "重症市中肺炎 2025 ▸ S. aureus・PVL 産生株（壊死性肺炎）" }
    ] }
  ],

  // ============ Staphylococcus epidermidis ============
  sepi: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section4", label: "JCS IE 2026 ▸ 標的治療：Staphylococcus（早期 PVE は MR-CoNS 主体 → VCM/DAP）" },
      { embed: "../articles-gl-ie2026.html#ie8-section1", label: "JCS IE 2026 ▸ 人工弁 IE（PVE）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例で CoNS は典型菌扱い）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ" }
    ] },
    { section: "院内髄膜炎・脳室炎（HAVM）", items: [
      { embed: "../disease-topics/dt-meningitis.html#mn-route", label: "疾患まとめ ▸ 感染経路（HAVM は CoNS 特に S. epidermidis が主体）" },
      { embed: "../disease-topics/dt-meningitis.html#mn-pathogens", label: "疾患まとめ ▸ 病態別の主要病原菌スペクトラム" }
    ] },
    { section: "VAP（人工呼吸器関連肺炎）", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（S. epidermidis は Cluster 代表種）" }
    ] }
  ],

  // ============ Staphylococcus saprophyticus ============
  ssap: [
    { section: "VAP・尿路感染症", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（CoNS／若年女性の単純性 UTI 主要原因菌）" }
    ] }
  ],

  // ============ Staphylococcus lugdunensis ============
  slug: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 2023（S. lugdunensis は典型菌）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準" },
      { link: "../id-icu-notes/note-ie.html#ie-gpc", label: "IE 板書ノート ▸ GPC 起因菌（CoNS だが S. aureus 様の侵襲性）" }
    ] },
    { section: "菌血症", items: [
      { embed: "../articles-gl-ssc2026.html#ssc-s4", label: "SSC 2026 ▸ 血液培養（クリアランス確認のフォロー血培）" },
      { embed: "../disease-topics/dt-bacteremia-duration.html#bd-balance-design", label: "疾患まとめ ▸ BALANCE 試験デザイン（S. aureus 同等で短縮対象外）" },
      { embed: "../articles-gl-gnbsi-meta2025.html#gnbsi-trials", label: "GNBSI メタ解析 ▸ 包含 RCT（除外基準）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC" }
    ] }
  ],

  // ============ CoNS 全般 ============
  cons: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 基準（人工弁例の判別）" },
      { embed: "../articles-gl-ie2026.html#ie4-section4", label: "JCS IE 2026 ▸ 標的治療②（早期 PVE は MR-CoNS 主体）" },
      { embed: "../articles-gl-ie2026.html#ie8-section1", label: "JCS IE 2026 ▸ 人工弁 IE（PVE）" },
      { embed: "../articles-gl-ie2026.html#ie8-section2", label: "JCS IE 2026 ▸ CDRIE（心臓植込みデバイス関連 IE）" },
      { embed: "../articles-gl-ie2026.html#ie3-section8", label: "JCS IE 2026 ▸ 化膿性脊椎炎" },
      { embed: "../articles-gl-ie2026.html#ie8-section3", label: "JCS IE 2026 ▸ 右心系 IE" },
      { embed: "../articles-gl-ie2026.html#ie8-section6", label: "JCS IE 2026 ▸ 先天性心疾患・小児 IE" }
    ] },
    { section: "院内髄膜炎・脳室炎（HAVM）", items: [
      { embed: "../disease-topics/dt-meningitis.html#mn-route", label: "疾患まとめ ▸ 感染経路（HAVM は CoNS が主体）" },
      { embed: "../disease-topics/dt-meningitis.html#mn-pathogens", label: "疾患まとめ ▸ 病態別の主要病原菌" },
      { embed: "../disease-topics/dt-meningitis.html#mn-targeted", label: "疾患まとめ ▸ 標的治療と推奨用量" },
      { embed: "../disease-topics/dt-meningitis.html#mn-reimplant", label: "疾患まとめ ▸ シャント再挿入タイミング" },
      { link: "../id-icu-notes/note-meningitis.html#ch2-s1", label: "髄膜炎板書ノート ▸ 院内型の経験的治療" }
    ] },
    { section: "脊髄硬膜外膿瘍（SEA）", items: [
      { embed: "../articles-gl-sea-nejm2026.html#sea-s9", label: "SEA 2026 ▸ 主要病原菌（CoNS 5%）" }
    ] },
    { section: "糖尿病性足感染（DFI）", items: [
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-s5", label: "IWGDF 2023 ▸ 培養検体採取（コンタミ菌に注意）" },
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-sum2", label: "IWGDF 2023 ▸ 第2章 SUMMARY" }
    ] },
    { section: "菌血症", items: [
      { embed: "../articles-gl-balance-bacteremia2025.html#bal-demographics", label: "BALANCE 2025 ▸ 起因菌内訳（CoNS 174 例・4.8%）" }
    ] }
  ],

  // ============ Streptococcus pneumoniae ============
  spneu: [
    { section: "細菌性髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（成人最多 53%）" },
      { embed: "../articles-gl-jns-bm2014.html#bm-csf-detail", label: "JNS BM 2014 ▸ 髄液検査の解釈（グラム染色感度 90%）" },
      { embed: "../disease-topics/dt-meningitis.html#mn-route", label: "疾患まとめ ▸ 市中 vs 院内の起因菌スペクトラムの違い" },
      { link: "../id-icu-notes/note-meningitis.html#ch1-s1", label: "髄膜炎板書ノート ▸ 起因菌" },
      { link: "../id-icu-notes/note-meningitis.html#ch1-s6", label: "髄膜炎板書ノート ▸ 治療バンドル（尿中抗原・DEX）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（肺炎球菌 IE は稀・髄膜炎合併注意）" }
    ] },
    { section: "重症市中肺炎（sCAP）", items: [
      { embed: "../articles-gl-scap-icm2025.html#scap-common-path", label: "重症市中肺炎 2025 ▸ ICU での病原体分布（最多 55%）" },
      { embed: "../articles-gl-scap-icm2025.html#scap-micro", label: "重症市中肺炎 2025 ▸ 微生物学的診断（multiplex PCR）" }
    ] },
    { section: "インフルエンザ後肺炎", items: [
      { embed: "../disease-topics/dt-influenza.html#flu-resp-comp", label: "疾患まとめ ▸ インフルエンザ呼吸器合併症（二次性細菌性肺炎）" }
    ] },
    { section: "菌血症", items: [
      { embed: "../articles-gl-balance-bacteremia2025.html#bal-demographics", label: "BALANCE 2025 ▸ 菌血症内訳（164 例・4.5%）" }
    ] }
  ],

  // ============ Streptococcus pyogenes（GAS） ============
  spyo: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 GAS／GM 併用対象外）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（典型菌から除外）" }
    ] },
    { section: "重症市中肺炎（sCAP）", items: [
      { embed: "../articles-gl-scap-icm2025.html#scap-micro", label: "重症市中肺炎 2025 ▸ 微生物学的診断（multiplex PCR 対象）" }
    ] },
    { section: "横紋筋融解症", items: [
      { embed: "../articles-gl-rhabdo-chest2026.html#rhabdo-s4", label: "横紋筋融解 2026 ▸ 原因の分類（感染性原因）" }
    ] },
    { section: "VAP・院内髄膜炎", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（β 溶血 Group A）" },
      { link: "../articles-gl-nosocomial-meningitis2010.html", label: "院内髄膜炎 GL（CSF 漏路経由の起因菌）" }
    ] }
  ],

  // ============ Streptococcus agalactiae（GBS） ============
  saga: [
    { section: "新生児髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（新生児最多 58%）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 → 6 週治療）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ" }
    ] },
    { section: "絨毛膜羊膜炎", items: [
      { embed: "../articles-gl-chorioamnionitis-ajog2024.html#s3", label: "絨毛膜羊膜炎 2024 ▸ 原因微生物（新生児敗血症の重要原因）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（β 溶血 Group B）" }
    ] }
  ],

  // ============ Streptococcus anginosus group ============
  sang: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie7-section3", label: "JCS IE 2026 ▸ 予防的抗菌薬（SAG のアモキシシリン MIC 上昇傾向）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ（SAG の位置づけ）" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { link: "../id-icu-notes/note-iai.html#ch4-s2", label: "IAI 板書ノート ▸ 細菌性肝膿瘍（膿瘍形成しやすい）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（α 溶血の膿瘍形成菌）" }
    ] }
  ],

  // ============ Streptococcus dysgalactiae ============
  sdys: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 IE・急速経過・死亡率 20% 超）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ（SDSE＝Group G）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（β 溶血 Group G）" }
    ] }
  ],

  // ============ Streptococcus mitis group ============
  smitis: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie7-section3", label: "JCS IE 2026 ▸ 予防的抗菌薬（mitis group のアモキシシリン MIC 上昇）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpc", label: "IE 板書ノート ▸ GPC 起因菌（VGS 代表種）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpcmap", label: "IE 板書ノート ▸ GPC マップ" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（α 溶血）" }
    ] }
  ],

  // ============ Viridans group streptococci（VGS） ============
  vgs: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（最も治療しやすい原因菌）" },
      { link: "../id-icu-notes/note-ie.html#ie-target-vgs", label: "IE 板書ノート ▸ 標的治療（VGS）" },
      { link: "../id-icu-notes/note-ie.html#ie-sgall", label: "IE 板書ノート ▸ S. gallolyticus／VGS と大腸腫瘍" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { link: "../id-icu-notes/note-iai.html#ch4-s2", label: "IAI 板書ノート ▸ 細菌性肝膿瘍（門脈経由）" }
    ] },
    { section: "脳膿瘍", items: [
      { link: "../id-icu-notes/note-meningitis.html#ch3-s1", label: "髄膜炎板書ノート ▸ 脳膿瘍（血行性経路の主要起因菌）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（α 溶血の代表）" }
    ] }
  ],

  // ============ Enterococcus faecalis ============
  efaecalis: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section5", label: "JCS IE 2026 ▸ 標的治療③：Enterococcus（DAA＝ABPC＋CTRX）" },
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 基準（典型 IE 病原体）" },
      { embed: "../articles-gl-ie2026.html#ie2-section3", label: "JCS IE 2026 ▸ 血液培養（TEE 適応）" },
      { embed: "../articles-gl-ie2026.html#ie4-section8", label: "JCS IE 2026 ▸ 第4章まとめ：抗菌薬治療の5大原則" },
      { link: "../id-icu-notes/note-ie.html#ie-target-entero", label: "IE 板書ノート ▸ 標的治療（Enterococcus）" },
      { link: "../id-icu-notes/note-ie.html#ie-denova-score", label: "IE 板書ノート ▸ DENOVA スコア（菌血症で TEE は必要か）" },
      { link: "../id-icu-notes/note-ie.html#ie-empiric-choice", label: "IE 板書ノート ▸ 経験的治療（腸球菌カバー必須）" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { link: "../id-icu-notes/note-iai.html#ch3-s1", label: "IAI 板書ノート ▸ 腸管穿孔（下部消化管）" },
      { link: "../id-icu-notes/note-iai.html#ch3-summary", label: "IAI 板書ノート ▸ 第3章 SUMMARY" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（γ 溶血／1st: ABPC）" }
    ] }
  ],

  // ============ Enterococcus faecium ============
  efaecium: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section5", label: "JCS IE 2026 ▸ 標的治療③：Enterococcus（DAA 無効・VRE は LZD/DAP）" },
      { embed: "../articles-gl-ie2026.html#ie3-section2", label: "JCS IE 2026 ▸ 治療抵抗性感染症（VRE はデバイス関連 IE で増加）" },
      { link: "../id-icu-notes/note-ie.html#ie-gpc", label: "IE 板書ノート ▸ GPC マップ（γ 溶血）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（γ 溶血／1st: VCM）" }
    ] }
  ],

  // ============ Streptococcus bovis / gallolyticus ============
  sbov: [
    { section: "感染性心内膜炎（IE）・大腸腫瘍", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（VGS と並ぶ最も治療しやすい菌）" },
      { embed: "../articles-gl-ie2026.html#ie8-section5", label: "JCS IE 2026 ▸ 高齢者 IE（S. gallolyticus 検出率が高い）" },
      { embed: "../articles-gl-ie2026.html#ie8-section8", label: "JCS IE 2026 ▸ 第8章まとめ：特殊病態チェックリスト" },
      { link: "../id-icu-notes/note-ie.html#ie-sgall", label: "IE 板書ノート ▸ S. gallolyticus 専用解説（大腸内視鏡必須）" },
      { link: "../id-icu-notes/note-ie.html#ie-target-vgs", label: "IE 板書ノート ▸ 標的治療（VGS）" },
      { link: "../id-icu-notes/note-ie.html#ie-case2-hx", label: "IE 板書ノート ▸ 症例2（GPC chain からの S. gallolyticus IE）" },
      { link: "../id-icu-notes/note-ie.html#ie-empiric-choice", label: "IE 板書ノート ▸ 経験的治療カバー菌" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（S. gallolyticus）" },
      { link: "../id-icu-notes/note-vap.html#ch2-summary", label: "VAP 板書ノート ▸ 第2章 SUMMARY" }
    ] }
  ],

  // ============ 嫌気性 GPC ============
  anaerogpc: [
    { section: "腹腔内感染症（IAI）", items: [
      { link: "../id-icu-notes/note-iai.html#ch5-s1", label: "IAI 板書ノート ▸ 嫌気性菌カバー早見表（横隔膜上：Peptostreptococcus）" }
    ] },
    { section: "VAP", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s4", label: "VAP 板書ノート ▸ 嫌気性菌（口腔由来）" }
    ] }
  ],

  // ============ Bacillus cereus ============
  // bacillus: サイト内に実質的な記載なし

  // ============ Abiotrophia / Granulicatella ============
  abio: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①（旧 NVS ＋αカード・手術を要する症例が多い）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（自然弁 IE の典型菌）" }
    ] }
  ],

  // ============ Aerococcus ============
  // aerococcus: サイト内に実質的な記載なし

  // ============ Listeria monocytogenes ============
  listeria: [
    { section: "細菌性髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（高齢者・免疫不全で重要）" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s2", label: "ESCMID 2016 ▸ 菌種・感受性同定後の治療" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s3", label: "ESCMID 2016 ▸ Listeria 髄膜炎治療の臨床ポイント" },
      { embed: "../articles-gl-jns-bm2014.html#bm-csf-detail", label: "JNS BM 2014 ▸ 髄液所見（グラム染色感度 <50%）" },
      { embed: "../articles-gl-jns-bm2014.html#bm-sum42", label: "JNS BM 2014 ▸ CQ 4-2 SUMMARY" },
      { link: "../id-icu-notes/note-meningitis.html#ch1-s1", label: "髄膜炎板書ノート ▸ 起因菌" },
      { link: "../id-icu-notes/note-meningitis.html#ch1-s6", label: "髄膜炎板書ノート ▸ 経験的治療（妊婦含む・ABPC 追加）" },
      { link: "../id-icu-notes/note-meningitis.html#ch2-summary", label: "髄膜炎板書ノート ▸ 第2章 SUMMARY" }
    ] },
    { section: "絨毛膜羊膜炎", items: [
      { embed: "../articles-gl-chorioamnionitis-ajog2024.html#s2", label: "絨毛膜羊膜炎 2024 ▸ 感染経路（血行性・経胎盤感染の代表）" }
    ] },
    { section: "TMP/SMX（ST 合剤）の適応菌", items: [
      { embed: "../articles-gl-pcp-nccn2026.html#nccn-pjp-s4", label: "NCCN PCP 2026 ▸ TMP/SMX の投与量・注意（Listeria にも活性）" }
    ] },
    { section: "非定型肺炎・その他", items: [
      { link: "../id-icu-notes/note-atypical-pneumonia.html#ch3-s4", label: "非定型肺炎ノート ▸ 細胞内寄生菌の鑑別" },
      { embed: "../articles-gl-dizziness2023.html#s2-ddx", label: "めまい 2023 ▸ 鑑別診断（リステリア脳炎）" }
    ] }
  ],

  // ============ Corynebacterium diphtheriae ============
  // cdiph: サイト内には C. ulcerans が「ジフテリア様病態」として鑑別文脈で言及されているのみ

  // ============ Corynebacterium jeikeium ============
  cjeikeium: [
    { section: "感染性心内膜炎（IE）", items: [
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例で典型菌扱い）" }
    ] },
    { section: "VAP・カテーテル関連感染", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s3", label: "VAP 板書ノート ▸ Corynebacterium 検出時の対応（免疫不全で VCM 検討）" }
    ] }
  ],

  // ============ Corynebacterium striatum ============
  cstri: [
    { section: "VAP・院内感染", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s3", label: "VAP 板書ノート ▸ Corynebacterium 検出時の対応（免疫不全で VCM 検討）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section3", label: "JCS IE 2026 ▸ 血液培養（Corynebacterium spp. は汚染率 88–94%）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例で典型菌）" }
    ] },
    { section: "糖尿病性足感染（DFI）", items: [
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-s1", label: "IWGDF 2023 ▸ 感染分類システム（コンタミ菌に注意）" },
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-sum2", label: "IWGDF 2023 ▸ 第2章 SUMMARY" }
    ] }
  ],

  // ============ Stenotrophomonas maltophilia ============
  steno: [
    { section: "特徴・耐性機序", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-overview", label: "IDSA AMR-GNR 2024 ▸ S. maltophilia の特徴と治療の難しさ" }
    ] },
    { section: "治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-approach", label: "IDSA AMR-GNR 2024 ▸ 治療の全体アプローチ（2剤併用）" },
      { link: "../id-icu-notes/note-resistant-gnr.html#ch3-s1", label: "耐性GNR 板書ノート ▸ S. maltophilia（当院での使用例）" }
    ] },
    { section: "発熱性好中球減少症（FN）", items: [
      { link: "../id-icu-notes/note-fn.html#ch5-s2", label: "FN 板書ノート ▸ 起因菌の内訳（FN での頻度）" }
    ] }
  ]

};
