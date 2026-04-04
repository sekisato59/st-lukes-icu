// モバイル目次ドロワー
// ie-sidebar がある全ページで自動的にフローティングボタン＋ドロワーを生成
(function(){
  var sidebar = document.querySelector('.ie-sidebar-card');
  if (!sidebar) return; // サイドバーがなければ何もしない

  // FABボタン
  var fab = document.createElement('button');
  fab.className = 'mob-toc-fab';
  fab.setAttribute('aria-label','目次を開く');
  fab.innerHTML = '<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/></svg>';
  document.body.appendChild(fab);

  // オーバーレイ
  var overlay = document.createElement('div');
  overlay.className = 'mob-toc-overlay';
  document.body.appendChild(overlay);

  // ドロワー
  var drawer = document.createElement('div');
  drawer.className = 'mob-toc-drawer';

  var handle = document.createElement('div');
  handle.className = 'mob-toc-handle';

  var header = document.createElement('div');
  header.className = 'mob-toc-header';
  header.innerHTML = '<span class="mob-toc-title">目次</span><button class="mob-toc-close" aria-label="閉じる">&times;</button>';

  var body = document.createElement('div');
  body.className = 'mob-toc-body';

  // サイドバーのリンクを複製
  var links = sidebar.querySelectorAll('a');
  links.forEach(function(a){
    var clone = a.cloneNode(true);
    body.appendChild(clone);
  });

  drawer.appendChild(handle);
  drawer.appendChild(header);
  drawer.appendChild(body);
  document.body.appendChild(drawer);

  function openDrawer(){
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(){
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  fab.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  header.querySelector('.mob-toc-close').addEventListener('click', closeDrawer);

  // 目次リンクをタップしたらドロワーを閉じる
  body.addEventListener('click', function(e){
    if (e.target.closest('a')) {
      closeDrawer();
    }
  });

  // スワイプダウンで閉じる
  var startY = 0;
  drawer.addEventListener('touchstart', function(e){
    startY = e.touches[0].clientY;
  }, {passive:true});
  drawer.addEventListener('touchend', function(e){
    var dy = e.changedTouches[0].clientY - startY;
    if (dy > 60) closeDrawer();
  }, {passive:true});
})();
