/**
 * 吉田先生のお悩み相談コーナー — 関連リンク自動生成
 *
 * 各 q-*.html ページに置かれた以下の構造に対して：
 *   <div class="qa-related" data-type="questions">
 *     <h3 class="qa-related-title">関連した質問</h3>
 *     <div class="qa-related-list"></div>
 *   </div>
 *   <div class="qa-related" data-type="pages">
 *     <h3 class="qa-related-title">関連したページ</h3>
 *     <div class="qa-related-list"></div>
 *   </div>
 *
 * 自動的に：
 *   - 同じ System の他の質問を「関連した質問」に挿入
 *   - YOSHIDA_RELATED_PAGES_MAP の System マッピングから「関連したページ」を挿入
 *
 * このファイル 1 つで CSS + データ + ロジックすべて完結。
 * 各ページは <script src="../../yoshida-qa-data.js"></script> を script.js の後に読むだけ。
 */

(function(){
  'use strict';

  // ===== データ：全質問 =====
  var QUESTIONS = [
    { system: 'cardio',       file: 'q-cardio-01.html',       title: '頻脈性心房細動の診かたは？' },
    { system: 'cardio',       file: 'q-cardio-02.html',       title: '入院患者の血圧が高値のとき、どう対応しますか？' },
    { system: 'resp',         file: 'q-resp-01.html',         title: 'HPVとはなんですか？' },
    { system: 'resp',         file: 'q-resp-02.html',         title: '細菌性肺炎の経過が思わしくないときに考えることは？' },
    { system: 'resp',         file: 'q-resp-03.html',         title: 'COPDの管理は？' },
    { system: 'renal',        file: 'q-renal-01.html',        title: '腎不全の原因（腎前性・腎性・腎後性）の鑑別はどう進めますか？' },
    { system: 'gi',           file: 'q-gi-01.html',           title: 'Angioectasia（消化管血管拡張症）とはなんですか？' },
    { system: 'gi',           file: 'q-gi-02.html',           title: '入院患者の肝逸脱酵素が上昇したときに考えることは？' },
    { system: 'heme',         file: 'q-heme-01.html',         title: '入院中の汎血球減少をどう考えますか？' },
    { system: 'heme',         file: 'q-heme-02.html',         title: '入院患者の貧血で、鉄欠乏と慢性炎症をどう判断しますか？' },
    { system: 'heme',         file: 'q-heme-03.html',         title: '貧血の鑑別でMCVだけで判断していい？' },
    { system: 'id',           file: 'q-id-01.html',           title: '細菌感染症で入院中、経過が思わしくないときに考えることは？' },
    { system: 'id',           file: 'q-id-02.html',           title: '蜂窩織炎の治療期間はどのくらいですか？' },
    { system: 'nutrition',    file: 'q-nutrition-01.html',    title: '血糖降下薬を使っていない患者さんで低血糖がありました（早朝空腹時）。どう考えますか？' },
    { system: 'nutrition',    file: 'q-nutrition-02.html',    title: '病棟でのインスリン療法の基本' },
    { system: 'presentation', file: 'q-presentation-01.html', title: '病棟でのプレゼンテーションのポイントは？' },
    { system: 'other',        file: 'q-other-01.html',        title: '病棟業務のToDoの優先順位がうまくつけられません。どう考えればよいですか？' }
  ];

  // ===== データ：System ごとの関連ページ =====
  // 各エントリ：{ kind: 'gl'/'paper'/'disease'/'note'/'misc', title: '実ページタイトルベース', url: '相対パス' }
  // パスは pages/yoshida-qa/q-*.html から見た相対パス
  var RELATED_PAGES = {
    cardio: [
      { kind: 'gl',      title: '2023 ACC/AHA/ACCP/HRS 心房細動診断・管理ガイドライン',                         url: '../articles-gl-acc-aha-af2023.html' },
      { kind: 'paper',   title: '心房細動（AF）— JAMA Review 2024',                                                url: '../articles-gl-af-jama2024.html' },
      { kind: 'paper',   title: 'AF合併心不全のGDMT — JACC State-of-the-Art 2024',                                url: '../articles-gl-af-hf-jacc2024.html' },
      { kind: 'disease', title: '心房細動（AF）— 急性期管理・抗凝固・レート/リズムコントロール',                  url: '../disease-topics/dt-af.html' },
      { kind: 'gl',      title: 'JCS/JHFS 2025 心不全診療ガイドライン',                                            url: '../articles-gl-jcs-hf2025.html' },
      { kind: 'paper',   title: '右心カテーテル血行動態評価 実践ガイド — JACC HF 2024',                          url: '../articles-gl-rhc-hf2024.html' },
      { kind: 'paper',   title: 'ループ利尿薬の正しい使い方 — BMJ 2019',                                          url: '../articles-gl-loop-diuretics-bmj2019.html' },
      { kind: 'gl',      title: '2026 AHA/ACC 急性肺塞栓症ガイドライン',                                          url: '../articles-gl-aha-pe2026.html' },
      { kind: 'gl',      title: 'JCS/JPCPHS 2025 肺血栓塞栓症・深部静脈血栓症ガイドライン',                       url: '../articles-gl-jcs-vte2025.html' },
      { kind: 'paper',   title: '心臓ペースメーカー 包括的最新総説 — NEJM Evidence 2025',                        url: '../articles-gl-pacemaker-nejm2025.html' },
      { kind: 'paper',   title: '2025 ACC 標的抗がん療法の心毒性 Concise Clinical Guidance',                       url: '../articles-gl-acc-targeted-onco2025.html' }
    ],
    resp: [
      { kind: 'gl',      title: 'ATS ARDS管理ガイドライン 2024（更新版）',                                         url: '../articles-gl-ats-ards2024.html' },
      { kind: 'gl',      title: 'ESICM ARDS ガイドライン 2023 — 定義・表現型・呼吸サポート',                      url: '../articles-gl-esicm-ards2023.html' },
      { kind: 'paper',   title: 'ARDSにおける右心不全 — Eur Respir Rev 2025',                                     url: '../articles-gl-rhd-ards2025.html' },
      { kind: 'disease', title: 'ARDSの呼吸管理と右心不全',                                                       url: '../disease-topics/dt-ards.html' },
      { kind: 'paper',   title: '腹臥位療法（Prone Positioning）最新エビデンスと実践 — ICM 2024',                  url: '../articles-gl-prone-icm2024.html' },
      { kind: 'paper',   title: '成人の急性期気道管理 State of the Art Review — BMJ 2026',                          url: '../articles-gl-airway-acute2026.html' },
      { kind: 'gl',      title: 'BTS 胸水疾患ガイドライン 2023',                                                    url: '../articles-gl-bts-pleural2023.html' },
      { kind: 'paper',   title: '低酸素性呼吸不全における気管挿管の閾値 — AJRCCM 2023',                            url: '../articles-gl-yarnell-imv2023.html' },
      { kind: 'paper',   title: 'ENIO研究：ABI患者のSBTモードと抜管予後 — ICM 2025',                              url: '../articles-gl-enio-extubation2025.html' },
      { kind: 'gl',      title: 'GINA 2026 喘息グローバル戦略レポート',                                             url: '../articles-gl-gina2026.html' },
      { kind: 'paper',   title: 'HFNC初期流量とAECOPD — ネットワークメタ解析 Pulmonology 2025',                  url: '../articles-gl-hfnc-copd-nma2025.html' },
      { kind: 'disease', title: '人工呼吸管理 Level 1 — 基礎',                                                      url: '../disease-topics/dt-vent-basic.html' },
      { kind: 'disease', title: '人工呼吸管理 Level 2 — ウィーニング・抜管',                                        url: '../disease-topics/dt-vent-weaning.html' },
      { kind: 'disease', title: '人工呼吸管理 Level 3 — HFNC・NIV・酸素療法',                                       url: '../disease-topics/dt-vent-advanced.html' },
      { kind: 'disease', title: '人工呼吸管理 Level 4 — 特殊病態・ECMO',                                           url: '../disease-topics/dt-vent-special.html' },
      { kind: 'paper',   title: 'インフルエンザ総説 — Lancet Seminar 2022（Uyeki）',                              url: '../articles-gl-influenza-lancet2022.html' },
      { kind: 'note',    title: 'VAP（人工呼吸器関連肺炎）板書ノート',                                              url: '../id-icu-notes/note-vap.html' },
      { kind: 'note',    title: '非定型肺炎・免疫不全・PcP 板書ノート',                                            url: '../id-icu-notes/note-atypical-pneumonia.html' }
    ],
    renal: [
      { kind: 'gl',      title: 'KDIGO 2026 AKI/AKD ガイドライン',                                                  url: '../articles-gl-kdigo-aki2026.html' },
      { kind: 'paper',   title: 'SA-AKI コンセンサスレポート ADQI 28th — Nature Reviews Nephrology 2023',         url: '../articles-gl-sa-aki2023.html' },
      { kind: 'disease', title: 'AKI — 診断・管理・敗血症関連',                                                    url: '../disease-topics/dt-aki.html' },
      { kind: 'gl',      title: 'KDIGO 2026 CKD貧血管理ガイドライン',                                              url: '../articles-gl-kdigo-anemia2026.html' },
      { kind: 'paper',   title: '低Na血症の診断と管理 — JAMA Review 2022',                                          url: '../articles-gl-hyponatremia-jama2022.html' },
      { kind: 'paper',   title: '低Na血症 治療スタンダード 2024 — NDT',                                             url: '../articles-gl-hyponatremia-ndt2024.html' },
      { kind: 'disease', title: '低ナトリウム血症 — 鑑別と治療',                                                   url: '../disease-topics/dt-hyponatremia.html' },
      { kind: 'paper',   title: 'ICU獲得性高Na血症：経腸フリーウォーター vs 5%ブドウ糖 — JA 2023',                  url: '../articles-gl-hypernatremia-ja2023.html' },
      { kind: 'paper',   title: '高Na血症の治療 — 補正速度と死亡率の関係 SR・MA — J Crit Care 2025',              url: '../articles-gl-hypernatremia-meta2025.html' },
      { kind: 'disease', title: '高ナトリウム血症 — 診断・治療',                                                   url: '../disease-topics/dt-hypernatremia.html' },
      { kind: 'paper',   title: '脳性塩類喪失症候群（CSW）— UpToDate Review 2026',                                url: '../articles-gl-csw-uptodate2026.html' },
      { kind: 'paper',   title: 'ICU POC vs 中央検査室 電解質測定の乖離 — CCM 2026',                              url: '../articles-gl-poc-electrolytes2026.html' },
      { kind: 'paper',   title: '代謝性アシドーシス 最新エビデンス — ICM 2025',                                    url: '../articles-gl-metabolic-acidosis2025.html' },
      { kind: 'paper',   title: '混合性酸塩基平衡障害 Core Curriculum 2025 — AJKD',                                url: '../articles-gl-mixed-acidbase2025.html' },
      { kind: 'paper',   title: 'Stewart light — 複雑な酸塩基平衡異常への実践的アプローチ — ICM 2026',           url: '../articles-gl-stewartlight-icm2026.html' },
      { kind: 'disease', title: '酸塩基平衡障害 — 系統的アプローチ',                                               url: '../disease-topics/dt-acidbase.html' }
    ],
    gi: [
      { kind: 'gl',      title: 'ACG 急性膵炎管理ガイドライン 2024',                                                url: '../articles-gl-acg-pancreatitis2024.html' },
      { kind: 'gl',      title: 'ACG 急性肝不全（ALF）ガイドライン 2023',                                          url: '../articles-gl-acg-alf2023.html' },
      { kind: 'paper',   title: '急性肝不全（ALF）— Lancet Seminar 2024',                                          url: '../articles-gl-alf-lancet2024.html' },
      { kind: 'paper',   title: '急性肝不全（ALF）の管理と予後 — UpToDate 2025',                                   url: '../articles-gl-alf-uptodate2025.html' },
      { kind: 'paper',   title: '肝不全患者のアンモニア管理 — J Crit Care 2024',                                   url: '../articles-gl-ammonia-jcrc2024.html' },
      { kind: 'paper',   title: '腫瘍崩壊症候群（TLS） NEJM総説 2025',                                              url: '../articles-gl-tls-nejm2025.html' },
      { kind: 'note',    title: '腹腔内感染症（IAI）板書ノート',                                                    url: '../id-icu-notes/note-iai.html' }
    ],
    heme: [
      { kind: 'gl',      title: 'ASFA 第9版 治療的アフェレーシス ガイドライン 2023',                                url: '../articles-gl-asfa9-jca2023.html' },
      { kind: 'paper',   title: 'ICU血小板減少症 DIC vs TMA 鑑別アルゴリズム（Vincent 2018）',                      url: '../articles-gl-dic-tma2018.html' },
      { kind: 'paper',   title: '血小板減少症の評価と管理 — AFP 2022',                                              url: '../articles-gl-thrombocytopenia-afp2022.html' },
      { kind: 'paper',   title: '血小板減少症の鑑別フロー — Intensivist 2026',                                     url: '../articles-gl-thrombocytopenia2026.html' },
      { kind: 'paper',   title: '免疫性血栓性血小板減少性紫斑病（iTTP）JAMA総説 2025',                              url: '../articles-gl-ittp-jama2025.html' },
      { kind: 'paper',   title: 'TTP管理の最前線 — 血漿交換・リツキシマブ・カプラシズマブ — Blood Reviews 2022',  url: '../articles-gl-ttp-blood2022.html' },
      { kind: 'paper',   title: '妊娠関連TTP — How I Treat（Blood 2020）',                                          url: '../articles-gl-ttp-pregnancy-blood2020.html' },
      { kind: 'disease', title: 'TTP（血栓性血小板減少性紫斑病）',                                                  url: '../disease-topics/dt-ttp.html' },
      { kind: 'gl',      title: '聖路加ICU 輸血ガイド',                                                              url: '../articles-gl-transfusion2026.html' },
      { kind: 'gl',      title: 'HiHASC HLH診断・精査ガイドライン 2023',                                            url: '../articles-gl-hihasc-hlh2023.html' }
    ],
    id: [
      { kind: 'note',    title: '発熱性好中球減少症（FN）板書ノート',                                                url: '../id-icu-notes/note-fn.html' },
      { kind: 'note',    title: '感染性心内膜炎（IE）板書ノート',                                                    url: '../id-icu-notes/note-ie.html' },
      { kind: 'note',    title: '腹腔内感染症（IAI）板書ノート',                                                    url: '../id-icu-notes/note-iai.html' },
      { kind: 'note',    title: 'VAP（人工呼吸器関連肺炎）板書ノート',                                              url: '../id-icu-notes/note-vap.html' },
      { kind: 'note',    title: 'CMV感染症 板書ノート',                                                              url: '../id-icu-notes/note-cmv.html' },
      { kind: 'note',    title: '侵襲性アスペルギルス症・ムーコル症 板書ノート',                                    url: '../id-icu-notes/note-aspergillus-mucor.html' },
      { kind: 'note',    title: '非定型肺炎・免疫不全・PcP 板書ノート',                                              url: '../id-icu-notes/note-atypical-pneumonia.html' },
      { kind: 'note',    title: '髄膜炎・脳膿瘍 板書ノート',                                                          url: '../id-icu-notes/note-meningitis.html' },
      { kind: 'gl',      title: 'IDSA 2024 耐性グラム陰性菌感染症治療ガイダンス',                                  url: '../articles-gl-idsa-amr-gnr2024.html' },
      { kind: 'gl',      title: 'IDSA 2025 複雑性尿路感染症（cUTI）管理ガイドライン',                              url: '../articles-gl-uti-idsa2025.html' },
      { kind: 'gl',      title: 'SHEA/IDSA 2021 CDI管理ガイドライン Focused Update',                                url: '../articles-gl-cdi-shea2021.html' },
      { kind: 'paper',   title: 'ムーコル症（Mucormycosis）NEJM総説 2026',                                          url: '../articles-gl-mucormycosis-nejm2026.html' },
      { kind: 'paper',   title: '菌血症の抗菌薬投与期間 7日 vs 14日 — BALANCE試験 NEJM 2025',                       url: '../articles-gl-balance-bacteremia2025.html' },
      { kind: 'disease', title: '菌血症の抗菌薬投与期間は？',                                                        url: '../disease-topics/dt-bacteremia-duration.html' },
      { kind: 'misc',    title: '【感染症】細菌マップ — ICU主要起因菌の総覧',                                       url: '../bacteria-map.html' }
    ],
    nutrition: [
      { kind: 'gl',      title: 'ADA SoC 2026 第6章 血糖目標・低血糖・高血糖クリーゼ',                              url: '../articles-gl-ada-soc2026-ch6.html' },
      { kind: 'gl',      title: 'ADA SoC 2026 第9章 血糖降下薬の選択',                                              url: '../articles-gl-ada-soc2026-ch9.html' },
      { kind: 'gl',      title: 'ADA SoC 2026 第11章 CKD・リスク管理',                                              url: '../articles-gl-ada-soc2026-ch11.html' },
      { kind: 'disease', title: '糖尿病 — 診断・分類・合併症・DKA/HHS・治療薬',                                     url: '../disease-topics/dt-diabetes.html' },
      { kind: 'disease', title: 'ICUにおける血糖コントロール',                                                       url: '../disease-topics/dt-glucose.html' },
      { kind: 'paper',   title: 'GLP-1受容体作動薬 総説 — NEJM 2026',                                                url: '../articles-gl-glp1-nejm2026.html' },
      { kind: 'gl',      title: 'SCCM/ASPEN 重症患者栄養サポートガイドライン 2016',                                url: '../articles-gl-sccm-aspen-nutrition2016.html' },
      { kind: 'paper',   title: '重症患者の栄養再考 — エネルギー・タンパク質投与 — ICM 2024',                       url: '../articles-gl-stoppe-nutrition2024.html' },
      { kind: 'disease', title: 'ICUにおける栄養戦略',                                                                url: '../disease-topics/dt-nutrition.html' }
    ],
    msk: [
      { kind: 'paper',   title: '骨粗鬆症 A Review — JAMA 2025',                                                     url: '../articles-gl-osteoporosis-jama2025.html' },
      { kind: 'paper',   title: '閉経後骨粗鬆症 診断・治療 — NEJM 2023',                                            url: '../articles-gl-osteoporosis-nejm2023.html' },
      { kind: 'paper',   title: '横紋筋融解症 ナラティブレビュー — Chest 2026',                                     url: '../articles-gl-rhabdo-chest2026.html' }
    ],
    ppx: [
      { kind: 'gl',      title: 'JCS/JPCPHS 2025 肺血栓塞栓症・深部静脈血栓症ガイドライン',                       url: '../articles-gl-jcs-vte2025.html' },
      { kind: 'disease', title: '肺塞栓症（PE/VTE）の診断と治療',                                                   url: '../disease-topics/dt-pe-vte.html' },
      { kind: 'paper',   title: 'ストレス潰瘍予防：H2RA vs PPI — 敗血症性ショック患者 — CCM 2025',                  url: '../articles-gl-sup-septicshock2025.html' },
      { kind: 'paper',   title: 'PCP（ニューモシスチス肺炎）予防 — JAMA 2023',                                     url: '../articles-gl-pcp-prophylaxis-jama2023.html' }
    ],
    presentation: [
      { kind: 'paper',   title: '急性脳損傷後の意識回復 — JIC 2024',                                                 url: '../articles-gl-doc-jic2024.html' }
    ],
    study:        [],
    other:        [],
    neuro:        [
      { kind: 'paper',   title: 'aSAH後合併症レビュー — Critical Care 2025',                                         url: '../articles-gl-asah-cc2025.html' },
      { kind: 'disease', title: 'くも膜下出血（aSAH）の管理',                                                       url: '../disease-topics/dt-asah.html' },
      { kind: 'paper',   title: '原因不明昏睡のステップワイズ診断戦略 — ICM 2026',                                  url: '../articles-gl-coma-unknown2026.html' },
      { kind: 'paper',   title: 'てんかん重積状態の診断と治療 — Lancet Neurol 2024',                                url: '../articles-gl-se-lancetneurol2024.html' },
      { kind: 'gl',      title: '脳卒中治療ガイドライン 2021〔改訂2025〕',                                            url: '../articles-gl-jcs-stroke2025.html' },
      { kind: 'paper',   title: 'AHA/NCS 2024 心停止後の集中治療管理 科学的声明',                                   url: '../articles-gl-pcas-aha2024.html' },
      { kind: 'disease', title: '心肺蘇生後の管理（PCAS）',                                                          url: '../disease-topics/dt-pcas.html' }
    ]
  };

  // ===== データ：質問ごとの関連ページ（system マップを上書き） =====
  // 各質問のテーマに直接関連するページのみに絞り込んだリスト
  // ここに登録のない質問は RELATED_PAGES[system] にフォールバック
  var RELATED_PAGES_BY_FILE = {
    'q-cardio-01.html': [
      { kind: 'gl',      title: '2023 ACC/AHA/ACCP/HRS 心房細動診断・管理ガイドライン',                         url: '../articles-gl-acc-aha-af2023.html' },
      { kind: 'paper',   title: '心房細動（AF）— JAMA Review 2024',                                                url: '../articles-gl-af-jama2024.html' },
      { kind: 'paper',   title: 'AF合併心不全のGDMT — JACC State-of-the-Art 2024',                                url: '../articles-gl-af-hf-jacc2024.html' },
      { kind: 'paper',   title: '頻脈性AFの初期マネジメント — Zafeiropoulos JACC 2024',                          url: '../articles-gl-zafeiropoulos-af2024.html' },
      { kind: 'disease', title: '心房細動（AF）— 急性期管理・抗凝固・レート/リズムコントロール',                  url: '../disease-topics/dt-af.html' }
    ],
    'q-cardio-02.html': [
      { kind: 'paper',   title: '治療抵抗性高血圧 NEJM Review 2026',                                              url: '../articles-gl-resistant-htn2026.html' },
      { kind: 'paper',   title: '脂質異常症管理 2026',                                                            url: '../articles-gl-dyslipidemia2026.html' },
      { kind: 'gl',      title: 'JCS/JHFS 2025 心不全診療ガイドライン',                                            url: '../articles-gl-jcs-hf2025.html' }
    ],
    'q-resp-01.html': [
      { kind: 'paper',   title: 'ARDSにおける右心不全 — Eur Respir Rev 2025',                                     url: '../articles-gl-rhd-ards2025.html' },
      { kind: 'paper',   title: '腹臥位療法（Prone Positioning）最新エビデンスと実践 — ICM 2024',                  url: '../articles-gl-prone-icm2024.html' },
      { kind: 'gl',      title: 'ATS ARDS管理ガイドライン 2024（更新版）',                                         url: '../articles-gl-ats-ards2024.html' },
      { kind: 'disease', title: 'ARDSの呼吸生理（HPV/シャント・酸素化）',                                          url: '../disease-topics/dt-ards-resp.html' }
    ],
    'q-resp-02.html': [
      { kind: 'paper',   title: '重症市中肺炎（SCAP）管理 — ICM 2025',                                            url: '../articles-gl-scap-icm2025.html' },
      { kind: 'paper',   title: '市中肺炎へのステロイド療法 — Chest 2025',                                        url: '../articles-gl-steroid-cap2025.html' },
      { kind: 'note',    title: 'VAP（人工呼吸器関連肺炎）板書ノート',                                            url: '../id-icu-notes/note-vap.html' },
      { kind: 'note',    title: '非定型肺炎・免疫不全・PcP 板書ノート',                                            url: '../id-icu-notes/note-atypical-pneumonia.html' },
      { kind: 'paper',   title: 'インフルエンザ総説 — Lancet Seminar 2022',                                       url: '../articles-gl-influenza-lancet2022.html' }
    ],
    'q-resp-03.html': [
      { kind: 'paper',   title: 'HFNC初期流量とAECOPD — ネットワークメタ解析 Pulmonology 2025',                  url: '../articles-gl-hfnc-copd-nma2025.html' }
    ],
    'q-renal-01.html': [
      { kind: 'gl',      title: 'KDIGO 2026 AKI/AKD ガイドライン',                                                url: '../articles-gl-kdigo-aki2026.html' },
      { kind: 'paper',   title: 'SA-AKI コンセンサスレポート ADQI 28th — Nature Reviews Nephrology 2023',         url: '../articles-gl-sa-aki2023.html' },
      { kind: 'disease', title: 'AKI — 診断・管理・敗血症関連',                                                    url: '../disease-topics/dt-aki.html' }
    ],
    'q-gi-01.html': [
      { kind: 'gl',      title: 'KDIGO 2026 CKD貧血管理ガイドライン',                                              url: '../articles-gl-kdigo-anemia2026.html' }
    ],
    'q-gi-02.html': [
      { kind: 'gl',      title: 'ACG 急性肝不全（ALF）ガイドライン 2023',                                          url: '../articles-gl-acg-alf2023.html' },
      { kind: 'paper',   title: '急性肝不全（ALF）— Lancet Seminar 2024',                                          url: '../articles-gl-alf-lancet2024.html' },
      { kind: 'paper',   title: '急性肝不全（ALF）の管理と予後 — UpToDate 2025',                                   url: '../articles-gl-alf-uptodate2025.html' },
      { kind: 'paper',   title: '慢性HBV感染症 包括レビュー — NEJM 2026',                                          url: '../articles-gl-hbv-review2026.html' }
    ],
    'q-heme-01.html': [
      { kind: 'paper',   title: '血小板減少症の鑑別フロー — Intensivist 2026',                                     url: '../articles-gl-thrombocytopenia2026.html' },
      { kind: 'paper',   title: '血小板減少症の評価と管理 — AFP 2022',                                              url: '../articles-gl-thrombocytopenia-afp2022.html' },
      { kind: 'gl',      title: 'HiHASC HLH診断・精査ガイドライン 2023',                                            url: '../articles-gl-hihasc-hlh2023.html' }
    ],
    'q-heme-02.html': [
      { kind: 'gl',      title: 'KDIGO 2026 CKD貧血管理ガイドライン',                                              url: '../articles-gl-kdigo-anemia2026.html' }
    ],
    'q-heme-03.html': [
      { kind: 'gl',      title: 'KDIGO 2026 CKD貧血管理ガイドライン',                                              url: '../articles-gl-kdigo-anemia2026.html' }
    ],
    'q-id-01.html': [
      { kind: 'paper',   title: '菌血症の抗菌薬投与期間 7日 vs 14日 — BALANCE試験 NEJM 2025',                       url: '../articles-gl-balance-bacteremia2025.html' },
      { kind: 'disease', title: '菌血症の抗菌薬投与期間は？',                                                        url: '../disease-topics/dt-bacteremia-duration.html' },
      { kind: 'note',    title: 'VAP（人工呼吸器関連肺炎）板書ノート',                                              url: '../id-icu-notes/note-vap.html' },
      { kind: 'note',    title: '腹腔内感染症（IAI）板書ノート',                                                    url: '../id-icu-notes/note-iai.html' },
      { kind: 'note',    title: '感染性心内膜炎（IE）板書ノート',                                                    url: '../id-icu-notes/note-ie.html' },
      { kind: 'note',    title: '発熱性好中球減少症（FN）板書ノート',                                                url: '../id-icu-notes/note-fn.html' },
      { kind: 'gl',      title: 'IDSA 2024 耐性グラム陰性菌感染症治療ガイダンス',                                  url: '../articles-gl-idsa-amr-gnr2024.html' }
    ],
    'q-id-02.html': [
      { kind: 'paper',   title: '菌血症の抗菌薬投与期間 7日 vs 14日 — BALANCE試験 NEJM 2025',                       url: '../articles-gl-balance-bacteremia2025.html' },
      { kind: 'disease', title: '菌血症の抗菌薬投与期間は？',                                                        url: '../disease-topics/dt-bacteremia-duration.html' }
    ],
    'q-nutrition-01.html': [
      { kind: 'gl',      title: 'ADA SoC 2026 第16章 入院時の糖尿病ケア',                                          url: '../articles-gl-ada-soc2026-ch16.html' },
      { kind: 'gl',      title: 'ADA SoC 2026 第6章 血糖目標・低血糖・高血糖クリーゼ',                              url: '../articles-gl-ada-soc2026-ch6.html' },
      { kind: 'disease', title: 'ICUにおける血糖コントロール',                                                       url: '../disease-topics/dt-glucose.html' },
      { kind: 'disease', title: '糖尿病 — 診断・分類・合併症・DKA/HHS・治療薬',                                     url: '../disease-topics/dt-diabetes.html' },
      { kind: 'paper',   title: 'IVインスリンからSCインスリンへの切替え — Endocr Pract 2020',                       url: '../articles-gl-insulin-iv2sc2020.html' },
      { kind: 'paper',   title: 'NICE-SUGAR試験 — 重症患者の血糖管理 NEJM 2009',                                    url: '../articles-gl-nice-sugar-nejm2009.html' }
    ],
    'q-nutrition-02.html': [
      { kind: 'gl',      title: 'ADA SoC 2026 第16章 入院時の糖尿病ケア',                                          url: '../articles-gl-ada-soc2026-ch16.html' },
      { kind: 'gl',      title: 'ADA SoC 2026 第6章 血糖目標・低血糖・高血糖クリーゼ',                              url: '../articles-gl-ada-soc2026-ch6.html' },
      { kind: 'paper',   title: 'IVインスリンからSCインスリンへの切替え — Endocr Pract 2020',                       url: '../articles-gl-insulin-iv2sc2020.html' },
      { kind: 'paper',   title: 'NICE-SUGAR試験 — 重症患者の血糖管理 NEJM 2009',                                    url: '../articles-gl-nice-sugar-nejm2009.html' },
      { kind: 'disease', title: 'ICUにおける血糖コントロール',                                                       url: '../disease-topics/dt-glucose.html' },
      { kind: 'disease', title: '糖尿病 — 診断・分類・合併症・DKA/HHS・治療薬',                                     url: '../disease-topics/dt-diabetes.html' }
    ],
    'q-presentation-01.html': [],
    'q-other-01.html': []
  };

  // カテゴリラベル & スタイル
  var KIND_LABEL = {
    gl:      'GL',
    paper:   '論文',
    disease: '疾患',
    note:    '板書',
    misc:    'その他'
  };

  // ===== CSS 注入 =====
  var STYLE_ID = 'yoshida-qa-related-style';
  if(!document.getElementById(STYLE_ID)){
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.qa-related { margin-top:24px; }',
      '.qa-related-title {',
      '  font-size:0.84rem;font-weight:800;color:var(--qa-primary-dark, #134E4A);',
      '  margin:0 0 8px;padding-bottom:5px;',
      '  border-bottom:2px solid #99F6E4;letter-spacing:0.04em;',
      '}',
      '.qa-related-list { display:flex;flex-direction:column;gap:6px; }',
      '.qa-related-item {',
      '  display:flex;align-items:center;gap:10px;',
      '  background:#fff;border:1px solid #E2E8F0;border-radius:8px;',
      '  padding:9px 14px;text-decoration:none;color:inherit;',
      '  transition:box-shadow 0.15s, border-color 0.15s, transform 0.15s;',
      '}',
      '.qa-related-item:hover {',
      '  box-shadow:0 4px 12px rgba(15,118,110,0.10);',
      '  border-color:#99F6E4;transform:translateX(2px);',
      '}',
      '.qa-related-mini {',
      '  flex-shrink:0;width:22px;height:22px;border-radius:50%;',
      '  background:linear-gradient(135deg,var(--qa-primary-dark, #134E4A),var(--qa-primary, #0F766E));',
      '  color:#fff;display:inline-flex;align-items:center;justify-content:center;',
      '  font-size:0.7rem;font-weight:900;font-family:ui-monospace,Menlo,Consolas,monospace;',
      '}',
      '.qa-related-kind {',
      '  flex-shrink:0;display:inline-block;font-size:0.62rem;font-weight:800;',
      '  letter-spacing:0.06em;padding:2px 7px;border-radius:4px;',
      '  font-family:ui-monospace,Menlo,Consolas,monospace;',
      '}',
      '.qa-related-kind.kind-gl      { background:#DCFCE7;color:#15803D; }',  /* 緑：ガイドライン */
      '.qa-related-kind.kind-paper   { background:#DBEAFE;color:#1D4ED8; }',  /* 青：論文 */
      '.qa-related-kind.kind-disease { background:#FFEDD5;color:#C2410C; }',  /* 橙：疾患マニュアル */
      '.qa-related-kind.kind-note    { background:#EDE9FE;color:#6D28D9; }',  /* 紫：板書ノート */
      '.qa-related-kind.kind-misc    { background:#F1F5F9;color:#475569; }',  /* 灰：その他 */
      '.qa-related-text { flex:1;font-size:0.82rem;font-weight:600;color:var(--text);line-height:1.45; }',
      '.qa-related-empty {',
      '  font-size:0.76rem;color:var(--muted);font-style:italic;',
      '  padding:10px 14px;background:#F9FAFB;border:1px dashed var(--border);border-radius:8px;',
      '}',
      '@media (max-width: 600px){',
      '  .qa-related-title { font-size:0.78rem; }',
      '  .qa-related-text { font-size:0.76rem; }',
      '  .qa-related-item { padding:8px 12px;gap:8px; }',
      '  .qa-related-mini { width:20px;height:20px;font-size:0.66rem; }',
      '  .qa-related-kind { font-size:0.58rem;padding:2px 5px; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ===== レンダリング =====
  function render(){
    // 現在のページから system / file を抽出
    var pathParts = window.location.pathname.split('/');
    var currentFile = pathParts[pathParts.length - 1];
    var match = currentFile.match(/^q-([a-z]+)-/);
    if(!match) return;
    var currentSystem = match[1];

    // 関連した質問
    var qList = document.querySelector('.qa-related[data-type="questions"] .qa-related-list');
    if(qList){
      var related = QUESTIONS.filter(function(q){
        return q.system === currentSystem && q.file !== currentFile;
      });
      qList.innerHTML = '';
      if(related.length === 0){
        var emptyQ = document.createElement('div');
        emptyQ.className = 'qa-related-empty';
        emptyQ.textContent = '同じ System の他の質問はまだありません。';
        qList.appendChild(emptyQ);
      }else{
        related.forEach(function(q){
          var a = document.createElement('a');
          a.className = 'qa-related-item';
          a.href = q.file;
          var badge = document.createElement('span');
          badge.className = 'qa-related-mini';
          badge.textContent = 'Q';
          var text = document.createElement('span');
          text.className = 'qa-related-text';
          text.textContent = q.title;
          a.appendChild(badge);
          a.appendChild(text);
          qList.appendChild(a);
        });
      }
    }

    // 関連したページ — per-file マップを優先、なければ system マップにフォールバック
    var pList = document.querySelector('.qa-related[data-type="pages"] .qa-related-list');
    if(pList){
      var pages;
      if(Object.prototype.hasOwnProperty.call(RELATED_PAGES_BY_FILE, currentFile)){
        pages = RELATED_PAGES_BY_FILE[currentFile];
      }else{
        pages = RELATED_PAGES[currentSystem] || [];
      }
      pList.innerHTML = '';
      if(pages.length === 0){
        // 関連ページがない場合はセクションごと非表示にする
        var section = pList.closest('.qa-related');
        if(section){ section.style.display = 'none'; }
      }else{
        pages.forEach(function(p){
          var a = document.createElement('a');
          a.className = 'qa-related-item';
          a.href = p.url;
          var kind = document.createElement('span');
          kind.className = 'qa-related-kind kind-' + (p.kind || 'misc');
          kind.textContent = KIND_LABEL[p.kind] || 'その他';
          var text = document.createElement('span');
          text.className = 'qa-related-text';
          text.textContent = p.title;
          a.appendChild(kind);
          a.appendChild(text);
          pList.appendChild(a);
        });
      }
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', render);
  }else{
    render();
  }
})();
