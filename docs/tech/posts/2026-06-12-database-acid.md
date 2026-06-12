---
layout: doc
title: "[Daily Questions Challenge 18] 資料庫 ACID 是什麼？"
description: 介紹資料庫 transaction 的 ACID 四個性質：Atomicity、Consistency、Isolation、Durability，說明各自保證什麼資料正確性問題，以及實務上的取捨。
date: 2026-06-12
avatar: /daily-questions-challenge.png
tags:
  - Database
  - Backend
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 18] 資料庫 ACID 是什麼？"
  - - meta
    - property: og:description
      content: 介紹資料庫 transaction 的 ACID 四個性質：Atomicity、Consistency、Isolation、Durability，說明各自保證什麼資料正確性問題，以及實務上的取捨。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 18] 資料庫 ACID 是什麼？"
  - - meta
    - name: twitter:description
      content: 介紹資料庫 transaction 的 ACID 四個性質：Atomicity、Consistency、Isolation、Durability，說明各自保證什麼資料正確性問題，以及實務上的取捨。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 為什麼需要 ACID

資料庫 transaction 可以先從一個線上課程報名情境理解。

假設某堂課只剩下最後 1 個名額，使用者按下報名後，系統至少需要完成三件事：

1. 建立一筆報名紀錄。
2. 將課程剩餘名額扣 1。
3. 建立待付款紀錄。

如果報名紀錄建立成功，但名額沒有扣掉，後續可能會超賣。如果名額扣掉了，但付款紀錄沒有建立，使用者可能卡在無法付款的狀態。這不是單純的程式錯誤，而是資料正確性被破壞。

ACID 就是資料庫 transaction 用來描述資料可靠性的四個性質：

| 性質 | 全名 | 核心問題 |
|---|---|---|
| A | Atomicity | 一組操作是否能全部成功或全部失敗 |
| C | Consistency | 交易前後資料是否都符合規則 |
| I | Isolation | 併發交易之間是否會互相看到不完整狀態 |
| D | Durability | commit 後資料是否能在故障後保留下來 |

它們不是四個彼此獨立的功能開關，而是一組用來理解 transaction 保證的語言。

## Atomicity：要嘛全部成功，要嘛全部失敗

Atomicity（原子性）指的是一個 transaction 裡的操作，必須被視為一個不可分割的單位。

以課程報名為例，新增報名、扣名額、建立付款紀錄不能只成功一部分。如果中途發生錯誤，資料庫必須把已經做過的修改回滾，讓整個 transaction 看起來像從未發生。

```sql
BEGIN;

INSERT INTO registrations (user_id, course_id, status)
VALUES (42, 1001, 'pending_payment');

UPDATE courses
SET seats_remaining = seats_remaining - 1
WHERE id = 1001
  AND seats_remaining > 0;
-- 應用程式需確認 affected_rows = 1，否則 ROLLBACK

INSERT INTO payment_intents (user_id, course_id, amount)
VALUES (42, 1001, 1500);

COMMIT;
```

如果扣名額沒有實際更新任何資料列，或建立付款紀錄失敗，應該執行 `ROLLBACK`，而不是留下「有報名但沒扣名額」或「扣了名額但不能付款」的中間狀態。

Atomicity 解決的是「部分成功」的問題。

## Consistency：交易前後都要符合資料規則

Consistency（一致性）指的是 transaction 執行前與執行後，資料庫都應該維持在合法狀態。

這裡的合法狀態通常來自幾種規則：

- Schema 型別，例如金額欄位必須是數字。
- `NOT NULL`、`UNIQUE`、`CHECK`、Foreign Key 等 constraint。
- 應用程式定義的商業規則，例如訂單總金額必須等於明細加總。

舉例來說，課程剩餘名額不應小於 0，可以用 `CHECK` constraint 表達：

```sql
CREATE TABLE courses (
  id bigint PRIMARY KEY,
  title text NOT NULL,
  seats_remaining integer NOT NULL CHECK (seats_remaining >= 0)
);
```

當 transaction 試圖把 `seats_remaining` 改成負數時，資料庫應該拒絕這筆修改。

不過 Consistency 不是說資料庫會自動知道所有商業規則。資料庫只能保證你有明確定義的規則會被維持。沒有寫成 constraint、trigger 或應用程式檢查的規則，資料庫不會憑空替你守住。

Consistency 解決的是「交易完成後資料不再合法」的問題。

## Isolation：併發交易不能互相看到不完整狀態

Isolation（隔離性）處理的是多個 transaction 同時執行時的可見性問題。

這部分已經在前篇 [資料庫的 Transaction Isolation Level](./2026-06-10-transaction-isolation-level.md) 提到，Isolation 解決的是「同時執行的 transaction 互相干擾」的問題。

## Durability：commit 後資料要真的留下來

Durability（持久性）指的是 transaction 一旦 commit 成功，即使資料庫稍後遇到系統 crash、斷電或行程重啟，已提交的資料也不應該消失。

這個性質通常靠資料庫底層的 log 與儲存機制實作。例如 PostgreSQL 使用 Write-Ahead Logging（WAL）：資料頁真正寫入磁碟前，會先把描述修改的 WAL record 寫入持久儲存。當系統 crash 後，資料庫可以依靠 WAL 進行恢復。

MySQL InnoDB 也會把 durability 和 redo log、flush 設定、檔案系統、硬體儲存能力連在一起。也就是說，Durability 不只是 `COMMIT` 一個 SQL 關鍵字，而是資料庫、作業系統與儲存硬體共同完成的保證。

實務上，Durability 也會牽涉效能取捨。越積極地把 log flush 到穩定儲存，crash 後遺失資料的風險越低，但每次 commit 的成本也可能越高。

Durability 解決的是「明明 commit 成功，故障後資料卻不見」的問題。

## 用一筆訂單看 ACID

假設使用者建立一筆訂單，系統需要：

1. 新增訂單。
2. 新增訂單明細。
3. 扣商品庫存。
4. 建立付款紀錄。

這時 ACID 可以這樣理解：

| 性質 | 在訂單情境中的意義 |
|---|---|
| Atomicity | 訂單、明細、庫存、付款紀錄要一起成功；任何一步失敗就全部回滾 |
| Consistency | 庫存不能小於 0、付款紀錄必須對應有效訂單、訂單總額要合理 |
| Isolation | 多個使用者同時下單時，不能互相讀到尚未完成的中間狀態 |
| Durability | 訂單 commit 成功後，即使資料庫 crash，訂單也不能憑空消失 |

ACID 的價值不是讓資料庫變快，而是讓系統在錯誤、併發與故障下仍然能維持資料可信。

## ACID 的取捨

ACID 很重要，但它不是免費的。

這些保證背後都需要成本：

- Atomicity 需要 rollback 能力。
- Consistency 需要 constraint、validation 或應用程式規則配合。
- Isolation 需要 lock 或 MVCC（Multi-Version Concurrency Control：讓讀取可以看到某個時間點的資料版本，避免直接被尚未完成或同時進行的寫入干擾）。
- Durability 需要 log 與 flush。

這些機制都會消耗 I/O、記憶體或等待時間。

所以實務上常見的取捨是：

- 付款、庫存扣減、活動名額保留：通常需要較強的 ACID 保證。
- 分析報表、瀏覽紀錄、推薦資料：有時可以接受短暫不一致或延遲修正。
- 分散式系統：單一資料庫 transaction 的 ACID 不一定能直接跨服務成立，可能需要額外設計。

面試時如果被問到 ACID，不要只背四個英文單字。比較好的回答方式是說清楚每個性質保護哪一類錯誤，以及它在真實系統裡會帶來什麼成本。

## 總結

ACID 是理解資料庫 transaction 的核心模型：

| 性質 | 核心保證 |
|---|---|
| Atomicity | 一組操作全部成功或全部失敗 |
| Consistency | transaction 前後資料都符合定義好的規則 |
| Isolation | 併發 transaction 不會看到彼此未完成的中間狀態 |
| Durability | commit 成功後資料能在故障後保留下來 |

簡單來說，Atomicity 處理部分成功，Consistency 處理資料規則，Isolation 處理併發干擾，Durability 處理故障恢復。

理解 ACID 後，再去看 lock、isolation level、WAL、replication 或分散式 transaction，會更容易判斷每個機制到底在補哪一種資料正確性問題。

## 參考

- [PostgreSQL Documentation — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [PostgreSQL Documentation — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL Documentation — Write-Ahead Logging](https://www.postgresql.org/docs/current/wal-intro.html)
- [MySQL 8.4 Reference Manual — InnoDB and the ACID Model](https://dev.mysql.com/doc/refman/8.4/en/mysql-acid.html)
- [SQLite Documentation — Atomic Commit In SQLite](https://www.sqlite.org/atomiccommit.html)
