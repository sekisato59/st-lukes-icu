/**
 * 新着コンテンツ用 ページ一覧
 *
 * ⚠ このファイルは scripts/sync-recent-pages.js によって自動生成されます。
 *    手動編集しないでください。エントリを上書きしたい場合は
 *    recent-pages-overrides.json に { "<url>": { title, tag, thumb } } を追加し、
 *    `node scripts/sync-recent-pages.js` を実行してください。
 *
 * fields: title / url / date (YYYY-MM-DD) / tag / thumb
 */
const RECENT_PAGES = [
  {
    title: "右室不全（Right Ventricular Failure） NEJM総説 2023",
    url: "pages/articles-gl-rvf-nejm2023.html",
    date: "2026-06-19",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "MSSA菌血症に対するセファゾリン（SNAP試験） NEJM 2026",
    url: "pages/articles-gl-snap-cfz2026.html",
    date: "2026-06-19",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "PPI 長期投与による有害事象は？",
    url: "pages/yoshida-qa/q-gi-04.html",
    date: "2026-06-19",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "敗血症の重症成人における輸液療法 — JAMA総説（JAMA 2023）",
    url: "pages/articles-gl-fluid-sepsis2023.html",
    date: "2026-06-18",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "慢性疾患の貧血（慢性炎症に伴う貧血） — NEJM 2005",
    url: "pages/articles-gl-acd2005.html",
    date: "2026-06-13",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "慢性炎症に伴う貧血（Anemia of Inflammation） — NEJM 2019",
    url: "pages/articles-gl-aoi2019.html",
    date: "2026-06-13",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "左室拡張機能の心エコー評価とHFpEF診断 — ASE 2025更新版（J Am Soc Echocardiogr 2025）",
    url: "pages/articles-gl-hfpef-ase2025.html",
    date: "2026-06-13",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "後方循環虚血（PCI）と脳底動脈閉塞 — 血管内治療時代の診断と管理",
    url: "pages/articles-gl-pci-endovascular2021.html",
    date: "2026-06-13",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ペルシュロン動脈梗塞 — 画像所見パターンと臨床スペクトラム",
    url: "pages/articles-gl-percheron2010.html",
    date: "2026-06-13",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "便秘薬の分類と使い分けは？",
    url: "pages/yoshida-qa/q-gi-03.html",
    date: "2026-06-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "肝硬変患者の感染症 — 板書ノート | ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-cirrhosis-infection.html",
    date: "2026-06-12",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ASPEN 2021 vs ESPEN 2022 — 重症患者栄養ガイドライン比較",
    url: "pages/disease-topics/dt-aspen-espen.html",
    date: "2026-06-12",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "骨粗鬆症 まとめ（保存版）— 病態・診断・製剤各論",
    url: "pages/articles-gl-osteoporosis-notion.html",
    date: "2026-06-11",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ARISE FLUIDS試験 — 早期敗血症性ショックの輸液制限+早期昇圧 vs 大量輸液+後期昇圧（NEJM 2026）",
    url: "pages/articles-gl-arise-fluids2026.html",
    date: "2026-06-11",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "免疫不全患者の菌血症 抗菌薬7日間 vs 14日間（BALANCE post hoc解析, CMI 2026）",
    url: "pages/articles-gl-balance-immunocompromised2026.html",
    date: "2026-06-11",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "非心臓大手術でのトラネキサム酸の病院方針 — 輸血を減らし90日VTEは非劣性（TRACTION試験・NEJM 2026）",
    url: "pages/articles-gl-traction-txa2026.html",
    date: "2026-06-11",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "抗凝固薬リバースの拮抗薬 — プロタミン・PCC・イダルシズマブ・アンデキサネット（NEJM Review 2026）",
    url: "pages/articles-gl-anticoag-reversal2026.html",
    date: "2026-06-11",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "カルボシステイン・高張食塩水は急性呼吸不全の人工呼吸期間を短縮せず有害 — MARCH試験（NEJM 2026）",
    url: "pages/articles-gl-march-mucoactive2026.html",
    date: "2026-06-10",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ワルデンシュトレームマクログロブリン血症 / リンパ形質細胞性リンパ腫 NCCN Guidelines v2.2026",
    url: "pages/articles-gl-nccn-wm2026.html",
    date: "2026-06-08",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "梅毒 Syphilis — 板書ノート | 感染症各論",
    url: "pages/id-icu-notes/note-syphilis.html",
    date: "2026-06-07",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "セフトロザン/タゾバクタム vs セフタジジム/アビバクタム — MDR緑膿菌感染症のSR・メタ解析（IJID 2026）",
    url: "pages/articles-gl-ct-cza-psa2026.html",
    date: "2026-06-05",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "イーグル効果と抗菌薬誘発性持続性 — Trends in Microbiology 2019",
    url: "pages/articles-gl-eagle-effect2019.html",
    date: "2026-06-05",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "嫌気性菌 — 板書ノート | ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-anaerobic.html",
    date: "2026-06-05",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "クリプトコッカス髄膜炎 L-AmB短期 vs 長期投与 OFID 2026",
    url: "pages/articles-gl-cm-lamb2026.html",
    date: "2026-06-05",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "PADIS 2018+2025 統合まとめ — 痛み・不安・鎮静・せん妄・不動・睡眠",
    url: "pages/articles-gl-padis2025.html",
    date: "2026-06-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "IDSA 2009 血管内カテーテル関連感染症 診断・管理ガイドライン",
    url: "pages/articles-gl-idsa-crbsi2009.html",
    date: "2026-06-02",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "患者-人工呼吸器非同調（PVA）と臨床転帰 — SR・メタ解析（Critical Care Medicine 2025）",
    url: "pages/articles-gl-pva-asynchrony2025.html",
    date: "2026-06-02",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "HFmrEF/HFpEF包括的薬物療法の生涯ベネフィット — クロストライアル解析（Nature Medicine 2025）",
    url: "pages/articles-gl-hfpef-cmt2025.html",
    date: "2026-05-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "白血球増多症・白血球うっ滞 — 入院管理戦略（J Hosp Med 2025）",
    url: "pages/articles-gl-hyperleukocytosis2025.html",
    date: "2026-05-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SpO₂ターゲット最適化 — SR・NMA（Imai 2025）",
    url: "pages/articles-gl-imai-oxygen-nma2025.html",
    date: "2026-05-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "心不全における最適血清カリウム濃度 — 個別患者データメタ解析（Eur Heart J 2026）",
    url: "pages/articles-gl-k-hf2026.html",
    date: "2026-05-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "敗血症性ショックの昇圧薬療法 — Fage 2026",
    url: "pages/articles-gl-vasopressor-shock2026.html",
    date: "2026-05-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "フルオロキノロン予防投与の有効性：高リスク好中球減少症（血液悪性腫瘍）SR・メタ解析（Infection 2026）",
    url: "pages/articles-gl-fq-fn-prophylaxis2026.html",
    date: "2026-05-29",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "NHCAP に対する広域 vs 狭域抗菌薬と30日院内死亡率 — 全国コホート研究（J Hosp Med 2026）",
    url: "pages/articles-gl-nhcap-abx2026.html",
    date: "2026-05-26",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "好中球減少症の深度は菌血症がん患者の死亡率に影響するか（BMC Infect Dis 2026）",
    url: "pages/articles-gl-neutropenia-bacteremia2026.html",
    date: "2026-05-26",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "代謝性アルカローシス — 病態生理・診断・治療 Core Curriculum 2022（AJKD）",
    url: "pages/articles-gl-met-alkalosis2022.html",
    date: "2026-05-24",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "上テント部開頭術後の痙攣予防 — NCS ガイドライン（Neurocrit Care 2026）",
    url: "pages/articles-gl-ncs-seizure2026.html",
    date: "2026-05-24",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "高ナトリウム血症 — 定量的アプローチによる治療戦略（N Engl J Med 2000, Adrogué & Madias）",
    url: "pages/articles-gl-hypernatremia-nejm2000.html",
    date: "2026-05-24",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "CRBSI・CLABSI — 板書ノート | ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-crbsi.html",
    date: "2026-05-24",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "高ナトリウム血症の病態生理と病因 — Best Pract Res Clin Endocrinol Metab 2026 | 聖路加ICUガイド",
    url: "pages/articles-gl-hypernatremia-phys2026.html",
    date: "2026-05-24",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "カンジダ菌血症と抗真菌薬 — 板書ノート | ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-candida.html",
    date: "2026-05-23",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "耐性GNRと新規抗菌薬 — 板書ノート | ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-resistant-gnr.html",
    date: "2026-05-23",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "甲状腺疾患診断ガイドライン2024 — 日本甲状腺学会",
    url: "pages/articles-gl-jta-thyroid2024.html",
    date: "2026-05-20",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "異常な肝血液検査値の解釈 (BMJ 2025) | St. Luke's ICU",
    url: "pages/articles-gl-lft-bmj2025.html",
    date: "2026-05-20",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ポリクローナル高ガンマグロブリン血症 — 評価・解釈・管理（Lancet Haematol 2021）",
    url: "pages/articles-gl-polyclonal-hgg2021.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ロクロニウム高用量と初回挿管成功率 — 2つの多施設RCTの二次解析（AJRCCM 2026）",
    url: "pages/articles-gl-rocuronium2026.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SBT中の呼吸力学・吸気努力モニタリングによるハイリスク患者の抜管失敗予測（AJRCCM 2025）",
    url: "pages/articles-gl-sbt-mechanics2025.html",
    date: "2026-05-19",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "脳MRIで偶発的に検出される頭蓋内圧亢進の画像所見と乳頭浮腫との関連（JAMA Neurol 2021）",
    url: "pages/articles-gl-mri-ih-jamaneurol2021.html",
    date: "2026-05-19",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "サッカーのヘディングと血液バイオマーカー急性変動 — p-Tau217・S100B（JAMA Neurol 2026）",
    url: "pages/articles-gl-soccer-heading2026.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "皮下注射による抗菌薬投与 — いつ・どう使うか（CID 2026）",
    url: "pages/articles-gl-sc-abx2026.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "SSc関連間質性肺疾患（SSc-ILD）— スクリーニング・治療ガイドライン実践",
    url: "pages/articles-gl-ssc-ild2026.html",
    date: "2026-05-19",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "レジオネラ症 — Lancet Seminar 2016（Cunha・Burillo・Bouza）",
    url: "pages/articles-gl-legionnaires-lancet2016.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "HUSとatypical HUS — 病態生理の全体像（Blood 2017）",
    url: "pages/articles-gl-hus-blood2017.html",
    date: "2026-05-19",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "全身性強皮症（SSc）— Lancet 2023 Seminar",
    url: "pages/articles-gl-ssc-lancet2023.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "強皮症腎クリーゼ レビュー（J Rheumatol 2014）",
    url: "pages/articles-gl-src2014.html",
    date: "2026-05-19",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "FQ vs マクロライド：レジオネラ肺炎治療",
    url: "pages/articles-gl-legionella-fq2021.html",
    date: "2026-05-18",
    tag: "論文",
    thumb: "images/legionella-fq-fig2-forest-all.png"
  },
  {
    title: "AI時代の臨床的専門性の育て方 — No Struggle, No Mastery（JAMA 2026）",
    url: "pages/articles-gl-ai-expertise2026.html",
    date: "2026-05-18",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "AIは医師の終わりではない — JAMA Viewpoint 2026",
    url: "pages/articles-gl-ai-physician2026.html",
    date: "2026-05-18",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "内包梗塞 — 解剖局在と臨床所見",
    url: "pages/articles-gl-ics-sm25.html",
    date: "2026-05-18",
    tag: "解説",
    thumb: "images/coma-fig3-localization.png"
  },
  {
    title: "病棟でのインスリン療法の基本",
    url: "pages/yoshida-qa/q-nutrition-02.html",
    date: "2026-05-18",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "動脈ラインからの血液培養は汚染率が末梢穿刺と同等・静脈カテーテルより低い可能性 — SR・メタ解析（CID 2025）",
    url: "pages/articles-gl-bccontam2025.html",
    date: "2026-05-17",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "【処方ガイド】整腸剤の使い分け — 研修医のためのクイックリファレンス",
    url: "pages/disease-topics/dt-intestinal-regulators.html",
    date: "2026-05-17",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "【保存版】ワクチン外来 — 肺炎球菌・帯状疱疹ワクチン",
    url: "pages/articles-gl-vaccine-outpatient.html",
    date: "2026-05-17",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "【便利ツール】By Systemカルテ作成ツール — 神経系MVP",
    url: "pages/karte-by-system.html",
    date: "2026-05-16",
    tag: "解説",
    thumb: "images/header便利ツール.png"
  },
  {
    title: "ADJUST-DVT — 年齢調整DダイマーによるDVT除外（JAMA 2026）",
    url: "pages/articles-gl-adjust-dvt2026.html",
    date: "2026-05-16",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "【ID×ICU】発熱性好中球減少症（FN）板書ノート",
    url: "pages/id-icu-notes/note-fn.html",
    date: "2026-05-16",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "2023 ACC/AHA/ACCP/HRS 心房細動 診断・管理ガイドライン",
    url: "pages/articles-gl-acc-aha-af2023.html",
    date: "2026-05-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "リズム vs レートコントロール（AF）— RCTメタ解析 18試験・17,536例",
    url: "pages/articles-gl-zafeiropoulos-af2024.html",
    date: "2026-05-15",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "COPDの管理は？",
    url: "pages/yoshida-qa/q-resp-03.html",
    date: "2026-05-15",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "GINA 2026 喘息グローバル戦略レポート",
    url: "pages/articles-gl-gina2026.html",
    date: "2026-05-13",
    tag: "ガイドライン",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "【吉田Q&A】入院患者の血圧が高値のとき、どう対応しますか？",
    url: "pages/yoshida-qa/q-cardio-02.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "入院患者の肝逸脱酵素が上昇したときに考えることは？",
    url: "pages/yoshida-qa/q-gi-02.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "低亜鉛血症のときに使用する薬剤は？",
    url: "pages/yoshida-qa/q-nutrition-03.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "ACPと治療コードの話し合いで意識していることは？",
    url: "pages/yoshida-qa/q-other-02.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "併存疾患についてのカルテの書き方は？",
    url: "pages/yoshida-qa/q-presentation-02.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "細菌性肺炎の経過が思わしくないときに考えることは？",
    url: "pages/yoshida-qa/q-resp-02.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "筋萎縮性側索硬化症（ALS）レビュー — JAMA 2026",
    url: "pages/articles-gl-als2026.html",
    date: "2026-05-12",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ムーコル症（接合菌症）— NEJM 2026 総説",
    url: "pages/articles-gl-mucormycosis-nejm2026.html",
    date: "2026-05-12",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "非定型肺炎・免疫不全・PcP 板書ノート — ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-atypical-pneumonia.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "髄膜炎・脳膿瘍 板書ノート — ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-meningitis.html",
    date: "2026-05-12",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "侵襲性肺アスペルギルス症・ムーコル症 板書ノート — ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-aspergillus-mucor.html",
    date: "2026-05-11",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "感染性心内膜炎（IE）板書ノート — ID×ICUカンファレンス",
    url: "pages/id-icu-notes/note-ie.html",
    date: "2026-05-11",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "心臓ペースメーカー 包括的最新総説（NEJM Evidence 2025）",
    url: "pages/articles-gl-pacemaker-nejm2025.html",
    date: "2026-05-10",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "新規セフェピム系BL/BLI配合剤の概要（Expert Rev Anti Infect Ther 2026）",
    url: "pages/articles-gl-cefepime-bli2026.html",
    date: "2026-05-10",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "原因不明昏睡のステップワイズ診断戦略（ICM 2026）",
    url: "pages/articles-gl-coma-unknown2026.html",
    date: "2026-05-10",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "心臓ペースメーカー：機能・トラブルシューティング・管理（JACC 2017）",
    url: "pages/articles-gl-pacemaker2017.html",
    date: "2026-05-10",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "Hepatitis B: A Review（JAMA 2026）",
    url: "pages/articles-gl-hbv-review2026.html",
    date: "2026-05-09",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "POC vs 検査室 Na⁺・K⁺測定の乖離（CCM 2026）",
    url: "pages/articles-gl-poc-electrolytes2026.html",
    date: "2026-05-09",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "免疫不全ICU患者のCMV感染症",
    url: "pages/articles-gl-cmv-icu2025.html",
    date: "2026-05-04",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "造血細胞移植後CMV感染症GL（日本造血・免疫細胞療法学会 第5版）",
    url: "pages/articles-gl-hct-cmv2022.html",
    date: "2026-05-04",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ID×ICU 板書ノート：CMV感染症",
    url: "pages/id-icu-notes/note-cmv.html",
    date: "2026-05-04",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ID×ICU 板書ノート：腹腔内感染症（IAI）",
    url: "pages/id-icu-notes/note-iai.html",
    date: "2026-05-04",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ID×ICU 板書ノート：VAP（人工呼吸器関連肺炎）",
    url: "pages/id-icu-notes/note-vap.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "頻脈性心房細動の診かたは？",
    url: "pages/yoshida-qa/q-cardio-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "Angioectasiaとはなんですか？",
    url: "pages/yoshida-qa/q-gi-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "入院中の汎血球減少をどう考えますか？",
    url: "pages/yoshida-qa/q-heme-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "【吉田Q&A】入院患者の貧血で鉄欠乏と慢性炎症をどう判断しますか？",
    url: "pages/yoshida-qa/q-heme-02.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "【吉田Q&A】貧血の鑑別でMCVだけで判断していい？",
    url: "pages/yoshida-qa/q-heme-03.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "細菌感染症で入院中、経過が思わしくないときに考えることは？",
    url: "pages/yoshida-qa/q-id-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "【吉田Q&A】蜂窩織炎の治療期間はどのくらいですか？",
    url: "pages/yoshida-qa/q-id-02.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "壊死性筋膜炎にクリンダマイシンを併用する理由は？",
    url: "pages/yoshida-qa/q-id-03.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "血糖降下薬を使っていない患者さんで低血糖がありました。どう考えますか？",
    url: "pages/yoshida-qa/q-nutrition-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "急性期の栄養療法について教えてください",
    url: "pages/yoshida-qa/q-nutrition-04.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "【吉田Q&A】病棟業務のToDoの優先順位（関谷先生の回答）",
    url: "pages/yoshida-qa/q-other-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "病棟でのプレゼンテーションのポイントは？",
    url: "pages/yoshida-qa/q-presentation-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "【吉田Q&A】腎不全の原因（腎前性・腎性・腎後性）の鑑別はどう進めますか？",
    url: "pages/yoshida-qa/q-renal-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "高マグネシウム血症の症状は？",
    url: "pages/yoshida-qa/q-renal-02.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "HPVとはなんですか？",
    url: "pages/yoshida-qa/q-resp-01.html",
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/header吉田先生.png"
  },
  {
    title: "糖尿病（診断・分類・合併症・DKA/HHS・治療薬）",
    url: "pages/disease-topics/dt-diabetes.html",
    date: "2026-05-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ループ利尿薬の正しい処方法（BMJ 2019）",
    url: "pages/articles-gl-loop-diuretics-bmj2019.html",
    date: "2026-05-02",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "成人の急性期気道管理（BMJ 2026）",
    url: "pages/articles-gl-airway-acute2026.html",
    date: "2026-05-02",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "てんかん重積状態の診断と治療（Lancet Neurol 2024）",
    url: "pages/articles-gl-se-lancetneurol2024.html",
    date: "2026-05-02",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ケタミンの多様な効果（BJA 2025）",
    url: "pages/articles-gl-ketamine-bja2025.html",
    date: "2026-05-02",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "血管ウォーターフォールと Pcrit（J Crit Care 2026）",
    url: "pages/articles-gl-vascular-waterfall-jcc2026.html",
    date: "2026-05-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "バンコマイシンTDM 2020（ASHP/IDSA）",
    url: "pages/articles-gl-vcm-tdm2020.html",
    date: "2026-05-01",
    tag: "ガイドライン",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "抗菌薬TDMガイドライン2022",
    url: "pages/articles-gl-tdm-antibiotics2022.html",
    date: "2026-05-01",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "JIPAD 2024年度 施設別年次レポート",
    url: "pages/articles-gl-jipad2024.html",
    date: "2026-04-27",
    tag: "ガイドライン",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "気管挿管導入時のフェンタニル — RCT5件SR&メタ解析",
    url: "pages/articles-gl-fentanyl-induction-jic2026.html",
    date: "2026-04-27",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "一過性全健忘（TGA）— UpToDate Review 2024",
    url: "pages/articles-gl-tga-uptodate2024.html",
    date: "2026-04-24",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "機械換気成人ICU患者におけるデクスメデトミジン（ICM 2022）",
    url: "pages/articles-gl-dex-icm2022.html",
    date: "2026-04-24",
    tag: "ガイドライン",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "脊髄硬膜外膿瘍（SEA）— NEJM総説 2026",
    url: "pages/articles-gl-sea-nejm2026.html",
    date: "2026-04-24",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "Stewart light — 酸塩基平衡異常への実践的アプローチ（ICM 2026）",
    url: "pages/articles-gl-stewartlight-icm2026.html",
    date: "2026-04-24",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "重症患者における限外濾過 — Critical Care 2026",
    url: "pages/articles-gl-uf-cc2026.html",
    date: "2026-04-24",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "急性脳損傷における温度管理 — ナラティブレビュー（ICM 2026）",
    url: "pages/articles-gl-tempcontrol-abi-icm2026.html",
    date: "2026-04-24",
    tag: "解説",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ERC-ESICM 2025 心拍再開後管理（PCAS）ガイドライン",
    url: "pages/articles-gl-pcas-erc2025.html",
    date: "2026-04-19",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "CVCの理想的な先端位置についての考察（Medical Nutritionist of PEN Leaders 2022）",
    url: "pages/articles-gl-cvc-tip2022.html",
    date: "2026-04-18",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "CVPモニタリングの再評価 — 忘れられた臨床的重要性（Intensive Care Med 2023）",
    url: "pages/articles-gl-cvp-icm2023.html",
    date: "2026-04-18",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "急性脳損傷後の意識回復 2024",
    url: "pages/articles-gl-doc-jic2024.html",
    date: "2026-04-18",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "IVC呼吸変動による輸液反応性予測 — 人工呼吸下ショック患者のメタ解析（Critical Care 2018）",
    url: "pages/articles-gl-ivc-cc2018.html",
    date: "2026-04-18",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "NCS 脳浮腫急性期治療ガイドライン 2020",
    url: "pages/articles-gl-ncs-cerebraledema2020.html",
    date: "2026-04-18",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "AF合併心不全のGDMT — JACC State-of-the-Art 2024",
    url: "pages/articles-gl-af-hf-jacc2024.html",
    date: "2026-04-16",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ノルエピネフリン等価スコア 更新版（訂正）— 昇圧薬換算係数・メタラミノール修正（Critical Care 2025）",
    url: "pages/articles-gl-ne-equiv-kotani2025.html",
    date: "2026-04-16",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "肺動脈カテーテル挿入・血行動態解釈 — Swan-Ganz Catheter（N Engl J Med 2013）",
    url: "pages/articles-gl-pac-nejm2013.html",
    date: "2026-04-16",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "右心カテーテルによる血行動態評価 実践ガイド（JACC HF 2024）— 聖路加ICUガイド",
    url: "pages/articles-gl-rhc-hf2024.html",
    date: "2026-04-16",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "神経ICUにおける鎮静薬 2025",
    url: "pages/articles-gl-sedatives-neuroicu2025.html",
    date: "2026-04-16",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アルブミン製剤使用に関する14の提言 ICTMG 2024",
    url: "pages/articles-gl-albumin-ictmg2024.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ATS ARDS管理ガイドライン 2024（更新版）",
    url: "pages/articles-gl-ats-ards2024.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ESCMID 急性細菌性髄膜炎 診断・治療ガイドライン 2016",
    url: "pages/articles-gl-escmid-bactmening2016.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ESICM ARDS ガイドライン 2023 — 定義・表現型・呼吸サポート戦略",
    url: "pages/articles-gl-esicm-ards2023.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ESPEN 2022 ICU臨床栄養実践ガイドライン",
    url: "pages/articles-gl-espen-nutrition2022.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "集中治療超音波（CCUS）学習目標 — Fagley 2015",
    url: "pages/articles-gl-fagley-ccus2015.html",
    date: "2026-04-15",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "HiHASC HLH診断・精査ガイドライン 2023",
    url: "pages/articles-gl-hihasc-hlh2023.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "IDSA 2024 耐性グラム陰性菌感染症治療ガイダンス",
    url: "pages/articles-gl-idsa-amr-gnr2024.html",
    date: "2026-04-15",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "IVC超音波による輸液反応性予測の精度 — 系統的レビュー・メタ解析（JICM 2018）",
    url: "pages/articles-gl-ivc-fr2018.html",
    date: "2026-04-15",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "IWGDF/IDSA 2023 糖尿病性足感染症 診断・治療ガイドライン",
    url: "pages/articles-gl-iwgdf-dfi2023.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "JCS/JHFS 2025 心不全診療ガイドライン",
    url: "pages/articles-gl-jcs-hf2025.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "細菌性髄膜炎診療ガイドライン 2014 — 第4章 検査",
    url: "pages/articles-gl-jns-bm2014.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "敗血症・ARDS・CAPへのステロイド療法 2024 Focused Update（SCCM/CCM 2024）",
    url: "pages/articles-gl-sccm-steroid2024.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "「静菌 vs 殺菌」神話を斬る — 系統的文献レビュー（CID 2018）",
    url: "pages/articles-gl-static-cidal2018.html",
    date: "2026-04-15",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "腹臥位療法（Prone Positioning）— 最新エビデンスと実践（ICM 2024）",
    url: "pages/articles-gl-prone-icm2024.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ATA 2016 甲状腺機能亢進症・甲状腺中毒症ガイドライン",
    url: "pages/articles-gl-hyperthyroidism-ata2016.html",
    date: "2026-04-15",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "急性肝不全（ALF）の管理と予後（UpToDate 2025）",
    url: "pages/articles-gl-alf-uptodate2025.html",
    date: "2026-04-14",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "甲状腺機能亢進症 レビュー（JAMA 2023）",
    url: "pages/articles-gl-hyperthyroidism-jama2023.html",
    date: "2026-04-14",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "甲状腺機能亢進症（Lancet Seminar 2024）",
    url: "pages/articles-gl-hyperthyroidism-lancet2024.html",
    date: "2026-04-14",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ACG 急性肝不全（ALF）ガイドライン 2023",
    url: "pages/articles-gl-acg-alf2023.html",
    date: "2026-04-13",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "急性肝不全（ALF）— Lancet Seminar 2024",
    url: "pages/articles-gl-alf-lancet2024.html",
    date: "2026-04-12",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SCCM/ASPEN 重症患者栄養サポートガイドライン 2016",
    url: "pages/articles-gl-sccm-aspen-nutrition2016.html",
    date: "2026-04-11",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "薬剤性免疫性血小板減少症（DIIT）NEJM 総説 2007",
    url: "pages/articles-gl-diit-nejm2007.html",
    date: "2026-04-11",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "血小板減少症の評価と管理 — AFP 2022",
    url: "pages/articles-gl-thrombocytopenia-afp2022.html",
    date: "2026-04-11",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "インフルエンザ：診断・治療・NMAエビデンス",
    url: "pages/disease-topics/dt-influenza.html",
    date: "2026-04-10",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "非重症インフルエンザへの抗ウイルス薬 NMA（JAMA Internal Medicine 2025）",
    url: "pages/articles-gl-influenza-nma-jamaintmed2025.html",
    date: "2026-04-10",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "インフルエンザ総説 — Lancet Seminar 2022（Uyeki et al.）",
    url: "pages/articles-gl-influenza-lancet2022.html",
    date: "2026-04-10",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ノイラミニダーゼ阻害薬（NAI）レビュー — ザナミビル・オセルタミビル（NEJM 2005）",
    url: "pages/articles-gl-nai-influenza2005.html",
    date: "2026-04-10",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "2025 ACC Concise Clinical Guidance — 標的抗がん療法の心毒性",
    url: "pages/articles-gl-acc-targeted-onco2025.html",
    date: "2026-04-09",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "肺動脈カテーテル挿入法（Swan-Ganz カテーテル）— N Engl J Med 2013",
    url: "pages/articles-gl-pac2013.html",
    date: "2026-04-09",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ACG ガイドライン 急性膵炎の管理 2024",
    url: "pages/articles-gl-acg-pancreatitis2024.html",
    date: "2026-04-09",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "SMART-DECISION試験 — MI後βブロッカー中断 vs 継続（NEJM 2026）",
    url: "pages/articles-gl-smart-decision2026.html",
    date: "2026-04-08",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "逆型たこつぼ心筋症 vs 心尖部/中部型 — 臨床的特徴の比較（Clin Cardiol 2011）",
    url: "pages/articles-gl-song-takotsubo2011.html",
    date: "2026-04-08",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ストレス心筋症 診断と治療 JACC State-of-the-Art Review 2018",
    url: "pages/articles-gl-takotsubo-jacc2018.html",
    date: "2026-04-08",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アルブミンにまつわる10の神話（ICM 2022）",
    url: "pages/articles-gl-albumin-myths2022.html",
    date: "2026-04-07",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "脳性塩類喪失症候群（CSW）— UpToDate Review 2026",
    url: "pages/articles-gl-csw-uptodate2026.html",
    date: "2026-04-07",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "初期ノルエピネフリン投与量とMAP応答 — Nishikimi 2026",
    url: "pages/articles-gl-nishikimi-ne-map2026.html",
    date: "2026-04-07",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "肝不全患者のアンモニア管理（J Crit Care 2024）",
    url: "pages/articles-gl-ammonia-jcrc2024.html",
    date: "2026-04-06",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ASFA 第9版 治療的アフェレーシス ガイドライン（2023）",
    url: "pages/articles-gl-asfa9-jca2023.html",
    date: "2026-04-06",
    tag: "症例",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "NICE-SUGAR試験 — 重症患者の強化vs通常血糖管理（NEJM 2009）",
    url: "pages/articles-gl-nice-sugar-nejm2009.html",
    date: "2026-04-06",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "RABBIT 2 Surgery — 一般外科手術患者のバサルボーラス vs スライディングスケール（Diabetes Care 2011）",
    url: "pages/articles-gl-rabbit2-surgery2011.html",
    date: "2026-04-06",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SCCM 2024 ICU血糖管理ガイドライン（成人・小児）",
    url: "pages/articles-gl-sccm-glycemic2024.html",
    date: "2026-04-06",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "Van den Berghe 2001 — ICU強化インスリン療法（NEJM 2001）",
    url: "pages/articles-gl-vandenberghe-nejm2001.html",
    date: "2026-04-06",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ICUにおける血糖コントロール",
    url: "pages/disease-topics/dt-glucose.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ARDS — 呼吸管理",
    url: "pages/disease-topics/dt-ards-resp.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "人工呼吸管理 Level 3 — HFNC・NIV・酸素療法",
    url: "pages/disease-topics/dt-vent-advanced.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "人工呼吸管理 Level 1 — 基礎",
    url: "pages/disease-topics/dt-vent-basic.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "人工呼吸管理 Level 4 — 特殊病態・ECMO",
    url: "pages/disease-topics/dt-vent-special.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "人工呼吸管理 Level 2 — ウィーニング・抜管",
    url: "pages/disease-topics/dt-vent-weaning.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "低ナトリウム血症の診断と管理（JAMA Review 2022）",
    url: "pages/articles-gl-hyponatremia-jama2022.html",
    date: "2026-04-05",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "低ナトリウム血症 治療スタンダード 2024（NDT）",
    url: "pages/articles-gl-hyponatremia-ndt2024.html",
    date: "2026-04-05",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "インスリン持続静脈注射→皮下注 移行プロトコール",
    url: "pages/articles-gl-insulin-iv2sc2020.html",
    date: "2026-04-05",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "非HIV免疫不全患者のPCP予防 — コクランメタ解析（Cochrane 2014）",
    url: "pages/articles-gl-pcp-cochrane2014.html",
    date: "2026-04-05",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "たこつぼ症候群の病態生理 — JACC State-of-the-Art Review 2021",
    url: "pages/articles-gl-takotsubo-jacc2021.html",
    date: "2026-04-05",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "たこつぼ（ストレス）心筋症の臨床像と転帰 — 国際たこつぼ登録研究（NEJM 2015）",
    url: "pages/articles-gl-takotsubo-nejm2015.html",
    date: "2026-04-05",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "たこつぼ症候群の病態生理（Circulation 2017）",
    url: "pages/articles-gl-takotsubo-patho2017.html",
    date: "2026-04-05",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ニューモシスチス肺炎（PCP）",
    url: "pages/disease-topics/dt-pcp.html",
    date: "2026-04-05",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "カテーテル関連上肢静脈血栓症（UpToDate 2024）",
    url: "pages/articles-gl-catheter-uedvt-ut2024.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "心エコー図による血行動態評価 — Forrester分類・左室充満圧推定（Heart View 2020）",
    url: "pages/articles-gl-echo-hf2020.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "グルココルチコイド誘発性副腎不全 ESE/ES合同ガイドライン（Eur J Endocrinol 2024）",
    url: "pages/articles-gl-glai2025.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "GLP-1受容体作動薬 — 総説（NEJM 2026）",
    url: "pages/articles-gl-glp1-nejm2026.html",
    date: "2026-04-04",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "HIV感染者のニューモシスチス肺炎（PCP）予防・治療ガイドライン（NIH/HIVMA/IDSA 2025）",
    url: "pages/articles-gl-hiv-pcp2025.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "がん患者のPCP予防・診断（NCCN Infections GL 2026）",
    url: "pages/articles-gl-pcp-nccn2026.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "PCP（ニューモシスチス肺炎）予防 JAMA 2023",
    url: "pages/articles-gl-pcp-prophylaxis-jama2023.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "非HIV PCP におけるステロイド補助療法と臨床転帰（CHEST 2025）",
    url: "pages/articles-gl-pcp-steroid-chest2025.html",
    date: "2026-04-04",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "熱傷の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-burn.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "循環の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-circulation.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "血液凝固線溶系の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-coagulation.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "代謝・内分泌系 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-endo.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "輸液・輸血・水電解質 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-fluid.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "消化管の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-gastrointestinal.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "集中治療総論 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-general.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "肝臓・胆嚢・膵臓の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-hepato.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "集中治療専門医試験 勉強ノート",
    url: "pages/exam-icu-board.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "胸部X線・POCUS | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-imaging.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "感染症基礎・敗血症 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-infection.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "多臓器障害（MODS） | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-mods.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "神経系の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-neurology.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "妊産婦の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-obstetrics.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "小児の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-pediatrics.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "PICS・早期リハビリテーション | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-pics.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "腎・電解質系の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-renal.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "呼吸の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-respiratory.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "体温異常 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-temp.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "急性中毒の診断・治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-toxicology.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "移植・臓器提供・ドナー管理 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-transplant.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "外傷・多発外傷の集中治療 | 集中治療専門医試験 勉強ノート",
    url: "pages/exam-trauma.html",
    date: "2026-04-04",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ADA 入院中の糖尿病管理 2026（第16章）",
    url: "pages/articles-gl-ada-soc2026-ch16.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ADA 糖尿病合併症ガイドライン 2026 — 網膜症・神経障害・足病変",
    url: "pages/articles-gl-ada-complications2026.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ADA 高齢者糖尿病ガイドライン 2026（第13章）",
    url: "pages/articles-gl-ada-olderadults2026.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ADA 糖尿病 CKD・リスク管理 Standards of Care 2026 第11章",
    url: "pages/articles-gl-ada-soc2026-ch11.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ADA SoC 2026 第6章 血糖目標・低血糖・高血糖クリーゼ",
    url: "pages/articles-gl-ada-soc2026-ch6.html",
    date: "2026-04-03",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "チルゼパチド vs セマグルチド — 肥満・過体重患者における体重減少比較コホート研究",
    url: "pages/articles-gl-glp1-rodriguez2024.html",
    date: "2026-04-03",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "糖尿病の心血管疾患・リスク管理 — ADA Standards of Care 2026 Section 10",
    url: "pages/articles-gl-ada-cvd2026.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ADA 糖尿病治療 血糖降下薬の選択 Standards of Care 2026 第9章",
    url: "pages/articles-gl-ada-soc2026-ch9.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "体液過剰の診断精度 — Rational Clinical Examination（JAMA 2026）",
    url: "pages/articles-gl-drum-volume2026.html",
    date: "2026-04-03",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "FIDELITY統合解析 — フィネレノンとT2D-CKD患者の心腎アウトカム",
    url: "pages/articles-gl-fidelity-ehj2022.html",
    date: "2026-04-03",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "HFrEF薬物療法 ネットワークメタ解析 — ARNi＋BB＋MRA＋SGLT2iの総合効果（JACC Heart Failure 2022）",
    url: "pages/articles-gl-hfref-nma2022.html",
    date: "2026-04-03",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ARISSトライアル：敗血症性ショックへのアルブミン補充療法 多施設RCT（JAMA Network Open 2026）",
    url: "pages/articles-gl-ariss2026.html",
    date: "2026-04-02",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アピキサバン vs リバーロキサバン — 急性VTE出血リスク比較（COBRRA試験, NEJM 2026）",
    url: "pages/articles-gl-cobrra-nejm2026.html",
    date: "2026-04-02",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "めまいの評価と管理 — TiTrATE・BPPV・前庭神経炎・HINTS（AFP 2023）",
    url: "pages/articles-gl-dizziness2023.html",
    date: "2026-04-02",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "テイコプラニン vs バンコマイシン — コクランレビュー（2010）",
    url: "pages/articles-gl-teicoplanin-cochrane2010.html",
    date: "2026-04-02",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "酸塩基平衡障害",
    url: "pages/disease-topics/dt-acidbase.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "AKI：診断・管理・敗血症関連",
    url: "pages/disease-topics/dt-aki.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ICUにおけるアルブミン投与",
    url: "pages/disease-topics/dt-albumin.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ARDSの呼吸管理と右心不全",
    url: "pages/disease-topics/dt-ards.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "くも膜下出血（aSAH）の管理",
    url: "pages/disease-topics/dt-asah.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "高ナトリウム血症",
    url: "pages/disease-topics/dt-hypernatremia.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "院内髄膜炎・脳室炎",
    url: "pages/disease-topics/dt-meningitis.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ICUにおける栄養戦略",
    url: "pages/disease-topics/dt-nutrition.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "肺塞栓症（PE/VTE）の診断と治療",
    url: "pages/disease-topics/dt-pe-vte.html",
    date: "2026-04-02",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "脳卒中治療ガイドライン 2021〔改訂2025〕",
    url: "pages/articles-gl-jcs-stroke2025.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "TTP（血栓性血小板減少性紫斑病）",
    url: "pages/disease-topics/dt-ttp.html",
    date: "2026-04-01",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "心房細動（AF） JAMAレビュー 2024",
    url: "pages/articles-gl-af-jama2024.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "菌血症の抗菌薬投与期間 7日間 vs 14日間（BALANCE試験, NEJM 2025）",
    url: "pages/articles-gl-balance-bacteremia2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "絨毛膜羊膜炎（Clinical Chorioamnionitis）at term — 定義・病因・微生物・診断・治療（AJOG 2024）",
    url: "pages/articles-gl-chorioamnionitis-ajog2024.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "正常血糖DKA（EDKA） AJEM 2021",
    url: "pages/articles-gl-edka-ajem2021.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ENIO研究：ABI患者のSBTモードは抜管予後を予測しない（Intensive Care Med 2025）",
    url: "pages/articles-gl-enio-extubation2025.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "グラム陰性菌菌血症 7日間 vs 14日間 — 系統的レビュー・メタ解析（JAMA Network Open 2025）",
    url: "pages/articles-gl-gnbsi-meta2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "HFNC初期流量設定とAECOPD — ネットワークメタ解析 Pulmonology 2025",
    url: "pages/articles-gl-hfnc-copd-nma2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ICU獲得性高ナトリウム血症：経腸フリーウォーター vs 5%ブドウ糖（JA 2023）",
    url: "pages/articles-gl-hypernatremia-ja2023.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "高ナトリウム血症の治療 — 補正速度と死亡率・副作用への影響 系統的レビュー・メタ解析（J Crit Care 2025）",
    url: "pages/articles-gl-hypernatremia-meta2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "免疫性血栓性血小板減少性紫斑病（iTTP）JAMA総説 2025",
    url: "pages/articles-gl-ittp-jama2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "JCS/JPCPHS 2025 肺血栓塞栓症・深部静脈血栓症ガイドライン",
    url: "pages/articles-gl-jcs-vte2025.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "タイダル肺ヒステレシスによるARDS PEEP評価（Critical Care 2023）",
    url: "pages/articles-gl-peep-hysteresis-ards2023.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ARDSにおける右心不全（Eur Respir Rev 2025）",
    url: "pages/articles-gl-rhd-ards2025.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "市中肺炎へのグルコルチコイド補助療法 SONIA試験（NEJM 2025）",
    url: "pages/articles-gl-steroid-cap2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "腫瘍崩壊症候群（TLS） NEJM総説 2025",
    url: "pages/articles-gl-tls-nejm2025.html",
    date: "2026-04-01",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "TTP管理の最前線 — 血漿交換・リツキシマブ・カプラシズマブ（Blood Reviews 2022）",
    url: "pages/articles-gl-ttp-blood2022.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "妊娠関連TTP — How I Treat（Blood 2020）",
    url: "pages/articles-gl-ttp-pregnancy-blood2020.html",
    date: "2026-04-01",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "心房細動（AF）",
    url: "pages/disease-topics/dt-af.html",
    date: "2026-04-01",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "菌血症の抗菌薬投与期間は？",
    url: "pages/disease-topics/dt-bacteremia-duration.html",
    date: "2026-03-31",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "2026 AHA/ACC 急性肺塞栓症ガイドライン",
    url: "pages/articles-gl-aha-pe2026.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アルブミン20%の薬理と臨床応用 包括的レビュー（Critical Care 2026）",
    url: "pages/articles-gl-albumin20-cc2026.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "aSAH後合併症レビュー 2025",
    url: "pages/articles-gl-asah-cc2025.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "BTS 胸水疾患ガイドライン 2023",
    url: "pages/articles-gl-bts-pleural2023.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "慢性腎臓病（CKD）— Lancet Seminar 2026",
    url: "pages/articles-gl-ckd-lancet2026.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "びまん性肺胞出血（DAH）— 定義・診断・原因疾患別治療（CHEST 2010）",
    url: "pages/articles-gl-dah-chest2010.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "2026 ACC/AHA 脂質異常症管理ガイドライン",
    url: "pages/articles-gl-dyslipidemia2026.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ENIO研究：急性脳障害患者におけるSBT様式と抜管アウトカム（ICM 2025）",
    url: "pages/articles-gl-enio-sbt2025.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "KDIGO 2026 CKD貧血管理ガイドライン",
    url: "pages/articles-gl-kdigo-anemia2026.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "骨粗鬆症 A Review（JAMA 2025）",
    url: "pages/articles-gl-osteoporosis-jama2025.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "閉経後骨粗鬆症 診断・治療（NEJM 2023）",
    url: "pages/articles-gl-osteoporosis-nejm2023.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "難治性高血圧の診断と管理 JAMAレビュー 2026",
    url: "pages/articles-gl-resistant-htn2026.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "横紋筋融解症 ナラティブレビュー（Chest 2026）",
    url: "pages/articles-gl-rhabdo-chest2026.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SA-AKI コンセンサスレポート ADQI 28th（Nature Reviews Nephrology 2023）",
    url: "pages/articles-gl-sa-aki2023.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "重症市中肺炎（sCAP）：現在の概念と論争点（ICM 2025 ナラティブレビュー）",
    url: "pages/articles-gl-scap-icm2025.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "敗血症性心筋症（SICM）レビュー（Chest 2025）",
    url: "pages/articles-gl-sicm-chest2025.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "低酸素性呼吸不全における気管挿管の閾値は存在するか？ — コホート研究（AJRCCM 2023）",
    url: "pages/articles-gl-yarnell-imv2023.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "心肺蘇生後の管理（PCAS）",
    url: "pages/disease-topics/dt-pcas.html",
    date: "2026-03-31",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "ACNS 2021 クリティカルケアEEG用語集",
    url: "pages/articles-gl-acns-eeg2021.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アルブミンは敗血症性ショック+腎障害患者に有害か（CHEST 2025）",
    url: "pages/articles-gl-albumin-sepsis2025.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ASPEN 2021 重症患者栄養サポートガイドライン",
    url: "pages/articles-gl-aspen-nutrition2021.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "アルコール離脱症候群（AWS）神経集中治療 レビュー 2021",
    url: "pages/articles-gl-aws-ncc2021.html",
    date: "2026-03-31",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SHEA/IDSA 2021 CDI管理ガイドライン Focused Update",
    url: "pages/articles-gl-cdi-shea2021.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "経腸栄養 入院患者における実践（NEJM 2025）",
    url: "pages/articles-gl-en-nejm2025.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "HIV感染者における日和見感染症 予防・治療ガイドライン",
    url: "pages/articles-gl-hiv-oi.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "IDSA 2017 医療関連脳室炎・髄膜炎ガイドライン",
    url: "pages/articles-gl-idsa-havm2017.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "移植における免疫抑制薬と感染リスク — 免疫抑制のネットステート（CID 2021）",
    url: "pages/articles-gl-immunosuppression-transplant2021.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "院内細菌性髄膜炎 — 疫学・診断・抗菌薬治療（NEJM 2010）",
    url: "pages/articles-gl-nosocomial-meningitis2010.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "重症患者の栄養再考 — エネルギー・タンパク質投与の再考（ICM 2024）",
    url: "pages/articles-gl-stoppe-nutrition2024.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ストレス潰瘍予防：H2RA vs PPI — 敗血症性ショック患者での比較（Crit Care Med 2025）",
    url: "pages/articles-gl-sup-septicshock2025.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ツムラ医療用漢方製剤一覧（薬価基準収載）",
    url: "pages/articles-gl-tsumura-kampo.html",
    date: "2026-03-31",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "聖路加ICU 輸血ガイド",
    url: "pages/articles-gl-transfusion2026.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ICU血小板減少症 DIC vs TMA 鑑別アルゴリズム（Vincent 2018）",
    url: "pages/articles-gl-dic-tma2018.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "KDIGO 2026 AKI/AKD ガイドライン",
    url: "pages/articles-gl-kdigo-aki2026.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "代謝性アシドーシス 最新エビデンス（ICM 2025）",
    url: "pages/articles-gl-metabolic-acidosis2025.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "混合性酸塩基平衡障害 Core Curriculum 2025（AJKD）",
    url: "pages/articles-gl-mixed-acidbase2025.html",
    date: "2026-03-30",
    tag: "論文",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "P. aeruginosa 菌血症の抗菌薬投与期間（BALANCE post hoc, CID 2026）",
    url: "pages/articles-gl-pa-bacteremia2026.html",
    date: "2026-03-30",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "AHA/NCS 2024 心停止後の集中治療管理 科学的声明",
    url: "pages/articles-gl-pcas-aha2024.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "ペラミビル（Rapiacta®）レビュー — 非重症インフルエンザ治療",
    url: "pages/articles-gl-peramivir2018.html",
    date: "2026-03-30",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "AHA/ASA aSAH 2023 ガイドライン",
    url: "pages/articles-gl-sah2023.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "IDSA 2025 複雑性尿路感染症（cUTI）管理ガイドライン",
    url: "pages/articles-gl-uti-idsa2025.html",
    date: "2026-03-30",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "低ナトリウム血症",
    url: "pages/disease-topics/dt-hyponatremia.html",
    date: "2026-03-30",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "緑膿菌感染症",
    url: "pages/disease-topics/dt-pa-infection.html",
    date: "2026-03-30",
    tag: "解説",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "インスピロンネブライザー完全ガイド（看護学雑誌 2008）",
    url: "pages/articles-gl-inspiron2008.html",
    date: "2026-03-29",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "血小板減少症の鑑別フロー（Intensivist 2026）",
    url: "pages/articles-gl-thrombocytopenia2026.html",
    date: "2026-03-29",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "低ナトリウム血症 診断・治療ガイドライン（ESICM/ESE/ERA-EDTA 2014）",
    url: "pages/articles-gl-hn2014.html",
    date: "2026-03-28",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "SSC 2026 敗血症・敗血症性ショック管理ガイドライン",
    url: "pages/articles-gl-ssc2026.html",
    date: "2026-03-28",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "JCS 2026 感染性心内膜炎（IE）診療ガイドライン",
    url: "pages/articles-gl-ie2026.html",
    date: "2026-03-28",
    tag: "ガイドライン",
    thumb: "images/IDICUtop.png"
  }
];
