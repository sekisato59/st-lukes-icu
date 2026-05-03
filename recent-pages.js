/**
 * 新着コンテンツ用 ページ一覧
 *
 * - サイト内で新たに作成された主要なページを date 降順（新→旧）で記載してください。
 * - index.html の「新着コンテンツ」セクションでは date が新しい上位3件が自動表示されます。
 * - 新規ページを追加するときは配列の先頭に新しいエントリを追加してください。
 *
 * date  : "YYYY-MM-DD"
 * tag   : "論文" / "ガイドライン" / "解説" / "症例"
 * thumb : サムネイル画像パス（images/ 以下）
 */
const RECENT_PAGES = [
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
    date: "2026-05-03",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "ID×ICU 板書ノート：VAP（人工呼吸器関連肺炎）",
    url: "pages/id-icu-notes/note-vap.html",
    date: "2026-04-17",
    tag: "解説",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "免疫不全ICU患者のCMV感染症",
    url: "pages/articles-gl-cmv-icu2025.html",
    date: "2026-05-04",
    tag: "論文",
    thumb: "images/IDICUtop.png"
  },
  {
    title: "糖尿病（診断・分類・合併症・DKA/HHS・治療薬）",
    url: "pages/disease-topics/dt-diabetes.html",
    date: "2026-05-03",
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
    date: "2026-05-03",
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
    title: "てんかん重積状態の診断と治療（Lancet Neurol 2024）",
    url: "pages/articles-gl-se-lancetneurol2024.html",
    date: "2026-05-02",
    tag: "論文",
    thumb: "images/icu-study.jpg"
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
    title: "重症患者における限外濾過 — Critical Care 2026",
    url: "pages/articles-gl-uf-cc2026.html",
    date: "2026-04-24",
    tag: "論文",
    thumb: "images/icu-study.jpg"
  },
  {
    title: "Stewart light — 酸塩基平衡異常への実践的アプローチ（ICM 2026）",
    url: "pages/articles-gl-stewartlight-icm2026.html",
    date: "2026-04-24",
    tag: "ガイドライン",
    thumb: "images/朝カンファ風景.webp"
  },
  {
    title: "脊髄硬膜外膿瘍（SEA）— NEJM総説 2026",
    url: "pages/articles-gl-sea-nejm2026.html",
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
  }
];
