// 略語ツールチップ自動適用スクリプト
// 略語一覧テーブルから略語→正式名のマッピングを構築し、本文中の略語にツールチップを付与する
(function(){
  // 略語一覧テーブルからマッピングを構築
  var map={};
  document.querySelectorAll('.rule-title').forEach(function(t){
    if(t.textContent.indexOf('略語一覧')===-1) return;
    var tbl=t.closest('.card-inner').querySelector('table');
    if(!tbl) return;
    tbl.querySelectorAll('tr').forEach(function(r){
      var cells=r.querySelectorAll('td');
      if(cells.length<2) return;
      var abbr=cells[0].textContent.trim();
      var desc=cells[1].textContent.trim();
      // ヘッダ行（"略語"）はスキップ
      if(abbr==='略語') return;
      if(abbr) map[abbr]=desc;
    });
  });
  if(!Object.keys(map).length) return;
  // 略語を長い順にソート（部分一致を防ぐ）
  var keys=Object.keys(map).sort(function(a,b){return b.length-a.length;});
  // 正規表現を構築
  // ※後読みアサーション（lookbehind）は Safari 16.4未満で非対応のため、
  //   前置キャプチャグループ (^|[^英字]) を使い全ブラウザ互換にする
  var escaped=keys.map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('|');
  var pattern=new RegExp('(^|[^a-zA-ZÀ-ɏ])('+escaped+')(?![a-zA-ZÀ-ɏ])','g');
  // メインコンテンツ領域を検出
  var mainCol=document.querySelector('.main-col')||document.querySelector('.ie-main-col')||document.querySelector('.gl-main')||document.querySelector('.container');
  if(!mainCol) return;
  var walker=document.createTreeWalker(mainCol,NodeFilter.SHOW_TEXT,{
    acceptNode:function(node){
      var p=node.parentNode;
      if(!p) return NodeFilter.FILTER_REJECT;
      var tag=p.tagName;
      if(tag==='SCRIPT'||tag==='STYLE'||tag==='ABBR'||tag==='A'||tag==='CODE') return NodeFilter.FILTER_REJECT;
      if(p.closest&&p.closest('.rule-title')) return NodeFilter.FILTER_REJECT;
      if(p.closest&&p.closest('table')&&p.closest('.card-inner')&&p.closest('.card-inner').querySelector('.rule-title')&&p.closest('.card-inner').querySelector('.rule-title').textContent.indexOf('略語')!==-1) return NodeFilter.FILTER_REJECT;
      // サイドバー・ナビ除外
      if(p.closest&&(p.closest('.ie-sidebar')||p.closest('.ie-sidebar-card')||p.closest('nav'))) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function(node){
    var text=node.textContent;
    if(!pattern.test(text)){ pattern.lastIndex=0; return; }
    pattern.lastIndex=0;
    var frag=document.createDocumentFragment();
    var lastIdx=0;
    var m;
    while((m=pattern.exec(text))!==null){
      // m[1]=前置文字（""または非英字1文字）、m[2]=略語本体
      var abbrStart=m.index+m[1].length;
      if(abbrStart>lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx,abbrStart)));
      var el=document.createElement('abbr');
      el.setAttribute('data-tip',map[m[2]]);
      el.setAttribute('tabindex','0');
      el.textContent=m[2];
      frag.appendChild(el);
      lastIdx=pattern.lastIndex;
    }
    if(lastIdx<text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
    node.parentNode.replaceChild(frag,node);
  });
  // ツールチップDOM要素を作成
  var tip=document.createElement('div');
  tip.id='abbr-tooltip';
  document.body.appendChild(tip);
  function showTip(el){
    tip.textContent=el.getAttribute('data-tip');
    tip.style.display='block';
    var r=el.getBoundingClientRect();
    var tw=tip.offsetWidth, th=tip.offsetHeight;
    var left=r.left+r.width/2-tw/2;
    var top=r.top-th-6;
    if(left<4) left=4;
    if(left+tw>window.innerWidth-4) left=window.innerWidth-tw-4;
    if(top<4){ top=r.bottom+6; }
    tip.style.left=left+'px';
    tip.style.top=top+'px';
  }
  function hideTip(){ tip.style.display='none'; }
  // PC: hover
  document.addEventListener('mouseover',function(e){
    var el=e.target.closest('abbr[data-tip]');
    if(el) showTip(el);
  });
  document.addEventListener('mouseout',function(e){
    var el=e.target.closest('abbr[data-tip]');
    if(el) hideTip();
  });
  // モバイル: tap（2.5秒後自動消去）
  document.addEventListener('click',function(e){
    var el=e.target.closest('abbr[data-tip]');
    if(el){ showTip(el); setTimeout(hideTip,2500); }
    else hideTip();
  });
})();
