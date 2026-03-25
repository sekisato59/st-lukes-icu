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
