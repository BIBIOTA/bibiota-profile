# Article Brief

## Working Topic

EC2、ECS（EC2 / Fargate launch type）、Lambda 的管理責任邊界與選型準則

## Confirmed Article Type

Daily Questions Challenge — System Design 分類，第 46 篇

## Intended Reader

準備後端系統設計面試的工程師，或剛接觸 AWS 雲端部署的後端開發者。熟悉後端開發，但對 AWS 運算服務的選型邏輯還不夠系統化。

## Article Purpose

建立「管理責任光譜」的心智模型——從 EC2（你管最多）到 Lambda（AWS 管最多），讓讀者下次看到「要不要上 Lambda」或「Fargate 跟 EC2 launch type 差在哪」這類問題時，有明確的判斷框架，而不是背服務清單。

## Core Question

EC2、ECS（EC2 / Fargate launch type）、Lambda 的管理責任邊界在哪？選型時應該問自己什麼？

## Scope

1. **管理責任光譜**：從 EC2 → ECS+EC2 → ECS+Fargate → Lambda，每往右一步 AWS 多承擔哪一層。
2. **EC2**：你管 OS 往上全部（runtime、部署、scaling、磁碟）；收費模式是「開著就跑錶」。
3. **ECS 兩種 launch type**：
   - EC2 launch type：你維護底下的 EC2 fleet，ECS 負責排程容器到哪台機器。
   - Fargate launch type：你只宣告容器 CPU/記憶體需求，AWS 找機器跑，你看不到也管不到底層。
4. **Lambda**：只交 function，AWS 決定機器與副本數；Scale to Zero 特性（縮到零不收錢）、Cold Start 代價（runtime/套件大小影響延遲）。
5. **Provisioned Concurrency**：預留已初始化的執行環境消除 Cold Start；代價是「預留著就計費」。
6. **選型表**：從「你管什麼、收費方式、Cold Start、長連線支援、適合工作負載」五個維度比較四種組合。

## Non-Goals

- 不討論 EKS（Kubernetes）或其他 orchestration 工具。
- 不討論 AWS Lambda 的進階觸發器整合（EventBridge、S3 event 等）。
- 不深入 VPC/Subnet 設定（已在 Challenge 44 涵蓋）。
- 不討論具體定價數字（容易過時，導向官方計算器即可）。

## Suggested Category

System Design

## Notes from Similar Existing Posts

- **Challenge 44**（2026-07-08，`2026-07-08-cloud-deployment-basics.md`）：VPC、Subnet、Security Group、Load Balancer 的角色與邊界——本篇是往「運算層選型」延伸的自然下一步。
- **Challenge 45**（2026-07-09，`2026-07-09-deployment-boundaries.md`）：API / Worker / MQ / DB 的切分與三條邊界——本篇可在開頭短暫回扣「已經知道要分開部署 API 和 Worker」，下一個問題自然是「那他們各自跑在什麼上面」。

## Key Angles from Study Notes

筆記的「學習過程的關鍵卡點」三則值得整合進文章，強化概念邊界：

1. **Fargate 是「宣告需求」而非「管理規格」**：誤以為 Fargate 讓你管機器規格；實際上你完全看不到、管不到底層機器，只是告訴 AWS 容器需要多少資源。
2. **Provisioned Concurrency 與 ECS launch type 無關**：兩者都跟「預先備好資源」有關，容易混淆；實際上一個是 Lambda 特性（消除 Cold Start），另一個是 ECS 底層機器選擇（EC2 vs Fargate），分屬不同服務。
3. **Cold Start 有精確術語**：這個現象有名字，且在低延遲需求的選型討論中是關鍵詞，看到「延遲敏感」就要聯想是否需要 Provisioned Concurrency。

## Draft Folder

`docs/superpowers/article-drafts/2026-07-10-cloud-deployment-ec2-ecs-lambda/`
