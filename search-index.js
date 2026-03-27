const SEARCH_INDEX = [
  // ── スタッフ紹介 ──
  {"title":"岡本 洋史 先生","url":"pages/staff-okamoto.html","desc":"ICU部長 集中治療専門医","keywords":"岡本洋史 おかもと ICU部長 集中治療専門医 スタッフ紹介"},
  {"title":"青木 和裕 先生","url":"pages/staff-aoki.html","desc":"スタッフ医師 集中治療科","keywords":"青木和裕 あおき スタッフ医師 スタッフ紹介"},
  {"title":"岡野 弘 先生","url":"pages/staff-okano.html","desc":"スタッフ医師 集中治療科","keywords":"岡野弘 おかの スタッフ医師 スタッフ紹介"},
  {"title":"後藤 俊作 先生","url":"pages/staff-goto.html","desc":"スタッフ医師 集中治療科","keywords":"後藤俊作 ごとう スタッフ医師 スタッフ紹介"},
  {"title":"宮﨑 令奈 先生","url":"pages/staff-miyazaki.html","desc":"スタッフ医師 集中治療科","keywords":"宮﨑令奈 みやざき スタッフ医師 スタッフ紹介"},
  {"title":"関谷 智 先生","url":"pages/staff-sekiya.html","desc":"スタッフ医師 集中治療科","keywords":"関谷智 せきや スタッフ医師 スタッフ紹介"},

  // ── ICUコアカン ──
  {"title":"ICUコアカン","url":"pages/icu-core-conf.html","desc":"ICUコアカンファレンス一覧","keywords":"コアカン カンファレンス 学習 プレゼンテーション By System 透析"},
  {"title":"注目論文・最新ガイドラインまとめ","url":"pages/articles-guidelines.html","desc":"ICU関連の注目論文や最新ガイドラインの要約","keywords":"論文 ガイドライン エビデンス 文献 レビュー 最新"},
  {"title":"論文まとめ：神経系","url":"pages/articles-guidelines.html#art-neuro","desc":"神経系の注目論文・ガイドライン","keywords":"神経 脳 意識障害 TTM 心停止"},
  {"title":"論文まとめ：循環器系","url":"pages/articles-guidelines.html#art-cardio","desc":"循環器系の注目論文・ガイドライン","keywords":"循環 ショック 昇圧薬 心不全"},
  {"title":"論文まとめ：呼吸器系","url":"pages/articles-guidelines.html#art-resp","desc":"呼吸器系の注目論文・ガイドライン","keywords":"呼吸 ARDS 人工呼吸 PEEP"},
  {"title":"論文まとめ：腎・電解質系","url":"pages/articles-guidelines.html#art-renal","desc":"腎・電解質系の注目論文・ガイドライン","keywords":"腎 AKI RRT 電解質 透析"},
  {"title":"論文まとめ：消化器 / 肝胆道系","url":"pages/articles-guidelines.html#art-gi","desc":"消化器・肝胆道系の注目論文・ガイドライン","keywords":"消化器 肝臓 胆道 膵炎"},
  {"title":"論文まとめ：血液系","url":"pages/articles-guidelines.html#art-heme","desc":"血液系の注目論文・ガイドライン","keywords":"血液 輸血 DIC 凝固"},
  {"title":"論文まとめ：感染症","url":"pages/articles-guidelines.html#art-id","desc":"感染症の注目論文・ガイドライン","keywords":"感染症 抗菌薬 敗血症 セプシス"},
  {"title":"論文まとめ：栄養 / 代謝系","url":"pages/articles-guidelines.html#art-nutrition","desc":"栄養・代謝系の注目論文・ガイドライン","keywords":"栄養 代謝 経腸栄養 血糖"},
  {"title":"論文まとめ：筋骨格系","url":"pages/articles-guidelines.html#art-msk","desc":"筋骨格系の注目論文・ガイドライン","keywords":"筋骨格 リハビリ ICU-AW"},
  {"title":"論文まとめ：予防","url":"pages/articles-guidelines.html#art-ppx","desc":"予防の注目論文・ガイドライン","keywords":"予防 DVT VAP 褥瘡 潰瘍"},

  // ── ICUカンファレンス By System ──
  {"title":"プレゼンテーションの総論","url":"pages/schedule-icu-conf.html#conf-section1","desc":"ICUカンファレンス","keywords":"SECTION 1 総論 OAP カンファレンス 目的 Plan チーム"},
  {"title":"STEP 1 Objective Dataを集められる","url":"pages/schedule-icu-conf.html#conf-section1","desc":"ICUカンファレンス › 総論","keywords":"Objective Data 客観的 データ収集 ステップ1"},
  {"title":"STEP 2 Assessmentできる","url":"pages/schedule-icu-conf.html#conf-section1","desc":"ICUカンファレンス › 総論","keywords":"Assessment 評価 アセスメント ステップ2"},
  {"title":"STEP 3 Planを提示できる","url":"pages/schedule-icu-conf.html#conf-section1","desc":"ICUカンファレンス › 総論","keywords":"Plan プラン 提案 到達目標 ステップ3"},
  {"title":"By System vs By Problem","url":"pages/schedule-icu-conf.html#conf-section2","desc":"ICUカンファレンス","keywords":"SECTION 2 By System By Problem 長所 短所 比較"},
  {"title":"Opening Statement","url":"pages/schedule-icu-conf.html#conf-section3","desc":"ICUカンファレンス › プレゼンの流れ","keywords":"Part 1 オープニング 全体像 大方針"},
  {"title":"Closing：To Doの確認","url":"pages/schedule-icu-conf.html#conf-section3","desc":"ICUカンファレンス › プレゼンの流れ","keywords":"Part 3 ToDo リマインド まとめ"},
  {"title":"#1 Neurological System 神経系","url":"pages/schedule-icu-conf.html#sys-neuro","desc":"ICUカンファレンス › By System","keywords":"神経 意識レベル 鎮静 鎮痛 せん妄 GCS RASS BPS CAM-ICU 脳外科 不眠 ミダゾラム プロポフォール デクスメデトミジン フェンタニル レミフェンタニル"},
  {"title":"#2 Cardiological System 循環器系","url":"pages/schedule-icu-conf.html#sys-cardio","desc":"ICUカンファレンス › By System","keywords":"循環 昇圧薬 降圧薬 体液量 ショック ノルアドレナリン ピトレシリン ニカルジピン 組織還流 乳酸値 CRT 輸液"},
  {"title":"#3 Respiratory System 呼吸器系","url":"pages/schedule-icu-conf.html#sys-resp","desc":"ICUカンファレンス › By System","keywords":"呼吸 挿管 非挿管 HFNC NIV 人工呼吸器 PCV VCV PSV 肺保護換気 抜管 SAT SBT 気管切開 HACOR ROX"},
  {"title":"#4 Nephrological System 腎電解質系","url":"pages/schedule-icu-conf.html#sys-renal","desc":"ICUカンファレンス › By System","keywords":"腎 電解質 透析 血液ガス 酸塩基 Stewart Boston AG 代謝性アシドーシス 低ナトリウム"},
  {"title":"#5 GI / Hepatobiliary 消化器/肝胆道系","url":"pages/schedule-icu-conf.html#sys-gi","desc":"ICUカンファレンス › By System","keywords":"消化器 肝胆道 腹部所見 肝機能 排便 ドレーン ストーマ CDI AST ALT ビリルビン"},
  {"title":"#6 Hematological System 血液系","url":"pages/schedule-icu-conf.html#sys-heme","desc":"ICUカンファレンス › By System","keywords":"血液 貧血 凝固 血小板 輸血 DIC HIT CBC Dダイマー フィブリノーゲン 化学療法"},
  {"title":"#7 Infectious Disease 感染症","url":"pages/schedule-icu-conf.html#sys-id","desc":"ICUカンファレンス › By System","keywords":"感染症 抗菌薬 培養 感染フォーカス de-escalation WBC CRP PCT 炎症マーカー"},
  {"title":"#8 Nutritional / Metabolic 栄養/代謝系","url":"pages/schedule-icu-conf.html#sys-nutr","desc":"ICUカンファレンス › By System","keywords":"栄養 代謝 経腸栄養 EN PN 血糖管理 インスリン カロリー 蛋白 180mg/dL"},
  {"title":"#9 Musculoskeletal 筋骨格系","url":"pages/schedule-icu-conf.html#sys-msk","desc":"ICUカンファレンス › By System","keywords":"筋骨格 リハビリ ICU-AW 安静度 四肢筋力 嚥下力 咳嗽力 離床 PT"},
  {"title":"#10 Prophylaxis 予防","url":"pages/schedule-icu-conf.html#sys-ppx","desc":"ICUカンファレンス › By System","keywords":"予防 DVT ストレス潰瘍 PPI VAP バンドル せん妄 ABCDEF ヘパリン クレキサン 褥瘡 口腔ケア"},

  // ── ID×ICUカンファレンス ──
  {"title":"ID×ICUカンファレンス","url":"pages/schedule-weekly-id-icu.html","desc":"感染症科 森先生による週1レクチャー","keywords":"感染症 森先生 毎週水曜 13:30 ID"},
  {"title":"抗菌薬を学ぶ","url":"pages/schedule-weekly-id-icu.html#id-antibiotics","desc":"ID×ICU › カテゴリ","keywords":"抗菌薬 PK PD アレルギー 耐性GNR 新規抗菌薬 Corynebacterium Prolonged infusion 殺菌性 静菌性"},
  {"title":"真菌感染症","url":"pages/schedule-weekly-id-icu.html#id-fungal","desc":"ID×ICU › カテゴリ","keywords":"Candida 菌血症 Aspergillus ムーコル 真菌"},
  {"title":"免疫不全・予防","url":"pages/schedule-weekly-id-icu.html#id-immunodeficiency","desc":"ID×ICU › カテゴリ","keywords":"免疫不全 CMV Prophylaxis 血液内科 予防抗菌薬 非定型肺炎"},
  {"title":"臓器別感染症","url":"pages/schedule-weekly-id-icu.html#id-organ","desc":"ID×ICU › カテゴリ","keywords":"VAP CRBSI CLABSI 髄膜炎 脳膿瘍 腹腔内感染症 β-ラクタム"},

  // ── 腎臓内科カンファレンス ──
  {"title":"血液透析患者のプレゼンテーション","url":"pages/schedule-renal-conf.html","desc":"腎臓内科カンファレンス 8:15","keywords":"腎臓内科 透析 プレゼン"},
  {"title":"STEP 0 プレゼンの心得","url":"pages/schedule-renal-conf.html#renal-step0","desc":"腎臓内科カンファレンス","keywords":"心得 腎電解質 大方針"},
  {"title":"STEP 1 CKDか？AKIか？","url":"pages/schedule-renal-conf.html#renal-step1","desc":"腎臓内科カンファレンス","keywords":"CKD AKI 患者背景 透析 貧血 MBD DW シャント バスキャス"},
  {"title":"STEP 2 溶質除去が必要か","url":"pages/schedule-renal-conf.html#renal-step2","desc":"腎臓内科カンファレンス","keywords":"溶質除去 AIUE 適応 高K血症 BUN 尿毒症 アシデミア"},
  {"title":"STEP 3 除水が必要か","url":"pages/schedule-renal-conf.html#renal-step3","desc":"腎臓内科カンファレンス","keywords":"除水 限外濾過 ECUM ドライウェイト UFR"},
  {"title":"透析離脱の評価","url":"pages/schedule-renal-conf.html#renal-weaning","desc":"腎臓内科カンファレンス","keywords":"透析離脱 尿量 評価"},
  {"title":"プレゼンテーション例","url":"pages/schedule-renal-conf.html#renal-examples","desc":"腎臓内科カンファレンス","keywords":"プレゼン例 CKDG5D Septic AKI HD 高カリウム"},
  {"title":"Kt/V 透析効率","url":"pages/schedule-renal-conf.html#renal-ktv","desc":"腎臓内科カンファレンス › STEP UP","keywords":"Kt/V 透析効率 透析処方"},

  // ── 動画講座集 カテゴリ ──
  {"title":"聖路加ICU動画講座集","url":"pages/video-lectures.html","desc":"ICUスタッフによる動画講座 全54本","keywords":"動画 講座 ビデオ レクチャー"},
  {"title":"ヒューマンケア・意思決定支援","url":"pages/video-lectures.html#vid-humancare","desc":"動画講座集 › カテゴリ","keywords":"ヒューマンケア 意思決定 ACP チーム医療 石塚 瀬尾 石上"},
  {"title":"呼吸管理","url":"pages/video-lectures.html#vid-respiratory","desc":"動画講座集 › カテゴリ","keywords":"呼吸管理 抜管 肺メカニクス 経肺圧 ARDS NPPV 小児"},
  {"title":"人工呼吸器","url":"pages/video-lectures.html#vid-ventilator","desc":"動画講座集 › カテゴリ","keywords":"人工呼吸器 アラーム 非同調 ASV INTELLiVENT"},
  {"title":"ECMO","url":"pages/video-lectures.html#vid-ecmo","desc":"動画講座集 › カテゴリ","keywords":"ECMO 体外式膜型人工肺 村上"},
  {"title":"鎮静・鎮痛・せん妄","url":"pages/video-lectures.html#vid-sedation","desc":"動画講座集 › カテゴリ","keywords":"鎮静 鎮痛 せん妄 不眠 Sedline 石塚 林 山田"},
  {"title":"神経集中治療","url":"pages/video-lectures.html#vid-neuro","desc":"動画講座集 › カテゴリ","keywords":"神経 脳波 モニタリング 藤本"},
  {"title":"循環・ショック・輸液","url":"pages/video-lectures.html#vid-circulation","desc":"動画講座集 › カテゴリ","keywords":"循環 ショック 輸液 LiDCO 体温管理 敗血症 MAP CVP PAカテ"},
  {"title":"腎・電解質・透析","url":"pages/video-lectures.html#vid-renal","desc":"動画講座集 › カテゴリ","keywords":"腎 電解質 透析 低ナトリウム 血液ガス"},
  {"title":"感染症・薬剤","url":"pages/video-lectures.html#vid-infection","desc":"動画講座集 › カテゴリ","keywords":"感染症 薬剤 抗菌薬 COVID"},
  {"title":"血液内科","url":"pages/video-lectures.html#vid-hematology","desc":"動画講座集 › カテゴリ","keywords":"血液内科 AML 造血幹細胞移植 リンパ腫 藤野"},
  {"title":"画像","url":"pages/video-lectures.html#vid-imaging","desc":"動画講座集 › カテゴリ","keywords":"画像 胸部X線 読影 石井"},

  // ── ICUのルール ──
  {"title":"ICUのルール","url":"pages/rules.html","desc":"ICUの基本ルール","keywords":"ルール 規則"},
  {"title":"看護師への情報伝達","url":"pages/rules.html#rule-point1","desc":"ICUのルール › ポイント①","keywords":"看護師 オーダーシート 口頭オーダー 情報伝達"},
  {"title":"手技について","url":"pages/rules.html#rule-point2","desc":"ICUのルール › ポイント②","keywords":"手技 タイムアウト 30分 交代"},
  {"title":"定期処方とバンコマイシン","url":"pages/rules.html#rule-point3","desc":"ICUのルール › ポイント③","keywords":"定期処方 バンコマイシン 木曜日 血中濃度"},
  {"title":"ICUセットから展開してオーダー","url":"pages/rules.html#rule-point4","desc":"ICUのルール › ポイント④","keywords":"ICUセット オーダー エラー"},
  {"title":"ICUリーダーに情報共有","url":"pages/rules.html#rule-point5","desc":"ICUのルール › ポイント⑤","keywords":"リーダー 情報共有 チャット 血液内科 総合診療科 心臓血管外科"},
  {"title":"時間外申請のルール","url":"pages/rules.html#rule-overtime","desc":"ICUのルール","keywords":"時間外 残業 申請 80時間 打刻 自己研鑽"},
  {"title":"主食10点","url":"pages/rules.html#rule-10points","desc":"ICUのルール","keywords":"十箇条 心得 感染防御 上級医報告 主科報告 カルテ 検査"},
  {"title":"愛されローテーターになるために","url":"pages/rules.html#rule-loved","desc":"ICUのルール › ＋α","keywords":"愛される 名前 駆けつけ プラスアルファ"},

  // ── チーム編成 ──
  {"title":"ICUのチーム編成","url":"pages/icu-team.html","desc":"日勤フォーメーションと各役割","keywords":"チーム編成 フォーメーション 組織 ICUリーダー 病床リーダー スタッフ ローテーター 病棟長 レジデント フェロー 研修医"},

  // ── ICU PASSPORT ──
  {"title":"ICU PASSPORT","url":"pages/icu-passport.html","desc":"ローテーション中のレクチャーシート","keywords":"パスポート レクチャーシート 学習 評価 修了 サイン 賞品"},
  {"title":"ICU PASSPORT レクチャーシート","url":"pages/icu-passport.html#passport-main","desc":"ICU PASSPORT › シート1","keywords":"レクチャー サイン 修了 賞品"},
  {"title":"10CVCs Challenge Pack","url":"pages/icu-passport.html#passport-cvcs","desc":"ICU PASSPORT › シート2","keywords":"CV PICC バスキャス ライン 10本 手技"},
  {"title":"TOP-10 ICU Essential Cases Pack","url":"pages/icu-passport.html#passport-cases","desc":"ICU PASSPORT › シート3","keywords":"疾患 10疾患 手技 経験 8症例"},
  {"title":"5 RRS or ICU Admission Pack","url":"pages/icu-passport.html#passport-rrs","desc":"ICU PASSPORT › シート4","keywords":"RRS 相談PHS 緊急入室 5症例"},

  // ── 強化パック ──
  {"title":"ラインパック","url":"pages/learning-packs.html","desc":"強化パック4種","keywords":"CV PICC バスキャス ライン 10本 手技"},
  {"title":"疾患パック","url":"pages/learning-packs.html","desc":"強化パック4種","keywords":"疾患 10疾患 手技 経験 8症例"},
  {"title":"相談PHSパック","url":"pages/learning-packs.html","desc":"強化パック4種","keywords":"PHS 相談 緊急入室 5症例"},
  {"title":"コンプリート賞","url":"pages/learning-packs.html","desc":"強化パック4種","keywords":"コンプリート 全達成 賞品"},

  // ── スケジュール系 ──
  {"title":"朝カンファレンス前の準備","url":"pages/schedule-morning-prep.html","desc":"7:00 日勤スケジュール","keywords":"朝カンファレンス 準備 7:00 日勤 朝"},
  {"title":"日勤への申し送り","url":"pages/schedule-morning-handover.html","desc":"7:00 夜勤→日勤","keywords":"日勤 申し送り 7:00 夜勤 ハンドオーバー 引き継ぎ"},
  {"title":"病棟業務","url":"pages/schedule-ward-work.html","desc":"9:00 日勤スケジュール","keywords":"病棟業務 9:00 日勤"},
  {"title":"ICU入室時のTo Do List","url":"pages/schedule-ward-work.html#ward-admission","desc":"病棟業務 › SECTION 1","keywords":"入室 セット展開 同意書 スコア 採血 レントゲン Admission Daily Chart"},
  {"title":"ICU退室時のTo Do List","url":"pages/schedule-ward-work.html#ward-discharge","desc":"病棟業務 › SECTION 2","keywords":"退室 内科 外科 デバイス抜去 A-line CVC Foley PRN 酸素コメント 申し送り"},
  {"title":"ICUカルテに関するSOS","url":"pages/schedule-ward-work.html#ward-karte","desc":"病棟業務 › SECTION 3","keywords":"カルテ ICUセット 同意書 入室時セット 退室時セット オーダー 輸血 血栓予防"},
  {"title":"半日出勤の日は退勤","url":"pages/schedule-half-day.html","desc":"12:00 半日出勤制度","keywords":"半日出勤 退勤 12:00 半日勤務"},
  {"title":"夜勤への申し送り","url":"pages/schedule-day-handover.html","desc":"16:00 日勤→夜勤","keywords":"夜勤 申し送り 16:00 日勤 ハンドオーバー 引き継ぎ"},
  {"title":"日勤からの申し送り","url":"pages/schedule-night-start.html","desc":"16:00 夜勤開始","keywords":"日勤 申し送り 16:00 夜勤 夜勤開始"},
  {"title":"随時対応（夜間）","url":"pages/schedule-oncall.html","desc":"夜間の随時対応","keywords":"随時対応 夜間 夜勤 オンコール 当直"},
  {"title":"海外教科書勉強会","url":"pages/schedule-weekly-textbook.html","desc":"隔週月曜 週間スケジュール","keywords":"海外教科書 勉強会 隔週 月曜 textbook"}
];
