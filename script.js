// ===== 全ページ共通検索機能 =====
(function initGlobalSearch() {
  // 既にメインページで検索UIがある場合はスキップ
  if (document.getElementById('heroSearchTrigger')) return;

  var navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  // 検索ボタンをnavbarに追加
  var li = document.createElement('li');
  li.innerHTML = '<button class="nav-search-trigger" id="globalSearchTrigger" aria-label="検索を開く">検索<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>';
  navMenu.appendChild(li);

  // 検索オーバーレイをbodyに追加
  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'globalSearchOverlay';
  overlay.innerHTML = '<div class="search-overlay-inner"><button class="search-overlay-close" id="globalSearchClose" aria-label="閉じる">&times;</button><input type="text" id="globalSearchInput" class="search-overlay-input" placeholder="キーワードで検索（例：抗菌薬、透析、ルール）" autocomplete="off"><div class="search-overlay-results" id="globalSearchResults"></div></div>';
  document.body.appendChild(overlay);

  // search-index.jsを動的に読み込む
  var basePath = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('script.js') !== -1) {
      basePath = src.replace('script.js', '');
      break;
    }
  }

  function bindSearch() {
    if (typeof SEARCH_INDEX === 'undefined') return;
    var trigger = document.getElementById('globalSearchTrigger');
    var ov = document.getElementById('globalSearchOverlay');
    var cl = document.getElementById('globalSearchClose');
    var inp = document.getElementById('globalSearchInput');
    var res = document.getElementById('globalSearchResults');

    // サブページからのURL補正（scriptのパスからルートへの相対パスを算出）
    var urlPrefix = basePath;

    function openS() { ov.classList.add('active'); setTimeout(function(){ inp.focus(); }, 100); }
    function closeS() { ov.classList.remove('active'); inp.value = ''; res.innerHTML = ''; }

    trigger.addEventListener('click', openS);
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
        res.innerHTML = matches.map(function(m) {
          return '<a href="' + urlPrefix + m.item.url + '" class="search-overlay-result"><div class="search-overlay-result-title">' + m.item.title + '</div><div class="search-overlay-result-desc">' + m.item.desc + '</div></a>';
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
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

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
