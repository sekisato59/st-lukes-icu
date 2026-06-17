/**
 * sedatives-cards.js
 * ICU主要鎮静薬カード — 共有データ・レンダラー（2デザイン対応）
 *
 * 2つの描画スタイルを持つ：
 *   ・既定（block）  ：作用機序/投与量/脳への作用/位置付け/副作用 のセクション型カード
 *                     （exam-neurology / articles-gl-padis2025 / karte-by-system で使用）
 *   ・navy（opt-in） ：schedule-icu-conf と同一の紺（nx-drug）カード。
 *                     「脳作用」は独立行にせず「特徴」に統合。
 *                     （resident-qa/qa-neuro-sedation で使用）
 *
 * 内容は PADIS 2018+2025 / sedatives-neuroicu2025 / schedule-icu-conf の鎮静薬カードに基づく。
 * カルテ発注画面の再現は schedule-icu-conf 限定（運用情報）のため本部品には含めない。
 *
 * 使い方:
 *   <div id="my-container"></div>
 *   <script src="../sedatives-cards.js"></script>
 *   <script>renderSedativeCards('my-container');</script>            // 既定（block）
 *   <script>renderSedativeCards('my-container', {style:'navy'});</script>  // 紺カード
 */

(function () {
  /* ── CSS injection (1回のみ・両スタイル分) ─────────────── */
  if (!document.getElementById('sed-cards-css')) {
    var s = document.createElement('style');
    s.id = 'sed-cards-css';
    s.textContent = [
      /* block スタイル */
      '.sed-block{background:#FAFBFC;border:1px solid var(--border);border-radius:10px;margin:0 0 14px;overflow:hidden;}',
      '.sed-block:last-child{margin-bottom:0;}',
      '.sed-block-head{padding:12px 18px;}',
      '.sed-block-head .sed-jp{font-size:0.98rem;font-weight:800;letter-spacing:0.02em;color:#fff;}',
      '.sed-block-head .sed-en{font-size:0.74rem;font-weight:500;color:rgba(255,255,255,0.75);margin-left:10px;}',
      '.sed-tag{float:right;font-size:0.68rem;font-weight:700;padding:3px 10px;border-radius:3px;letter-spacing:0.04em;}',
      '.sed-tag.preferred{background:rgba(22,163,74,0.9);color:#fff;}',
      '.sed-tag.first-line{background:rgba(37,99,235,0.9);color:#fff;}',
      '.sed-tag.not-first{background:rgba(220,38,38,0.85);color:#fff;}',
      '.sed-block-body{padding:12px 18px;}',
      '.sed-section{padding:8px 0 4px;}',
      '.sed-section:first-child{padding-top:0;}',
      '.sed-section:last-child{padding-bottom:0;}',
      '.sed-section-title{display:block;font-size:0.82rem;font-weight:800;padding:5px 12px;border-radius:6px;margin:0 0 9px;letter-spacing:0.02em;}',
      '.sed-block-body p,.sed-block-body ul li{font-size:0.85rem;color:#475569;line-height:1.7;margin:4px 0;}',
      '.sed-block-body ul{padding-left:20px;margin:4px 0 8px;list-style:disc;}',
      '.sed-block-body strong{font-weight:700;color:var(--text);}',
      '.sed-alert{background:#FEF2F2;border:1px solid #FECACA;border-radius:6px;padding:8px 12px;margin:8px 0;font-size:0.82rem;color:#7F1D1D;line-height:1.7;}',
      '.sed-note{background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:8px 12px;margin:8px 0;font-size:0.82rem;color:#1E3A5F;line-height:1.7;}',
      '.sed-green{background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;padding:8px 12px;margin:8px 0;font-size:0.82rem;color:#14532D;line-height:1.7;}',
      /* navy（nx-drug）スタイル */
      '.nx-drug-card{background:#fff;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;margin-bottom:10px;}',
      '.nx-drug-card:last-child{margin-bottom:0;}',
      '.nx-drug-name{background:linear-gradient(90deg,#0C1F3A 0%,#1E4F8C 50%,#1269B0 100%);color:#fff;padding:10px 18px;display:flex;align-items:center;gap:14px;}',
      '.nx-drug-name-main{flex:1;}',
      '.nx-drug-name-text{font-size:0.88rem;font-weight:900;line-height:1.3;}',
      '.nx-drug-alias{font-size:0.68rem;color:rgba(255,255,255,0.65);font-weight:400;display:block;margin-top:2px;}',
      '.nx-drug-divline{width:1px;height:28px;background:rgba(255,255,255,0.25);flex-shrink:0;}',
      '.nx-drug-dose-box{flex-shrink:0;}',
      '.nx-drug-dose-lbl{font-size:0.58rem;color:rgba(255,255,255,0.6);letter-spacing:0.06em;}',
      '.nx-drug-dose-val{font-size:0.82rem;font-weight:800;line-height:1.3;}',
      '.nx-drug-rows{padding:12px 16px;}',
      '.nx-drug-row{display:flex;gap:8px;align-items:baseline;padding:6px 0;font-size:0.77rem;line-height:1.75;color:#334155;border-bottom:1px solid #F8FAFC;}',
      '.nx-drug-row:last-child{border-bottom:none;}',
      '.nx-drug-lbl{font-size:0.65rem;font-weight:700;background:rgba(56,150,255,0.22);color:#1763B8;padding:2px 7px;border-radius:3px;flex-shrink:0;}',
      '.nx-drug-body{flex:1;}',
      '.nx-drug-body strong{color:#1E293B;}',
      '.nx-drug-li{display:block;padding-left:1em;text-indent:-1em;}',
      '.nx-drug-li + .nx-drug-li{margin-top:2px;}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════
   * block スタイル用データ（セクション型・既定）
   * ══════════════════════════════════════════════════════════ */
  var SED_BLOCK = [
    {
      jp: 'デクスメデトミジン',
      en: 'Dexmedetomidine (DEX)',
      headBg: 'linear-gradient(135deg,#15803D,#16A34A)',
      tag: { label: 'PADIS 2025 優先', cls: 'preferred' },
      titleColor: '#15803D', titleBg: '#DCFCE7',
      sections: [
        {
          title: '作用機序・薬理',
          html: '<p>α₂アドレナリン受容体作動薬。<strong>鎮静・鎮痛・抗不安効果</strong>を合わせ持つ。自然睡眠に近い鎮静が得られ、呼びかけに反応できる覚醒鎮静が特徴。</p>'
              + '<p><strong>呼吸抑制がほとんどなく</strong>、抜管後の使用も可能。鎮痛補助薬としての効果もある。</p>'
        },
        {
          title: '投与量・用法',
          html: '<ul>'
              + '<li>維持：<strong>0.2〜0.7 µg/kg/hr</strong>（持続投与）</li>'
              + '<li>ローディング：0.5〜1 µg/kg を10分以上かけて（徐脈・低血圧リスクあり。省略可）</li>'
              + '<li>鎮静目標：<strong>RASS −2〜0</strong></li>'
              + '</ul>'
        },
        {
          title: '脳への作用（神経ICU）',
          html: '<p>CBF・CMR・ICP への影響は<strong>最小限</strong>。神経ICUでの使用において有利な特性。</p>'
              + '<p>前臨床研究では<strong>神経保護効果の可能性</strong>（カテコラミン低下・グルタミン酸調節・TLR4/NF-κB抑制）が示唆されているが、臨床的エビデンスはまだ不十分。</p>'
        },
        {
          title: 'PADIS 2025 推奨',
          html: '<p class="sed-green"><strong>2025 UPDATE（条件付き推奨・中等度エビデンス）：</strong>'
              + '浅鎮静・せん妄予防が最優先の機械換気成人ICU患者では、プロポフォールより DEX を優先する。<br>'
              + '根拠：29 RCT・3,087名のメタ解析。<strong>せん妄 ARR −15名/100名・持続時間 MD −25.6時間・ICU在室 MD −0.19日</strong>。</p>'
        },
        {
          title: '副作用・注意点',
          html: '<p class="sed-alert"><strong>徐脈（RR 1.65、ARI +6/100名）・低血圧：</strong>'
              + '神経ICUでは CPP 低下→二次脳損傷につながるため、血行動態管理に注意。<br>'
              + '洞機能不全・高度徐脈・房室ブロック患者には慎重に投与。'
              + '</p>'
              + '<p>深鎮静が必要な患者（バルビツレート昏睡、神経筋遮断中など）には不適。'
              + 'コスト・入手性（国・施設により差がある）も条件付き推奨の理由。</p>'
        }
      ]
    },
    {
      jp: 'プロポフォール',
      en: 'Propofol',
      headBg: 'linear-gradient(135deg,#1D4ED8,#2563EB)',
      tag: { label: '第一選択（2018）', cls: 'first-line' },
      titleColor: '#1D4ED8', titleBg: '#EFF6FF',
      sections: [
        {
          title: '作用機序・薬理',
          html: '<p>GABAₐ受容体増強による静脈麻酔薬。<strong>効果発現・消失が速く</strong>、用量調節が容易。</p>'
              + '<p>用量依存的にCBF・CMR・ICPを低下させるが、同時に全身血管拡張・陰性変力作用で<strong>血圧・CPP低下を引き起こす</strong>。心機能低下患者では特に注意。</p>'
        },
        {
          title: '投与量・用法',
          html: '<ul>'
              + '<li>維持：<strong>0.5〜4 mg/kg/hr</strong>（ICU 鎮静）</li>'
              + '<li>鎮静目標：<strong>RASS −2〜0</strong></li>'
              + '<li>神経ICU（ICP管理目的）：最大5 mg/kg/hr 程度（PRIS モニタリング必須）</li>'
              + '</ul>'
        },
        {
          title: 'PADIS/ガイドラインでの位置付け',
          html: '<p class="sed-note">'
              + '<strong>PADIS 2018：</strong>BZD よりプロポフォールまたは DEX を優先（条件付き推奨）。<br>'
              + '<strong>PADIS 2025 UPDATE：</strong>浅鎮静・せん妄予防優先の場合は DEX をプロポフォールより優先。<br>'
              + '<strong>神経ICU専門家コンセンサス：</strong>プロポフォールおよびDEXを第一選択（TBI患者で最多使用）。'
              + '</p>'
        },
        {
          title: '副作用・注意点',
          html: '<p class="sed-alert"><strong>PRIS（プロポフォール注入症候群）：</strong>'
              + '高用量（>4〜5 mg/kg/hr）・長期（>48時間）投与で発症する稀だが致死的合併症。<br>'
              + '代謝性アシドーシス・横紋筋融解・心筋障害・急性腎障害・高TG血症・昇圧抵抗性低血圧。<br>'
              + '高用量長期使用時は TG・CK・乳酸の定期モニタリングを行う。'
              + '</p>'
              + '<p>脂質含有（1.1 kcal/mL）。長期TPN中や高TG血症患者では総脂質投与量に注意。自己抜管リスク上昇の信号あり（低エビデンス）。</p>'
        }
      ]
    },
    {
      jp: 'ミダゾラム（ベンゾジアゼピン系）',
      en: 'Midazolam / BZD',
      headBg: 'linear-gradient(135deg,#B45309,#D97706)',
      tag: { label: '第一選択としない', cls: 'not-first' },
      titleColor: '#B45309', titleBg: '#FFF7ED',
      sections: [
        {
          title: '作用機序・薬理',
          html: '<p>BZD受容体を介してGABAₐ受容体を増強。<strong>鎮静・抗不安・抗痙攣・健忘効果</strong>を持つ。</p>'
              + '<p>CBF・CMR・ICPを低下させるが、その効果はプロポフォールより小さい。血行動態への影響も比較的少ない。</p>'
        },
        {
          title: '投与量・用法',
          html: '<ul>'
              + '<li>維持（ICU 鎮静）：<strong>0.05〜0.2 mg/kg/hr</strong></li>'
              + '<li>SE（第3相・全身麻酔薬域）：0.05〜0.4 mg/kg/hr（バースト抑制を目標とする高用量）</li>'
              + '<li>SE 第1選択：ジアゼパム 5〜10 mg 静注、ロラゼパム 4 mg 静注、<strong>ミダゾラム筋注</strong>（静脈路確保不要）</li>'
              + '</ul>'
        },
        {
          title: 'PADIS/ガイドラインでの位置付け',
          html: '<p class="sed-alert"><strong>PADIS 2018/2025：</strong>'
              + 'ベンゾジアゼピン持続投与は<strong>せん妄の修正可能リスク因子</strong>。ICU鎮静には第一選択としない。<br>'
              + '神経ICU専門家コンセンサス：ミダゾラムを第一選択薬として使用することのコンセンサスなし。'
              + '</p>'
              + '<p>てんかん重積状態（SE）では<strong>抗痙攣目的での使用に適応あり</strong>（SE第1〜3相）。</p>'
        },
        {
          title: '副作用・注意点',
          html: '<ul>'
              + '<li><strong>蓄積・遅延覚醒：</strong>長時間投与後の代謝物（1-OH体）蓄積。腎・肝機能低下で著明。</li>'
              + '<li><strong>離脱症状：</strong>長期投与後の急速中断で不穏・振戦・発作。</li>'
              + '<li><strong>せん妄リスク増加：</strong>BZD 持続静注は独立したせん妄リスク因子（OR 3.5〜5）。</li>'
              + '<li><strong>神経認知への悪影響：</strong>成人・小児の重症患者での長期使用が不良な長期神経認知アウトカムと関連。</li>'
              + '</ul>'
        }
      ]
    },
    {
      jp: 'チオペンタール（バルビツール酸系）',
      en: 'Thiopental（ラボナール）',
      headBg: 'linear-gradient(135deg,#5B21B6,#7C3AED)',
      tag: { label: '限定使用（難治例）', cls: 'not-first' },
      titleColor: '#6D28D9', titleBg: '#EDE9FE',
      sections: [
        {
          title: '作用機序・薬理',
          html: '<p><strong>バルビツール酸系</strong>（超短時間作用型）。GABAₐ受容体増強により<strong>強力な鎮静・抗痙攣作用</strong>を持つ。</p>'
              + '<p>強力な脳代謝抑制により<strong>脳血流・頭蓋内圧を低下</strong>させる（脳保護作用）。</p>'
        },
        {
          title: '投与量・用法',
          html: '<ul>'
              + '<li>難治性てんかん重積・難治性頭蓋内圧亢進に対し、負荷 <strong>3〜5 mg/kg IV</strong> 後に持続静注 <strong>2〜3 mg/kg/hr</strong>（上限 5 mg/kg/hr）</li>'
              + '<li>EEG の <strong>burst suppression</strong> を目標に調整する</li>'
              + '</ul>'
        },
        {
          title: '位置付け・適応',
          html: '<p class="sed-alert"><strong>ICU のルーチン鎮静には使用しない。</strong><br>'
              + '難治性てんかん重積・難治性頭蓋内圧亢進（バルビツール酸昏睡療法）に限定して使用する。</p>'
        },
        {
          title: '副作用・注意点',
          html: '<ul>'
              + '<li><strong>強い循環抑制（低血圧）・呼吸抑制</strong>をきたす</li>'
              + '<li><strong>長時間投与で著明に蓄積し、覚醒が大きく遷延</strong>する</li>'
              + '<li>免疫抑制・感染症リスク、腸管蠕動低下に注意</li>'
              + '</ul>'
        }
      ]
    }
  ];

  /* ══════════════════════════════════════════════════════════
   * navy（nx-drug）スタイル用データ。schedule-icu-conf と内容同期。
   * 「脳作用」は「特徴」に統合済み。
   * ══════════════════════════════════════════════════════════ */
  var SED_NAVY = [
    {
      jp: 'デクスメデトミジン',
      alias: 'Dexmedetomidine（プレセデックス）',
      dose: '0.2〜0.7 μg/kg/h',
      rows: [
        { lbl: '分類', items: [
          '・<strong style="color:#1763B8;">α₂アドレナリン受容体作動薬</strong>',
          '・鎮静・鎮痛・抗不安作用を併せ持つ'
        ]},
        { lbl: '用量', items: [
          '・負荷 <strong>6 μg/kg/h × 10分</strong>（省略可）',
          '・維持 <strong style="color:#1763B8;">0.2〜0.7 μg/kg/h</strong> 持続投与'
        ]},
        { lbl: '長所', items: [
          '・<strong style="color:#1763B8;">呼吸抑制がなく</strong>、鎮静中も呼びかけに応答して意思疎通が可能（協力的鎮静）',
          '・<strong style="color:#1763B8;">非挿管患者でも使用可能</strong>',
          '・29試験・3,087名のメタ解析でせん妄予防効果（<strong style="color:#1763B8;">ARR −15名/100名・持続 MD −25.6時間・ICU 在室 MD −0.19日</strong>）が示されており、<strong style="color:#1763B8;">2025年PADISガイドラインで特に推奨</strong>されている'
        ]},
        { lbl: '短所', items: [
          '・<strong style="color:#1763B8;">徐脈（RR 1.65・ARI +6/100名）・低血圧に注意</strong>',
          '・基礎心疾患のある患者や CPP 維持が必要な神経 ICU では慎重に投与する',
          '・<strong style="color:#1763B8;">深鎮静（RASS −3 以下）が必要な場面には不向き</strong>'
        ]},
        { lbl: '特徴', items: [
          '・機械換気下で浅鎮静を維持しながら神経学的評価を継続したい患者に適する',
          '・<strong style="color:#1763B8;">2025年版 PADIS ガイドラインでは、せん妄予防目的においてプロポフォールより優先して使用することが提案</strong>されている',
          '・<strong style="color:#1763B8;">CBF・CMR・ICP への影響は最小限</strong>で、神経 ICU での使用に有利',
          '・前臨床研究では神経保護効果の可能性（カテコラミン低下・グルタミン酸調節・TLR4/NF-κB 抑制）が示唆されるが、臨床的エビデンスはまだ不十分'
        ]}
      ]
    },
    {
      jp: 'プロポフォール',
      alias: 'Propofol（ディプリバン）',
      dose: '0.3〜3 mg/kg/h',
      rows: [
        { lbl: '分類', items: [
          '・GABA-A 受容体増強による<strong style="color:#1763B8;">短時間作用型静脈麻酔薬</strong>',
          '・全身麻酔・ICU 鎮静いずれにも広く使用される'
        ]},
        { lbl: '用量', items: [
          '・持続 原液（10 mg/mL）<strong style="color:#1763B8;">0.03〜0.30 mL/kg/h</strong>（= 0.3〜3 mg/kg/h）',
          '・処置時間欠 原液 <strong>1〜2 mL</strong> ずつ追加'
        ]},
        { lbl: '長所', items: [
          '・<strong style="color:#1763B8;">効果発現・消失がともに迅速</strong>で鎮静深度の調整が容易',
          '・<strong style="color:#1763B8;">投与中断後の速やかな覚醒</strong>により、神経学的評価を頻回に行える'
        ]},
        { lbl: '短所', items: [
          '・<strong style="color:#1763B8;">低血圧・心機能抑制に注意</strong>',
          '・長期投与では脂肪組織への蓄積により覚醒遅延が生じやすい',
          '・高用量（>4〜5 mg/kg/h）・長時間（>48 時間）投与で稀に <strong style="color:#1763B8;">PRIS（プロポフォール注入症候群）</strong>（代謝性アシドーシス・横紋筋融解・心筋障害）が発症する'
        ]},
        { lbl: '特徴', items: [
          '・<strong style="color:#1763B8;">ICU 鎮静の標準薬（PADIS 2018）</strong>',
          '・2025年版では、せん妄予防・浅鎮静維持が優先される症例ではデクスメデトミジンを先行させることが提案されている',
          '・<strong style="color:#1763B8;">用量依存的に CBF・CMR・ICP を低下</strong>させ ICP 管理に有用',
          '・一方で全身血管拡張・陰性変力作用により <strong style="color:#1763B8;">血圧・CPP 低下</strong>をきたすため、心機能低下例では特に注意'
        ]}
      ]
    },
    {
      jp: 'ミダゾラム',
      alias: 'Midazolam（ドルミカム）',
      dose: '0.1〜0.4 mg/kg/h',
      rows: [
        { lbl: '分類', items: [
          '・<strong style="color:#1763B8;">ベンゾジアゼピン系（BZD）</strong>',
          '・GABA-A 受容体増強により鎮静・抗不安・健忘・抗痙攣の4作用を持つ'
        ]},
        { lbl: '用量', items: [
          '・持続 5A（10 mg 2 mL）＋生食 40 mL = <strong>50 mg/50 mL</strong> を <strong style="color:#1763B8;">0.1〜0.4 mg/kg/h</strong>',
          '・間欠 1A＋生食 8 mL を処置時 <strong>1〜2 mL</strong>',
          '・DIV 1A＋生食 50 mL を <strong>30 分</strong> かけて静注'
        ]},
        { lbl: '長所', items: [
          '・<strong style="color:#1763B8;">循環動態への影響が少なく</strong>低血圧患者にも使用しやすい',
          '・抗痙攣作用が強く <strong style="color:#1763B8;">SE（てんかん重積状態）の治療薬として重要</strong>',
          '・アルコール離脱症候群にも有効'
        ]},
        { lbl: '短所', items: [
          '・<strong style="color:#1763B8;">BZD 持続投与はせん妄の独立したリスク因子</strong>（複数の RCT で確認）',
          '・高脂溶性で組織蓄積性が高く、長期投与後は覚醒遅延が生じやすい',
          '・腎・肝機能低下患者では活性代謝物の蓄積により遷延がさらに顕著となる'
        ]},
        { lbl: '特徴', items: [
          '・PADIS ガイドラインでは ICU 鎮静薬としての日常的使用は<strong style="color:#1763B8;">推奨されない</strong>',
          '・SE・アルコール離脱・処置時の短時間鎮静など BZD が特に有効な状況では積極的に使用する',
          '・CBF・CMR・ICP を低下させるが、<strong style="color:#1763B8;">その効果はプロポフォールより小さい</strong>',
          '・<strong style="color:#1763B8;">血行動態への影響も比較的少ない</strong>'
        ]}
      ]
    },
    {
      jp: 'チオペンタール',
      alias: 'Thiopental（ラボナール）',
      dose: '2〜3 mg/kg/h',
      rows: [
        { lbl: '分類', items: [
          '・<strong style="color:#1763B8;">バルビツール酸系</strong>（超短時間作用型）',
          '・GABA-A 受容体増強により強力な鎮静・抗痙攣作用を持つ'
        ]},
        { lbl: '用量', items: [
          '・難治性てんかん重積・難治性頭蓋内圧亢進に対し、負荷 <strong>3〜5 mg/kg IV</strong> 後に持続静注 <strong style="color:#1763B8;">2〜3 mg/kg/h</strong>（上限 5 mg/kg/h）',
          '・EEG の <strong style="color:#1763B8;">burst suppression</strong> を目標に調整する'
        ]},
        { lbl: '長所', items: [
          '・強力な脳代謝抑制により <strong style="color:#1763B8;">脳血流・頭蓋内圧を低下</strong>させる（脳保護作用）',
          '・<strong style="color:#1763B8;">強力な抗痙攣作用</strong>をもち、難治性てんかん重積に有効'
        ]},
        { lbl: '短所', items: [
          '・<strong style="color:#1763B8;">強い循環抑制（低血圧）・呼吸抑制</strong>をきたす',
          '・<strong style="color:#1763B8;">長時間投与で著明に蓄積し、覚醒が大きく遷延</strong>する',
          '・免疫抑制・感染症リスク、腸管蠕動低下に注意'
        ]},
        { lbl: '特徴', items: [
          '・<strong style="color:#1763B8;">ICU のルーチン鎮静には使用しない</strong>',
          '・難治性てんかん重積・難治性頭蓋内圧亢進（バルビツール酸昏睡療法）に限定して使用する'
        ]}
      ]
    }
  ];

  /* ── レンダラー：block（既定） ─────────────────────────── */
  function renderBlock(drugs) {
    return drugs.map(function (drug) {
      var sectHtml = drug.sections.map(function (sec) {
        return '<div class="sed-section">'
          + '<span class="sed-section-title" style="color:' + drug.titleColor + ';background:' + drug.titleBg + ';">' + sec.title + '</span>'
          + sec.html
          + '</div>';
      }).join('');
      return '<div class="sed-block">'
        + '<div class="sed-block-head" style="background:' + drug.headBg + ';">'
        + '<span class="sed-tag ' + drug.tag.cls + '">' + drug.tag.label + '</span>'
        + '<span class="sed-jp">' + drug.jp + '</span>'
        + '<span class="sed-en">' + drug.en + '</span>'
        + '</div>'
        + '<div class="sed-block-body">' + sectHtml + '</div>'
        + '</div>';
    }).join('');
  }

  /* ── レンダラー：navy（nx-drug） ───────────────────────── */
  function buildRow(r) {
    return '<div class="nx-drug-row"><span class="nx-drug-lbl">' + r.lbl + '</span>'
      + '<span class="nx-drug-body">'
      + r.items.map(function (i) { return '<span class="nx-drug-li">' + i + '</span>'; }).join('')
      + '</span></div>';
  }
  function renderNavy(drugs) {
    return drugs.map(function (d) {
      return '<div class="nx-drug-card">'
        + '<div class="nx-drug-name">'
        + '<div class="nx-drug-name-main"><div class="nx-drug-name-text">' + d.jp + '</div>'
        + '<span class="nx-drug-alias">' + d.alias + '</span></div>'
        + '<div class="nx-drug-divline"></div>'
        + '<div class="nx-drug-dose-box"><div class="nx-drug-dose-lbl">維持用量</div>'
        + '<div class="nx-drug-dose-val">' + d.dose + '</div></div>'
        + '</div>'
        + '<div class="nx-drug-rows">' + d.rows.map(buildRow).join('') + '</div>'
        + '</div>';
    }).join('');
  }

  /* ── エントリポイント ──────────────────────────────────── */
  window.renderSedativeCards = function (containerId, opts) {
    opts = opts || {};
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = (opts.style === 'navy') ? renderNavy(SED_NAVY) : renderBlock(SED_BLOCK);
  };

})();
