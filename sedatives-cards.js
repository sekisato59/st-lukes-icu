/**
 * sedatives-cards.js
 * ICU主要鎮静薬カード — 共有データ・レンダラー
 * 使用ページ: exam-neurology.html, articles-gl-padis2025.html 等
 *
 * 使い方:
 *   <div id="my-container"></div>
 *   <script src="../sedatives-cards.js"></script>
 *   <script>renderSedativeCards('my-container');</script>
 */

(function () {
  /* ── CSS injection (1回のみ) ─────────────────────────── */
  if (!document.getElementById('sed-cards-css')) {
    var s = document.createElement('style');
    s.id = 'sed-cards-css';
    s.textContent = [
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
    ].join('');
    document.head.appendChild(s);
  }

  /* ── 薬剤データ ────────────────────────────────────────
   * PADIS 2018+2025 / sedatives-neuroicu2025 に基づく
   * ────────────────────────────────────────────────────── */
  var SEDATIVE_DRUGS = [
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
    }
  ];

  /* ── レンダラー ────────────────────────────────────────── */
  window.renderSedativeCards = function (containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SEDATIVE_DRUGS.map(function (drug) {
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
  };

})();
