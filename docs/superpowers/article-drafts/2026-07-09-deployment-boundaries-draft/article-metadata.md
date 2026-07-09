# Article Metadata — Challenge 45：部署邊界與責任

## Confirmed Metadata（已確認）

| 欄位 | 值 |
|------|----|
| Challenge # | 45 |
| title | `[Daily Questions Challenge 45] 部署邊界與責任：從三條線看懂 API / Worker / MQ / DB 的切分` |
| description | 從三條責任邊界切開後端部署架構：API vs Worker（時間特性）、Stateless vs Stateful（能不能砍換）、Public vs Private（誰需要被外部連入），建立「組件該放哪層、怎麼伸縮」的判斷準則。 |
| date | 2026-07-09 |
| slug | 2026-07-09-deployment-boundaries |
| target path | docs/tech/posts/2026-07-09-deployment-boundaries.md |
| tags | Backend、System Design |
| avatar | /daily-questions-challenge.png |
| pinned | false |

## Frontmatter（可直接套用）

```yaml
---
layout: doc
title: "[Daily Questions Challenge 45] 部署邊界與責任：從三條線看懂 API / Worker / MQ / DB 的切分"
description: 從三條責任邊界切開後端部署架構：API vs Worker（時間特性）、Stateless vs Stateful（能不能砍換）、Public vs Private（誰需要被外部連入），建立「組件該放哪層、怎麼伸縮」的判斷準則。
date: 2026-07-09
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - System Design
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 45] 部署邊界與責任：從三條線看懂 API / Worker / MQ / DB 的切分"
  - - meta
    - property: og:description
      content: 從三條責任邊界切開後端部署架構：API vs Worker（時間特性）、Stateless vs Stateful（能不能砍換）、Public vs Private（誰需要被外部連入），建立「組件該放哪層、怎麼伸縮」的判斷準則。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 45] 部署邊界與責任：從三條線看懂 API / Worker / MQ / DB 的切分"
  - - meta
    - name: twitter:description
      content: 從三條責任邊界切開後端部署架構：API vs Worker（時間特性）、Stateless vs Stateful（能不能砍換）、Public vs Private（誰需要被外部連入），建立「組件該放哪層、怎麼伸縮」的判斷準則。
---
```

## Daily Questions Challenge 置頂索引更新

檔案：`docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`

分類 **System Design**，加在 Challenge 44 之後：

```md
### System Design

- [雲端部署基礎架構：VPC、Subnet、Security Group 與 Load Balancer 各自解決什麼問題？](./2026-07-08-cloud-deployment-basics.md)
- [部署邊界與責任：從三條線看懂 API / Worker / MQ / DB 的切分](./2026-07-09-deployment-boundaries.md)
```

## Notes

- 編號驗證：現存最高為 Challenge 44（2026-07-08），本篇為 45，無斷號。
- Slug 衝突檢查：`docs/tech/posts/` 下無 `2026-07-09-*`，無衝突。
- pinned 維持 false（一般 Challenge 條目慣例）；置頂由索引主文章承擔，需於發佈時更新該索引。
