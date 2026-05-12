// ===== 全ページ共通：ナビ統一 + 検索機能 =====
(function initGlobalSearch() {
  // 既にメインページで検索UIがある場合はスキップ
  if (document.getElementById('heroSearchTrigger')) return;

  var navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  // basePath: script.js の src 属性からルートへの相対パスを算出
  var basePath = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('script.js') !== -1) {
      basePath = src.replace('script.js', '');
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
    + dd('当院ICUについて', [
        { href: 'pages/about-icu.html',          label: '当院ICUについて' },
        { href: 'pages/pre-rotation-todo.html',  label: 'ローテされる先生へ' },
        { href: 'pages/icu-team.html',           label: 'スタッフ紹介' },
        { href: 'pages/pre-rotation-todo.html#sec-schedule', label: 'スケジュール' },
        { href: 'pages/icu-policy-rules.html',   label: 'ICUのルール' }
      ])
    + dd('学習コンテンツ', [
        { href: 'pages/icu-passport.html',  label: 'ICU PASSPORT（レクチャーシート）' },
        { href: 'pages/yoshida-qa.html',    label: '吉田先生のお悩み相談コーナー' },
        { href: 'pages/bacteria-map.html',  label: '【感染症】細菌マップ' },
        { href: 'pages/icu-core-conf.html', label: 'レジデントのICU資料集' }
      ])
    + dd('論文GL', [
        { href: 'pages/articles-guidelines.html', label: 'ICU' },
        { href: 'pages/articles-outpatient.html', label: '外来' }
      ])
    + single('pages/disease-topics.html', '疾患マニュアル')
    + dd('講義動画', [
        { href: 'pages/video-lectures.html',          label: '聖路加ICU動画講座集' },
        { href: 'pages/schedule-weekly-id-icu.html',  label: 'ID×ICU Conference 動画集' }
      ])
    + dd('便利ツール', [
        { href: 'pages/abx-calculator.html',     label: '抗菌薬投与量 一発計算' },
        { href: 'pages/karte-abbreviations.html',label: 'カルテ略語対策' }
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
    var card = sidebar.querySelector('.ie-sidebar-card, .bm-sidebar-card, .sys-sidebar-card') || sidebar;
    var body = drawer.querySelector('.mob-toc-body');
    Array.prototype.forEach.call(card.children, function(child) {
      var cls = child.className || '';
      if (typeof cls === 'string' && /sidebar-title/.test(cls)) return;
      body.appendChild(child.cloneNode(true));
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
