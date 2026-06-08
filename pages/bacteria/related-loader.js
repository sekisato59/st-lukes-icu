/**
 * pages/bacteria/related-loader.js
 * ===============================================================
 * 「本サイトの関連事項」セクションを動的に生成するローダー。
 *
 * related-data.js の各菌エントリは次の3形のいずれかをとる：
 *   1. { embed: "url#anchor", label }
 *        → 元ページの該当セクション（見出し直後のカード群）を取得して
 *          そのまま埋め込み、末尾に出典リンクを付ける。取得失敗時はリンクにフォールバック。
 *   2. { link: "url", label }
 *        → ページ全体がその菌の内容、等の場合。リンクのみ表示。
 *   3. { title, body, links }（従来形）
 *        → 研修医向け要約＋リンク（後方互換）。
 * ===============================================================
 */
(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function srcLink(label, url) {
    return '<div class="bp-rel-src"><a href="' + escapeHtml(url) + '">' +
      escapeHtml(label) + ' ↗</a></div>';
  }
  function linkLine(label, url) {
    return '<div class="bp-rel-link"><span class="bp-rel-arrow">▶</span> <a href="' +
      escapeHtml(url) + '">' + escapeHtml(label) + '</a></div>';
  }

  // 相対 URL（img src / a href）を、元ページ基準の絶対 URL に書き換える
  function fixRelativeUrls(root, sourcePageUrl) {
    var base = new URL(sourcePageUrl, location.href);
    root.querySelectorAll("img[src]").forEach(function (img) {
      var v = img.getAttribute("src");
      if (v && !/^(https?:|data:|#|\/)/.test(v)) img.setAttribute("src", new URL(v, base).href);
    });
    root.querySelectorAll("a[href]").forEach(function (a) {
      var v = a.getAttribute("href");
      if (v && !/^(https?:|mailto:|tel:|#)/.test(v)) a.setAttribute("href", new URL(v, base).href);
    });
  }

  // 埋め込んだ表を横スクロール対応でラップ（script.js は既に実行済みのため自前で処理）
  function wrapTables(root) {
    root.querySelectorAll("table").forEach(function (table) {
      if (table.closest(".ie-table-scroll")) return;
      var wrap = document.createElement("div");
      wrap.className = "ie-table-scroll";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  // 元ページから #anchor 見出し直後のカード群（次の見出しまで）を取得
  function fetchSection(url) {
    var h = url.indexOf("#");
    var page = h >= 0 ? url.slice(0, h) : url;
    var anchor = h >= 0 ? url.slice(h + 1) : "";
    return fetch(page).then(function (r) {
      if (!r.ok) throw new Error("fetch failed");
      return r.text();
    }).then(function (txt) {
      var doc = new DOMParser().parseFromString(txt, "text/html");
      var start = anchor ? doc.getElementById(anchor) : null;
      if (!start) return null;
      var wrap = document.createElement("div");
      var node = start.nextElementSibling;
      while (node && !/^H[1-3]$/.test(node.tagName)) {
        wrap.appendChild(node.cloneNode(true));
        node = node.nextElementSibling;
      }
      if (!wrap.childNodes.length) return null;
      fixRelativeUrls(wrap, page);
      wrapTables(wrap);
      return wrap.innerHTML;
    });
  }

  function renderLegacy(target, data) {
    var itemsHtml = data.map(function (item) {
      var links = (item.links || []).map(function (l) {
        return '<a href="' + escapeHtml(l.url) + '">' + escapeHtml(l.label) + "</a>";
      }).join(" ／ ");
      var line = links ? '<br><span class="bp-rel-arrow">▶</span> ' + links : "";
      return "<li><strong>" + escapeHtml(item.title) + "</strong><br>" +
        escapeHtml(item.body) + line + "</li>";
    }).join("");
    target.innerHTML = "<ul>" + itemsHtml + "</ul>";
  }

  function render() {
    var target = document.getElementById("bp-related-content");
    if (!target) return;
    var key = target.dataset.bact;
    var data = (window.BACTERIA_RELATED || {})[key];
    if (!data || !data.length) {
      var block = target.closest(".bp-related");
      if (block) block.style.display = "none";
      return;
    }

    var isNew = data.some(function (d) { return d.embed || d.link; });
    if (!isNew) { renderLegacy(target, data); return; }

    target.innerHTML = "";
    data.forEach(function (item) {
      var slot = document.createElement("div");
      slot.className = "bp-rel-item";
      target.appendChild(slot);
      if (item.link) {
        slot.innerHTML = linkLine(item.label, item.link);
      } else if (item.embed) {
        // 先にフォールバックのリンクを置き、取得成功で差し替え
        slot.innerHTML = linkLine(item.label, item.embed);
        fetchSection(item.embed).then(function (html) {
          if (html) slot.innerHTML = '<div class="bp-rel-embed">' + html + "</div>" + srcLink(item.label, item.embed);
        }).catch(function () { /* keep fallback link */ });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
