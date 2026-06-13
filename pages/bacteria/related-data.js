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
 * ★採用基準（最重要）★ —— 詳細は bacteria-page-guide.md を参照
 *   採用する  = そのボックスが「その菌の臨床（治療・疫学・マネジメント）」を主題にしている、
 *              または「その菌固有の分類的主張」（例：S. lugdunensis＝S. aureus 並みに扱う／
 *              S. gallolyticus＝血培陽性で大腸がん検索／Corynebacterium＝人工物時のみ典型菌）。
 *   採用しない = その菌が汎用ボックスの一項目として名前が挙がっているだけのもの
 *              （Duke 大基準の典型菌リスト・GPC マップ・広い鑑別表・章 SUMMARY・
 *                頻度の数字だけ・経験的治療の汎用カバー一覧 など）。
 *
 * embed / link の使い分け：
 *   - articles-gl-*.html / disease-topics/dt-*.html の見出しアンカー → embed
 *     （標準クラス card / rule-body / ie-table で組まれており正しく描画できる）
 *   - id-icu-notes/note-*.html → 原則 link
 *     （ページ固有クラスで組まれ埋め込むと崩れるため。例外：drug-block 系は
 *      bp.css に移植済みのため embed 可。MSSA/MRSA 標的治療がこれにあたる）
 *   - ページ全体がその菌の内容／見出し以外を指すアンカー → link
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
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例で CoNS は典型菌扱い）" }
    ] },
    { section: "院内髄膜炎・脳室炎（HAVM）", items: [
      { embed: "../disease-topics/dt-meningitis.html#mn-route", label: "疾患まとめ ▸ 感染経路（HAVM は CoNS 特に S. epidermidis が主体）" },
      { embed: "../disease-topics/dt-meningitis.html#mn-pathogens", label: "疾患まとめ ▸ 病態別の主要病原菌スペクトラム" }
    ] }
  ],

  // ============ Staphylococcus saprophyticus ============
  ssap: [
    { section: "尿路感染症", items: [
      { link: "../id-icu-notes/note-vap.html#ch2-s2", label: "VAP 板書ノート ▸ GPC（CoNS／若年女性の単純性 UTI 主要原因菌）" }
    ] }
  ],

  // ============ Staphylococcus lugdunensis ============
  slug: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 2023（S. lugdunensis は S. aureus 並みの典型菌）" }
    ] },
    { section: "菌血症", items: [
      { embed: "../articles-gl-ssc2026.html#ssc-s4", label: "SSC 2026 ▸ 血液培養（S. aureus・lugdunensis はフォロー血培）" },
      { embed: "../disease-topics/dt-bacteremia-duration.html#bd-balance-design", label: "疾患まとめ ▸ BALANCE 試験デザイン（S. aureus 同等で短縮対象外）" },
      { embed: "../articles-gl-gnbsi-meta2025.html#gnbsi-trials", label: "GNBSI メタ解析 ▸ 包含 RCT（除外基準）" }
    ] }
  ],

  // ============ CoNS 全般 ============
  cons: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 基準（人工弁例の汚染と感染の判別）" },
      { embed: "../articles-gl-ie2026.html#ie4-section4", label: "JCS IE 2026 ▸ 標的治療②（早期 PVE は MR-CoNS 主体）" },
      { embed: "../articles-gl-ie2026.html#ie8-section1", label: "JCS IE 2026 ▸ 人工弁 IE（PVE）" },
      { embed: "../articles-gl-ie2026.html#ie8-section2", label: "JCS IE 2026 ▸ CDRIE（心臓植込みデバイス関連 IE）" }
    ] },
    { section: "院内髄膜炎・脳室炎（HAVM）", items: [
      { embed: "../disease-topics/dt-meningitis.html#mn-route", label: "疾患まとめ ▸ 感染経路（HAVM は CoNS が主体）" },
      { embed: "../disease-topics/dt-meningitis.html#mn-pathogens", label: "疾患まとめ ▸ 病態別の主要病原菌" },
      { embed: "../disease-topics/dt-meningitis.html#mn-targeted", label: "疾患まとめ ▸ 標的治療と推奨用量" },
      { embed: "../disease-topics/dt-meningitis.html#mn-reimplant", label: "疾患まとめ ▸ シャント再挿入タイミング" }
    ] },
    { section: "糖尿病性足感染（DFI）", items: [
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-s5", label: "IWGDF 2023 ▸ 培養検体採取（CoNS はコンタミ菌として要注意）" }
    ] }
  ],

  // ============ Streptococcus pneumoniae ============
  spneu: [
    { section: "細菌性髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（成人最多 53%）" },
      { embed: "../articles-gl-jns-bm2014.html#bm-csf-detail", label: "JNS BM 2014 ▸ 髄液検査の解釈（グラム染色感度は菌種別最高 90%）" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s1", label: "髄膜炎板書ノート ▸ 起因菌" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s6", label: "髄膜炎板書ノート ▸ 治療バンドル（尿中抗原・DEX 併用）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（肺炎球菌 IE は稀・髄膜炎合併注意）" }
    ] },
    { section: "重症市中肺炎（sCAP）", items: [
      { embed: "../articles-gl-scap-icm2025.html#scap-common-path", label: "重症市中肺炎 2025 ▸ ICU での病原体分布（最多 55%）" }
    ] },
    { section: "インフルエンザ後肺炎", items: [
      { embed: "../disease-topics/dt-influenza.html#flu-resp-comp", label: "疾患まとめ ▸ インフルエンザ呼吸器合併症（二次性細菌性肺炎）" }
    ] }
  ],

  // ============ Streptococcus pyogenes（GAS） ============
  spyo: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 GAS／GM 併用対象外）" }
    ] },
    { section: "横紋筋融解症", items: [
      { embed: "../articles-gl-rhabdo-chest2026.html#rhabdo-s4", label: "横紋筋融解 2026 ▸ 原因の分類（感染性原因に S. pyogenes）" }
    ] }
  ],

  // ============ Streptococcus agalactiae（GBS） ============
  saga: [
    { section: "新生児髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（新生児最多 58%）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 → 6 週治療）" }
    ] },
    { section: "絨毛膜羊膜炎", items: [
      { embed: "../articles-gl-chorioamnionitis-ajog2024.html#s3", label: "絨毛膜羊膜炎 2024 ▸ 原因微生物（新生児敗血症の重要原因）" }
    ] }
  ],

  // ============ Streptococcus anginosus group ============
  sang: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie7-section3", label: "JCS IE 2026 ▸ 予防的抗菌薬（SAG のアモキシシリン MIC 上昇傾向）" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { embed: "../id-icu-notes/note-iai.html#ch4-s2", label: "IAI 板書ノート ▸ 細菌性肝膿瘍（SAG は膿瘍を形成しやすい）" }
    ] }
  ],

  // ============ Streptococcus dysgalactiae ============
  sdys: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（β 溶血 IE・急速経過・死亡率 20% 超）" }
    ] }
  ],

  // ============ Streptococcus mitis group ============
  smitis: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie7-section3", label: "JCS IE 2026 ▸ 予防的抗菌薬（mitis group のアモキシシリン MIC 上昇）" }
    ] }
  ],

  // ============ Viridans group streptococci（VGS） ============
  vgs: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（最も治療しやすい原因菌）" },
      { embed: "../id-icu-notes/note-ie.html#ie-target-vgs", label: "IE 板書ノート ▸ 標的治療（VGS）" },
      { embed: "../id-icu-notes/note-ie.html#ie-sgall", label: "IE 板書ノート ▸ S. gallolyticus／VGS と大腸腫瘍" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { embed: "../id-icu-notes/note-iai.html#ch4-s2", label: "IAI 板書ノート ▸ 細菌性肝膿瘍（門脈経由の主要起因菌）" }
    ] },
    { section: "脳膿瘍", items: [
      { embed: "../id-icu-notes/note-meningitis.html#ch3-s1", label: "髄膜炎板書ノート ▸ 脳膿瘍（血行性経路の主要起因菌）" }
    ] }
  ],

  // ============ Enterococcus faecalis ============
  efaecalis: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section5", label: "JCS IE 2026 ▸ 標的治療③：Enterococcus（DAA＝ABPC＋CTRX）" },
      { embed: "../articles-gl-ie2026.html#ie2-section1", label: "JCS IE 2026 ▸ Duke-ISCVID 基準（E. faecalis は典型 IE 病原体）" },
      { embed: "../id-icu-notes/note-ie.html#ie-target-entero", label: "IE 板書ノート ▸ 標的治療（Enterococcus）" },
      { embed: "../id-icu-notes/note-ie.html#ie-denova-score", label: "IE 板書ノート ▸ DENOVA スコア（E. faecalis 菌血症で TEE は必要か）" }
    ] },
    { section: "腹腔内感染症（IAI）", items: [
      { embed: "../id-icu-notes/note-iai.html#ch3-s1", label: "IAI 板書ノート ▸ 腸管穿孔（弱毒のため培養陽性後にカバー追加でよい）" }
    ] }
  ],

  // ============ Enterococcus faecium ============
  efaecium: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section5", label: "JCS IE 2026 ▸ 標的治療③：Enterococcus（DAA 無効・VRE は LZD/DAP）" },
      { embed: "../articles-gl-ie2026.html#ie3-section2", label: "JCS IE 2026 ▸ 治療抵抗性感染症（VRE はデバイス関連 IE で増加）" }
    ] }
  ],

  // ============ Streptococcus bovis / gallolyticus ============
  sbov: [
    { section: "感染性心内膜炎（IE）・大腸腫瘍", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①：Streptococcus（VGS と並ぶ最も治療しやすい菌）" },
      { embed: "../articles-gl-ie2026.html#ie8-section5", label: "JCS IE 2026 ▸ 高齢者 IE（S. gallolyticus 検出率が高い）" },
      { embed: "../id-icu-notes/note-ie.html#ie-sgall", label: "IE 板書ノート ▸ S. gallolyticus 専用解説（血培陽性で大腸内視鏡必須）" },
      { embed: "../id-icu-notes/note-ie.html#ie-target-vgs", label: "IE 板書ノート ▸ 標的治療（VGS）" },
      { embed: "../id-icu-notes/note-ie.html#ie-case2-hx", label: "IE 板書ノート ▸ 症例2（GPC chain からの S. gallolyticus IE）" }
    ] }
  ],

  // ============ 嫌気性 GPC ============
  anaerogpc: [
    { section: "腹腔内感染症（IAI）", items: [
      { embed: "../id-icu-notes/note-iai.html#ch5-s1", label: "IAI 板書ノート ▸ 嫌気性菌カバー早見表（横隔膜上：Peptostreptococcus・ABPC/SBT 第一選択）" }
    ] },
    { section: "VAP（人工呼吸器関連肺炎）", items: [
      { embed: "../id-icu-notes/note-vap.html#ch2-s4", label: "VAP 板書ノート ▸ 嫌気性菌（口腔由来の代表）" }
    ] }
  ],

  // ============ Bacillus cereus ============
  // bacillus: サイト内に実質的な記載なし

  // ============ Abiotrophia / Granulicatella ============
  abio: [
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section3", label: "JCS IE 2026 ▸ 標的治療①（旧 NVS ＋αカード・手術を要する症例が多い）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（NVS は自然弁 IE の典型菌）" }
    ] }
  ],

  // ============ Aerococcus ============
  // aerococcus: サイト内に実質的な記載なし

  // ============ Listeria monocytogenes ============
  listeria: [
    { section: "細菌性髄膜炎", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch1-s1", label: "ESCMID 2016 ▸ 年齢別起炎菌（高齢者・免疫不全で重要）" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s2", label: "ESCMID 2016 ▸ 菌種・感受性同定後の治療" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s3", label: "ESCMID 2016 ▸ Listeria 髄膜炎治療の臨床的ポイント" },
      { embed: "../articles-gl-jns-bm2014.html#bm-csf-detail", label: "JNS BM 2014 ▸ 髄液所見（Listeria はグラム染色感度 <50%）" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s1", label: "髄膜炎板書ノート ▸ 起因菌" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s6", label: "髄膜炎板書ノート ▸ 経験的治療（妊婦含む・ABPC 追加）" }
    ] },
    { section: "絨毛膜羊膜炎", items: [
      { embed: "../articles-gl-chorioamnionitis-ajog2024.html#s2", label: "絨毛膜羊膜炎 2024 ▸ 感染経路（血行性・経胎盤感染の代表）" }
    ] },
    { section: "TMP/SMX（ST 合剤）の適応菌", items: [
      { embed: "../articles-gl-pcp-nccn2026.html#nccn-pjp-s4", label: "NCCN PCP 2026 ▸ TMP/SMX の投与量・注意（Listeria にも活性）" }
    ] },
    { section: "非定型肺炎", items: [
      { embed: "../id-icu-notes/note-atypical-pneumonia.html#ch3-s4", label: "非定型肺炎ノート ▸ 細胞内寄生菌（妊婦・移植後で Listeria を鑑別）" }
    ] }
  ],

  // ============ Corynebacterium diphtheriae ============
  // cdiph: サイト内には C. ulcerans が「ジフテリア様病態」として鑑別文脈で言及されているのみ

  // ============ Corynebacterium jeikeium ============
  cjeikeium: [
    { section: "感染性心内膜炎（IE）", items: [
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例でのみ典型菌扱い）" }
    ] },
    { section: "VAP・カテーテル関連感染", items: [
      { embed: "../id-icu-notes/note-vap.html#ch2-s3", label: "VAP 板書ノート ▸ Corynebacterium 検出時の対応（免疫不全で VCM 検討）" }
    ] }
  ],

  // ============ Corynebacterium striatum ============
  cstri: [
    { section: "VAP・院内感染", items: [
      { embed: "../id-icu-notes/note-vap.html#ch2-s3", label: "VAP 板書ノート ▸ Corynebacterium 検出時の対応（免疫不全で VCM 検討）" }
    ] },
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section3", label: "JCS IE 2026 ▸ 血液培養（Corynebacterium spp. は汚染率 88–94%）" },
      { link: "../id-icu-notes/note-ie.html#ie-duke-major", label: "IE 板書ノート ▸ Duke 大基準（人工物例でのみ典型菌扱い）" }
    ] },
    { section: "糖尿病性足感染（DFI）", items: [
      { embed: "../articles-gl-iwgdf-dfi2023.html#dfi-s1", label: "IWGDF 2023 ▸ 感染分類システム（Corynebacterium はコンタミ菌に注意）" }
    ] }
  ],

  // ============ Stenotrophomonas maltophilia ============
  steno: [
    { section: "特徴・耐性機序", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-overview", label: "IDSA AMR-GNR 2024 ▸ S. maltophilia の特徴と治療の難しさ" }
    ] },
    { section: "治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-approach", label: "IDSA AMR-GNR 2024 ▸ 治療の全体アプローチ（2剤併用）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch3-s1", label: "耐性GNR 板書ノート ▸ S. maltophilia（当院での使用例）" }
    ] },
    { section: "発熱性好中球減少症（FN）", items: [
      { embed: "../id-icu-notes/note-fn.html#ch5-s2", label: "FN 板書ノート ▸ 起因菌の内訳（FN での頻度）" }
    ] }
  ],

  // ============ Escherichia coli ============
  ecoli: [
    { section: "ESBL 産生菌の治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-overview", label: "IDSA AMR-GNR 2024 ▸ 最頻 ESBL 産生菌は大腸菌（CTX-M-15）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-cystitis", label: "IDSA AMR-GNR 2024 ▸ ESBL-E 単純性膀胱炎は NFT/ST 第一選択（経口 FOM は大腸菌のみ）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-nonuti", label: "IDSA AMR-GNR 2024 ▸ ESBL-E 菌血症はカルバペネム第一選択（MERINO）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s3", label: "耐性GNR 板書ノート ▸ ESBL 産生菌（代表は大腸菌・クレブシエラ）" }
    ] },
    { section: "カルバペネム耐性腸内細菌目（CRE）", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec3-mbl", label: "IDSA AMR-GNR 2024 ▸ NDM/MBL 産生 CRE は CAZ-AVI＋ATM またはセフィデロコル" }
    ] },
    { section: "菌血症の投与期間", items: [
      { embed: "../disease-topics/dt-bacteremia-duration.html#bd-decision", label: "菌血症投与期間 ▸ Enterobacterales（大腸菌等）はソースコントロール下で 7 日間（HIGH）" }
    ] }
  ],

  // ============ Klebsiella pneumoniae ============
  kpneu: [
    { section: "ESBL 産生菌の治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-overview", label: "IDSA AMR-GNR 2024 ▸ 肺炎桿菌は代表的 ESBL 産生菌（経口 FOM は fosA で無効）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-cystitis", label: "IDSA AMR-GNR 2024 ▸ ESBL-E 単純性膀胱炎は NFT/ST 第一選択" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec1-nonuti", label: "IDSA AMR-GNR 2024 ▸ ESBL-E 菌血症はカルバペネム第一選択（MERINO）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s3", label: "耐性GNR 板書ノート ▸ ESBL 産生菌（代表は大腸菌・クレブシエラ）" }
    ] },
    { section: "菌血症の投与期間", items: [
      { embed: "../disease-topics/dt-bacteremia-duration.html#bd-decision", label: "菌血症投与期間 ▸ Enterobacterales（Klebsiella 等）はソースコントロール下で 7 日間（HIGH）" }
    ] }
  ],

  // ============ Enterobacter cloacae complex ============
  enterobacter: [
    { section: "AmpC 産生菌としての治療戦略", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ AmpC の特徴とリスク層別（E. cloacae は高リスク・約20%が誘導耐性化）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s2", label: "耐性GNR 板書ノート ▸ AmpC 産生菌（高リスク3菌の筆頭 Enterobacter cloacae）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "FN 板書ノート ▸ AmpC 産生菌（AMPC-HESK の E＝Enterobacter cloacae）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s2", label: "FN 板書ノート ▸ CFPM vs PIPC/TAZ（Enterobacter 疑いでは CFPM/MEPM を選択）" }
    ] }
  ],

  // ============ Citrobacter freundii ============
  citrobacter: [
    { section: "AmpC 産生菌としての治療戦略", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ AmpC の特徴とリスク層別（C. freundii は高リスク・約20%が誘導耐性化）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s2", label: "耐性GNR 板書ノート ▸ AmpC 産生菌（高リスク3菌に Citrobacter freundii）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "FN 板書ノート ▸ AmpC 産生菌（AMPC-HESK の C＝Citrobacter freundii）" }
    ] }
  ],

  // ============ Citrobacter koseri ============
  ckoseri: [
    { section: "AmpC をめぐる分類上の注意", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ C. koseri は AmpC 染色体遺伝子を持たず高リスク菌に含めない" }
    ] }
  ],

  // ============ Serratia marcescens ============
  serratia: [
    { section: "AmpC 産生菌としての位置づけ", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ AmpC の特徴とリスク層別（S. marcescens は低リスク・耐性出現<5%）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s2", label: "耐性GNR 板書ノート ▸ AmpC 産生菌（旧 AMPCHES の S＝Serratia）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "FN 板書ノート ▸ AmpC 産生菌（AMPC-HESK の S＝Serratia marcescens）" }
    ] },
    { section: "脊髄硬膜外膿瘍での疫学", items: [
      { embed: "../articles-gl-sea-nejm2026.html#sea-s9", label: "脊髄硬膜外膿瘍 NEJM 2026 ▸ IDU 関連 SEA・椎間板炎で S. marcescens が高頻度に分離" }
    ] }
  ],

  // ============ Morganella morganii ============
  morgan: [
    { section: "AmpC 産生菌としての位置づけ", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ AmpC の特徴とリスク層別（M. morganii は低リスク・耐性出現<5%）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s2", label: "耐性GNR 板書ノート ▸ AmpC 産生菌（旧 AMPCHES の M＝Morganella）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "FN 板書ノート ▸ AmpC 産生菌（AMPC-HESK の M＝Morganella morganii）" }
    ] }
  ],

  // ============ Klebsiella aerogenes ============
  kaero: [
    { section: "AmpC 産生菌としての治療戦略", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ AmpC の特徴とリスク層別（K. aerogenes は高リスク・約20%が誘導耐性化）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-cefepime", label: "IDSA AMR-GNR 2024 ▸ AmpC-E の第一選択はセフェピム（E. cloacae・K. aerogenes・C. freundii）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-ceftriazone", label: "IDSA AMR-GNR 2024 ▸ 侵襲性感染症ではセフトリアキソン回避（K. aerogenes 等）" },
      { embed: "../id-icu-notes/note-resistant-gnr.html#ch2-s2", label: "耐性GNR 板書ノート ▸ AmpC 産生菌（高リスク3菌に Klebsiella aerogenes）" },
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "FN 板書ノート ▸ AmpC 産生菌（AMPC-HESK の K＝Klebsiella aerogenes）" }
    ] }
  ],

  // ============ Proteus vulgaris ============
  pvulg: [
    { section: "AmpC をめぐる分類上の注意", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec2-overview", label: "IDSA AMR-GNR 2024 ▸ 旧「indole positive Proteus」＝P. vulgaris（AmpC 遺伝子なし）の混同に注意" }
    ] }
  ],

  // ============ Pseudomonas aeruginosa ============
  paerug: [
    { section: "緑膿菌菌血症の治療期間（BALANCE post-hoc）", items: [
      { embed: "../articles-gl-pa-bacteremia2026.html#pa-background", label: "PA 菌血症 投与期間（CID 2026）▸ 緑膿菌菌血症の重篤性と PA 特化エビデンスが必要な理由" },
      { embed: "../articles-gl-pa-bacteremia2026.html#pa-discussion", label: "PA 菌血症 投与期間（CID 2026）▸ 緑膿菌を Enterobacterales と同一視できない理由" },
      { embed: "../articles-gl-pa-bacteremia2026.html#pa-shorten2", label: "PA 菌血症 投与期間（CID 2026）▸ 緑膿菌専用 RCT SHORTEN-2 と現時点の臨床判断" },
      { embed: "../disease-topics/dt-pa-infection.html#dt-pa-s1", label: "緑膿菌感染症（総説）▸ 緑膿菌菌血症の特徴と Enterobacterales との違い" },
      { embed: "../disease-topics/dt-pa-infection.html#dt-pa-s2", label: "緑膿菌感染症（総説）▸ BALANCE 緑膿菌サブグループ157例の知見" },
      { embed: "../disease-topics/dt-pa-infection.html#dt-pa-s3", label: "緑膿菌感染症（総説）▸ 緑膿菌菌血症の投与期間：現時点での推奨" }
    ] },
    { section: "DTR/MDR 緑膿菌の定義と耐性機序", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec4-overview", label: "IDSA AMR-GNR 2024 ▸ DTR 緑膿菌の定義（8剤非感受性）と耐性機序" },
      { embed: "../articles-gl-ct-cza-psa2026.html#s1", label: "MDR 緑膿菌 C/T vs CZA（2026）▸ MDR 緑膿菌の臨床的重要性と耐性菌の定義" },
      { link: "../id-icu-notes/note-resistant-gnr.html#ch3-s2", label: "耐性GNR 板書ノート ▸ 耐性緑膿菌（MDRP/CRPA/DTRP）の定義と治療方針" }
    ] },
    { section: "DTR 緑膿菌の治療（新規β-ラクタム配合剤）", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec4-nonuti", label: "IDSA AMR-GNR 2024 ▸ DTR 緑膿菌 尿路外感染症の治療（C/T・CAZ-AVI・IMI-REL 優先）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec4-mbl", label: "IDSA AMR-GNR 2024 ▸ MBL 産生 DTR 緑膿菌はセフィデロコルが唯一の優先薬" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec4-resistance", label: "IDSA AMR-GNR 2024 ▸ DTR 緑膿菌の耐性出現リスク（C/T 治療後の交差耐性）" },
      { embed: "../articles-gl-ct-cza-psa2026.html#s2", label: "MDR 緑膿菌 C/T vs CZA（2026）▸ セフトロザン/タゾバクタムと CAZ-AVI の基本特性比較" },
      { embed: "../articles-gl-ct-cza-psa2026.html#s8", label: "MDR 緑膿菌 C/T vs CZA（2026）▸ 再発感染は C/T が有意に低い（aOR 0.46）" },
      { embed: "../articles-gl-ct-cza-psa2026.html#s12", label: "MDR 緑膿菌 C/T vs CZA（2026）▸ 感染部位別（肺炎/菌血症/KPC・MBL 株）の薬剤選択" },
      { link: "../id-icu-notes/note-resistant-gnr.html#ch4-s2", label: "耐性GNR 板書ノート ▸ 抗緑膿菌新規β-ラクタム配合剤の各論・用量・腎機能調整" }
    ] }
  ],

  // ============ Acinetobacter baumannii ============
  acinetobacter: [
    { section: "CRAB（カルバペネム耐性アシネトバクター）の治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-overview", label: "IDSA AMR-GNR 2024 ▸ CRAB の特徴と治療が困難な3つの理由" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-approach", label: "IDSA AMR-GNR 2024 ▸ CRAB の全体的治療アプローチ（スルバクタム含有2剤併用）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-suldur", label: "IDSA AMR-GNR 2024 ▸ スルバクタム-デュルロバクタム（SUL-DUR）— 優先薬" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-amsul", label: "IDSA AMR-GNR 2024 ▸ 高用量アンピシリン-スルバクタム（スルバクタム9g/日）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-tet", label: "IDSA AMR-GNR 2024 ▸ CRAB におけるテトラサイクリン系薬（ミノサイクリン優先）" },
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec5-fdc", label: "IDSA AMR-GNR 2024 ▸ CRAB におけるセフィデロコルの役割" }
    ] },
    { section: "多剤耐性アシネトバクター髄膜炎・脳室炎", items: [
      { embed: "../articles-gl-nosocomial-meningitis2010.html#nm-s7", label: "医療関連髄膜炎・脳室炎 2010 ▸ 多剤耐性GNR（特にアシネトバクター）への治療・髄腔内投与" }
    ] }
  ],

  // ============ Clostridioides difficile ============
  cdiff: [
    { section: "疫学・重症度", items: [
      { embed: "../articles-gl-cdi-shea2021.html#cdi-epidemio", label: "SHEA/IDSA CDI GL 2021 ▸ CDI の疫学（年間約46万例・再発の負担は変化なし）" },
      { embed: "../articles-gl-cdi-shea2021.html#cdi-severity", label: "SHEA/IDSA CDI GL 2021 ▸ 重症度分類（非重症／重症／劇症型）" }
    ] },
    { section: "治療推奨（全体像）", items: [
      { embed: "../articles-gl-cdi-shea2021.html#cdi-table1", label: "SHEA/IDSA CDI GL 2021 ▸ 治療推奨一覧（Table 1）：病型別の薬剤・用量" }
    ] },
    { section: "初期治療（フィダキソマイシン vs バンコマイシン）", items: [
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico1-rec", label: "SHEA/IDSA CDI GL 2021 ▸ 初回 CDI はフィダキソマイシン優先（VCM も代替可）" },
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico1-evidence", label: "SHEA/IDSA CDI GL 2021 ▸ エビデンス（4RCT・1,673例、持続治療反応 RR 1.16）" }
    ] },
    { section: "再発 CDI と FMT", items: [
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico2-rec", label: "SHEA/IDSA CDI GL 2021 ▸ 再発 CDI もフィダキソマイシン優先・FMT は複数回再発後" },
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico2-evidence", label: "SHEA/IDSA CDI GL 2021 ▸ エビデンス（30日持続反応 RR 1.27・FMT ドナー便スクリーニング必須）" }
    ] },
    { section: "ベズロトクスマブ（再発予防）", items: [
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico3-rec", label: "SHEA/IDSA CDI GL 2021 ▸ 6ヶ月以内再発例にベズロトクスマブ追加（CHF は注意）" },
      { embed: "../articles-gl-cdi-shea2021.html#cdi-pico3-evidence", label: "SHEA/IDSA CDI GL 2021 ▸ エビデンス（MODIFY I/II・再発 RR 0.62）" }
    ] }
  ],

  // ============ Nocardia 属 ============
  nocardia: [
    { section: "Nocardia の臨床", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch2-s1", label: "嫌気性菌 板書ノート ▸ Nocardia と Actinomyces（SNAP で治療を覚える）" }
    ] }
  ],

  // ============ Actinomyces 属 ============
  actinomyces: [
    { section: "Actinomyces の臨床", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch2-s1", label: "嫌気性菌 板書ノート ▸ Nocardia と Actinomyces（SNAP で治療を覚える）" }
    ] }
  ],

  // ============ Fusobacterium necrophorum ============
  fnec: [
    { section: "Lemierre 症候群", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch3-s1", label: "嫌気性菌 板書ノート ▸ 口腔内嫌気性菌と Lemierre 症候群（F. necrophorum）" }
    ] }
  ],

  // ============ Bacteroides fragilis ============
  bfragilis: [
    { section: "腹腔内嫌気性菌としての位置づけ", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch3-s2", label: "嫌気性菌 板書ノート ▸ B. fragilis は腹腔内嫌気性菌の筆頭（分離率約80%・MNZ/MEPM 感受性）" }
    ] }
  ],

  // ============ Clostridium perfringens ============
  cperf: [
    { section: "ガス壊疽（クロストリジウム性筋壊死）", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch3-s3", label: "嫌気性菌 板書ノート ▸ C. perfringens はガス壊疽の最多原因菌（PCG＋CLDM＋デブリードメント）" }
    ] }
  ],

  // ============ Clostridium septicum ============
  csept: [
    { section: "C. septicum 菌血症と悪性腫瘍", items: [
      { embed: "../id-icu-notes/note-anaerobic.html#ch3-s3", label: "嫌気性菌 板書ノート ▸ C. septicum 菌血症は occult 悪性腫瘍（大腸癌・AML）の重要マーカー" }
    ] }
  ],

  // ============ Cutibacterium acnes ============
  cacnes: [
    { section: "血液培養の汚染菌としての位置づけ", items: [
      { embed: "../articles-gl-ie2026.html#ie2-section3", label: "JCS IE 2026 ▸ 血液培養（Cutibacterium/Corynebacterium は汚染率 88–94%・IE 原因はまれ）" }
    ] }
  ],

  // ============ Neisseria meningitidis ============
  nmen: [
    { section: "髄膜炎菌髄膜炎の治療・予防", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch6-s1", label: "ESCMID 細菌性髄膜炎 2016 ▸ 髄膜炎菌接触者への予防的抗菌薬" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s3", label: "ESCMID 細菌性髄膜炎 2016 ▸ N. meningitidis ペニシリン中等度耐性への対応" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s1", label: "髄膜炎 板書ノート ▸ Neisseria meningitidis の特徴（飛沫感染・血清型B・CTRX）" }
    ] }
  ],

  // ============ Neisseria gonorrhoeae ============
  ngon: [
    { section: "Fitz-Hugh-Curtis 症候群", items: [
      { embed: "../id-icu-notes/note-iai.html#ch3-s2", label: "腹腔内感染症 板書ノート ▸ Fitz-Hugh-Curtis 症候群（淋菌による肝周囲炎・CTRX）" }
    ] }
  ],

  // ============ Mycobacterium tuberculosis ============
  tb: [
    { section: "結核性髄膜炎", items: [
      { embed: "../articles-gl-ncs-cerebraledema2020.html#ncs-s10", label: "NCS 脳浮腫管理 2020 ▸ 結核性髄膜炎：コルチコステロイドの推奨" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s4", label: "髄膜炎 板書ノート ▸ 起因菌：結核性（脳底部障害・髄液PCR陰性が多い）" }
    ] },
    { section: "HIV 患者の結核", items: [
      { embed: "../articles-gl-hiv-oi.html#s-tb", label: "HIV 日和見感染症 ▸ 結核（LTBI 治療・活動性TB・ART 開始タイミング・TB-IRIS）" }
    ] }
  ],

  // ============ Salmonella Typhi ============
  styphi: [
    { section: "腸チフスの治療", items: [
      { embed: "../articles-gl-static-cidal2018.html#sc-typhoid", label: "静菌薬 vs 殺菌薬 2018 ▸ 腸チフス：クロラムフェニコールは FQ と同等" }
    ] }
  ],

  // ============ Cryptococcus neoformans ============
  cneoformans: [
    { section: "髄膜脳炎の治療（導入・地固め・維持）", items: [
      { embed: "../articles-gl-hiv-oi.html#ch3", label: "HIV 日和見感染症 ▸ クリプトコッカス症：L-AmB＋5-FC 導入、エキノキャンジンは無効" },
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s3", label: "髄膜炎 板書ノート ▸ 起因菌：真菌性：HIV 感染者に多く、L-AmB＋5-FC、キャンディン系は無効" }
    ] },
    { section: "L-AmB 導入の投与期間", items: [
      { embed: "../articles-gl-cm-lamb2026.html#cm-summary", label: "クリプトコッカス髄膜炎 L-AmB 短期 vs 長期投与（OFID 2026）▸ キーメッセージ" }
    ] }
  ],

  // ============ Cryptococcus gattii ============
  cgattii: [
    { section: "C. neoformans との違い", items: [
      { embed: "../id-icu-notes/note-meningitis.html#ch1-s3", label: "髄膜炎 板書ノート ▸ 起因菌：真菌性：地域流行性で、非免疫不全者でも脳膿瘍を来しうる" }
    ] },
    { section: "クリプトコッカス髄膜炎の治療", items: [
      { embed: "../articles-gl-cm-lamb2026.html#cm-summary", label: "クリプトコッカス髄膜炎 L-AmB 短期 vs 長期投与（OFID 2026）▸ キーメッセージ" }
    ] }
  ],

  // ============ Aeromonas hydrophila ============
  aerohydro: [
    { section: "AmpC 産生菌としての位置づけ", items: [
      { embed: "../id-icu-notes/note-fn.html#ch9-s1", label: "好中球減少性発熱 板書ノート ▸ AmpC 産生菌（AMPC-HESK）：Aeromonas は頭文字 A に含まれる" }
    ] }
  ],

  // ============ Haemophilus influenzae ============
  hinfluenzae: [
    { section: "細菌性髄膜炎での位置づけと治療", items: [
      { embed: "../articles-gl-escmid-bactmening2016.html#ch3-s2", label: "ESCMID 細菌性髄膜炎 2016 ▸ β-ラクタマーゼ陰性株はアンピシリン、陽性株は第3世代セフェム" },
      { embed: "../articles-gl-escmid-bactmening2016.html#ch4-s1", label: "ESCMID 細菌性髄膜炎 2016 ▸ デキサメタゾンは肺炎球菌・H. influenzae で効果がより顕著" }
    ] },
    { section: "髄膜炎の診断（グラム染色）", items: [
      { embed: "../articles-gl-jns-bm2014.html#bm-diff", label: "日本神経学会 細菌性髄膜炎 2014 ▸ インフルエンザ菌のグラム染色感度 86%" }
    ] }
  ]

};
