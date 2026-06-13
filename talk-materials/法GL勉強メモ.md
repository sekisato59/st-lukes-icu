# 法GL 勉強メモ — 患者情報 × クラウド / AI

> 関谷先生の**勉強用**メモ（発表スライドとは別）。**確認できた一次情報だけ**を蓄積する。
> 表記：【確認済】＝公式/一次資料 ／【※解釈】＝当事者・二次資料の解釈で要注意 ／【TODO】＝未確認。

## 0. きっかけ（X炎上・2026年6月）
- 訪問看護ステーションが指示書・報告書等を **Google Drive で医療機関と情報連携** →「快諾が増えた」と投稿。
- コミュニティノート：**経産省・総務省の事業者向けガイドライン違反**の指摘（国内法適用・DC所在地・再委託・リモートアクセス・責任分界の確認が必要／リンク共有も問題）。
- 大田原MD：「製品名で即NGでなく**責任分界と運用次第**」。@u1 が一次資料でまとめ。
- → 「綺麗なまとめ≠真実、一次資料で検証」という本講演テーマの実例。

## 1. 3省2ガイドライン【確認済】
「3省」＝厚労省・経産省・総務省。「2ガイドライン」＝2本。役割分担が肝。

| 守る主体 | ガイドライン | 版 |
|---|---|---|
| **医療機関** | 厚労省「医療情報システムの安全管理に関するガイドライン」 | **第6.0版**（2023/令和5年5月。Q&A令和7年更新） |
| **システム事業者** | 経産省・総務省「医療情報を取り扱う情報システム・サービス提供事業者における安全管理ガイドライン」 | 1.1版(2023)→**2.0版(2025改定)**【TODO:版を最終確認】 |

→ 今回の炎上指摘は**事業者向け**側に照らしたもの。

## 2. 論点を「2層」に分ける【※解釈（大田原MD/u1氏）】
- **層①：個人情報保護法** — 委託先監督・外国第三者提供・基準適合体制を文書化すれば対処可能（「本人同意なし可」は【※解釈】）。
- **層②：医療情報の外部保存** — **患者データ本体**（カルテ・指示書・検査・画像）を置くと **「保存場所・国内法適用・国外法リスク」の3点が最後まで残る**。暗号化や最上位プランでも、**保存場所を日本国内に固定できない**サービスでは消えない。

## 3. 実務の線引き【※解釈ベースだが有用】
| ✅ 使える（患者本体データを含まない） | ❌ リスクが残る（患者本体データを含む） |
|---|---|
| 院内規程・手順書・**教育資料**・会議資料 | 診療録・指示書・検査・処方・**画像** |
| 公開資料／患者情報なしの集計 | 患者データの**一時共有・変換・レビュー** |
| **匿名加工・仮名加工**（本人に戻せない） | 患者情報を含むCSV・ログ・**スクショ・バックアップ** |

条件：患者氏名・ID・診療情報・検査結果・画像を含めない。

## 4. 「Amazon日本リージョン＝抜け道」？【確認済】
**結論：抜け道でなく"正攻法の一つ"。ただし全リスクは消えない。レベルで選ぶ。**
- **AWS東京リージョン**で「データ国内保存」要件には対応可。AWSは[医療リファレンス](https://aws.amazon.com/jp/local/health/medical-information-guidelines-on-aws0)公開、[NEC](https://jpn.nec.com/cloud/service/aws/medical_reference/index.html)等も。
- ⚠️ **責任共有モデル**：AWS自体が「準拠」を宣言するのでなく、**医療機関側が適切に構成する責任**を負う（自動でOKではない）。
- ⚠️ **国外法リスクは残る**：国内DCでも Amazon＝米国企業 → **CLOUD Act**で米政府が開示要求しうる。これが層②の"消えない差分"。
- **完全に消すなら国産クラウド**（[さくら](https://cloud.sakura.ad.jp/column/domestic-cloud/)等の日本企業／ISMAP）。
- → 階段：① 患者本体データを汎用AI/クラウドに入れない（最も安全）→ ② 入れるなら"国内保存＋医療GL対応＋契約・運用"（AWS東京等）→ ③ 国外法も避けたいなら国産クラウド。

## 5. AIに患者情報を渡すと何が問題か（本題）【一部※解釈】
- 入力の扱い：①学習に使うか ②どこ（国）に保存か ③保持期間/オプトアウト。汎用版とエンタープライズ/API/医療契約で全く違う。
- 識別性：自由記載は組み合わせで**再識別**されうる（"消せば安全"でない）。
- → 一般のChatGPT等に患者本体データを入れると上記すべてに引っかかりうる。

## 6. HIPAA（米国法）【一部TODO】
- HIPAA＝米国の医療情報保護法。**「HIPAA準拠」は米国の要件**で、**日本の3省2ガイドライン適合を意味しない**（特に層②"国内法適用"）。【TODO:具体条項を一次確認】

## 7. 落としどころ
- 教材づくりは公開論文・GLで回す／患者個別情報は持ち込まないを既定に。
- 患者情報でAIが必要なら "国内保存＋医療対応明示＋契約・運用" を満たすサービスを。
- 採否はリスクを正確に把握した上での**医療機関の経営判断**。自院の**規程・倫理委員会**を必ず確認。

## 参考文献（一次・公式優先）
- 厚労省 [6.0版](https://www.mhlw.go.jp/stf/shingi/0000516275_00006.html)／[Q&A](https://www.mhlw.go.jp/content/10808000/001145860.pdf)／[システム運用編](https://www.mhlw.go.jp/content/10808000/001582980.pdf)
- 個情委 [通則編](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)／[外国第三者提供編](https://www.ppc.go.jp/personalinfo/legal/guidelines_offshore/)／[APPI Q&A](https://www.ppc.go.jp/personalinfo/faq/APPI_QA/)
- 厚労省 [医療・介護関係事業者ガイダンス](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000027272.html)
- [AWS医療GL](https://aws.amazon.com/jp/local/health/medical-information-guidelines-on-aws0)／[NEC](https://jpn.nec.com/cloud/service/aws/medical_reference/index.html)／[iDATEN](https://www.idaten.ne.jp/portal/page/out/secolumn/multicloud/column025.html)／[DevelopersIO](https://dev.classmethod.jp/articles/exploring-aws-compliance-for-medical-information-guidelines/)
- [CLOUD Act解説](https://www.tsukaeru.net/blog/cloud-act/)／[さくら国産クラウド](https://cloud.sakura.ad.jp/column/domestic-cloud/)／[Codebook 3省2GL](https://codebook.machinarecord.com/info-security/regulation/23551/)
