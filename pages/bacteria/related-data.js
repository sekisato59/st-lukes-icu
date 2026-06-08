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
    { section: "感染性心内膜炎（IE）", items: [
      { embed: "../articles-gl-ie2026.html#ie4-section4", label: "JCS IE 2026 ▸ 標的治療：Staphylococcus（MSSA=セファゾリン／MRSA=VCM・DAP）" },
      { embed: "../articles-gl-ie2026.html#ie-section2", label: "JCS IE 2026 ▸ 疫学（MRSA 増加・急性重症化）" },
      { link: "../id-icu-notes/note-ie.html#ie-target-mssa", label: "IE 板書ノート ▸ MSSA 標的治療" },
      { link: "../id-icu-notes/note-ie.html#ie-target-mrsa", label: "IE 板書ノート ▸ MRSA 標的治療" }
    ] },
    { section: "カテーテル関連血流感染（CRBSI）", items: [
      { link: "../articles-gl-idsa-crbsi2009.html#sau", label: "IDSA CRBSI 2009 ▸ S. aureus はカテーテル抜去・経食道エコー・治療期間" }
    ] },
    { section: "菌血症マネジメント", items: [
      { link: "../articles-gl-vcm-tdm2020.html#vcm-s4", label: "VCM TDM 2020 ▸ 重症 MRSA は AUC/MIC 400–600 目標" },
      { link: "../articles-gl-balance-bacteremia2025.html#bal-discussion", label: "BALANCE 2025 ▸ 菌血症の投与期間（S. aureus は短縮対象外）" },
      { link: "../articles-gl-ssc2026.html#ssc-s2", label: "SSC 2026 ▸ フォロー血培でクリアランス確認" }
    ] },
    { section: "肺炎", items: [
      { link: "../articles-gl-scap-icm2025.html#scap-common-path", label: "重症市中肺炎 2025 ▸ S. aureus・PVL 産生株（壊死性肺炎）" }
    ] }
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
  // 元ページの該当ボックスをそのまま埋め込む（embed）。custom クラス主体の板書ノート箱はリンクのみ（link）。
  steno: [
    { section: "特徴・耐性機序", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-overview", label: "IDSA AMR-GNR 2024 ▸ S. maltophilia の特徴と治療の難しさ" }
    ] },
    { section: "治療", items: [
      { embed: "../articles-gl-idsa-amr-gnr2024.html#sec6-approach", label: "IDSA AMR-GNR 2024 ▸ 治療の全体アプローチ（2剤併用）" },
      { link: "../id-icu-notes/note-resistant-gnr.html#ch3-s1", label: "耐性GNR 板書ノート ▸ S. maltophilia（当院での使用例）" }
    ] },
    { section: "発熱性好中球減少症（FN）", items: [
      { link: "../id-icu-notes/note-fn.html#ch5-s2", label: "FN 板書ノート ▸ 起因菌の内訳（FN での頻度）" }
    ] }
  ]

};
