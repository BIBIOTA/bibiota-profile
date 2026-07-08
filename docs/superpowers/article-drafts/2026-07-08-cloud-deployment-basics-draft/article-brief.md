# Article Brief：雲端部署基礎架構

## 基本資訊

| 項目 | 內容 |
|------|------|
| 文章類型 | Daily Questions Challenge |
| 挑戰題號 | #44 |
| 預計日期 | 2026-07-08 |
| 預計 slug | `2026-07-08-cloud-deployment-basics` |
| 草稿資料夾 | `2026-07-08-cloud-deployment-basics-draft`（metadata-planning 後可能重命名） |

## 工作主題

**雲端部署基礎架構：VPC、Subnet、Security Group、Load Balancer、RDS 與 Redis 各自解決什麼問題？**

## 文章類型

Daily Questions Challenge 技術文章，歸類於新分類「**System Design**」。

目前 Daily Questions Challenge 索引尚未有此分類，這將是第一篇雲端架構／系統設計題。

## 目標讀者

有後端開發經驗、開始接觸雲端部署（AWS 等）或準備系統設計面試的工程師。不需要熟悉 AWS 細節，但需要有基本的網路概念（IP、port）。

## 文章目的

幫助讀者建立「雲端部署架構」的心智模型：這些基礎組件各自在解決什麼問題、彼此如何協作，以及常見的認知誤區。

## 核心問題

> 在一個典型的三層 Web 架構中，VPC、Subnet、Security Group、Load Balancer、RDS、Redis 各自扮演什麼角色？為什麼它們幾乎總是一起出現？

## 文章範圍

1. **整體架構圖**：Internet → IGW → Load Balancer（public subnet）→ App（private subnet）→ RDS／Redis（private subnet）
2. **VPC**：私有網路空間，CIDR 定義邊界；隔離靠「沒有公開地址」而非防火牆
3. **Subnet**：public vs private 由路由表決定，而非標籤或名稱；Internet Gateway 是那扇門
4. **Security Group**：stateful instance 層級防火牆；以 SG 作為來源（角色綁定而非 IP 綁定）；入流量預設全擋、出流量預設全放行
5. **Load Balancer**：單一入口 + 分流策略（Round Robin、Weighted、Least Connections、IP Hash）；水平擴展要求 App stateless
6. **RDS vs ElastiCache Redis**：互補角色，RDS 是永久倉庫、Redis 是工作臺；LB 帶來 session 問題 → Redis 解法
7. **常見認知誤區**：四個容易搞混的概念，直接說明正確概念並帶出常見誤解

## Non-goals

- 不深入 AWS 特定操作步驟（Console / CLI 操作）
- 不涵蓋 NAT Gateway、VPN、Direct Connect 等進階網路主題
- 不涵蓋 Auto Scaling Group 的設定細節
- 不比較各雲端供應商（GCP、Azure）差異

## 建議分類（Daily Questions Challenge 索引）

新增 **System Design** 分類，放置本題。

## 類似既有文章的參考

| 文章 | 參考點 |
|------|--------|
| `2026-06-18-redis-cache-patterns.md` | Redis 角色與應用場景，避免重複介紹 Redis 基礎 |
| `2026-06-11-database-read-write-splitting.md` | RDS 相關內容（Primary/Replica），可交叉引用 |
| `2026-06-09-rate-limiting.md` | Load Balancer 已在該文提過，注意描述一致性 |
| `2026-07-07-concurrency-vs-parallelism.md` | 文章結構參考（核心差異一覽表 + 後端實際場景） |

## 文章亮點

1. **問題導向結構**：每個組件以「它解決什麼問題」切入，而非直接定義
2. **認知誤區說明**：四個容易搞混的概念是文章最有價值的部分，直接點出正確概念並帶出常見誤解
3. **組件串聯說明**：解釋為什麼 LB + stateless + Redis 幾乎總是一起出現
4. **Mermaid 架構圖**：整體架構圖 + Security Group 流向圖

## 參考資料來源

- 學習筆記：`/Users/bibiota/Documents/projects/study-zero-to-one/notes/system-design/2026-07-08-cloud-deployment-basics.md`
