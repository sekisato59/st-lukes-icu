/**
 * 全ページデータベース（articles-guidelines.html / disease-topics.html / git log から自動生成）
 * recent-all.html で表形式・ソート・フィルタ可能に表示
 * fields: date, genre, type, system, system_id, title, url
 * genre: 論文・GL / 疾患マニュアル / 試験ノート / スタッフ / スケジュール / ICUルール / カタログ
 * type:  RCT / コホート / 症例対照 / 横断 / メタ解析 / SR / Case / 症例集積 / Review / ガイドライン (genre=論文・GL のみ)
 */
const ALL_PAGES = [
  {
    "date":      "2026/05/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "成人の急性期気道管理 — State of the Art Review（BMJ 2026）",
    "url":       "pages/articles-gl-airway-acute2026.html"
  },
  {
    "date":      "2026/05/02",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ループ利尿薬の正しい処方法 — All-or-none効果・薬剤選択・As-needed投与（BMJ 2019）",
    "url":       "pages/articles-gl-loop-diuretics-bmj2019.html"
  },
  {
    "date":      "2026/05/02",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "てんかん重積状態の診断と治療 — 定義・病態・治療アルゴリズム（Lancet Neurol 2024）",
    "url":       "pages/articles-gl-se-lancetneurol2024.html"
  },
  {
    "date":      "2026/05/02",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "ケタミンの多様な効果：ジャック・オブ・オールトレーズ — ナラティブレビュー（BJA 2025）",
    "url":       "pages/articles-gl-ketamine-bja2025.html"
  },
  {
    "date":      "2026/05/01",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "抗菌薬TDM臨床実践ガイドライン 2022 — VCM・TEIC・アミノグリコシド・VRCZ（日本化学療法学会/日本TDM学会 2022）",
    "url":       "pages/articles-gl-tdm-antibiotics2022.html"
  },
  {
    "date":      "2026/05/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "血管ウォーターフォール現象と Critical Closing Pressure — 循環生理の統合的理解（J Crit Care 2026）",
    "url":       "pages/articles-gl-vascular-waterfall-jcc2026.html"
  },
  {
    "date":      "2026/05/01",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "バンコマイシンTDM改訂コンセンサスガイドライン 2020 — AUC/MICガイド TDM（ASHP/IDSA/PIDS/SIDP 2020）",
    "url":       "pages/articles-gl-vcm-tdm2020.html"
  },
  {
    "date":      "2026/04/29",
    "genre":     "ICUルール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICU紹介",
    "url":       "pages/about-icu.html"
  },
  {
    "date":      "2026/04/27",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "集中治療総論・質評価",
    "system_id": "art-icu-general",
    "title":     "JIPAD 2024年度 施設別年次レポート — 聖路加国際病院ICU（日本集中治療医学会 2026）",
    "url":       "pages/articles-gl-jipad2024.html"
  },
  {
    "date":      "2026/04/27",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "気管挿管導入時のフェンタニル — RCT5件のSR&メタ解析（J Intensive Care 2026）",
    "url":       "pages/articles-gl-fentanyl-induction-jic2026.html"
  },
  {
    "date":      "2026/04/24",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "Stewart light — 複雑な酸塩基平衡異常への実践的アプローチ（ICM 2026）",
    "url":       "pages/articles-gl-stewartlight-icm2026.html"
  },
  {
    "date":      "2026/04/24",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "脊髄硬膜外膿瘍（SEA） — NEJM総説（NEJM 2026）",
    "url":       "pages/articles-gl-sea-nejm2026.html"
  },
  {
    "date":      "2026/04/24",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "一過性全健忘（TGA）— 疫学・病態生理・診断・画像・鑑別・予後（UpToDate 2024）",
    "url":       "pages/articles-gl-tga-uptodate2024.html"
  },
  {
    "date":      "2026/04/24",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "機械換気成人ICU患者におけるデクスメデトミジン — ICM Rapid Practice Guideline（ICM 2022）",
    "url":       "pages/articles-gl-dex-icm2022.html"
  },
  {
    "date":      "2026/04/24",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "重症患者における限外濾過 — パーソナライズドケアの枠組み（Critical Care 2026）",
    "url":       "pages/articles-gl-uf-cc2026.html"
  },
  {
    "date":      "2026/04/22",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "急性脳損傷における温度管理 — TBI・脳卒中・心停止後の発熱管理と低体温療法（ICM 2026）",
    "url":       "pages/articles-gl-tempcontrol-abi-icm2026.html"
  },
  {
    "date":      "2026/04/19",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ERC-ESICM 2025 心拍再開後管理（PCAS）ガイドライン",
    "url":       "pages/articles-gl-pcas-erc2025.html"
  },
  {
    "date":      "2026/04/18",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "CVCの理想的な先端位置についての考察（Medical Nutritionist of PEN Leaders 2022）",
    "url":       "pages/articles-gl-cvc-tip2022.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "急性脳損傷後の意識回復 — DoC分類・CMD・予後予測・薬物療法（J Intensive Care 2024）",
    "url":       "pages/articles-gl-doc-jic2024.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "CVPモニタリングの再評価 — 忘れられた臨床的重要性（Intensive Care Med 2023）",
    "url":       "pages/articles-gl-cvp-icm2023.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "IVC呼吸変動による輸液反応性予測 — 人工呼吸下ショック患者のメタ解析（Critical Care 2018）",
    "url":       "pages/articles-gl-ivc-cc2018.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "IWGDF/IDSA 2023 糖尿病性足感染症（DFI）診断・治療ガイドライン（Clin Infect Dis 2023）",
    "url":       "pages/articles-gl-iwgdf-dfi2023.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "神経ICUにおける鎮静薬 — プロポフォール・ケタミン・デクスメデトミジンの神経特性（ICM 2025）",
    "url":       "pages/articles-gl-sedatives-neuroicu2025.html"
  },
  {
    "date":      "2026/04/16",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "NCS ガイドライン：神経集中治療患者における脳浮腫の急性期治療 — HTS・マンニトール・コルチコステロイド・非薬物療法（Neurocrit Care 2020）",
    "url":       "pages/articles-gl-ncs-cerebraledema2020.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "IDSA 2024 耐性グラム陰性菌感染症治療ガイダンス — ESBL-E・AmpC-E・CRE・DTR Pa・CRAB・S. maltophilia（CID 2024）",
    "url":       "pages/articles-gl-idsa-amr-gnr2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ESICM ARDSガイドライン 2023 — 定義・表現型・呼吸サポート戦略（ICM 2023）",
    "url":       "pages/articles-gl-esicm-ards2023.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "2025年改訂版 心不全診療ガイドライン（JCS/JHFS 2025）",
    "url":       "pages/articles-gl-jcs-hf2025.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "SR",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "「静菌 vs 殺菌」神話を斬る — 56件RCTの系統的レビュー（CID 2018）",
    "url":       "pages/articles-gl-static-cidal2018.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "HLH（血球貪食性リンパ組織球症）成人診断・精査ガイドライン（HiHASC / Lancet Rheumatol 2023）",
    "url":       "pages/articles-gl-hihasc-hlh2023.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "腹臥位療法（Prone Positioning）— 病態生理・エビデンス・実践（ICM 2024）",
    "url":       "pages/articles-gl-prone-icm2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "AF合併心不全のGDMT（JACC State-of-the-Art Review 2024）",
    "url":       "pages/articles-gl-af-hf-jacc2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "ESCMID ガイドライン：急性細菌性髄膜炎の診断と治療（Clin Microbiol Infect 2016）",
    "url":       "pages/articles-gl-escmid-bactmening2016.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "SR",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "敗血症・ARDS・CAPへのステロイド療法 2024 Focused Update（SCCM/CCM 2024）",
    "url":       "pages/articles-gl-sccm-steroid2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症・甲状腺中毒症 診断・管理ガイドライン — ATA 2016（Thyroid 2016）",
    "url":       "pages/articles-gl-hyperthyroidism-ata2016.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "肺動脈カテーテル（Swan-Ganz）— 挿入手技・波形解釈・血行動態診断（N Engl J Med 2013）",
    "url":       "pages/articles-gl-pac-nejm2013.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "細菌性髄膜炎診療ガイドライン 2014 — 第4章 検査（日本神経感染症学会・日本神経学会・日本神経外科学会）",
    "url":       "pages/articles-gl-jns-bm2014.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "右心カテーテルによる血行動態評価 実践ガイド（JACC HF 2024）",
    "url":       "pages/articles-gl-rhc-hf2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "IVC超音波による輸液反応性予測の精度 — メタ解析（JICM 2018）",
    "url":       "pages/articles-gl-ivc-fr2018.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ESPEN 2022 ICU臨床栄養 実践・部分改訂ガイドライン（Clin Nutr 2023）",
    "url":       "pages/articles-gl-espen-nutrition2022.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "集中治療超音波（CCUS）学習目標 — SOCCA専門家グループ提言（Anesth Analg 2015）",
    "url":       "pages/articles-gl-fagley-ccus2015.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "アルブミン製剤使用に関する14の提言 — ICTMG ガイドライン（CHEST 2024）",
    "url":       "pages/articles-gl-albumin-ictmg2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ATS ARDS管理ガイドライン 2024 — ステロイド・VV-ECMO・NMBA・PEEP（AJRCCM 2024）",
    "url":       "pages/articles-gl-ats-ards2024.html"
  },
  {
    "date":      "2026/04/15",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ノルエピネフリン等価スコア 更新版 — 昇圧薬換算係数（Critical Care 2025）",
    "url":       "pages/articles-gl-ne-equiv-kotani2025.html"
  },
  {
    "date":      "2026/04/14",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症 総説（JAMA 2023）",
    "url":       "pages/articles-gl-hyperthyroidism-jama2023.html"
  },
  {
    "date":      "2026/04/14",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症 — 定義・疫学・診断・治療の総括（Lancet Seminar 2024）",
    "url":       "pages/articles-gl-hyperthyroidism-lancet2024.html"
  },
  {
    "date":      "2026/04/13",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "急性肝不全（ALF）の管理と予後 — NAC・脳浮腫・KCC・肝移植（UpToDate 2025）",
    "url":       "pages/articles-gl-alf-uptodate2025.html"
  },
  {
    "date":      "2026/04/12",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "ACG ガイドライン：急性肝不全の管理（Am J Gastroenterol 2023）",
    "url":       "pages/articles-gl-acg-alf2023.html"
  },
  {
    "date":      "2026/04/11",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "急性肝不全（ALF）— 定義・疫学・病態・管理の総括（Lancet Seminar 2024）",
    "url":       "pages/articles-gl-alf-lancet2024.html"
  },
  {
    "date":      "2026/04/11",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "SCCM/ASPEN 2016 重症患者栄養サポートガイドライン（JPEN 2016）",
    "url":       "pages/articles-gl-sccm-aspen-nutrition2016.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "非重症インフルエンザへの抗ウイルス薬 NMA（JAMA Internal Medicine 2025）",
    "url":       "pages/articles-gl-influenza-nma-jamaintmed2025.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ノイラミニダーゼ阻害薬（NAI）レビュー — ザナミビル・オセルタミビル（NEJM 2005）",
    "url":       "pages/articles-gl-nai-influenza2005.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "インフルエンザ総説 — Lancet Seminar 2022（Uyeki et al.）",
    "url":       "pages/articles-gl-influenza-lancet2022.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "薬剤性免疫性血小板減少症（DIIT）— 病態生理・診断・治療（NEJM 2007）",
    "url":       "pages/articles-gl-diit-nejm2007.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "血小板減少症の評価と管理（American Family Physician 2022）",
    "url":       "pages/articles-gl-thrombocytopenia-afp2022.html"
  },
  {
    "date":      "2026/04/10",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "感染症",
    "system_id": "dt-id",
    "title":     "インフルエンザ：診断・治療・NMAエビデンス",
    "url":       "pages/disease-topics/dt-influenza.html"
  },
  {
    "date":      "2026/04/09",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "予防",
    "system_id": "art-ppx",
    "title":     "肺動脈カテーテル挿入法（Swan-Ganz カテーテル）— Videos in Clinical Medicine（N Engl J Med 2013）",
    "url":       "pages/articles-gl-pac2013.html"
  },
  {
    "date":      "2026/04/09",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "標的抗がん療法の心血管毒性 — ACC Concise Clinical Guidance（J Am Coll Cardiol 2026）",
    "url":       "pages/articles-gl-acc-targeted-onco2025.html"
  },
  {
    "date":      "2026/04/08",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "逆型たこつぼ心筋症 vs 中部/心尖部型（Clin Cardiol 2011）",
    "url":       "pages/articles-gl-song-takotsubo2011.html"
  },
  {
    "date":      "2026/04/08",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ストレス心筋症 診断と治療（JACC State-of-the-Art Review 2018）",
    "url":       "pages/articles-gl-takotsubo-jacc2018.html"
  },
  {
    "date":      "2026/04/08",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "ACG ガイドライン：急性膵炎の管理（Am J Gastroenterol 2024）",
    "url":       "pages/articles-gl-acg-pancreatitis2024.html"
  },
  {
    "date":      "2026/04/08",
    "genre":     "カタログ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "【内科外来】注目論文・最新ガイドラインまとめ",
    "url":       "pages/articles-outpatient.html"
  },
  {
    "date":      "2026/04/08",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "MI後βブロッカー長期継続 vs 中断 — SMART-DECISION試験（N Engl J Med 2026）",
    "url":       "pages/articles-gl-smart-decision2026.html"
  },
  {
    "date":      "2026/04/07",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "脳性塩類喪失症候群（CSW）— UpToDate Review（Palmer BF 2026）",
    "url":       "pages/articles-gl-csw-uptodate2026.html"
  },
  {
    "date":      "2026/04/06",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "アルブミンにまつわる10の神話（ICM 2022）",
    "url":       "pages/articles-gl-albumin-myths2022.html"
  },
  {
    "date":      "2026/04/06",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "初期ノルエピネフリン投与量と分単位のMAP応答（Critical Care 2026）",
    "url":       "pages/articles-gl-nishikimi-ne-map2026.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "重症患者への強化インスリン療法 — Van den Berghe ランドマーク試験（NEJM 2001）",
    "url":       "pages/articles-gl-vandenberghe-nejm2001.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "ASFA 第9版 治療的アフェレーシス ガイドライン（J Clin Apher 2023）",
    "url":       "pages/articles-gl-asfa9-jca2023.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "インスリン持続静脈注射→皮下注 移行プロトコール",
    "url":       "pages/articles-gl-insulin-iv2sc2020.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "肝不全患者のアンモニア管理 — ICU医が知るべき7疑問（J Crit Care 2024）",
    "url":       "pages/articles-gl-ammonia-jcrc2024.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "RABBIT 2 Surgery — 一般外科手術患者のバサルボーラス vs スライディングスケール（Diabetes Care 2011）",
    "url":       "pages/articles-gl-rabbit2-surgery2011.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "SCCM 2024 ICU血糖管理ガイドライン — 成人・小児（Crit Care Med 2024）",
    "url":       "pages/articles-gl-sccm-glycemic2024.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "NICE-SUGAR試験 — 重症患者の強化 vs 通常血糖管理（NEJM 2009）",
    "url":       "pages/articles-gl-nice-sugar-nejm2009.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "循環器系",
    "system_id": "dt-cardio",
    "title":     "心房細動（AF）",
    "url":       "pages/disease-topics/dt-af.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "人工呼吸管理 Level 4 — 特殊病態・脳障害・ECMO",
    "url":       "pages/disease-topics/dt-vent-special.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "人工呼吸管理 Level 3 — HFNC・NIV・酸素療法（インスピロン・覚醒下腹臥位）",
    "url":       "pages/disease-topics/dt-vent-advanced.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "栄養 / 代謝系",
    "system_id": "dt-nutrition",
    "title":     "ICUにおける血糖コントロール",
    "url":       "pages/disease-topics/dt-glucose.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "人工呼吸管理 Level 2 — ウィーニング・抜管（SBT・ENIO研究）",
    "url":       "pages/disease-topics/dt-vent-weaning.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "人工呼吸管理 Level 1 — 基礎（挿管閾値・肺保護換気・PEEP・酸素目標）",
    "url":       "pages/disease-topics/dt-vent-basic.html"
  },
  {
    "date":      "2026/04/05",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "ARDS — 定義・肺保護換気・PEEP最適化・腹臥位・ステロイド",
    "url":       "pages/disease-topics/dt-ards-resp.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "外傷・多発外傷の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-trauma.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "移植・臓器提供・ドナー管理 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-transplant.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "輸液・輸血・水電解質 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-fluid.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "低ナトリウム血症 治療スタンダード 2024（Nephrol Dial Transplant）",
    "url":       "pages/articles-gl-hyponatremia-ndt2024.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "胸部X線・POCUS | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-imaging.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "肝臓・胆嚢・膵臓の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-hepato.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "妊産婦の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-obstetrics.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "血液凝固線溶系の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-coagulation.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "予防",
    "system_id": "art-ppx",
    "title":     "カテーテル関連上肢静脈血栓症（UpToDate 2024）",
    "url":       "pages/articles-gl-catheter-uedvt-ut2024.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "熱傷の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-burn.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-icu-board.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "HIV感染者のニューモシスチス肺炎（PCP）予防・治療ガイドライン（NIH/HIVMA/IDSA 2025）",
    "url":       "pages/articles-gl-hiv-pcp2025.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "循環の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-circulation.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "非HIV PCP におけるステロイド補助療法の用量反応と転帰（CHEST 2025）",
    "url":       "pages/articles-gl-pcp-steroid-chest2025.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "体温異常 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-temp.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "コホート",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "たこつぼ心筋症の臨床像と転帰 — 国際登録研究（N Engl J Med 2015）",
    "url":       "pages/articles-gl-takotsubo-nejm2015.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "感染症基礎・敗血症 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-infection.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "PICS・早期リハビリテーション | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-pics.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "多臓器障害（MODS） | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-mods.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "代謝・内分泌系 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-endo.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "急性中毒の診断・治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-toxicology.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "小児の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-pediatrics.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "消化管の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-gastrointestinal.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "PCP（ニューモシスチス肺炎）予防 — 免疫不全患者の適応・薬剤・期間（JAMA 2023）",
    "url":       "pages/articles-gl-pcp-prophylaxis-jama2023.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "腎・電解質系の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-renal.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "GLP-1受容体作動薬 — 機序・エビデンス・実臨床への応用（NEJM 2026）",
    "url":       "pages/articles-gl-glp1-nejm2026.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "呼吸の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-respiratory.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "心エコー図による血行動態評価 — Forrester分類・左室充満圧・拡張機能（Heart View 2020）",
    "url":       "pages/articles-gl-echo-hf2020.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "神経系の集中治療 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-neurology.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "がん患者のPCP予防と診断 — 疾患別適応・予防薬・BAL診断（NCCN Infections GL V1.2026）",
    "url":       "pages/articles-gl-pcp-nccn2026.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "SR",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "非HIV免疫不全患者のPCP予防 — TMP/SMX で85%減少・NNT=19（Cochrane 2014）",
    "url":       "pages/articles-gl-pcp-cochrane2014.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "試験ノート",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "集中治療総論 | 集中治療専門医試験 勉強ノート",
    "url":       "pages/exam-general.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "たこつぼ症候群の病態生理（JACC State-of-the-Art Review 2021）",
    "url":       "pages/articles-gl-takotsubo-jacc2021.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "低ナトリウム血症の診断と管理 — JAMA総説（Adrogué, Tucker, Madias 2022）",
    "url":       "pages/articles-gl-hyponatremia-jama2022.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "グルコルチコイド誘発性副腎不全の診断と治療 — ESE/ES 合同臨床ガイドライン（Eur J Endocrinol 2024）",
    "url":       "pages/articles-gl-glai2025.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "たこつぼ症候群の病態生理（Circulation 2017）",
    "url":       "pages/articles-gl-takotsubo-patho2017.html"
  },
  {
    "date":      "2026/04/04",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "感染症",
    "system_id": "dt-id",
    "title":     "ニューモシスチス肺炎（PCP）",
    "url":       "pages/disease-topics/dt-pcp.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第10章 — 糖尿病の心血管疾患・リスク管理（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-cvd2026.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "チルゼパチド vs セマグルチド — 体重減少の直接比較（JAMA Intern Med 2024）",
    "url":       "pages/articles-gl-glp1-rodriguez2024.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第6章 — 血糖目標・低血糖・DKA・HHS（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-soc2026-ch6.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "フィネレノンの心腎アウトカム — FIDELITY統合解析（Eur Heart J 2022）",
    "url":       "pages/articles-gl-fidelity-ehj2022.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第16章 — 入院中の糖尿病管理（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-soc2026-ch16.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第9章 — 血糖降下薬の選択（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-soc2026-ch9.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第13章 — 高齢者の糖尿病管理（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-olderadults2026.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "HFrEF薬物療法のネットワークメタ解析（JACC Heart Failure 2022）",
    "url":       "pages/articles-gl-hfref-nma2022.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "SR",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "体液過剰の臨床的診断精度 — 系統的レビュー（JAMA 2026）",
    "url":       "pages/articles-gl-drum-volume2026.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "ADA 2026 第11章 — 糖尿病患者のCKD・リスク管理（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-soc2026-ch11.html"
  },
  {
    "date":      "2026/04/03",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ADA 2026 第12章 — 糖尿病網膜症・神経障害・足病変（Diabetes Care 2026）",
    "url":       "pages/articles-gl-ada-complications2026.html"
  },
  {
    "date":      "2026/04/02",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "テイコプラニン vs バンコマイシン — グラム陽性菌感染症 コクランメタ解析（Cochrane 2010）",
    "url":       "pages/articles-gl-teicoplanin-cochrane2010.html"
  },
  {
    "date":      "2026/04/02",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "アピキサバン vs リバーロキサバン — COBRRA試験（NEJM 2026）",
    "url":       "pages/articles-gl-cobrra-nejm2026.html"
  },
  {
    "date":      "2026/04/02",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "めまいの評価と管理 — TiTrATE・BPPV・前庭神経炎・HINTS（AFP 2023）",
    "url":       "pages/articles-gl-dizziness2023.html"
  },
  {
    "date":      "2026/04/02",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "敗血症性ショックへのアルブミン補充療法 — ARISS試験（JAMA Netw Open 2026）",
    "url":       "pages/articles-gl-ariss2026.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "妊娠関連TTP — 診断・治療・次回妊娠の管理（Blood 2020）",
    "url":       "pages/articles-gl-ttp-pregnancy-blood2020.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "ICU獲得性高ナトリウム血症 — 経腸フリーウォーター vs D5W（J Anesth 2023）",
    "url":       "pages/articles-gl-hypernatremia-ja2023.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "腫瘍崩壊症候群（TLS）— 病態生理・予防・治療（NEJM 2025）",
    "url":       "pages/articles-gl-tls-nejm2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "AECOPDに対するHFNC流量設定の比較 — NMA（Pulmonology 2025）",
    "url":       "pages/articles-gl-hfnc-copd-nma2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "脳卒中治療ガイドライン 2021〔改訂2025〕（日本脳卒中学会 2025）",
    "url":       "pages/articles-gl-jcs-stroke2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "絨毛膜羊膜炎の病因・診断・治療（AJOG 2024）",
    "url":       "pages/articles-gl-chorioamnionitis-ajog2024.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "免疫性TTP（iTTP）— 診断・治療・再発予防（JAMA 2025）",
    "url":       "pages/articles-gl-ittp-jama2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ABI患者の抜管予測因子 — ENIO研究（ICM 2025）",
    "url":       "pages/articles-gl-enio-extubation2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "肺血栓塞栓症・深部静脈血栓症（VTE）診療ガイドライン（JCS/JPCPHS 2025）",
    "url":       "pages/articles-gl-jcs-vte2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ARDSにおける右心不全 — 病態生理・診断・治療戦略（Eur Respir Rev 2025）",
    "url":       "pages/articles-gl-rhd-ards2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "TTP管理の最前線 — 急性期治療と長期管理（Blood Reviews 2022）",
    "url":       "pages/articles-gl-ttp-blood2022.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "正常血糖DKA（EDKA）の病態と管理（Am J Emerg Med 2021）",
    "url":       "pages/articles-gl-edka-ajem2021.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "市中肺炎へのステロイド補助療法 — SONIA試験（NEJM 2025）",
    "url":       "pages/articles-gl-steroid-cap2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "タイダル肺ヒステレシスによるARDS PEEP評価（Critical Care 2023）",
    "url":       "pages/articles-gl-peep-hysteresis-ards2023.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "高ナトリウム血症の補正速度と予後 — 系統的レビュー・メタ解析（J Crit Care 2025）",
    "url":       "pages/articles-gl-hypernatremia-meta2025.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "心房細動（AF）の診断と管理（JAMA 2024）",
    "url":       "pages/articles-gl-af-jama2024.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "血液系",
    "system_id": "dt-heme",
    "title":     "TTP（血栓性血小板減少性紫斑病）",
    "url":       "pages/disease-topics/dt-ttp.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "腎・電解質系",
    "system_id": "dt-renal",
    "title":     "酸塩基平衡障害",
    "url":       "pages/disease-topics/dt-acidbase.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "循環器系",
    "system_id": "dt-cardio",
    "title":     "肺塞栓症（PE/VTE）の診断と治療",
    "url":       "pages/disease-topics/dt-pe-vte.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "腎・電解質系",
    "system_id": "dt-renal",
    "title":     "ICUにおけるアルブミン投与",
    "url":       "pages/disease-topics/dt-albumin.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "栄養 / 代謝系",
    "system_id": "dt-nutrition",
    "title":     "ICUにおける栄養戦略",
    "url":       "pages/disease-topics/dt-nutrition.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "腎・電解質系",
    "system_id": "dt-renal",
    "title":     "AKI：診断・管理・敗血症関連",
    "url":       "pages/disease-topics/dt-aki.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "感染症",
    "system_id": "dt-id",
    "title":     "院内髄膜炎・脳室炎",
    "url":       "pages/disease-topics/dt-meningitis.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "呼吸器系・集中治療",
    "system_id": "dt-resp",
    "title":     "ARDSの呼吸管理と右心不全",
    "url":       "pages/disease-topics/dt-ards.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "腎・電解質系",
    "system_id": "dt-renal",
    "title":     "高ナトリウム血症",
    "url":       "pages/disease-topics/dt-hypernatremia.html"
  },
  {
    "date":      "2026/04/01",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "神経系",
    "system_id": "dt-neuro",
    "title":     "くも膜下出血（aSAH）の管理",
    "url":       "pages/disease-topics/dt-asah.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "ツムラ医療用漢方製剤一覧 — 128品目 効能・用量（薬価基準収載）",
    "url":       "pages/articles-gl-tsumura-kampo.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "HIV感染者における日和見感染症の予防・治療（CDC/NIH/HIVMA-IDSA）",
    "url":       "pages/articles-gl-hiv-oi.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "ICUルール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "【必読】ローテ開始前のTo Do",
    "url":       "pages/pre-rotation-todo.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "脂質異常症管理ガイドライン（ACC/AHA 2026）",
    "url":       "pages/articles-gl-dyslipidemia2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "胸水疾患ガイドライン（BTS 2023）",
    "url":       "pages/articles-gl-bts-pleural2023.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "急性肺塞栓症（PE）診療ガイドライン（AHA/ACC 2026）",
    "url":       "pages/articles-gl-aha-pe2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "びまん性肺胞出血（DAH）の診断・治療（CHEST 2010）",
    "url":       "pages/articles-gl-dah-chest2010.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "重症患者の栄養 — エネルギー・タンパク質投与の最新エビデンス（ICM 2024）",
    "url":       "pages/articles-gl-stoppe-nutrition2024.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "急性脳障害患者におけるSBT様式と抜管アウトカム：ENIO研究（ICM 2025）",
    "url":       "pages/articles-gl-enio-sbt2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "入院患者における経腸栄養（NEJM 2025）",
    "url":       "pages/articles-gl-en-nejm2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "ICU血小板減少症の鑑別フロー（Intensivist 2026）",
    "url":       "pages/articles-gl-thrombocytopenia2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "移植患者の免疫抑制薬と感染リスク管理（CID 2021）",
    "url":       "pages/articles-gl-immunosuppression-transplant2021.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "敗血症性心筋症（SICM）の病態・評価・管理（Chest 2025）",
    "url":       "pages/articles-gl-sicm-chest2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "医療関連脳室炎・髄膜炎ガイドライン（IDSA 2017）",
    "url":       "pages/articles-gl-idsa-havm2017.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ASPEN 2021 重症患者栄養サポートガイドライン（JPEN 2022）",
    "url":       "pages/articles-gl-aspen-nutrition2021.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "aSAH後合併症の管理戦略レビュー（Critical Care 2025）",
    "url":       "pages/articles-gl-asah-cc2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "低酸素性呼吸不全における気管挿管の閾値（AJRCCM 2023）",
    "url":       "pages/articles-gl-yarnell-imv2023.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "KDIGO 2026 CKD貧血管理ガイドライン（Kidney International 2026）",
    "url":       "pages/articles-gl-kdigo-anemia2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "閉経後骨粗鬆症の診断・治療（NEJM 2023）",
    "url":       "pages/articles-gl-osteoporosis-nejm2023.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "敗血症性ショック+腎障害へのアルブミン投与の効果（CHEST 2025）",
    "url":       "pages/articles-gl-albumin-sepsis2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "SR",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "CDI管理ガイドライン Focused Update（SHEA/IDSA 2021）",
    "url":       "pages/articles-gl-cdi-shea2021.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "慢性腎臓病（CKD）総説（Lancet 2026）",
    "url":       "pages/articles-gl-ckd-lancet2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "アルコール離脱症候群（AWS）の評価と治療（Neurocrit Care 2021）",
    "url":       "pages/articles-gl-aws-ncc2021.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "菌血症の投与期間 7日 vs 14日 — BALANCE試験（NEJM 2025）",
    "url":       "pages/articles-gl-balance-bacteremia2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "メタ解析",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "グラム陰性菌菌血症の投与期間 7日 vs 14日 — メタ解析（JAMA Netw Open 2025）",
    "url":       "pages/articles-gl-gnbsi-meta2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "ACNS 標準クリティカルケアEEG用語集 2021年版（J Clin Neurophysiol 2021）",
    "url":       "pages/articles-gl-acns-eeg2021.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "難治性高血圧の診断と管理（JAMA 2026）",
    "url":       "pages/articles-gl-resistant-htn2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "骨粗鬆症の疫学・診断・薬物療法（JAMA 2025）",
    "url":       "pages/articles-gl-osteoporosis-jama2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "予防",
    "system_id": "art-ppx",
    "title":     "ストレス潰瘍予防 — H2RA vs PPI 敗血症性ショック患者での比較（Crit Care Med 2025）",
    "url":       "pages/articles-gl-sup-septicshock2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "重症市中肺炎（sCAP）の概念と論争点（ICM 2025）",
    "url":       "pages/articles-gl-scap-icm2025.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "院内細菌性髄膜炎 — 疫学・診断・抗菌薬治療（NEJM 2010）",
    "url":       "pages/articles-gl-nosocomial-meningitis2010.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "敗血症関連AKI（SA-AKI）コンセンサスレポート（Nat Rev Nephrol 2023）",
    "url":       "pages/articles-gl-sa-aki2023.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "アルブミン20%の薬理と臨床応用（Critical Care 2026）",
    "url":       "pages/articles-gl-albumin20-cc2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "筋骨格系",
    "system_id": "art-msk",
    "title":     "横紋筋融解症 — 臨床指向型ナラティブレビュー（Chest 2026）",
    "url":       "pages/articles-gl-rhabdo-chest2026.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "循環器系",
    "system_id": "dt-cardio",
    "title":     "心肺蘇生後の管理（PCAS）",
    "url":       "pages/disease-topics/dt-pcas.html"
  },
  {
    "date":      "2026/03/31",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "感染症",
    "system_id": "dt-id",
    "title":     "菌血症の抗菌薬投与期間は？",
    "url":       "pages/disease-topics/dt-bacteremia-duration.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ペラミビル（ラピアクタ）— インフルエンザ治療薬レビュー",
    "url":       "pages/articles-gl-peramivir-baseline2.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "代謝性アシドーシス 最新エビデンス（ICM 2025）",
    "url":       "pages/articles-gl-metabolic-acidosis2025.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "RCT",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "緑膿菌菌血症の投与期間 7日 vs 14日 — BALANCE post hoc（CID 2026）",
    "url":       "pages/articles-gl-pa-bacteremia2026.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "KDIGO 2026 AKI/AKD ガイドライン（Public Review Draft）",
    "url":       "pages/articles-gl-kdigo-aki2026.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "複雑性尿路感染症（cUTI）管理ガイドライン（IDSA 2025）",
    "url":       "pages/articles-gl-uti-idsa2025.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "カタログ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "【研修医向け】疾患/症候マニュアル",
    "url":       "pages/disease-topics.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "病棟業務",
    "url":       "pages/schedule-ward-daily.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "AHA/ASA 2023 くも膜下出血（aSAH）管理ガイドライン",
    "url":       "pages/articles-gl-sah2023.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ペラミビル（Alpivab）レビュー：単純性インフルエンザの治療",
    "url":       "pages/articles-gl-peramivir-review.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "聖路加ICU 輸血ガイド（ESICM 2020 / ACCP 2025 / AABB 2025）",
    "url":       "pages/articles-gl-transfusion2026.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ペラミビル（静注ノイラミニダーゼ阻害薬）レビュー",
    "url":       "pages/articles-gl-peramivir-review-baseline.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "ICU血小板減少症 — DIC vs TMA 鑑別アルゴリズム（Critical Care 2018）",
    "url":       "pages/articles-gl-dic-tma2018.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "ペラミビル（Rapiacta）— 静注NAIの臨床的位置づけ（Drugs 2018）",
    "url":       "pages/articles-gl-peramivir2018.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "混合性酸塩基平衡障害（Am J Kidney Dis 2025）",
    "url":       "pages/articles-gl-mixed-acidbase2025.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "AHA/NCS 2024 心停止後の集中治療管理 科学的声明",
    "url":       "pages/articles-gl-pcas-aha2024.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "腎・電解質系",
    "system_id": "dt-renal",
    "title":     "低ナトリウム血症",
    "url":       "pages/disease-topics/dt-hyponatremia.html"
  },
  {
    "date":      "2026/03/30",
    "genre":     "疾患マニュアル",
    "type":      "",
    "system":    "感染症",
    "system_id": "dt-id",
    "title":     "緑膿菌感染症",
    "url":       "pages/disease-topics/dt-pa-infection.html"
  },
  {
    "date":      "2026/03/28",
    "genre":     "論文・GL",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "インスピロンネブライザーの原理と使い方（看護学雑誌 2008）",
    "url":       "pages/articles-gl-inspiron2008.html"
  },
  {
    "date":      "2026/03/28",
    "genre":     "カタログ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "【ICU】注目論文・最新ガイドラインまとめ",
    "url":       "pages/articles-guidelines.html"
  },
  {
    "date":      "2026/03/28",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "SSC 2026 敗血症・敗血症性ショック管理 国際ガイドライン",
    "url":       "pages/articles-gl-ssc2026.html"
  },
  {
    "date":      "2026/03/28",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "JCS 2026 感染性心内膜炎（IE）診療ガイドライン",
    "url":       "pages/articles-gl-ie2026.html"
  },
  {
    "date":      "2026/03/28",
    "genre":     "論文・GL",
    "type":      "ガイドライン",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "低ナトリウム血症 診断・治療ガイドライン（ESICM/ESE/ERA-EDTA 2014）",
    "url":       "pages/articles-gl-hn2014.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "後藤 俊作 先生",
    "url":       "pages/staff-goto.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "腎臓内科カンファレンス",
    "url":       "pages/schedule-renal-conf.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "半日出勤制度",
    "url":       "pages/schedule-half-day.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "ICUルール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICUコアカン",
    "url":       "pages/icu-core-conf.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "朝カンファレンス前の準備",
    "url":       "pages/schedule-morning-prep.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "ICUルール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICU PASSPORT",
    "url":       "pages/icu-passport.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "岡本 洋史 先生",
    "url":       "pages/staff-okamoto.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "海外教科書勉強会",
    "url":       "pages/schedule-weekly-textbook.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "宮﨑 令奈 先生",
    "url":       "pages/staff-miyazaki.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "岡野 弘 先生",
    "url":       "pages/staff-okano.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "カタログ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "強化パック4種",
    "url":       "pages/learning-packs.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "日勤への申し送り",
    "url":       "pages/schedule-morning-handover.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICUセット",
    "url":       "pages/schedule-ward-work.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "関谷 智 先生",
    "url":       "pages/staff-sekiya.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "ICUルール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICUのチーム編成について",
    "url":       "pages/icu-team.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "カタログ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "聖路加ICU動画講座集",
    "url":       "pages/video-lectures.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スタッフ",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "青木 和裕 先生",
    "url":       "pages/staff-aoki.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "夜勤への申し送り",
    "url":       "pages/schedule-day-handover.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ICUカンファレンス",
    "url":       "pages/schedule-icu-conf.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "随時対応（夜間）",
    "url":       "pages/schedule-oncall.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "日勤からの申し送り",
    "url":       "pages/schedule-night-start.html"
  },
  {
    "date":      "2026/03/26",
    "genre":     "スケジュール",
    "type":      "",
    "system":    "",
    "system_id": "",
    "title":     "ID×ICUカンファレンス",
    "url":       "pages/schedule-weekly-id-icu.html"
  },
];
