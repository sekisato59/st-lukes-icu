/**
 * pages/bacteria/related-data.js
 * ===============================================================
 * 各菌ページの「本サイトの関連事項」データを一元管理するファイル。
 *
 * このファイルを更新するだけで、該当する菌ページすべてに
 * 自動的に反映される（related-loader.js が動的に挿入）。
 *
 * 構造：
 *   BACTERIA_RELATED[菌キー] = [
 *     {
 *       title: "結論（太字で表示される）",
 *       body: "詳細な説明文（複数文 OK、HTML 不可）",
 *       links: [
 *         { label: "ページ名:セクション", url: "../path/to/page.html#anchor" }
 *       ]
 *     },
 *     ...
 *   ]
 *
 * 菌キーは bacteria/{key}.html のファイル名と一致させる。
 * ===============================================================
 */

window.BACTERIA_RELATED = {

  // ============ Staphylococcus aureus ============
  saureus: [
    {
      title: "S. aureus 菌血症と判明した時点で必ず TEE による IE 評価を行う。",
      body: "黄ブ菌菌血症は感染性心内膜炎の合併リスクが高く（菌血症の約 12% が IE 合併）、IE を見落とすと治療失敗・予後悪化に直結する。経胸壁心エコー（TTE）よりも感度の高い経食道心エコー（TEE）での精査が原則となる。",
      links: [
        { label: "IE 2026 GL：画像診断", url: "../articles-gl-ie2026.html#ie2-section4" },
        { label: "IE 板書ノート：経験的治療", url: "../id-icu-notes/note-ie.html#ie-empiric-choice" }
      ]
    },
    {
      title: "Persistent bacteremia（48 時間以上持続する菌血症）では、感染源精査と血培 q48-72h での陰性化確認を徹底する。",
      body: "持続性菌血症は 90 日死亡率 39% と強く関連するため、転移性感染巣（膿瘍・骨髄炎・心内膜炎など）の有無を画像で精査し、デバイス除去・ドレナージなどソースコントロールを行いながら血培の陰性化を確認する。",
      links: [
        { label: "BALANCE 2025：90 日死亡率", url: "../articles-gl-balance-bacteremia2025.html#bal-primary" },
        { label: "疾患トピック：BALANCE 結果", url: "../disease-topics/dt-bacteremia-duration.html#bd-balance-results" }
      ]
    },
    {
      title: "カテーテル・人工弁・人工関節などの異物に S. aureus 感染が関与する場合、デバイスの除去・交換を強く検討する。",
      body: "バイオフィルム内の菌は抗菌薬移行性が悪く、デバイスを残したままでは治癒困難となるため、デバイス除去なしでは治療失敗リスクが大幅に上昇する。",
      links: [
        { label: "IE 2026 GL：治療抵抗性・弁輪周囲膿瘍", url: "../articles-gl-ie2026.html#ie3-section2" }
      ]
    },
    {
      title: "重症 MRSA 感染では、バンコマイシン TDM はトラフ値ベースではなく AUC/MIC 400-600 を目標に行う。",
      body: "AUC/MIC が 400 を下回ると治療失敗、600 を超えると急性腎障害（AKI）リスクが上昇するため、ベイジアン推定または 2 ポイント採血で AUC を算出する運用が推奨される。",
      links: [
        { label: "VCM TDM 2020：PK/PD 目標", url: "../articles-gl-vcm-tdm2020.html#vcm-s1" },
        { label: "TDM 2022：VCM AUC", url: "../articles-gl-tdm-antibiotics2022.html#tdm-vcm-s2" }
      ]
    }
  ]

  // 他の菌は Open Evidence 結果と一緒に順次追加していく
  // 例：
  // ecoli: [{ title: "...", body: "...", links: [...] }, ...],
  // kpneu: [...],
  // ...

};
