// ===== 全ページ共通：ナビ統一 + 検索機能 =====
(function initGlobalSearch() {
  // 既にメインページで検索UIがある場合はスキップ
  if (document.getElementById('heroSearchTrigger')) return;

  var navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  // basePath: script.js の src 属性からルートへの相対パスを算出
  //   ※ キャッシュバスター ?v=... を含む場合は除去する
  var basePath = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('script.js') !== -1) {
      basePath = src.replace(/script\.js(\?[^#]*)?$/, '');
      break;
    }
  }

  // ナビメニュー全体をメインページと同じ統一版に差し替え（テキストのみ）
  // ─ 各項目は { 親項目, 子リンク } 構造。子リンクなしは単独リンク扱い ─
  var caret = '<svg class="nav-caret" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 5 6 8 9 5"/></svg>';
  function dd(label, items) {
    var lis = items.map(function(it) {
      return '<li><a href="' + basePath + it.href + '">' + it.label + '</a></li>';
    }).join('');
    return '<li class="nav-item-dd">'
      + '<button type="button" class="nav-link nav-link-dd" aria-expanded="false">' + label + caret + '</button>'
      + '<ul class="nav-dd-menu">' + lis + '</ul>'
      + '</li>';
  }
  function single(href, label) {
    return '<li><a href="' + basePath + href + '" class="nav-link">' + label + '</a></li>';
  }

  navMenu.innerHTML = ''
    + dd('【ICU】レジデント資料', [
        { href: 'pages/resident-resources.html#onboard', label: '#0 ローテ開始前' },
        { href: 'pages/resident-resources.html#neuro',   label: '#1 神経系' },
        { href: 'pages/resident-resources.html#cv',      label: '#2 循環器系' },
        { href: 'pages/resident-resources.html#resp',    label: '#3 呼吸器系' },
        { href: 'pages/resident-resources.html#renal',   label: '#4 腎電解質系' },
        { href: 'pages/resident-resources.html#gi',      label: '#5 消化器/肝胆道系' },
        { href: 'pages/resident-resources.html#heme',    label: '#6 血液系' },
        { href: 'pages/resident-resources.html#id',      label: '#7 感染症' },
        { href: 'pages/resident-resources.html#nutr',    label: '#8 栄養/代謝系' },
        { href: 'pages/resident-resources.html#msk',     label: '#9 筋骨格系' },
        { href: 'pages/resident-resources.html#prev',    label: '#10 予防' },
        { href: 'pages/resident-resources.html#ai',      label: '#11 医療×AI' },
        { href: 'pages/resident-procedures.html',        label: '#12 手技・穿刺' },
        { href: 'pages/icu-core-conf.html',              label: '資料ダウンロード' }
      ])
    + dd('当院ICUについて', [
        { href: 'pages/about-icu.html',          label: '当院ICUについて' },
        { href: 'pages/pre-rotation-todo.html',  label: 'ローテされる先生へ' },
        { href: 'pages/icu-team.html',           label: 'スタッフ紹介' },
        { href: 'pages/pre-rotation-todo.html#sec-schedule', label: 'スケジュール' },
        { href: 'pages/icu-policy-rules.html',   label: 'ICUのルール' }
      ])
    + dd('学習コンテンツ', [
        { href: 'pages/yoshida-qa.html',              label: '【9+10】吉田先生のお悩み相談コーナー' },
        { href: 'pages/schedule-weekly-id-icu.html',  label: '【感染症】ID×ICU conference' },
        { href: 'pages/icu-passport.html',            label: 'ICU PASSPORT（レクチャーシート）' }
      ])
    + dd('論文GL', [
        { href: 'pages/articles-guidelines.html', label: '論文GL（ICU）' },
        { href: 'pages/articles-outpatient.html', label: '論文GL（外来）' }
      ])
    + dd('講義動画', [
        { href: 'pages/video-lectures.html',          label: '聖路加ICU動画講座集' },
        { href: 'pages/schedule-weekly-id-icu.html',  label: 'ID×ICU Conference 動画集' }
      ])
    + dd('便利ツール', [
        // 並び順：英字 A–Z → 50音（あいうえお）順
        { href: 'pages/apache-ii.html',          label: 'APACHE II スコア' },
        { href: 'pages/karte-by-system.html',    label: 'By Systemカルテ作成ツール' },
        { href: 'pages/cam-icu.html',            label: 'CAM-ICU（せん妄評価）' },
        { href: 'pages/child-pugh.html',         label: 'Child-Pugh スコア（肝硬変重症度）' },
        { href: 'pages/ldl-target.html',         label: 'LDL目標値チェッカー' },
        { href: 'pages/rass.html',               label: 'RASS（鎮静評価）' },
        { href: 'pages/rrs-report.html',         label: 'RRS対応記録 一発作成' },
        { href: 'pages/sofa.html',               label: 'SOFA-2 スコア（2026 改訂）' },
        { href: 'pages/karte-abbreviations.html',label: 'カルテ略語対策' },
        // 公開停止中（再公開時は次行のコメントアウト解除）
        // { href: 'pages/abx-calculator.html',     label: '抗菌薬投与量 一発計算' },
        // { href: 'pages/nutrition-calc.html',     label: '必要カロリー・蛋白量 計算' },
        { href: 'pages/transfusion-calc.html',   label: '輸血量 → 期待上昇予測（RBC・PC・FFP）' }
      ])
    + '<li><a href="' + basePath + 'pages/recent-all.html" class="nav-link nav-link-search" id="globalSearchTrigger" aria-label="サイト内コンテンツ検索">検索<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></a></li>';

  // ── ドロップダウンの開閉（クリックで切り替え、外側クリックで閉じる） ──
  (function bindDropdowns() {
    var ddBtns = navMenu.querySelectorAll('.nav-link-dd');
    function closeAll(except) {
      ddBtns.forEach(function(b) {
        if (b === except) return;
        b.setAttribute('aria-expanded', 'false');
        b.parentElement.classList.remove('open');
      });
    }
    ddBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var li = btn.parentElement;
        var isOpen = li.classList.contains('open');
        closeAll(btn);
        if (isOpen) {
          li.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          li.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target)) closeAll(null);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeAll(null);
    });
  })();

  // 検索オーバーレイをbodyに追加
  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'globalSearchOverlay';
  overlay.innerHTML = '<div class="search-overlay-inner"><button class="search-overlay-close" id="globalSearchClose" aria-label="閉じる">&times;</button><input type="text" id="globalSearchInput" class="search-overlay-input" placeholder="キーワードで検索（例：抗菌薬、透析、ルール）" autocomplete="off"><div class="search-overlay-results" id="globalSearchResults"></div></div>';
  document.body.appendChild(overlay);

  function bindSearch() {
    if (typeof SEARCH_INDEX === 'undefined') return;
    var trigger = document.getElementById('globalSearchTrigger');
    var ov = document.getElementById('globalSearchOverlay');
    var cl = document.getElementById('globalSearchClose');
    var inp = document.getElementById('globalSearchInput');
    var res = document.getElementById('globalSearchResults');

    // サブページからのURL補正（scriptのパスからルートへの相対パスを算出）
    var urlPrefix = basePath;

    function closeS() { ov.classList.remove('active'); inp.value = ''; res.innerHTML = ''; }

    // ナビ「検索」は recent-all.html へ直リンク（href）に変更したためモーダルは bind しない
    cl.addEventListener('click', closeS);
    ov.addEventListener('click', function(e) { if (e.target === ov) closeS(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && ov.classList.contains('active')) closeS(); });

    inp.addEventListener('input', function() {
      var q = this.value.trim().toLowerCase();
      if (q.length < 2) { res.innerHTML = ''; return; }
      var tokens = q.split(/\s+/);
      var scored = [];
      SEARCH_INDEX.forEach(function(item) {
        var title = (item.title || '').toLowerCase();
        var desc = (item.desc || '').toLowerCase();
        var kw = (item.keywords || '').toLowerCase();
        var h = title + ' ' + desc + ' ' + kw;
        if (!tokens.every(function(t) { return h.indexOf(t) !== -1; })) return;
        var score = 0;
        tokens.forEach(function(t) {
          if (title.indexOf(t) !== -1) score += 10;
          if (desc.indexOf(t) !== -1) score += 5;
          if (kw.indexOf(t) !== -1) score += 1;
        });
        scored.push({ item: item, score: score });
      });
      scored.sort(function(a, b) { return b.score - a.score; });
      var matches = scored.slice(0, 20);
      if (matches.length === 0) {
        res.innerHTML = '<div class="search-overlay-noresult">該当するページが見つかりません</div>';
      } else {
        // search-index.js には不等号（ICP>22mmHg 等）が生で含まれることがあるため
        // HTML として崩れないよう必ずエスケープしてから埋め込む。
        var esc = function(s){ return String(s).replace(/[&<>"']/g, function(c){
          return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        }); };
        res.innerHTML = matches.map(function(m) {
          return '<a href="' + esc(urlPrefix + m.item.url) + '" class="search-overlay-result"><div class="search-overlay-result-title">' + esc(m.item.title) + '</div><div class="search-overlay-result-desc">' + esc(m.item.desc) + '</div></a>';
        }).join('');
      }
    });
  }

  // search-index.jsがまだ読み込まれていなければ動的に読み込む
  if (typeof SEARCH_INDEX !== 'undefined') {
    bindSearch();
  } else {
    var s = document.createElement('script');
    s.src = basePath + 'search-index.js';
    s.onload = bindSearch;
    document.head.appendChild(s);
  }
})();

// ===== site-config.js からコンテンツを動的生成 =====
(function renderConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // -- スタッフグリッド (url があればリンクカードに) --
  const staffGrid = document.getElementById('staffGrid');
  if (staffGrid && SITE_CONFIG.staff) {
    staffGrid.innerHTML = SITE_CONFIG.staff.map(s => {
      const inner = `
        ${s.image ? `<img src="${s.image}" alt="${s.name}" class="staff-photo">` : '<div class="staff-photo-placeholder">👤</div>'}
        <div class="staff-role">${s.role}</div>
        <div class="staff-name">${s.name}</div>
        ${s.url ? '<div class="staff-link-hint">プロフィールを見る →</div>' : ''}
      `;
      return s.url
        ? `<a class="staff-card" href="${s.url}">${inner}</a>`
        : `<div class="staff-card">${inner}</div>`;
    }).join('');
  }

  // -- サイドバー 緊急連絡先 --
  const sidebarContacts = document.getElementById('sidebarContacts');
  if (sidebarContacts && SITE_CONFIG.contacts) {
    sidebarContacts.innerHTML = SITE_CONFIG.contacts.map(c => `
      <div class="sidebar-contact">
        <span class="sidebar-contact-label">${c.label}</span>
        <span class="sidebar-contact-num">内線 ${c.number}</span>
      </div>
    `).join('');
  }

  // -- サイドバー 便利リンク集 --
  const usefulLinksEl = document.getElementById('usefulLinks');
  if (usefulLinksEl && SITE_CONFIG.usefulLinks) {
    usefulLinksEl.innerHTML = SITE_CONFIG.usefulLinks.map(l => `
      <a class="useful-link" href="${l.url}" target="_blank" rel="noopener">
        <span>${l.icon}</span>
        <span>${l.name}</span>
        <span class="useful-link-ext">↗</span>
      </a>
    `).join('');
  }

  // -- ヒーロー背景画像 --
  if (SITE_CONFIG.heroImage) {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundImage =
        `url('${SITE_CONFIG.heroImage}'), ${getComputedStyle(hero).backgroundImage}`;
    }
  }
})();

// ===== Mobile menu toggle =====
// index.html は dum-nav 構造で navToggle/navMenu を持たないため、null ガード必須
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  // 各ナビ項目クリック時にドロワーを閉じる（ただしドロップダウン親ボタンは展開のため除外）
  document.querySelectorAll('.nav-link:not(.nav-link-dd)').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  // ドロップダウン内のリンクをタップしたときもドロワーを閉じる
  document.querySelectorAll('.nav-dd-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}


// ===== Navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ===== Scroll-spy: active nav link =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === entry.target.id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = btn.nextElementSibling;
    const isActive = item.classList.contains('active');

    // 他を閉じる
    document.querySelectorAll('.faq-item').forEach(f => {
      f.classList.remove('active');
      f.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== Scroll-reveal animation =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ===== 自己紹介テンプレート コピーボタン =====
const copyBtn = document.getElementById('copyTemplateBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const pre = document.getElementById('introTemplatePre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      copyBtn.textContent = '✅ コピーしました！';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = '📋 テンプレートをコピー';
        copyBtn.classList.remove('copied');
      }, 2500);
    }).catch(() => {
      // フォールバック
      const ta = document.createElement('textarea');
      ta.value = pre.textContent.trim();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      copyBtn.textContent = '✅ コピーしました！';
      setTimeout(() => { copyBtn.textContent = '📋 テンプレートをコピー'; }, 2500);
    });
  });
}

// ===== Week Schedule Slot =====
(function() {
  var slot = document.getElementById('weekSlot');
  if (!slot) return;
  var tabs = slot.querySelectorAll('.ws-tab');
  var views = slot.querySelectorAll('.ws-view');
  var current = 0;

  function goTo(idx) {
    current = (idx + views.length) % views.length;
    views.forEach(function(v, i) { v.classList.toggle('active', i === current); });
    tabs.forEach(function(t, i) { t.classList.toggle('active', i === current); });
  }

  slot.addEventListener('wheel', function(e) {
    e.preventDefault();
    goTo(current + (e.deltaY > 0 ? 1 : -1));
  }, { passive: false });

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() { goTo(parseInt(tab.dataset.idx)); });
  });
})();

// ===== Mobile Sidebar TOC =====
// 900px 以下で .ie-sidebar / .bm-sidebar / .sys-sidebar を検出し、
// フローティングボタン (FAB) ＋ ドロワーを自動挿入してモバイルでも目次にアクセス可能にする。
// CSS は style-v2.css の .mob-toc-* に定義済み。
(function() {
  function init() {
    if (window.innerWidth > 900) return;

    var sidebar = document.querySelector('.ie-sidebar, .bm-sidebar, .sys-sidebar');
    if (!sidebar) return;

    var titleEl = sidebar.querySelector('.ie-sidebar-title, .bm-sidebar-title, .sys-sidebar-title');
    var title = (titleEl && titleEl.textContent.trim()) || '目次';

    // FAB
    var fab = document.createElement('button');
    fab.className = 'mob-toc-fab';
    fab.setAttribute('aria-label', title + 'を開く');
    fab.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    document.body.appendChild(fab);

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'mob-toc-overlay';
    document.body.appendChild(overlay);

    // Drawer
    var drawer = document.createElement('div');
    drawer.className = 'mob-toc-drawer';
    drawer.innerHTML =
      '<div class="mob-toc-handle"></div>' +
      '<div class="mob-toc-header">' +
        '<span class="mob-toc-title"></span>' +
        '<button class="mob-toc-close" aria-label="閉じる">×</button>' +
      '</div>' +
      '<div class="mob-toc-body"></div>';
    drawer.querySelector('.mob-toc-title').textContent = title;
    document.body.appendChild(drawer);

    // サイドバーカードの中身（タイトル除く）をドロワー本文へクローン
    // 複数の sidebar-card がある場合は全カードをコピーし、2枚目以降は
    // タイトル（関連ページ等）も含めて区切りとして表示する。
    var cards = sidebar.querySelectorAll('.ie-sidebar-card, .bm-sidebar-card, .sys-sidebar-card');
    if (!cards.length) cards = [sidebar];
    var body = drawer.querySelector('.mob-toc-body');
    Array.prototype.forEach.call(cards, function(card, cardIdx) {
      Array.prototype.forEach.call(card.children, function(child) {
        var cls = child.className || '';
        // 1枚目のタイトルはドロワーのヘッダーに表示済みなのでスキップ
        if (cardIdx === 0 && typeof cls === 'string' && /sidebar-title/.test(cls)) return;
        body.appendChild(child.cloneNode(true));
      });
    });

    function open() {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }

    fab.addEventListener('click', open);
    overlay.addEventListener('click', close);
    drawer.querySelector('.mob-toc-close').addEventListener('click', close);
    body.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', close);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ===== テーブル横スクロール自動ラップ =====
// 全コンテンツ系テーブルを .ie-table-scroll で自動ラップ（Bootstrap .table-responsive 流）。
// テーブル自身は display:table のまま、ラッパが overflow-x:auto を担うことで、
// 「テキストボックス全体が横スクロールする」「セル内 inline-block が境界を超える」
// 「border-collapse が display:block で崩れる」等の display:block 由来の事故を一切起こさない。
(function(){
  // ラップ対象外（ナビ・サイドバー等のレイアウト系テーブル）
  function shouldSkip(table){
    if (table.dataset.scrollApplied === '1') return true;
    if (table.closest('.ie-table-scroll')) return true;
    if (table.closest('nav, .navbar, .nav-menu, .ie-sidebar, .mob-toc-drawer, .qa-figure, .kt-screen')) return true;
    return false;
  }
  function wrapWithScroll(table){
    if (shouldSkip(table)) return;
    var parent = table.parentElement;
    if (!parent) return;
    var wrap = document.createElement('div');
    wrap.className = 'ie-table-scroll';
    // table 自身の margin を引き継いで、ラップ後の余白を保つ
    var cs = window.getComputedStyle(table);
    wrap.style.marginTop = cs.marginTop;
    wrap.style.marginBottom = cs.marginBottom;
    parent.insertBefore(wrap, table);
    wrap.appendChild(table);
    table.dataset.scrollApplied = '1';
  }
  // 表の min-width 付与ポリシー（モバイルで「鬼の改行」＝列が潰れて1〜数文字ずつ折り返す
  // 状態を防ぐ）。横スクロールは許容する方針。判定は実測ではなく列数＋セル文字数で決定的に行う。
  //  - 2列: 通常は何もしない。ただし nowrap で長いラベル列があると相手列が潰れるので、その時だけ min-width。
  //  - 5列以上: 常に min-width（多列マトリクスは収まらないので横スクロール）
  //  - 3〜4列: colspan でない「実セル」に長文がある時だけ min-width を付けて横スクロール。
  //            colspan セル（例: HSV 表の髄液検査/治療）は2列ぶんの幅があり潰れないので対象外
  //            → そういう表は収まったまま（不要なスクロールを出さない）。
  function applyMinWidth(table){
    try {
      var firstRow = table.querySelector('thead tr') || table.querySelector('tr');
      if (!firstRow) return;
      var cols = 0;
      firstRow.querySelectorAll('th, td').forEach(function(c){
        cols += parseInt(c.getAttribute('colspan') || '1', 10);
      });
      if (cols < 2) return;
      if (cols === 2) {
        // nowrap で長いセル（幅を占有）があると相手列が極端に潰れる → 横スクロールさせる
        var cram2 = false;
        table.querySelectorAll('td, th').forEach(function(cell){
          if (parseInt(cell.getAttribute('colspan') || '1', 10) > 1) return;
          var nowrap = /white-space:\s*nowrap/i.test(cell.getAttribute('style') || '');
          if (nowrap && (cell.textContent || '').replace(/\s+/g, '').length >= 16) cram2 = true;
        });
        if (cram2) table.style.minWidth = '520px';
        return;
      }
      if (cols >= 5) { table.style.minWidth = Math.min(cols * 160, 1300) + 'px'; return; }
      var threshold = (cols === 3) ? 20 : 14;
      var longCell = false;
      table.querySelectorAll('td, th').forEach(function(cell){
        if (parseInt(cell.getAttribute('colspan') || '1', 10) > 1) return;
        if ((cell.textContent || '').replace(/\s+/g, '').length >= threshold) longCell = true;
      });
      if (longCell) table.style.minWidth = (cols === 4 ? '720px' : '600px');
    } catch (e) { /* fail-safe: min-width を付けない */ }
  }
  // ===== 列幅の中央集約・自動バランス（colgroup 自動注入） =====
  // 列幅を一切明示していない表はブラウザの自動レイアウト任せになり、「長文セルのある列が
  // 幅を独占し、ラベル列が痩せて改行がガタつく」偏りが出る（サイト共通の長年の課題）。
  // ここで内容（各列の代表文字数）から列幅比を決定的に算出し <colgroup> を注入して一括管理する。
  //  - 代表値は「中央値」を使う。1セルだけ極端に長い外れ値（例: 漢方の製剤リスト）に幅を奪われない。
  //  - clamp(下限/上限)で「極小列が消える」「説明列が画面を食い尽くす」を両方防ぐ。
  //  - 手書き <colgroup> がある表は“設計者の上書き指定”として尊重しスキップする。
  //  - table-layout は auto のまま（既存の手書き colgroup と同じ挙動／nowrap セルが欠けない）。
  var SIZE_FLOOR = 4;   // 列の最小重み（文字数換算）。これ未満でも下限で確保
  var SIZE_CAP = 36;    // 列の最大重み。長文列が幅を独占しないよう頭打ち
  function shouldSize(table){
    if (table.dataset.colgroupApplied === '1') return true;     // 二重処理防止
    if (table.tagName !== 'TABLE') return true;
    if (table.querySelector('colgroup')) return true;           // 手書き colgroup を尊重
    if (table.closest('nav, .navbar, .nav-menu, .ie-sidebar, .mob-toc-drawer, .qa-figure, .kt-screen')) return true;
    return false;
  }
  function median(arr){
    if (!arr.length) return SIZE_FLOOR;
    var s = arr.slice().sort(function(a,b){ return a-b; });
    var m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m-1] + s[m]) / 2;
  }
  function autoColgroup(table){
    try {
      // 列数を確定（ヘッダ行の colspan 合計を正とする。applyMinWidth と同じ基準）
      var headRow = table.querySelector('thead tr') || table.querySelector('tr');
      if (!headRow) return;
      var N = 0;
      headRow.querySelectorAll('th, td').forEach(function(c){
        N += parseInt(c.getAttribute('colspan') || '1', 10);
      });
      if (N < 3) return;  // 2列以下は偏りが出にくく、略語一覧等を壊さないため対象外

      // rowspan/colspan を考慮して本文セルを列インデックスへ正しく割り付け、列ごとに文字数を収集
      var perCol = {};            // 列index -> 文字数配列（本文のみ）
      var occ = Object.create(null); // "row,col" -> 既に rowspan で占有
      var rows = table.rows;
      for (var r = 0; r < rows.length; r++){
        var row = rows[r];
        var allTh = Array.prototype.every.call(row.cells, function(c){ return c.tagName === 'TH'; });
        var isHeader = (row.parentNode && row.parentNode.tagName === 'THEAD') || allTh;
        var col = 0;
        for (var i = 0; i < row.cells.length; i++){
          while (occ[r + ',' + col]) col++;
          var cell = row.cells[i];
          var csp = parseInt(cell.getAttribute('colspan') || '1', 10);
          var rsp = parseInt(cell.getAttribute('rowspan') || '1', 10);
          var len = (cell.textContent || '').replace(/\s+/g, '').length;
          for (var rr = 1; rr < rsp; rr++){
            for (var cc = 0; cc < csp; cc++){ occ[(r + rr) + ',' + (col + cc)] = true; }
          }
          if (!isHeader){
            for (var cc2 = 0; cc2 < csp; cc2++){
              var ci = col + cc2;
              (perCol[ci] = perCol[ci] || []).push(csp > 1 ? len / csp : len);
            }
          }
          col += csp;
        }
      }

      // 列ごとの重み = clamp(中央値, 下限, 上限)
      var weights = [];
      var sum = 0;
      for (var k = 0; k < N; k++){
        var w = Math.max(SIZE_FLOOR, Math.min(SIZE_CAP, median(perCol[k] || [])));
        weights.push(w);
        sum += w;
      }
      if (sum <= 0) return;

      // % へ正規化（整数）。各列 >=3% を保証し、丸め誤差は最大列に寄せて合計100%に
      var pct = weights.map(function(w){ return Math.max(3, Math.round(100 * w / sum)); });
      var total = pct.reduce(function(a, b){ return a + b; }, 0);
      var maxIdx = pct.indexOf(Math.max.apply(null, pct));
      pct[maxIdx] += (100 - total);
      if (pct[maxIdx] < 3) return;  // 異常時は何もしない（フェイルセーフ）

      var cg = document.createElement('colgroup');
      for (var p = 0; p < N; p++){
        var colEl = document.createElement('col');
        colEl.style.width = pct[p] + '%';
        cg.appendChild(colEl);
      }
      table.insertBefore(cg, table.firstChild);
      table.dataset.colgroupApplied = '1';
    } catch (e) { /* フェイルセーフ: colgroup を付けない（描画は壊さない） */ }
  }
  function processAll(){
    document.querySelectorAll('table').forEach(function(table){
      if (!shouldSize(table)) autoColgroup(table);
      if (shouldSkip(table)) return;
      applyMinWidth(table);
      wrapWithScroll(table);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processAll);
  } else {
    processAll();
  }
})();

// ===== 全ページ共通：画像ライトボックス（Figure クリックで拡大） =====
(function initImageLightbox() {
  var overlay = null, ovImg = null, ovCaption = null;

  function buildOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'img-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button type="button" class="ilb-close" aria-label="閉じる">&times;</button>' +
      '<div class="ilb-stage">' +
        '<img alt="">' +
        '<div class="ilb-caption"></div>' +
      '</div>' +
      '<div class="ilb-hint">クリックで等倍拡大／Esc または背景クリックで閉じる</div>';
    document.body.appendChild(overlay);
    ovImg = overlay.querySelector('img');
    ovCaption = overlay.querySelector('.ilb-caption');

    // 背景クリックで閉じる（画像・キャプション以外）
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('ilb-stage') ||
          e.target.classList.contains('ilb-close')) {
        close();
      }
    });
    // 画像クリックで等倍トグル
    ovImg.addEventListener('click', function (e) {
      e.stopPropagation();
      overlay.classList.toggle('zoomed');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  function open(src, caption, alt) {
    buildOverlay();
    overlay.classList.remove('zoomed');
    ovImg.src = src;
    ovImg.alt = alt || '';
    if (caption) {
      ovCaption.textContent = caption;
      ovCaption.style.display = '';
    } else {
      ovCaption.style.display = 'none';
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open', 'zoomed');
    document.body.style.overflow = '';
  }

  // 対象画像：コンテンツ内の Figure 等。ナビロゴ・アイコン・リンク内画像・除外指定は対象外
  function isTarget(img) {
    if (img.classList.contains('nav-logo-img')) return false;
    if (img.hasAttribute('data-no-zoom')) return false;
    if (img.closest('.navbar')) return false;
    if (img.closest('a')) return false; // 既にリンクされた画像は触らない
    var src = img.getAttribute('src') || '';
    if (src.indexOf('logo') !== -1) return false;
    return true;
  }

  // キャプション推定：ie-fig-caption 兄弟 → figcaption → alt
  function captionFor(img) {
    var box = img.closest('.ie-fig-box') || img.parentElement;
    if (box) {
      var cap = box.querySelector('.ie-fig-caption, figcaption');
      if (cap) return cap.textContent.trim();
    }
    return img.getAttribute('alt') || '';
  }

  function enhance(img) {
    if (img.dataset.zoomApplied) return;
    if (!isTarget(img)) return;
    img.dataset.zoomApplied = '1';
    img.classList.add('img-zoomable');
    img.addEventListener('click', function () {
      open(img.currentSrc || img.src, captionFor(img), img.getAttribute('alt'));
    });
  }

  function processAll() {
    document.querySelectorAll('img').forEach(enhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processAll);
  } else {
    processAll();
  }
})();
