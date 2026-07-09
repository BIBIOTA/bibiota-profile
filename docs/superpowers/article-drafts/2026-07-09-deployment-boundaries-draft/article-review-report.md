# Article Review Report — Challenge 45：部署邊界與責任

- **Article path**：`docs/tech/posts/2026-07-09-deployment-boundaries.md`
- **Review status**：passed（已套用機械性修正，無阻擋發佈的問題）
- **Recommended next command**：`npm run docs:build` 建置驗證，或準備 commit。

## Checks Performed（執行的檢查）

| 檢查項 | 結果 |
|--------|------|
| 內容與觀念正確性 | ✅ 三條邊界論述與來源筆記一致；關鍵主張皆有可信來源佐證（12factor、cattle-not-pets、RabbitMQ/Kafka push-pull） |
| 文法／標點／全形符號 | ✅ 一致使用全形中文標點，中英術語間距正常 |
| 標題層級 | ✅ 由 `##` 起始，`##`→`###` 無跳級 |
| Markdown 排版 | ✅ 表格、清單、mermaid 區塊格式正確 |
| Frontmatter 完整性 | ✅ layout/title/description/date/avatar/tags/head 齊全 |
| title／description／og／twitter 一致性 | ✅ 四處 title 與 description 完全一致，且與 metadata handoff 相符 |
| VitePress imports | ✅ `ArticleTitle`、`ScrollToTopBtn` 皆已 import 並使用 |
| 參考與來源標註 | ✅ `## 參考` 具備；連結指向官方／可信來源 |
| DQC 編號／avatar／置頂索引 | ✅ Challenge 45、`/daily-questions-challenge.png`、索引已於 System Design 分類新增連結 |
| mermaid 相容性 | ✅ 僅用 `flowchart`/`graph`（與 #44 相同、已驗證可渲染），未用可能不支援的 mindmap |

## Fixes Applied（已套用的機械性修正）

1. **參考連結標題忠實化**：將 AWS RabbitMQ/Kafka 比較頁的中文改寫標題改為實際頁名 `The difference between RabbitMQ and Kafka | AWS`，避免與原頁標題不符。
2. **連結安全性**：AWS Subnet 參考連結移除未確認的錨點 `#subnet-basics`，改用與 Challenge 44 相同、已驗證可用的 `configure-subnets.html`，並將標題對齊為官方頁名 `Subnets for your VPC`。

## Issues Requiring User Decision（需使用者決定）

- 無。未發現觀念錯誤、來源衝突、分類／標籤爭議，或會改變文章立場的內容。

## Notes

- 開頭已明確連回 Challenge 44 並界定角度（#44 講「組件是什麼」、本篇講「怎麼切」），與 brief 的 non-goal「不重講組件定義」一致。
- 「不要把 worker 一律主動拉當通則」的 caveat 有 RabbitMQ push / Kafka pull 來源支撐，論述無過度概化風險。
