/**
 * pages/bacteria/bp-toc.js
 * ===============================================================
 * 細菌個別ページの右サイド目次を動的生成する。
 *  - .bp-page を .bp-shell でラップし、右に sticky な .bp-toc を追加。
 *  - .bp-page 直下の各 .bp-block（②分類・特徴／③主な感染症／⑤関連事項 …）を
 *    トップレベル項目として並べる。h2 が無いブロックはスキップ。
 *  - 「本サイトの関連事項」ブロック内の .bp-rel-section（IE / CRBSI 等）は
 *    サブ項目としてネスト表示する（related-loader.js が同期生成済み）。
 * モバイル（≤980px）では CSS で非表示。
 * ===============================================================
 */
(function () {
  function build() {
    var page = document.querySelector("main.bp-page") || document.querySelector(".bp-page");
    if (!page || page.dataset.tocReady) return;
    var blocks = Array.prototype.slice.call(page.children).filter(function (el) {
      return el.classList && el.classList.contains("bp-block") && el.querySelector("h2");
    });
    if (blocks.length < 2) return; // 目次を作る価値がない短いページはスキップ

    var items = [];
    blocks.forEach(function (block, i) {
      var h2 = block.querySelector("h2");
      var clone = h2.cloneNode(true);
      // 見出し内の付帯ラベル（撮影クレジット等）は目次テキストから除く
      Array.prototype.slice.call(clone.querySelectorAll(".bp-gram-credit")).forEach(function (n) { n.remove(); });
      var label = (clone.textContent || "").replace(/\s+/g, " ").trim();
      if (!label) return;
      if (!block.id) block.id = "bp-sec-" + (i + 1);
      items.push({ id: block.id, label: label, sub: [] });

      // 関連事項ブロックは中の topic セクションをサブ項目に
      if (block.classList.contains("bp-related")) {
        var secs = block.querySelectorAll(".bp-rel-section");
        Array.prototype.slice.call(secs).forEach(function (sec, j) {
          if (!sec.id) sec.id = block.id + "-rel-" + (j + 1);
          var t = (sec.textContent || "").replace(/\s+/g, " ").trim();
          if (t) items[items.length - 1].sub.push({ id: sec.id, label: t });
        });
      }
    });
    if (!items.length) return;

    // レイアウト：page を shell でラップして右に aside を追加
    var shell = document.createElement("div");
    shell.className = "bp-shell";
    page.parentNode.insertBefore(shell, page);
    shell.appendChild(page);

    var aside = document.createElement("aside");
    aside.className = "bp-toc";
    var card = document.createElement("div");
    card.className = "bp-toc-card";
    var title = document.createElement("div");
    title.className = "bp-toc-title";
    title.textContent = "目次";
    card.appendChild(title);

    items.forEach(function (it) {
      var a = document.createElement("a");
      a.href = "#" + it.id;
      a.textContent = it.label;
      card.appendChild(a);
      it.sub.forEach(function (s) {
        var sa = document.createElement("a");
        sa.href = "#" + s.id;
        sa.className = "bp-toc-sub";
        sa.textContent = s.label;
        card.appendChild(sa);
      });
    });

    aside.appendChild(card);
    shell.appendChild(aside);
    page.dataset.tocReady = "1";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
