/**
 * pages/bacteria/related-data.js
 * ===============================================================
 * 各菌ページの「本サイトの関連事項」データを一元管理するファイル。
 *
 * 構造：
 *   BACTERIA_RELATED[菌キー] = [
 *     {
 *       title: "結論（太字で表示される）",
 *       body: "医学的内容を直接記述する（複数文 OK、HTML 不可）",
 *       links: [
 *         { label: "ページ名:セクション", url: "../path/to/page.html#anchor" }
 *       ]
 *     },
 *     ...
 *   ]
 *
 * 菌キーは bacteria/{key}.html のファイル名と一致させる。
 *
 * 方針：本ページは読者がメディカルを学ぶ場である。body には
 *      「どのページのどこに書かれている」というメタ情報ではなく、
 *      直接的な医学的内容を記述する。出典・参照先は links に置く。
 * ===============================================================
 */

window.BACTERIA_RELATED = {

  // ============ Staphylococcus aureus ============
  saureus: [
    {
      title: "感染性心内膜炎（IE） — 標的治療と外科介入",
      body: "MSSA はセファゾリン 2g×3/日、MRSA はバンコマイシンまたはダプトマイシン（日本で IE 保険適用は 2 剤のみ）。VCM MIC>1 の高用量 VCM は腎障害リスクあり。MSSA でも髄膜炎合併時はセファゾリンを避け、CFPM／MEPM／VCM を選択（中枢移行性の問題）。",
      links: [
        { label: "IE 2026 GL：標的治療②（Staph）", url: "../articles-gl-ie2026.html#ie4-section4" },
        { label: "IE 2026 GL：髄膜炎合併・長期治療", url: "../articles-gl-ie2026.html#ie4-section7" },
        { label: "IE 板書ノート：MSSA 標的治療", url: "../id-icu-notes/note-ie.html#ie-target-mssa" },
        { label: "IE 板書ノート：MRSA 標的治療", url: "../id-icu-notes/note-ie.html#ie-target-mrsa" }
      ]
    },
    {
      title: "感染性心内膜炎 — 合併症リスクと心エコーの位置づけ",
      body: "S. aureus 菌血症の汚染率はわずか 1%、IE では typical organism として診断当日扱い。心不全・治療抵抗性感染・塞栓症・脳合併症・伝導障害すべてのリスクを他菌の 2-3 倍に上げる。MRSA 増加が急性・重篤経過 IE の増加要因。",
      links: [
        { label: "IE 2026 GL：疫学（MRSA 増加）", url: "../articles-gl-ie2026.html#ie-section2" },
        { label: "IE 2026 GL：血液培養", url: "../articles-gl-ie2026.html#ie2-section3" },
        { label: "IE 2026 GL：心不全リスク", url: "../articles-gl-ie2026.html#ie3-section1" },
        { label: "IE 2026 GL：治療抵抗性・弁輪周囲膿瘍", url: "../articles-gl-ie2026.html#ie3-section2" },
        { label: "IE 2026 GL：脳合併症（梗塞リスク 2-3 倍）", url: "../articles-gl-ie2026.html#ie3-section4" }
      ]
    },
    {
      title: "経験的治療 — MRSA 保菌歴・自己弁/人工弁・市中/医療関連で切り替え",
      body: "想定起因菌（MRSA・MSSA・レンサ球菌・腸球菌・HACEK）を網羅する経験治療レジメンを選ぶ。S. aureus 同定時点で MSSA→セファゾリン、MRSA→VCM の分岐へ。",
      links: [
        { label: "IE 2026 GL：エンピリック治療", url: "../articles-gl-ie2026.html#ie4-section2" },
        { label: "IE 板書ノート：経験的治療選択", url: "../id-icu-notes/note-ie.html#ie-empiric-choice" },
        { label: "IE 板書ノート：GPC 同定マップ", url: "../id-icu-notes/note-ie.html#ie-gpc" }
      ]
    },
    {
      title: "症例から学ぶ — ICD リード感染（MSSA）",
      body: "ICD リード感染で MSSA が同定された症例。MRI で硬膜外膿瘍を除外したのち、セフトリアキソンからセファゾリン単剤へ変更（中枢移行性に基づく薬剤選択）。",
      links: [
        { label: "IE 板書ノート：症例 2", url: "../id-icu-notes/note-ie.html#ie-case2-hx" }
      ]
    },
    {
      title: "菌血症の治療期間 — BALANCE/GNBSI 試験の対象外",
      body: "S. aureus 菌血症は組織接着因子・転移性感染巣形成能のため BALANCE 試験の除外基準。最低 14 日（複雑性 4-6 週間）が推奨される。S. aureus／S. lugdunensis は GNBSI メタ解析でも長期投与必要病態として 7 日戦略の対象外。",
      links: [
        { label: "疾患トピック：BALANCE と臨床判断", url: "../disease-topics/dt-bacteremia-duration.html#bd-decision" },
        { label: "BALANCE 2025：考察", url: "../articles-gl-balance-bacteremia2025.html#bal-discussion" },
        { label: "GNBSI メタ解析（除外基準）", url: "../articles-gl-gnbsi-meta2025.html" }
      ]
    },
    {
      title: "S. aureus 菌血症のフォロー血培",
      body: "S. aureus・S. lugdunensis・カンジダ属の菌血症ではクリアランス確認のため繰り返し血液培養を行う。",
      links: [
        { label: "SSC 2026 GL：微生物学的検査", url: "../articles-gl-ssc2026.html#ssc-s2" }
      ]
    },
    {
      title: "VCM TDM — 重症 MRSA 感染では AUC/MIC 400-600 目標",
      body: "重症 MRSA 感染ではトラフ値単独モニタリングを廃止し、AUC ガイド投与へ（AUC/MIC ≥400、目標 AUC 400-600 μg·h/mL）。ローディングドーズは 20-35 mg/kg。AUC<400 で耐性化（VISA 出現）促進、>600 で AKI リスク上昇。",
      links: [
        { label: "VCM TDM 2020：AUC/MIC の根拠", url: "../articles-gl-vcm-tdm2020.html#vcm-s1" },
        { label: "VCM TDM 2020：MIC 解釈", url: "../articles-gl-vcm-tdm2020.html#vcm-s3" },
        { label: "VCM TDM 2020：AUC モニタリングの推奨", url: "../articles-gl-vcm-tdm2020.html#vcm-s4" },
        { label: "VCM TDM 2020：ローディングドーズ", url: "../articles-gl-vcm-tdm2020.html#vcm-s10" },
        { label: "TDM 2022：VCM AUC", url: "../articles-gl-tdm-antibiotics2022.html#tdm-vcm-s2" }
      ]
    },
    {
      title: "MRSA 治療の代替薬 — テイコプラニン・アルベカシン",
      body: "テイコプラニンは MRSA・腸球菌に使用、長半減期のためローディングドーズ必須。心臓手術 SSI 予防では MRSA 保菌・βラクタムアレルギー患者で術直前 TEIC 12mg/kg 単回投与を推奨。アルベカシンは VCM 不耐容/使用困難な MRSA の代替で、Cpeak ≥15 μg/mL 目標。",
      links: [
        { label: "TDM 2022：テイコプラニン", url: "../articles-gl-tdm-antibiotics2022.html#tdm-teic-s2" },
        { label: "TDM 2022：心臓手術 SSI 予防 TEIC", url: "../articles-gl-tdm-antibiotics2022.html#tdm-teic-s4" },
        { label: "TDM 2022：ABK", url: "../articles-gl-tdm-antibiotics2022.html#tdm-agm-s1" },
        { label: "TEIC vs VCM Cochrane 2010", url: "../articles-gl-teicoplanin-cochrane2010.html#tc-conclusions" }
      ]
    },
    {
      title: "重症市中肺炎（sCAP） — PVL 産生株は壊死性肺炎",
      body: "S. aureus は CAP 分離株 6%、MRSA 3.0%（米国・西欧で有意差）。PVL 産生 S. aureus は若年者の壊死性肺炎を起こし、MSSA・MRSA・PVL 有無で 4 種の標的治療レジメン（セファゾリン/フルクロキサシリン、リネゾリド/VCM/セフタロリン ＋ クリンダマイシン/リファンピシン）。",
      links: [
        { label: "sCAP 2025：起因菌頻度", url: "../articles-gl-scap-icm2025.html#scap-common-path" },
        { label: "sCAP 2025：標的治療レジメン", url: "../articles-gl-scap-icm2025.html#scap-abx" }
      ]
    },
    {
      title: "VAP — GPC として最重要起因菌",
      body: "S. aureus（MSSA/MRSA）はコアグラーゼ陽性 GPC として VAP の最重要起因菌。S. lugdunensis は CoNS だが S. aureus に近似する病原性。リネゾリドは MRSA 院内肺炎で臨床的有効性が VCM より有意に高い（DAP は肺サーファクタント不活化のため使用不可）。",
      links: [
        { label: "VAP 板書ノート：GPC（Staph）", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    },
    {
      title: "脊髄硬膜外膿瘍（SEA） — 起因菌の 50% 以上が S. aureus",
      body: "観察研究 2282 例で MSSA 40% ＋ MRSA 18% ＝ S. aureus 全体 58%。MRSA 感染は非手術治療失敗の独立リスク因子（Kim スコア +3 点）。経験的治療は VCM ＋ セフトリアキソン、IDU/SSI/敗血症ではセフェピムへ変更、治療 6-8 週間。",
      links: [
        { label: "SEA 2026：微生物学（S. aureus 58%）", url: "../articles-gl-sea-nejm2026.html#sea-s9" },
        { label: "SEA 2026：非手術失敗予測", url: "../articles-gl-sea-nejm2026.html#sea-s11" },
        { label: "SEA 2026：SUMMARY", url: "../articles-gl-sea-nejm2026.html#sea-summary" }
      ]
    },
    {
      title: "心臓植込みデバイス感染 — S. aureus は抜去後 2-4 週間",
      body: "デバイス抜去後の抗菌薬投与期間は S. aureus で 2-4 週間（非 S. aureus 菌は 2 週間）と区別する。初期は VCM（MRSA カバー）+ GNB カバー。",
      links: [
        { label: "ペースメーカ 2017 GL：治療期間", url: "../articles-gl-pacemaker2017.html#pm-s4d" }
      ]
    },
    {
      title: "院内髄膜炎・脳室炎（HAVM）",
      body: "S. aureus の CSF 培養陽性は感染を強く示唆する。MSSA はナフシリン/オキサシリン（日本ではセファゾリン代替）、MRSA は VCM（MIC≥1 ならリネゾリド/ダプトマイシン/TMP-SMX）。治療 10-14 日、繰り返し陽性なら最終陽性日から起算。長期予防的抗菌薬は MRSA・Candida 選択を招き禁忌。",
      links: [
        { label: "疾患トピック：HAVM 起因菌・治療", url: "../disease-topics/dt-meningitis.html#mn-targeted" },
        { label: "IDSA HAVM 2017：標的治療", url: "../articles-gl-idsa-havm2017.html#havm-targeted" },
        { label: "IDSA HAVM 2017：治療期間", url: "../articles-gl-idsa-havm2017.html#havm-duration" },
        { label: "髄膜炎板書ノート：院内型", url: "../id-icu-notes/note-meningitis.html#ch2-s1" }
      ]
    },
    {
      title: "市中細菌性髄膜炎 — S. aureus は 1-2%、IE 関連が多い",
      body: "成人細菌性髄膜炎で S. aureus は 1-2%、感染性心内膜炎との関連が多い。同定されたら他感染巣（IE・脊椎硬膜外膿瘍）を必ず検索する。MRSA で VCM MIC>2 ならリネゾリドへ変更。治療期間 14 日以上。",
      links: [
        { label: "ESCMID 2016：S. aureus 髄膜炎", url: "../articles-gl-escmid-bactmening2016.html#ch3-s3" }
      ]
    },
    {
      title: "糖尿病性足感染（DFI）",
      body: "北米・西欧の最近抗菌薬未使用の軽症 DFI は連鎖球菌・S. aureus（MRSA リスクならカバー）のみを標的とする。骨と軟部組織の培養一致率は <50% で、S. aureus で最高。",
      links: [
        { label: "IWGDF 2023：軽症 DFI 抗菌薬選択", url: "../articles-gl-iwgdf-dfi2023.html#dfi-s8" }
      ]
    },
    {
      title: "インフルエンザ後の二次性細菌性肺炎",
      body: "インフルエンザ後の二次性細菌性肺炎では肺炎球菌・S. aureus（MRSA 含む）との混合感染が COVID-19 より高頻度。インフルエンザの NA が相乗作用に関与する可能性。",
      links: [
        { label: "疾患トピック：インフルエンザ呼吸器合併症", url: "../disease-topics/dt-influenza.html#flu-resp-comp" }
      ]
    },
    {
      title: "静菌薬 vs 殺菌薬 — リネゾリドは VCM に劣らず",
      body: "MRSA 感染試験で殺菌薬（TMP-SMX+RFP）と静菌薬（リネゾリド）が同等の転帰。好中球減少例でもリネゾリドは VCM に劣らない。",
      links: [
        { label: "Static vs Cidal 2018：SSTI", url: "../articles-gl-static-cidal2018.html#sc-ssti" }
      ]
    }
  ],

  // ============ Staphylococcus epidermidis ============
  sepi: [
    {
      title: "人工弁感染性心内膜炎（PVE） — CoNS が早期 PVE の主役",
      body: "早期 PVE（術後 1 年以内）の起因菌は CoNS（多くが MR-CoNS）・S. aureus・腸球菌が大半。エンピリックではバンコマイシン・ダプトマイシンを選択する。日本では CoNS の約 80% が MR-CoNS のため、感受性判明まで MRSA 準拠で治療。",
      links: [
        { label: "IE 2026 GL：標的治療②（Staph）", url: "../articles-gl-ie2026.html#ie4-section4" },
        { label: "IE 2026 GL：人工弁 IE（PVE）", url: "../articles-gl-ie2026.html#ie8-section1" }
      ]
    },
    {
      title: "院内髄膜炎・脳室炎（HAVM） — CoNS（特に S. epidermidis）が主体",
      body: "HAVM の主要起因菌は CoNS（特に S. epidermidis）・S. aureus・P. acnes・グラム陰性桿菌。低病原性でバイオフィルム形成のため症状が乏しい。シャント感染・術後感染で繰り返し主要起因菌として登場する。",
      links: [
        { label: "疾患トピック：HAVM 感染経路と起因菌", url: "../disease-topics/dt-meningitis.html#mn-route" },
        { label: "疾患トピック：病態別病原菌スペクトラム", url: "../disease-topics/dt-meningitis.html#mn-pathogens" }
      ]
    },
    {
      title: "Duke 大基準 — 人工物例で CoNS は典型菌扱い",
      body: "人工弁・人工物がある場合、Duke 大基準で典型的細菌として扱う菌のリスト先頭に CoNS（S. epidermidis など）が含まれる。",
      links: [
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" },
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" }
      ]
    },
    {
      title: "S. epidermidis は CoNS、皮膚常在菌",
      body: "S. epidermidis は CoNS（コアグラーゼ陰性ブドウ球菌）の代表で、皮膚常在菌。VAP では Cluster（Staphylococcus）分類の代表種として扱われる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Staphylococcus saprophyticus ============
  ssap: [
    {
      title: "S. saprophyticus は CoNS、若年女性の単純性 UTI 主要原因菌",
      body: "S. saprophyticus は CoNS の代表で、若年女性の単純性 UTI の主要原因菌。E. coli に次ぐ頻度。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Staphylococcus lugdunensis ============
  slug: [
    {
      title: "S. aureus と同様に Duke 主基準の典型菌扱い",
      body: "Duke-ISCVID 2023 主基準で S. aureus と並んで S. lugdunensis が「2 セット以上の血液培養陽性で典型的 IE 病原体」とされる。",
      links: [
        { label: "IE 2026 GL：Duke-ISCVID 2023", url: "../articles-gl-ie2026.html#ie2-section1" },
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    },
    {
      title: "菌血症フォロー血培",
      body: "S. aureus・S. lugdunensis・カンジダ属の菌血症ではクリアランス確認のため繰り返し血液培養を行う。",
      links: [
        { label: "SSC 2026 GL：血液培養・乳酸値", url: "../articles-gl-ssc2026.html#ssc-s4" }
      ]
    },
    {
      title: "菌血症の治療期間 — 短期戦略の対象外（S. aureus と同等扱い）",
      body: "S. lugdunensis は S. aureus 菌血症と同等扱いで BALANCE / GNBSI 試験の除外基準。7 日戦略の適用外で従来の長期投与を継続する。",
      links: [
        { label: "疾患トピック：BALANCE 試験デザイン", url: "../disease-topics/dt-bacteremia-duration.html#bd-balance-design" },
        { label: "GNBSI メタ解析：包含 RCT", url: "../articles-gl-gnbsi-meta2025.html#gnbsi-trials" }
      ]
    },
    {
      title: "S. lugdunensis は CoNS の代表でバンコマイシン治療",
      body: "S. lugdunensis は CoNS だが S. aureus 様の侵襲性。GPC cluster の代表として、感受性判明前はバンコマイシンで開始、感受性確認後にセファゾリン（オキサシリン感受性株）またはペニシリンG（PCG 感受性株）へ de-escalation。",
      links: [
        { label: "IE 板書ノート：GPC 起因菌", url: "../id-icu-notes/note-ie.html#ie-gpc" },
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ CoNS 全般 ============
  cons: [
    {
      title: "感染性心内膜炎 — CoNS は人工弁 IE の主役",
      body: "CDRIE（心臓植込みデバイス関連 IE）の起因菌として CoNS が最多で、ブドウ球菌全体で半数以上を占める。早期 PVE では CoNS（MR-CoNS 主体）対応必須でバンコマイシン/ダプトマイシン選択。日本では CoNS の約 80% が MR-CoNS。Duke-ISCVID 基準では複数セット陽性・人工弁例で汚染と感染の判別を慎重に行う。",
      links: [
        { label: "IE 2026 GL：Duke-ISCVID 基準", url: "../articles-gl-ie2026.html#ie2-section1" },
        { label: "IE 2026 GL：標的治療②", url: "../articles-gl-ie2026.html#ie4-section4" },
        { label: "IE 2026 GL：人工弁 IE（PVE）", url: "../articles-gl-ie2026.html#ie8-section1" },
        { label: "IE 2026 GL：CDRIE", url: "../articles-gl-ie2026.html#ie8-section2" }
      ]
    },
    {
      title: "IE その他の文脈（化膿性脊椎炎・右心系・小児）",
      body: "化膿性脊椎炎の起因菌頻度は黄色ブドウ球菌・レンサ球菌・腸球菌に次いで CoNS。右心系 IE のエンピリック治療では S. aureus と CoNS を必ずカバーする。小児 IE 起因菌は S. aureus・VGS・CoNS の順。",
      links: [
        { label: "IE 2026 GL：化膿性脊椎炎", url: "../articles-gl-ie2026.html#ie3-section8" },
        { label: "IE 2026 GL：右心系 IE", url: "../articles-gl-ie2026.html#ie8-section3" },
        { label: "IE 2026 GL：小児 IE", url: "../articles-gl-ie2026.html#ie8-section6" }
      ]
    },
    {
      title: "院内髄膜炎・脳室炎（HAVM） — CoNS が主体",
      body: "HAVM の主要起因菌は CoNS（特に S. epidermidis）・S. aureus・P. acnes・GNB。低病原性・バイオフィルム形成のため診断が遅れやすい。P. acnes 同定のため少なくとも 10 日間の培養保持が推奨される。標的治療は S. aureus に準じ、代替薬はバンコマイシン。",
      links: [
        { label: "疾患トピック：HAVM 感染経路", url: "../disease-topics/dt-meningitis.html#mn-route" },
        { label: "疾患トピック：病態別病原菌", url: "../disease-topics/dt-meningitis.html#mn-pathogens" },
        { label: "疾患トピック：標的治療", url: "../disease-topics/dt-meningitis.html#mn-targeted" },
        { label: "疾患トピック：シャント再挿入タイミング", url: "../disease-topics/dt-meningitis.html#mn-reimplant" }
      ]
    },
    {
      title: "院内型髄膜炎の経験的治療",
      body: "髄膜炎の起因菌として MSSA・MRSA・CNS（コアグラーゼ陰性、95% 以上がメチシリン耐性）・SPACE 菌群が想定される。",
      links: [
        { label: "髄膜炎板書ノート：院内型", url: "../id-icu-notes/note-meningitis.html#ch2-s1" }
      ]
    },
    {
      title: "脊髄硬膜外膿瘍（SEA）",
      body: "SEA の主要病原菌頻度表で CoNS が 5% を占める。",
      links: [
        { label: "SEA 2026：主要病原菌", url: "../articles-gl-sea-nejm2026.html#sea-s9" }
      ]
    },
    {
      title: "糖尿病性足感染（DFI） — コンタミネーション菌として注意",
      body: "培養再提出時に Corynebacterium 属や CoNS のコンタミ菌を単離するリスクに注意。コロナイゼーション菌か感染原因菌かを慎重に判断する。",
      links: [
        { label: "IWGDF 2023：培養検体採取", url: "../articles-gl-iwgdf-dfi2023.html#dfi-s5" },
        { label: "IWGDF 2023：SUMMARY", url: "../articles-gl-iwgdf-dfi2023.html#dfi-sum2" }
      ]
    },
    {
      title: "BALANCE 試験 — 起因菌内訳",
      body: "BALANCE の菌血症コホートで CoNS が 174 例（4.8%）を占める。",
      links: [
        { label: "BALANCE 2025：患者背景", url: "../articles-gl-balance-bacteremia2025.html#bal-demographics" }
      ]
    }
  ],

  // ============ Streptococcus pneumoniae ============
  spneu: [
    {
      title: "市中細菌性髄膜炎の最多起因菌",
      body: "成人市中髄膜炎の過半数（53%、2,157 例）が S. pneumoniae。PCV 普及で減少傾向だが依然最多。脾摘・HIV・糖尿病等の免疫不全で肺炎球菌髄膜炎リスク著明上昇。グラム染色感度は菌種別最高（90%）、培養感度 67-100%、尿・髄液 Binax NOW® は感度 64-86%・特異度 95%（ワクチン後 5 日間は偽陽性に注意）。",
      links: [
        { label: "ESCMID 2016：年齢別起炎菌", url: "../articles-gl-escmid-bactmening2016.html#ch1-s1" },
        { label: "JNS BM 2014：髄液グラム染色・培養", url: "../articles-gl-jns-bm2014.html#bm-csf-detail" }
      ]
    },
    {
      title: "髄膜炎の経験的治療と尿中抗原検査",
      body: "細菌性髄膜炎の代表的起因菌として S. pneumoniae を最初に想定する。尿中肺炎球菌抗原検査の活用、PRSP を念頭にバンコマイシン追加、肺炎球菌抗原陽性時のデキサメタゾン併用が実践的。",
      links: [
        { label: "髄膜炎板書ノート：起因菌", url: "../id-icu-notes/note-meningitis.html#ch1-s1" },
        { label: "髄膜炎板書ノート：治療バンドル", url: "../id-icu-notes/note-meningitis.html#ch1-s6" }
      ]
    },
    {
      title: "市中 vs 院内髄膜炎の起因菌スペクトラムの違い",
      body: "市中髄膜炎の主原因が肺炎球菌・髄膜炎菌であるのに対し、HAVM では CoNS・S. aureus・GNR が主体。",
      links: [
        { label: "疾患トピック：感染経路の違い", url: "../disease-topics/dt-meningitis.html#mn-route" }
      ]
    },
    {
      title: "肺炎球菌 IE は稀だが髄膜炎合併に注意",
      body: "肺炎球菌 IE は全体の 1% 未満と稀だが肺炎・髄膜炎を合併しやすい。髄膜炎合併時はセフトリアキソン 2g×2/日を選択し、感受性判明まで VCM 併用を考慮する。",
      links: [
        { label: "IE 2026 GL：標的治療①（Streptococcus）", url: "../articles-gl-ie2026.html#ie4-section3" }
      ]
    },
    {
      title: "重症市中肺炎（sCAP）の最多起因菌",
      body: "ICU 症例の 55% が S. pneumoniae で最多起因菌。Multiplex PCR での肺炎球菌検出が抗菌薬スチュワードシップに有用。",
      links: [
        { label: "sCAP 2025：主な原因病原体", url: "../articles-gl-scap-icm2025.html#scap-common-path" },
        { label: "sCAP 2025：微生物検査", url: "../articles-gl-scap-icm2025.html#scap-micro" }
      ]
    },
    {
      title: "インフルエンザ後の二次性細菌性肺炎",
      body: "インフルエンザ後の二次性細菌性肺炎で肺炎球菌・S. aureus（MRSA 含む）との混合感染が COVID-19 より高頻度。",
      links: [
        { label: "疾患トピック：インフルエンザ呼吸器合併症", url: "../disease-topics/dt-influenza.html#flu-resp-comp" }
      ]
    },
    {
      title: "BALANCE 試験 — 菌血症内訳",
      body: "BALANCE の菌血症コホート分離株で S. pneumoniae が 164 例（4.5%）。",
      links: [
        { label: "BALANCE 2025：患者背景", url: "../articles-gl-balance-bacteremia2025.html#bal-demographics" }
      ]
    }
  ],

  // ============ Streptococcus pyogenes（GAS） ============
  spyo: [
    {
      title: "感染性心内膜炎 — Duke 大基準典型菌から除外",
      body: "Duke 大基準の「典型的 IE 細菌」から S. pneumoniae・S. pyogenes は除外される。GPC chain β 溶血群の代表として GAS はペニシリンG が第一選択。",
      links: [
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" },
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    },
    {
      title: "β 溶血性レンサ球菌 IE — S. pyogenes は GM 併用対象外",
      body: "β 溶血性レンサ球菌 IE（S. agalactiae、S. dysgalactiae 等）は稀だが急速進行・死亡率 20% 超。S. pyogenes 以外の β 溶血菌では最初の 2 週間ゲンタマイシン併用を検討するが、pyogenes は併用対象外。",
      links: [
        { label: "IE 2026 GL：標的治療①", url: "../articles-gl-ie2026.html#ie4-section3" }
      ]
    },
    {
      title: "VAP の起因菌として β 溶血 Group A",
      body: "S. pyogenes は β 溶血 Group A の代表で、咽頭炎・蜂窩織炎の主要原因菌。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    },
    {
      title: "横紋筋融解症の感染性原因",
      body: "横紋筋融解の感染性原因として、細菌欄に Clostridium spp. と並んで S. pyogenes が含まれる。",
      links: [
        { label: "横紋筋融解 2026：原因の分類", url: "../articles-gl-rhabdo-chest2026.html#rhabdo-s4" }
      ]
    },
    {
      title: "重症市中肺炎（sCAP）の Multiplex PCR 対象菌",
      body: "Multiplex PCR は S. pyogenes など感受性が高く難培養な病原体の検出に有用。",
      links: [
        { label: "sCAP 2025：微生物検査", url: "../articles-gl-scap-icm2025.html#scap-micro" }
      ]
    },
    {
      title: "院内髄膜炎 — CSF 漏路経由",
      body: "CSF 漏路経由の髄膜炎起因菌として S. pneumoniae、H. influenzae、A 群 β 溶血性連鎖球菌が想定される。",
      links: [
        { label: "院内髄膜炎 GL", url: "../articles-gl-nosocomial-meningitis2010.html" }
      ]
    }
  ],

  // ============ Streptococcus agalactiae（GBS） ============
  saga: [
    {
      title: "新生児髄膜炎の最多起因菌",
      body: "新生児髄膜炎の最多起炎菌が S. agalactiae（565 例、58%）。E. coli と合わせて約 2/3 を占める。早期は母子間垂直感染、後期は院内水平感染が主経路。",
      links: [
        { label: "ESCMID 2016：年齢別起炎菌", url: "../articles-gl-escmid-bactmening2016.html#ch1-s1" }
      ]
    },
    {
      title: "感染性心内膜炎 — β 溶血性レンサ球菌として 6 週治療",
      body: "S. agalactiae は β 溶血性レンサ球菌 IE の代表例で、自己弁・人工弁ともに 6 週治療＋初期 2 週ゲンタマイシン併用検討が推奨される。",
      links: [
        { label: "IE 2026 GL：標的治療①", url: "../articles-gl-ie2026.html#ie4-section3" },
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" }
      ]
    },
    {
      title: "絨毛膜羊膜炎の主要起因菌",
      body: "羊水腔検出菌の頻度順で Ureaplasma → Gardnerella vaginalis → Mycoplasma hominis に次ぐ主要菌として S. agalactiae が挙げられ、新生児敗血症の重要原因。",
      links: [
        { label: "絨毛膜羊膜炎 2024：原因微生物", url: "../articles-gl-chorioamnionitis-ajog2024.html#s3" }
      ]
    },
    {
      title: "VAP の起因菌として β 溶血 Group B",
      body: "S. agalactiae は β 溶血 Group B の代表で、新生児・成人重症化を起こす起因菌。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Streptococcus anginosus group ============
  sang: [
    {
      title: "肝膿瘍・腹腔内膿瘍の主要起因菌",
      body: "細菌性肝膿瘍の起因菌として VGS（特に SAG を含む口腔・腸管由来連鎖球菌）が膿瘍形成しやすい。市中は CTRX+MNZ、院内は CFPM+MNZ。",
      links: [
        { label: "IAI 板書ノート：細菌性肝膿瘍", url: "../id-icu-notes/note-iai.html#ch4-s2" }
      ]
    },
    {
      title: "VAP の起因菌として α 溶血の膿瘍形成菌",
      body: "S. anginosus（膿瘍を形成しやすい）・S. constellatus・S. intermedius が α 溶血群として VAP の起因菌に含まれる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    },
    {
      title: "IE 予防的抗菌薬 — アモキシシリン MIC 上昇傾向",
      body: "口腔レンサ球菌のアモキシシリン MIC 上昇傾向として SAG MIC90 0.25 μg/mL。β ラクタムアレルギー例の予防投与では感受性確認が必要。",
      links: [
        { label: "IE 2026 GL：予防的抗菌薬", url: "../articles-gl-ie2026.html#ie7-section3" }
      ]
    },
    {
      title: "IE 板書ノートでの位置づけ",
      body: "SAG（S. anginosus・S. constellatus・S. intermedius）はペニシリンG 第一選択の連鎖球菌として独立カテゴリで扱われる。",
      links: [
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" }
      ]
    }
  ],

  // ============ Streptococcus dysgalactiae ============
  sdys: [
    {
      title: "β 溶血性レンサ球菌 IE — 急速経過・死亡率 20% 超",
      body: "S. dysgalactiae は S. agalactiae と並ぶ β 溶血性レンサ球菌 IE の代表例。急速経過・死亡率 20% 超で、自己弁/人工弁とも 6 週治療＋初期 2 週ゲンタマイシン併用検討。",
      links: [
        { label: "IE 2026 GL：標的治療①", url: "../articles-gl-ie2026.html#ie4-section3" }
      ]
    },
    {
      title: "IE 板書ノートでの位置づけ",
      body: "SDSE（Group G）として β 溶血群に分類され、ペニシリンG が第一選択。",
      links: [
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" }
      ]
    },
    {
      title: "VAP の起因菌として β 溶血 Group G",
      body: "S. dysgalactiae は β 溶血 Group G の代表として VAP の起因菌に含まれる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Streptococcus mitis group ============
  smitis: [
    {
      title: "IE 予防的抗菌薬 — アモキシシリン MIC 上昇傾向",
      body: "口腔レンサ球菌のアモキシシリン MIC 上昇傾向として mitis group MIC90 0.5 μg/mL。anginosus group より高値で耐性化が進行している。",
      links: [
        { label: "IE 2026 GL：予防的抗菌薬", url: "../articles-gl-ie2026.html#ie7-section3" }
      ]
    },
    {
      title: "VGS の代表種としての位置づけ",
      body: "VGS の代表種として S. mitis/oralis・S. mutans・S. gordonii が口腔内常在菌として知られる。GPC マップ α 溶血欄で S. mitis が代表的位置を占める。",
      links: [
        { label: "IE 板書ノート：GPC 起因菌", url: "../id-icu-notes/note-ie.html#ie-gpc" },
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpcmap" }
      ]
    },
    {
      title: "VAP の起因菌として α 溶血",
      body: "α 溶血 Streptococcus として S. mitis を含む VGS 構成種が VAP の起因菌になる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Viridans group streptococci（VGS） ============
  vgs: [
    {
      title: "感染性心内膜炎 — 最も治療しやすい原因菌",
      body: "VGS・S. gallolyticus は IE の中で最も治療しやすい原因菌。ペニシリン感性株（MIC ≤0.12）の標準療法は自己弁 4 週・人工弁 6 週。短縮療法（2 週間）も 5 条件を満たせば可能。",
      links: [
        { label: "IE 2026 GL：標的治療①", url: "../articles-gl-ie2026.html#ie4-section3" },
        { label: "IE 板書ノート：標的治療（VGS）", url: "../id-icu-notes/note-ie.html#ie-target-vgs" }
      ]
    },
    {
      title: "S. gallolyticus／VGS と IE の関連 — 大腸腫瘍",
      body: "VGS は IE 主要起因菌（市中・自己弁の主原因）。S. gallolyticus との大腸腫瘍関連は OR 16.61・OR 7.26 と強い。",
      links: [
        { label: "IE 板書ノート：S. gallolyticus／VGS", url: "../id-icu-notes/note-ie.html#ie-sgall" }
      ]
    },
    {
      title: "肝膿瘍 — 門脈経由の主要起因菌",
      body: "細菌性肝膿瘍の門脈経由の主要起因菌として VGS が挙げられ、膿瘍形成傾向が臨床的注意点。多発・厚壁・隔壁の画像所見と対比される。",
      links: [
        { label: "IAI 板書ノート：細菌性肝膿瘍", url: "../id-icu-notes/note-iai.html#ch4-s2" }
      ]
    },
    {
      title: "脳膿瘍の血行性経路の主要起因菌",
      body: "脳膿瘍の血行性経路（IE・菌血症）の主要起因菌として VGS が MSSA/MRSA・HACEK 群とともに想定される。",
      links: [
        { label: "髄膜炎板書ノート：脳膿瘍", url: "../id-icu-notes/note-meningitis.html#ch3-s1" }
      ]
    },
    {
      title: "VAP の起因菌として α 溶血の代表",
      body: "VAP の重要 GPC として VGS 全体が位置づけられ、α 溶血群の構成菌（S. mitis・S. sanguinis・S. gordonii・S. oralis 等）が起因菌になる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Enterococcus faecalis ============
  efaecalis: [
    {
      title: "感染性心内膜炎 — 標的治療（DAA レジメン）",
      body: "腸球菌 IE は全体の約 10%、高齢者に多く治療に難渋する。E. faecalis は国内報告で 32% にゲンタマイシン高度耐性。GM 高度耐性なし → ABPC+GM、高度耐性あり/腎機能低下/高齢者 → ABPC+CTRX（DAA）が選択肢。E. faecium には DAA は無効。",
      links: [
        { label: "IE 2026 GL：標的治療③", url: "../articles-gl-ie2026.html#ie4-section5" },
        { label: "IE 2026 GL：第4章 SUMMARY", url: "../articles-gl-ie2026.html#ie4-section8" },
        { label: "IE 板書ノート：標的治療（Enterococcus）", url: "../id-icu-notes/note-ie.html#ie-target-entero" }
      ]
    },
    {
      title: "DENOVA スコア — E. faecalis 菌血症で TEE は必要か",
      body: "E. faecalis 菌血症で心エコー（特に TEE）が必要かを判断する DENOVA スコア。IE 合併リスクの層別化に用いる。",
      links: [
        { label: "IE 板書ノート：DENOVA スコア", url: "../id-icu-notes/note-ie.html#ie-denova-score" }
      ]
    },
    {
      title: "Duke-ISCVID 主要基準 — 典型 IE 病原体",
      body: "E. faecalis は S. aureus・S. lugdunensis・HACEK・VGS と並んで、2 セット以上の血液培養陽性で「典型的 IE 病原体」として Duke-ISCVID 2023 主要基準を満たす。",
      links: [
        { label: "IE 2026 GL：Duke-ISCVID 基準", url: "../articles-gl-ie2026.html#ie2-section1" },
        { label: "IE 2026 GL：血液培養（TEE 適応）", url: "../articles-gl-ie2026.html#ie2-section3" },
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    },
    {
      title: "経験的治療 — IE では腸球菌カバーを必ず",
      body: "IE 経験的治療では MRSA・MSSA・レンサ球菌・腸球菌（E. faecalis を含む）・HACEK をすべてカバーする方針。",
      links: [
        { label: "IE 板書ノート：経験的治療", url: "../id-icu-notes/note-ie.html#ie-empiric-choice" },
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpc" }
      ]
    },
    {
      title: "腹腔内感染症（IAI） — 下部消化管穿孔",
      body: "下部消化管穿孔の CTRX+MNZ レジメンでは腸球菌のカバーが漏れるが、弱毒菌のため培養陽性後にカバー追加でよい。",
      links: [
        { label: "IAI 板書ノート：腸管穿孔", url: "../id-icu-notes/note-iai.html#ch3-s1" },
        { label: "IAI 板書ノート：第3章 SUMMARY", url: "../id-icu-notes/note-iai.html#ch3-summary" }
      ]
    },
    {
      title: "VAP の起因菌として γ 溶血",
      body: "Streptococcus γ 溶血の項で E. faecalis（1st choice: ABPC）が VAP 起因菌として挙げられる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Enterococcus faecium ============
  efaecium: [
    {
      title: "感染性心内膜炎 — DAA は無効、VRE では LZD/DAP",
      body: "E. faecium は国内報告で 24% にゲンタマイシン高度耐性。本来 β ラクタムに耐性が高くペニシリン耐性株として扱われる。ABPC+CTRX（DAA）併用は E. faecium には無効。VRE 治療はリネゾリドまたはダプトマイシン、ABPC や GM 併用を考慮。DAP 単剤や通常用量では成績不十分。",
      links: [
        { label: "IE 2026 GL：標的治療③（VRE 含む）", url: "../articles-gl-ie2026.html#ie4-section5" }
      ]
    },
    {
      title: "治療抵抗性感染症 — VRE はデバイス関連 IE で増加",
      body: "多剤耐性菌（MRSA・VRE）はデバイス関連 IE で頻度が増加し、感染制御が困難。",
      links: [
        { label: "IE 2026 GL：治療抵抗性感染症", url: "../articles-gl-ie2026.html#ie3-section2" }
      ]
    },
    {
      title: "GPC マップでの位置づけ",
      body: "γ 溶血 GPC として E. faecium が E. faecalis と並列で扱われ、IE 鑑別の網に含まれる。",
      links: [
        { label: "IE 板書ノート：GPC マップ", url: "../id-icu-notes/note-ie.html#ie-gpc" }
      ]
    },
    {
      title: "VAP の起因菌として γ 溶血",
      body: "E. faecium（1st choice: VCM）が VAP の起因菌として挙げられる。",
      links: [
        { label: "VAP 板書ノート：GPC", url: "../id-icu-notes/note-vap.html#ch2-s2" }
      ]
    }
  ],

  // ============ Streptococcus bovis / gallolyticus ============
  sbov: [
    {
      title: "S. gallolyticus と大腸腫瘍 — 検出時は必ず大腸内視鏡",
      body: "S. gallolyticus subsp. gallolyticus（旧 S. bovis biotype I）は IE と大腸腫瘍との強い関連が確立されている。血培陽性時は IE を強く疑い、大腸内視鏡で大腸腫瘍を必ず検索する。",
      links: [
        { label: "IE 板書ノート：S. gallolyticus 専用解説", url: "../id-icu-notes/note-ie.html#ie-sgall" },
        { label: "VAP 板書ノート：GPC（S. gallolyticus）", url: "../id-icu-notes/note-vap.html#ch2-s2" },
        { label: "VAP 板書ノート：第2章 SUMMARY", url: "../id-icu-notes/note-vap.html#ch2-summary" }
      ]
    },
    {
      title: "感染性心内膜炎 — VGS と並ぶ最も治療しやすい原因菌",
      body: "VGS・S. gallolyticus は IE の中で最も治療しやすい原因菌。ペニシリンG／セフトリアキソンが標準。",
      links: [
        { label: "IE 2026 GL：標的治療①", url: "../articles-gl-ie2026.html#ie4-section3" },
        { label: "IE 板書ノート：標的治療（VGS）", url: "../id-icu-notes/note-ie.html#ie-target-vgs" }
      ]
    },
    {
      title: "高齢者 IE — S. gallolyticus 検出率が高い",
      body: "高齢者 IE では腸球菌が最多（特に 80 歳以上）、S. gallolyticus 検出率も高い。検出時は大腸がん合併検索を行う。",
      links: [
        { label: "IE 2026 GL：高齢者 IE", url: "../articles-gl-ie2026.html#ie8-section5" },
        { label: "IE 2026 GL：第8章 SUMMARY", url: "../articles-gl-ie2026.html#ie8-section8" }
      ]
    },
    {
      title: "症例から学ぶ — GPC chain γ 溶血からの S. gallolyticus IE",
      body: "GPC in chain・溶血なしから S. gallolyticus か腸球菌を考慮し ABPC へ変更、最終同定は S. gallolyticus subsp. gallolyticus、ABPC 単剤 4 週間で治療した症例。血培陽性なら IE+大腸腫瘍検索を必須とする。",
      links: [
        { label: "IE 板書ノート：症例 2", url: "../id-icu-notes/note-ie.html#ie-case2-hx" }
      ]
    },
    {
      title: "経験的治療カバー菌",
      body: "IE 経験的治療カバー菌としてレンサ球菌（VGS・S. gallolyticus）が想定され、CTRX 等のレジメンの根拠菌となる。",
      links: [
        { label: "IE 板書ノート：経験的治療", url: "../id-icu-notes/note-ie.html#ie-empiric-choice" }
      ]
    }
  ],

  // ============ 嫌気性 GPC ============
  anaerogpc: [
    {
      title: "腹腔内感染症（IAI） — 横隔膜上下別の嫌気性カバー",
      body: "嫌気性菌カバー早見表（横隔膜上下別）で、横隔膜上の代表菌として Peptostreptococcus が挙げられる。CLDM/MNZ/CMZ/A・S/P・T/MEPM が感受性ある選択肢で、ABPC/SBT が第一選択。",
      links: [
        { label: "IAI 板書ノート：嫌気性菌カバー早見表", url: "../id-icu-notes/note-iai.html#ch5-s1" }
      ]
    },
    {
      title: "VAP — 口腔由来嫌気性菌",
      body: "VAP で関与する嫌気性菌の代表は Peptostreptococcus（Peptococcus・Fusobacterium・Actinomyces・Clostridium・Bacteroides・Prevotella と並ぶ口腔由来嫌気性菌）。",
      links: [
        { label: "VAP 板書ノート：嫌気性菌", url: "../id-icu-notes/note-vap.html#ch2-s4" }
      ]
    }
  ],

  // ============ Bacillus cereus ============
  // bacillus: サイト内に実質的な記載なし

  // ============ Abiotrophia / Granulicatella ============
  abio: [
    {
      title: "感染性心内膜炎 — 旧 NVS は手術を要する症例が多い",
      body: "旧 NVS（栄養要求性連鎖球菌）である Abiotrophia spp.・Granulicatella spp. は亜急性経過で診断が遅れ、塞栓症・弁破壊が起きやすいため手術を要する症例が多い。感受性良好でも VCM 耐性・GM 高度耐性株を除外したうえで、自己弁・人工弁ともに 6 週間治療する。",
      links: [
        { label: "IE 2026 GL：標的治療①（NVS ＋αカード）", url: "../articles-gl-ie2026.html#ie4-section3" }
      ]
    },
    {
      title: "Duke-ISCVID 大基準 — 自然弁 IE の典型菌",
      body: "Granulicatella spp.・Abiotrophia spp. は Gemella spp. と並んで自然弁 IE の典型的細菌に分類され、血液培養 2 セット以上陽性で Duke 大基準を満たす。",
      links: [
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    }
  ],

  // ============ Aerococcus ============
  // aerococcus: サイト内に実質的な記載なし

  // ============ Listeria monocytogenes ============
  listeria: [
    {
      title: "市中細菌性髄膜炎 — 50 歳以上・免疫不全で必ずカバー",
      body: "成人髄膜炎で Listeria は 3-4 番目（154 例、4%）の起炎菌、特に高齢者・免疫不全患者で重要。50 歳超または 50 歳未満で Listeria リスク因子（糖尿病・免疫抑制薬・癌等）がある成人の経験的治療には ABPC を必ず追加する。標準治療は ABPC/AMPC/PCG、ゲンタマイシン追加の有用性は議論あり腎毒性に注意、治療期間 21 日以上。グラム染色感度は 25-35% と低いが特異度はほぼ 100%。",
      links: [
        { label: "ESCMID 2016：年齢別起炎菌", url: "../articles-gl-escmid-bactmening2016.html#ch1-s1" },
        { label: "ESCMID 2016：起炎菌のリスク因子", url: "../articles-gl-escmid-bactmening2016.html#ch1-s2" },
        { label: "ESCMID 2016：菌種別治療", url: "../articles-gl-escmid-bactmening2016.html#ch3-s2" },
        { label: "ESCMID 2016：Listeria 髄膜炎治療詳細", url: "../articles-gl-escmid-bactmening2016.html#ch3-s3" }
      ]
    },
    {
      title: "妊婦・経験的治療への ABPC 追加",
      body: "50 歳以上/細胞性免疫低下/新生児/デリ食品摂取歴では Listeria を念頭に ABPC を追加する。妊婦リステリア症は母体軽症でも胎児・新生児に重篤転帰（流産・死産・新生児敗血症/髄膜炎）。市中の S. pneumoniae/Listeria 中心から、院内発症では SPACE・CNS・MRSA 中心へとスペクトラムが変化。",
      links: [
        { label: "髄膜炎板書ノート：起因菌", url: "../id-icu-notes/note-meningitis.html#ch1-s1" },
        { label: "髄膜炎板書ノート：経験的治療（妊婦含む）", url: "../id-icu-notes/note-meningitis.html#ch1-s6" },
        { label: "髄膜炎板書ノート：第2章 SUMMARY", url: "../id-icu-notes/note-meningitis.html#ch2-summary" }
      ]
    },
    {
      title: "グラム染色感度の限界",
      body: "Listeria のグラム染色感度は <50% と他主要菌より検出感度が低い（遠心分離で改善）。",
      links: [
        { label: "JNS BM 2014：髄液所見", url: "../articles-gl-jns-bm2014.html#bm-csf-detail" },
        { label: "JNS BM 2014：CQ 4-2 SUMMARY", url: "../articles-gl-jns-bm2014.html#bm-sum42" }
      ]
    },
    {
      title: "絨毛膜羊膜炎 — 血行性（経胎盤）感染の代表",
      body: "Listeria monocytogenes は血行性（胎盤経由）感染の代表菌で、母体菌血症から経胎盤的に胎児へ感染する。",
      links: [
        { label: "絨毛膜羊膜炎 2024：感染経路", url: "../articles-gl-chorioamnionitis-ajog2024.html#s2" }
      ]
    },
    {
      title: "ST 合剤の追加効能 — Listeria・Nocardia・トキソプラズマ",
      body: "TMP/SMX は PJP に加え、リステリア症・ノカルジア症・トキソプラズマ症・一般細菌感染にも活性を示す。",
      links: [
        { label: "疾患トピック：PCP 予防 ST 合剤の追加効能", url: "../disease-topics/dt-pcp.html#ch6-s1" },
        { label: "NCCN PCP 2026：TMP/SMX 注意事項", url: "../articles-gl-pcp-nccn2026.html#nccn-pjp-s4" }
      ]
    },
    {
      title: "非定型肺炎 — 細胞性免疫低下患者の鑑別",
      body: "細胞性免疫低下患者の細胞内寄生病原体として Legionella・Listeria・Mycobacterium 等が挙げられる。妊婦・高齢者・移植後・生肉/チーズ曝露患者では Listeria を鑑別に。",
      links: [
        { label: "非定型肺炎ノート：細胞内寄生菌", url: "../id-icu-notes/note-atypical-pneumonia.html#ch3-s4" }
      ]
    },
    {
      title: "急性持続性めまいの鑑別",
      body: "急性持続性めまいの鑑別疾患の一つとしてリステリア脳炎が前庭神経炎・脳幹/小脳梗塞・チアミン欠乏とともに挙げられる。",
      links: [
        { label: "めまい 2023：鑑別診断", url: "../articles-gl-dizziness2023.html#s2-ddx" }
      ]
    }
  ],

  // ============ Corynebacterium diphtheriae ============
  // cdiph: サイト内には C. ulcerans が「ジフテリア様病態」として鑑別文脈で言及されているのみ

  // ============ Corynebacterium jeikeium ============
  cjeikeium: [
    {
      title: "感染性心内膜炎 — 人工物例で典型菌扱い",
      body: "心臓内人工物がある場合、Duke 大基準で「IE に典型的な細菌」とみなす菌として C. jeikeium が CoNS や C. striatum とともに含まれる。",
      links: [
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    },
    {
      title: "VAP — カテーテル関連感染・免疫不全患者で問題",
      body: "C. jeikeium はカテーテル関連感染・免疫不全患者で問題となる菌種。抗菌薬投与後も検出継続＋免疫抑制＋VAP なら C. striatum とともに VCM 投与を検討する。",
      links: [
        { label: "VAP 板書ノート：Corynebacterium 検出時の対応", url: "../id-icu-notes/note-vap.html#ch2-s3" }
      ]
    }
  ],

  // ============ Corynebacterium striatum ============
  cstri: [
    {
      title: "VAP・院内感染で問題となる主要菌",
      body: "C. striatum は VAP・院内感染で問題となる主要菌。皮膚・口腔常在菌で原則 contamination だが、抗菌薬投与後も検出継続＋免疫抑制＋VAP なら VCM 投与を検討する。血培複数本陽性なら True Infection として治療する。",
      links: [
        { label: "VAP 板書ノート：Corynebacterium 検出時の対応", url: "../id-icu-notes/note-vap.html#ch2-s3" }
      ]
    },
    {
      title: "感染性心内膜炎 — 人工物例で典型菌扱い",
      body: "人工物あり IE で追加で典型的とみなす細菌として C. striatum が C. jeikeium・CoNS 等とともに含まれる。",
      links: [
        { label: "IE 板書ノート：Duke 大基準", url: "../id-icu-notes/note-ie.html#ie-duke-major" }
      ]
    },
    {
      title: "血液培養 — Corynebacterium spp. はほぼ汚染",
      body: "血液培養陽性菌の汚染率テーブルで Cutibacterium / Corynebacterium spp. は 88-94% と「ほぼ汚染。IE の原因菌としてはまれ」。",
      links: [
        { label: "IE 2026 GL：血液培養（汚染率）", url: "../articles-gl-ie2026.html#ie2-section3" }
      ]
    },
    {
      title: "糖尿病性足感染（DFI） — コンタミネーション菌として注意",
      body: "反応しない糖尿病足感染で培養再提出する際、Corynebacterium 属や CoNS のコンタミ菌を単離するリスクに注意。創傷コロナイゼーション菌か感染原因菌かを慎重に判断。",
      links: [
        { label: "IWGDF 2023：培養検体採取", url: "../articles-gl-iwgdf-dfi2023.html#dfi-s1" },
        { label: "IWGDF 2023：第2章 SUMMARY", url: "../articles-gl-iwgdf-dfi2023.html#dfi-sum2" }
      ]
    }
  ],

  // ============ Stenotrophomonas maltophilia ============
  steno: [
    {
      title: "定着か感染かの見極めが第一歩 — 免疫不全で真の感染",
      body: "ブドウ糖非発酵グラム陰性桿菌で水環境に遍在し、一般に病原性は低い。免疫不全（血液腫瘍・嚢胞性線維症・人工呼吸器依存）では真の感染を起こし、特に血液腫瘍患者の出血性肺炎・菌血症は重篤。CRAB と同様にまず定着と感染を識別することが治療の第一歩。発熱性好中球減少症（FN）の起因菌としては 2–5%。",
      links: [
        { label: "IDSA AMR-GNR 2024：S. maltophilia の特徴", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-overview" },
        { label: "FN 板書ノート：起因菌の内訳", url: "../id-icu-notes/note-fn.html#ch5-s2" },
        { label: "耐性GNR 板書ノート：S. maltophilia", url: "../id-icu-notes/note-resistant-gnr.html#ch3-s1" }
      ]
    },
    {
      title: "固有の多剤耐性 — L1/L2 βラクタマーゼでβラクタムが無効",
      body: "L1（MBL型：カルバペネム・ペニシリン・セファロスポリンを加水分解、アズトレオナムは分解しない）と L2（セリン型：セファロスポリン・アズトレオナムを加水分解）の 2 種のβラクタマーゼにより大部分のβラクタム系が無効。アミノグリコシドは染色体性修飾酵素で固有耐性、フルオロキノロンは排出ポンプ亢進・Smqnr 遺伝子で耐性化する。セフタジジムは L1/L2 で固有に不活化され、2024 年から CLSI が感受性ブレイクポイントを廃止した（感受性と出ても使用しない）。",
      links: [
        { label: "IDSA AMR-GNR 2024：特徴・耐性機序", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-overview" },
        { label: "IDSA AMR-GNR 2024：セフタジジムは使用しない", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-ceftaz" },
        { label: "耐性GNR 板書ノート：耐性機序", url: "../id-icu-notes/note-resistant-gnr.html#ch3-s1" }
      ]
    },
    {
      title: "治療は「2 剤併用」が基本 — 単剤では不十分",
      body: "動物モデルで単剤の殺菌効果が不十分なため、臨床的改善まで 2 剤以上の併用が推奨される。アプローチ A：セフィデロコル／高用量ミノサイクリン／ST 合剤（TMP-SMX）／レボフロキサシンの 4 剤から 2 剤を選択。アプローチ B：CAZ-AVI＋アズトレオナム（L1 は ATM を分解せず、L2 はアビバクタムで阻害でき両機序を回避、感受性率約 92%、肝酵素上昇に注意）。当院では ①ST 合剤＋ミノサイクリン（腎機能障害・骨髄抑制なし）②レボフロキサシン＋ミノサイクリン（腎障害・骨髄抑制あり）③セフィデロコル＋ミノサイクリン（ST／キノロン既使用・耐性例）。",
      links: [
        { label: "IDSA AMR-GNR 2024：全体的治療アプローチ", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-approach" },
        { label: "IDSA AMR-GNR 2024：CAZ-AVI＋アズトレオナム", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-cazatm" },
        { label: "耐性GNR 板書ノート：S. maltophilia の抗菌薬選択", url: "../id-icu-notes/note-resistant-gnr.html#ch3-s1" }
      ]
    },
    {
      title: "個別薬の位置づけ — セフィデロコル / ST 合剤",
      body: "セフィデロコルは感受性ほぼ 100%（非感受性株が存在せず CLSI は感受性のみのブレイクポイント）、好中球減少ウサギ肺炎モデルで肺組織から完全除菌し、生存率はセフィデロコル 87% vs TMP-SMX 25%。ST 合剤は感受性 90% 以上だが PK/PD 上は静菌的で単剤では完全な抑制が難しく、用量は TMP 成分 10–15 mg/kg/日を分割投与（>15 mg/kg/日では毒性が増え追加の利益はない）。",
      links: [
        { label: "IDSA AMR-GNR 2024：セフィデロコル", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-fdc" },
        { label: "IDSA AMR-GNR 2024：TMP-SMX の役割", url: "../articles-gl-idsa-amr-gnr2024.html#sec6-tmp" }
      ]
    }
  ]

};
