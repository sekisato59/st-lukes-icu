/**
 * 新着論文・ガイドライン 直近50件（articles-guidelines.html から自動生成）
 * recent-all.html で表形式・並び替え可能なテーブルとして表示
 * type: RCT / コホート / 症例対照 / 横断 / メタ解析 / SR / Case / 症例集積 / Review
 */
const RECENT_ARTICLES = [
  {
    "date":      "2026/05/03",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "成人の急性期気道管理 — State of the Art Review（BMJ 2026）",
    "url":       "pages/articles-gl-airway-acute2026.html"
  },
  {
    "date":      "2026/05/02",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "ケタミンの多様な効果：ジャック・オブ・オールトレーズ — ナラティブレビュー（BJA 2025）",
    "url":       "pages/articles-gl-ketamine-bja2025.html"
  },
  {
    "date":      "2026/05/02",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "てんかん重積状態の診断と治療 — 定義・病態・治療アルゴリズム（Lancet Neurol 2024）",
    "url":       "pages/articles-gl-se-lancetneurol2024.html"
  },
  {
    "date":      "2026/05/02",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ループ利尿薬の正しい処方法 — All-or-none効果・薬剤選択・As-needed投与（BMJ 2019）",
    "url":       "pages/articles-gl-loop-diuretics-bmj2019.html"
  },
  {
    "date":      "2026/05/01",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "血管ウォーターフォール現象と Critical Closing Pressure — 循環生理の統合的理解（J Crit Care 2026）",
    "url":       "pages/articles-gl-vascular-waterfall-jcc2026.html"
  },
  {
    "date":      "2026/05/01",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "バンコマイシンTDM改訂コンセンサスガイドライン 2020 — AUC/MICガイド TDM（ASHP/IDSA/PIDS/SIDP 2020）",
    "url":       "pages/articles-gl-vcm-tdm2020.html"
  },
  {
    "date":      "2026/05/01",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "抗菌薬TDM臨床実践ガイドライン 2022 — VCM・TEIC・アミノグリコシド・VRCZ（日本化学療法学会/日本TDM学会 2022）",
    "url":       "pages/articles-gl-tdm-antibiotics2022.html"
  },
  {
    "date":      "2026/04/27",
    "type":      "メタ解析",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "気管挿管導入時のフェンタニル — RCT5件のSR&メタ解析（J Intensive Care 2026）",
    "url":       "pages/articles-gl-fentanyl-induction-jic2026.html"
  },
  {
    "date":      "2026/04/27",
    "type":      "Review",
    "system":    "集中治療総論・質評価",
    "system_id": "art-icu-general",
    "title":     "JIPAD 2024年度 施設別年次レポート — 聖路加国際病院ICU（日本集中治療医学会 2026）",
    "url":       "pages/articles-gl-jipad2024.html"
  },
  {
    "date":      "2026/04/24",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "機械換気成人ICU患者におけるデクスメデトミジン — ICM Rapid Practice Guideline（ICM 2022）",
    "url":       "pages/articles-gl-dex-icm2022.html"
  },
  {
    "date":      "2026/04/24",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "一過性全健忘（TGA）— 疫学・病態生理・診断・画像・鑑別・予後（UpToDate 2024）",
    "url":       "pages/articles-gl-tga-uptodate2024.html"
  },
  {
    "date":      "2026/04/24",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "重症患者における限外濾過 — パーソナライズドケアの枠組み（Critical Care 2026）",
    "url":       "pages/articles-gl-uf-cc2026.html"
  },
  {
    "date":      "2026/04/24",
    "type":      "Review",
    "system":    "腎・電解質系",
    "system_id": "art-renal",
    "title":     "Stewart light — 複雑な酸塩基平衡異常への実践的アプローチ（ICM 2026）",
    "url":       "pages/articles-gl-stewartlight-icm2026.html"
  },
  {
    "date":      "2026/04/24",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "脊髄硬膜外膿瘍（SEA） — NEJM総説（NEJM 2026）",
    "url":       "pages/articles-gl-sea-nejm2026.html"
  },
  {
    "date":      "2026/04/22",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "急性脳損傷における温度管理 — TBI・脳卒中・心停止後の発熱管理と低体温療法（ICM 2026）",
    "url":       "pages/articles-gl-tempcontrol-abi-icm2026.html"
  },
  {
    "date":      "2026/04/19",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ERC-ESICM 2025 心拍再開後管理（PCAS）ガイドライン",
    "url":       "pages/articles-gl-pcas-erc2025.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "神経ICUにおける鎮静薬 — プロポフォール・ケタミン・デクスメデトミジンの神経特性（ICM 2025）",
    "url":       "pages/articles-gl-sedatives-neuroicu2025.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "NCS ガイドライン：神経集中治療患者における脳浮腫の急性期治療 — HTS・マンニトール・コルチコステロイド・非薬物療法（Neurocrit Care 2020）",
    "url":       "pages/articles-gl-ncs-cerebraledema2020.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "急性脳損傷後の意識回復 — DoC分類・CMD・予後予測・薬物療法（J Intensive Care 2024）",
    "url":       "pages/articles-gl-doc-jic2024.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "メタ解析",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "IVC呼吸変動による輸液反応性予測 — 人工呼吸下ショック患者のメタ解析（Critical Care 2018）",
    "url":       "pages/articles-gl-ivc-cc2018.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "CVPモニタリングの再評価 — 忘れられた臨床的重要性（Intensive Care Med 2023）",
    "url":       "pages/articles-gl-cvp-icm2023.html"
  },
  {
    "date":      "2026/04/16",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "IWGDF/IDSA 2023 糖尿病性足感染症（DFI）診断・治療ガイドライン（Clin Infect Dis 2023）",
    "url":       "pages/articles-gl-iwgdf-dfi2023.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "神経系",
    "system_id": "art-neuro",
    "title":     "ESCMID ガイドライン：急性細菌性髄膜炎の診断と治療（Clin Microbiol Infect 2016）",
    "url":       "pages/articles-gl-escmid-bactmening2016.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "ノルエピネフリン等価スコア 更新版 — 昇圧薬換算係数（Critical Care 2025）",
    "url":       "pages/articles-gl-ne-equiv-kotani2025.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "アルブミン製剤使用に関する14の提言 — ICTMG ガイドライン（CHEST 2024）",
    "url":       "pages/articles-gl-albumin-ictmg2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "メタ解析",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "IVC超音波による輸液反応性予測の精度 — メタ解析（JICM 2018）",
    "url":       "pages/articles-gl-ivc-fr2018.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "集中治療超音波（CCUS）学習目標 — SOCCA専門家グループ提言（Anesth Analg 2015）",
    "url":       "pages/articles-gl-fagley-ccus2015.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "2025年改訂版 心不全診療ガイドライン（JCS/JHFS 2025）",
    "url":       "pages/articles-gl-jcs-hf2025.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "AF合併心不全のGDMT（JACC State-of-the-Art Review 2024）",
    "url":       "pages/articles-gl-af-hf-jacc2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "肺動脈カテーテル（Swan-Ganz）— 挿入手技・波形解釈・血行動態診断（N Engl J Med 2013）",
    "url":       "pages/articles-gl-pac-nejm2013.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "右心カテーテルによる血行動態評価 実践ガイド（JACC HF 2024）",
    "url":       "pages/articles-gl-rhc-hf2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "腹臥位療法（Prone Positioning）— 病態生理・エビデンス・実践（ICM 2024）",
    "url":       "pages/articles-gl-prone-icm2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ESICM ARDSガイドライン 2023 — 定義・表現型・呼吸サポート戦略（ICM 2023）",
    "url":       "pages/articles-gl-esicm-ards2023.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "ATS ARDS管理ガイドライン 2024 — ステロイド・VV-ECMO・NMBA・PEEP（AJRCCM 2024）",
    "url":       "pages/articles-gl-ats-ards2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "SR",
    "system":    "呼吸器系",
    "system_id": "art-resp",
    "title":     "敗血症・ARDS・CAPへのステロイド療法 2024 Focused Update（SCCM/CCM 2024）",
    "url":       "pages/articles-gl-sccm-steroid2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "HLH（血球貪食性リンパ組織球症）成人診断・精査ガイドライン（HiHASC / Lancet Rheumatol 2023）",
    "url":       "pages/articles-gl-hihasc-hlh2023.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "SR",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "「静菌 vs 殺菌」神話を斬る — 56件RCTの系統的レビュー（CID 2018）",
    "url":       "pages/articles-gl-static-cidal2018.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "IDSA 2024 耐性グラム陰性菌感染症治療ガイダンス — ESBL-E・AmpC-E・CRE・DTR Pa・CRAB・S. maltophilia（CID 2024）",
    "url":       "pages/articles-gl-idsa-amr-gnr2024.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "感染症",
    "system_id": "art-id",
    "title":     "細菌性髄膜炎診療ガイドライン 2014 — 第4章 検査（日本神経感染症学会・日本神経学会・日本神経外科学会）",
    "url":       "pages/articles-gl-jns-bm2014.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "ESPEN 2022 ICU臨床栄養 実践・部分改訂ガイドライン（Clin Nutr 2023）",
    "url":       "pages/articles-gl-espen-nutrition2022.html"
  },
  {
    "date":      "2026/04/15",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症・甲状腺中毒症 診断・管理ガイドライン — ATA 2016（Thyroid 2016）",
    "url":       "pages/articles-gl-hyperthyroidism-ata2016.html"
  },
  {
    "date":      "2026/04/14",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症 — 定義・疫学・診断・治療の総括（Lancet Seminar 2024）",
    "url":       "pages/articles-gl-hyperthyroidism-lancet2024.html"
  },
  {
    "date":      "2026/04/14",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "甲状腺機能亢進症 総説（JAMA 2023）",
    "url":       "pages/articles-gl-hyperthyroidism-jama2023.html"
  },
  {
    "date":      "2026/04/13",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "急性肝不全（ALF）の管理と予後 — NAC・脳浮腫・KCC・肝移植（UpToDate 2025）",
    "url":       "pages/articles-gl-alf-uptodate2025.html"
  },
  {
    "date":      "2026/04/12",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "ACG ガイドライン：急性肝不全の管理（Am J Gastroenterol 2023）",
    "url":       "pages/articles-gl-acg-alf2023.html"
  },
  {
    "date":      "2026/04/11",
    "type":      "Review",
    "system":    "消化器 / 肝胆道系",
    "system_id": "art-gi",
    "title":     "急性肝不全（ALF）— 定義・疫学・病態・管理の総括（Lancet Seminar 2024）",
    "url":       "pages/articles-gl-alf-lancet2024.html"
  },
  {
    "date":      "2026/04/11",
    "type":      "Review",
    "system":    "栄養 / 代謝系",
    "system_id": "art-nutrition",
    "title":     "SCCM/ASPEN 2016 重症患者栄養サポートガイドライン（JPEN 2016）",
    "url":       "pages/articles-gl-sccm-aspen-nutrition2016.html"
  },
  {
    "date":      "2026/04/10",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "血小板減少症の評価と管理（American Family Physician 2022）",
    "url":       "pages/articles-gl-thrombocytopenia-afp2022.html"
  },
  {
    "date":      "2026/04/10",
    "type":      "Review",
    "system":    "血液系",
    "system_id": "art-heme",
    "title":     "薬剤性免疫性血小板減少症（DIIT）— 病態生理・診断・治療（NEJM 2007）",
    "url":       "pages/articles-gl-diit-nejm2007.html"
  },
  {
    "date":      "2026/04/09",
    "type":      "Review",
    "system":    "循環器系",
    "system_id": "art-cardio",
    "title":     "標的抗がん療法の心血管毒性 — ACC Concise Clinical Guidance（J Am Coll Cardiol 2026）",
    "url":       "pages/articles-gl-acc-targeted-onco2025.html"
  },
];
