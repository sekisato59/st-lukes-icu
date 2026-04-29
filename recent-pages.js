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
