# Article Brief — 部署邊界與責任：API / Worker / MQ / DB 怎麼切

## Working Topic（工作主題）

一個後端系統要上雲時，該沿著哪些線把 API、Worker、MQ、Cache、DB 切開部署？以三條責任邊界（時間特性、狀態、網路暴露面）建立「怎麼切」的判斷準則。

## Confirmed Article Type（確認的文章類型）

Daily Questions Challenge 技術文章 — **System Design** 分類。
- 接續 **Challenge 44「雲端部署基礎架構」（2026-07-08）**，預期為 **Challenge 45**。
- avatar：`/daily-questions-challenge.png`
- tags 方向：`Backend`、`System Design`

## Intended Reader（設定讀者）

- 準備後端／系統設計面試的工程師。
- 會寫應用程式、但對「為什麼要把 API 和 worker 分開部署、MQ/DB 放哪裡」只有模糊直覺的人。
- 假設讀者已具備 #44 的基礎（VPC / Subnet / Security Group / Load Balancer 是什麼），本篇不重複解釋這些組件的定義。

## Article Purpose（文章目的）

把「部署架構」從一堆要背的名詞，轉成三個可複用的**判斷準則**。讓讀者面對任何組件時，能自己推導出「它該是 stateless 還是 stateful、放 public 還是 private、要不要獨立伸縮」，而不是死記架構圖。

## Core Question（文章要回答的核心問題）

**一個後端系統要上雲部署，應該沿著哪些邊界把各個組件切開？每條邊界背後的判斷準則是什麼？**

其中最關鍵的一個提問（本篇的靈魂）：
> 「把這台機器直接砍掉、換一台新的頂上，使用者會不會感覺到資料不見了？」——這一刀切開 stateless / stateful。

## Scope（涵蓋範圍）

以三條邊界為主軸，各自給準則 + 反直覺卡點：

1. **邊界一：API vs Worker（時間特性）**
   - 同步（使用者在等）vs 非同步（不在等）→ 塞同一 process 會讓慢 job 卡住 HTTP 請求。
   - 共用同一份 codebase、不同進入點、部署成不同 process → 才能各自獨立伸縮（API 看 request/秒、worker 看 queue 積壓量）。
   - 註明 push vs pull 依 broker 而異，避免「worker 一律主動拉」的過度概化。

2. **邊界二：Stateless vs Stateful（有沒有保管資料）**
   - 核心提問：砍掉換一台，資料會不會不見？
   - Stateless（API、Worker）追求可拋棄性，「牲口不是寵物」，靠水平擴展抗流量。
   - Stateful（MQ、Cache、DB）追求持久化與資料安全，交給雲端託管服務（RDS、ElastiCache、SQS / managed Kafka）。
   - Cache / MQ / DB 都是 stateful，但存的資料性質不同（可重算 vs 未處理訊息 vs 唯一真實來源）。

3. **邊界三：Public vs Private（誰需要被外部主動連入）**
   - 只有「流量入口」需要 public；運算節點本身不需要。
   - Load Balancer 一出現就成為唯一 public 入口（通常只開 443），連 API 都能退進 private。
   - 攻擊面收斂成「一個 LB + 443」，愈有狀態的東西藏得愈深。

4. **責任邊界總表**（角色 × 狀態 × 網路層 × 是否對外開 port × 伸縮依據）作為收束。

5. **快速記憶脈絡 + 三句話總結**。

可沿用來源筆記中的 mermaid 圖（整體架構、codebase 兩進入點、stateless/stateful 分層、public/private 收斂、mindmap），但需檢查是否符合 VitePress mermaid 渲染慣例。

## Non-Goals（不做的事）

- **不重新解釋 #44 已講過的組件定義**：VPC / Subnet / Security Group / Load Balancer / RDS / Redis 是什麼——只在需要時引用，並可連回 #44。
- 不深入特定雲廠商的操作步驟（terraform、AWS console 點選流程）。
- 不深入 MQ 內部機制（partition、consumer group、delivery semantics）——那些已有專篇（#06-27、#07-02~07-05）。
- 不討論 CI/CD、藍綠部署、容器編排（k8s）等交付流程細節。
- 不做效能數字 benchmark。

## Suggested Category（建議分類 — DQC 置頂索引）

置於 **System Design** 分類，緊接在 Challenge 44 之後：
```
### System Design
- [雲端部署基礎架構：VPC、Subnet、Security Group 與 Load Balancer 各自解決什麼問題？](./2026-07-08-cloud-deployment-basics.md)
- [部署邊界與責任：API / Worker / MQ / DB 怎麼切]  ← 本篇（實際標題／slug 待 metadata 階段確認）
```

## Notes From Similar Existing Posts（相似既有文章的參考）

- **2026-07-08-cloud-deployment-basics.md（Challenge 44）**：最直接的前導篇。結構為「整體架構圖 → 逐組件說明 → 每段附『> 核心』收束 → 總結表 → 參考」。本篇沿用相同的視覺與收束節奏，但主軸從「組件是什麼」改為「沿哪條線切」。已明確互補：#44 講 what，本篇講 how/why。重疊點（stateless、LB、Redis session）在本篇改以「判斷準則」角度重述，不重複組件定義。
- **2026-06-27-mq-horizontal-scaling-idempotency.md**：worker 獨立伸縮、queue 積壓量的既有論述可交叉引用，避免重寫。
- **2026-06-03-message-queue.md**：MQ 基礎已有專篇，本篇談 MQ 只從「它是 stateful、生命週期不能綁 app 機器」的角度切入。
- 全站慣例：Daily Questions Challenge 標題格式 `[Daily Questions Challenge NN] 標題`、frontmatter 含 og/twitter meta、文末 `## 參考` 用官方文件與可信工程來源、正文避免過度粗體、比較用表格。

## Source Material（來源筆記）

`/Users/bibiota/Documents/projects/study-zero-to-one/notes/system-design/2026-07-09-deployment-boundaries-api-worker-db-mq.md`
（學習日期 2026-07-09，含三條邊界的完整論述、責任總表、mindmap 與三個學習卡點，內容已足夠支撐整篇，研究階段主要工作為查證與補官方參考連結。）
