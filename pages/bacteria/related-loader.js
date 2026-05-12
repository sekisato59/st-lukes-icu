/**
 * pages/bacteria/related-loader.js
 * ===============================================================
 * 「本サイトの関連事項」セクションを動的に生成するローダー。
 *
 * 使い方：
 *   1. related-data.js を先に読み込む
 *   2. ページ内に下記の DOM を配置：
 *        <div class="bp-block bp-related">
 *          <h2>本サイトの関連事項</h2>
 *          <div id="bp-related-content" data-bact="saureus"></div>
 *        </div>
 *   3. このスクリプトを読み込む
 *
 * data-bact 属性に対応する関連事項が related-data.js に
 * 登録されていれば自動的に展開される。
 * ===============================================================
 */

(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function render() {
    const target = document.getElementById("bp-related-content");
    if (!target) return;

    const key = target.dataset.bact;
    const data = (window.BACTERIA_RELATED || {})[key];

    if (!data || !data.length) {
      // サイト内に該当菌の言及がない場合は bp-related ブロック自体を非表示
      const block = target.closest(".bp-related");
      if (block) block.style.display = "none";
      return;
    }

    const itemsHtml = data
      .map(function (item) {
        const linksHtml = (item.links || [])
          .map(function (l) {
            return (
              '<a href="' +
              escapeHtml(l.url) +
              '">' +
              escapeHtml(l.label) +
              "</a>"
            );
          })
          .join(" ／ ");

        const linkLine = linksHtml
          ? '<br><span class="bp-rel-arrow">▶</span> ' + linksHtml
          : "";

        return (
          "<li><strong>" +
          escapeHtml(item.title) +
          "</strong><br>" +
          escapeHtml(item.body) +
          linkLine +
          "</li>"
        );
      })
      .join("");

    target.innerHTML = "<ul>" + itemsHtml + "</ul>";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
