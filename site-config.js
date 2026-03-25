/**
 * ============================================================
 *  SL-ICU Guide — サイト設定ファイル
 *  このファイルを編集するだけでサイトの内容を更新できます。
 * ============================================================
 */

const SITE_CONFIG = {

  // ==========================================================
  // ① スタッフ紹介
  //   image: 'images/staff/ファイル名.jpg' に写真を置いてください
  //   image を省略するとアイコンのみ表示されます
  // ==========================================================
  staff: [
    { role: 'ICU部長',    name: '岡本 洋史 先生', image: '', url: 'pages/staff-okamoto.html' },
    { role: 'スタッフ医師', name: '青木 和裕 先生', image: '', url: 'pages/staff-aoki.html' },
    { role: 'スタッフ医師', name: '岡野 弘 先生',   image: '', url: 'pages/staff-okano.html' },
    { role: 'スタッフ医師', name: '後藤 俊作 先生', image: '', url: 'pages/staff-goto.html' },
    { role: 'スタッフ医師', name: '宮﨑 令奈 先生', image: '', url: 'pages/staff-miyazaki.html' },
    { role: 'スタッフ医師', name: '関谷 智 先生',   image: '', url: 'pages/staff-sekiya.html' },
  ],

  // ==========================================================
  // ② 緊急連絡先
  //   number に実際の内線番号を入力してください
  // ==========================================================
  contacts: [
    { label: 'ICU病棟直通',         number: 'XXXX' },
    { label: 'ICU当直医（夜間）',   number: 'XXXX' },
    { label: 'RRS（院内急変対応）', number: 'XXXX' },
    { label: 'ICU秘書 川田さん',    number: 'XXXX' },
  ],

  // ==========================================================
  // ③ 今日のチェックリスト（サイドバー）
  // ==========================================================
  dailyChecklist: [
    '朝の申し送り確認',
    '担当患者のエコー確認',
    'ICUカンファのプレゼン準備',
    '午前中にオーダー完了',
    'Daily Chart記載（朝回診後）',
    '手技ログ記録（PASSPORT）',
    '夕方の申し送り準備',
  ],

  // ==========================================================
  // ④ ローテ前To Do（サイドバー）
  // ==========================================================
  preTodo: [
    '自己紹介をTeamsで送付',
    '感染予防クイズを提出',
    '動画：人工呼吸器基礎',
    '動画：Neuro ICU',
    '動画：ヒューマンケア',
    '動画：緊急ACP',
  ],

  // ==========================================================
  // ⑤ リソース — 推奨教科書
  // ==========================================================
  books: [
    {
      name: 'ICU Book（Marino）',
      badge: 'must',
      desc: '集中治療の基本を網羅した定番教科書',
      url: '',
    },
    {
      name: '集中治療医学テキスト',
      badge: '',
      desc: '日本集中治療医学会の標準テキスト',
      url: '',
    },
    {
      name: 'Up To Date',
      badge: 'online',
      desc: 'エビデンスに基づく臨床情報',
      url: 'https://www.uptodate.com/',
    },
  ],

  // ==========================================================
  // ⑥ リソース — オンラインリソース
  // ==========================================================
  onlineResources: [
    {
      name: 'IBCC（Internet Book of Critical Care）',
      badge: 'recommend',
      desc: '無料で読める包括的リソース',
      url: 'https://emcrit.org/ibcc/toc/',
    },
    {
      name: 'Life in the Fast Lane',
      badge: '',
      desc: '救急・集中治療の学習サイト',
      url: 'https://litfl.com/',
    },
    {
      name: 'Radiopaedia',
      badge: '',
      desc: '画像診断の学習に最適',
      url: 'https://radiopaedia.org/',
    },
  ],

  // ==========================================================
  // ⑦ リソース — SNS
  // ==========================================================
  sns: [
    {
      name: 'Instagram（@st.lukes.icu）',
      desc: '聖路加ICUの日常を投稿中。ぜひフォローを！',
      url: 'https://www.instagram.com/st.lukes.icu/',
    },
    {
      name: 'Facebook（St. Luke\'s ICU）',
      desc: '最新情報はFacebookでも発信中',
      url: 'https://www.facebook.com/stlukesicu/',
    },
  ],

  // ==========================================================
  // ⑧ 便利リンク集（サイドバー）
  //   icon: 絵文字アイコン / name: リンク名 / url: リンク先URL
  // ==========================================================
  usefulLinks: [
    { icon: '📖', name: 'IBCC（集中治療テキスト）', url: 'https://emcrit.org/ibcc/toc/' },
    { icon: '🌐', name: 'Life in the Fast Lane',    url: 'https://litfl.com/' },
    { icon: '🖼', name: 'Radiopaedia',               url: 'https://radiopaedia.org/' },
    { icon: '🔎', name: 'UpToDate',                  url: 'https://www.uptodate.com/' },
    { icon: '📸', name: 'Instagram（@st.lukes.icu）', url: 'https://www.instagram.com/st.lukes.icu/' },
    { icon: '👤', name: 'Facebook（St. Luke\'s ICU）', url: 'https://www.facebook.com/stlukesicu/' },
  ],

  // ==========================================================
  // ⑨ ヒーロー画像（背景画像を使いたい場合）
  //   image を設定するとグラデーションの上に重ねて表示
  //   空文字 '' のままにするとグラデーションのみ
  // ==========================================================
  heroImage: '',  // 例: 'images/hero.jpg'

};
