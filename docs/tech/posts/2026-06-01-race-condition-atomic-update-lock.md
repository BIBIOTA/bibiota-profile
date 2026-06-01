---
layout: doc
title: "[Daily Questions Challenge 07] 資料庫層級避免 Race Condition 的方法 (Atomic Update、Lock、欄位型別防禦)"
description: 介紹資料庫層級避免 Race Condition 的三種策略：Atomic Update、悲觀鎖與樂觀鎖，以及欄位型別設計的防禦機制。
date: 2026-06-01
tags:
  - Backend
  - Database
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 07] 資料庫層級避免 Race Condition 的方法 (Atomic Update、Lock、欄位型別防禦)"
  - - meta
    - property: og:description
      content: 介紹資料庫層級避免 Race Condition 的三種策略：Atomic Update、悲觀鎖與樂觀鎖，以及欄位型別設計的防禦機制。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 07] 資料庫層級避免 Race Condition 的方法 (Atomic Update、Lock、欄位型別防禦)"
  - - meta
    - name: twitter:description
      content: 介紹資料庫層級避免 Race Condition 的三種策略：Atomic Update、悲觀鎖與樂觀鎖，以及欄位型別設計的防禦機制。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在實務中，我們可能會遇到訂單搶購過程中，同時有兩個使用者購買了相同的商品，這兩筆訂單對庫存做了相同的庫存更新操作，引發庫存查詢不一致或誤更新 (甚至超賣) 的 Race Condition 情況。

針對 Race Condition ，我們可以使用以下這幾種方式來避免：

## Atomic Update

最簡單的解法，適合單純的單一欄位的更新操作。我們不把「讀取」和「寫入」拆成兩個步驟，而是直接利用資料庫 Update 時會自帶的 Row-level lock（行鎖）特性，在一句 SQL 內完成檢查與扣除。

```sql
UPDATE products
SET stock = stock - 1
WHERE id = 1 AND stock >= 1;
```

- **運作原理：** 執行完這句 SQL 後，檢查資料庫回傳的 `affected_rows` (受影響的行數)。如果 `affected_rows == 1`，代表扣庫存成功；如果 `affected_rows == 0`，代表庫存已經不足。
- **優點：** 簡單、效能好，Deadlock 風險相對低。
- **缺點：** 如果業務邏輯很複雜（例如：扣庫存前還要依據其他資料的狀態來做判斷），單純的原子操作可能無法滿足。

## Pessimistic Locking (悲觀鎖)

在讀取資料時，將那筆資料「鎖起來」，直到交易 (Transaction) 結束才釋放。

```sql
BEGIN;
-- 加上 FOR UPDATE 鎖定這筆資料
SELECT stock FROM products WHERE id = 1 FOR UPDATE;

-- (在應用程式中判斷 stock > 0)

UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;
```

- **運作原理：** 當 User A 執行了 `SELECT ... FOR UPDATE`，User B 也想執行同一句 SQL 時，User B 的連線會被資料庫卡住（Block），直到 User A `COMMIT` 或 `ROLLBACK`。
- **優點：** 可以應付複雜的商業邏輯 (例如前面提到，需要依據其他資料的狀態來做判斷的情境)。
- **缺點：** 效能較差。在超高併發（如搶票、限量）的情境下，大量的連線會排隊等待鎖定，容易導致資料庫連線池耗盡（Connection Pool Exhaustion）或發生 Deadlock。

## 樂觀鎖 (Optimistic Locking)

透過增加一個 `version` (版本號) 欄位來比對資料是否中途被別人竄改過。

```sql
-- 1. 先讀取目前庫存與版本號
SELECT stock, version FROM products WHERE id = 1;
-- 假設讀到 stock=1, version=5

-- 2. 進行更新，條件加上剛剛讀到的版本號，並且把版本號 +1
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 1
  AND version = 5
  AND stock >= 1;
```

- **運作原理：** 如果 User A 和 User B 同時讀到 `version = 5`。User A 先執行 UPDATE，條件 `version = 5` 成立，更新成功，此時資料庫的 version 變成 6。接著 User B 執行 UPDATE，因為條件 `version = 5` 已經找不到資料了，所以 `affected_rows` 為 0，更新失敗。
- **優點：** 沒有實質的資料庫 Locking ，讀取效能非常好。
- **缺點：** 在高併發衝突極高的場景下，會有大量的 Transaction 失敗，必須在 Application 層級實作重試機制 (Retry Policy)，否則使用體驗會變差。

綜合以上的資訊，整理成這張表格：

| **併發控制策略** | **優點** | **缺點** | **🎯 常見應用場景** |
|---|---|---|---|
| **原子更新** *(Atomic Update)* | 不需應用程式與資料庫來回溝通，直接利用資料庫底層瞬間的行鎖完成計算，不會產生 Deadlock。 | 遇到高併發場景（如百萬人搶同一件商品），該筆資料庫行鎖仍會排隊。且僅限於單純數值計算，無法應付複雜關聯邏輯。 | 單品庫存扣減、優惠券數量、活動名額、按讚數 |
| **樂觀鎖** *(Optimistic Locking)* | 讀取階段不會鎖住資料，適合讀多寫少的場景。 | 當多人同時寫入同一筆資料時，會產生大量 UPDATE 失敗 (`affected_rows = 0`)。 | 商品資料編輯、購物車、一般後台資料更新 |
| **悲觀鎖** *(Pessimistic Locking)* | 對於同一筆關鍵資料的併發修改，能提供最明確的一致性保護。 | **效能最差、資源佔用高**。可能引發 Pool Exhaustion 或 Deadlock | 金融扣款、轉帳、複雜訂單流程、需要跨多資料檢查的交易 |

## 資料庫欄位、Table 設計時的防禦機制

### 1. 使用無號整數 (UNSIGNED)

這是最簡單、成本最低的防禦方式。如果你使用的是 MySQL，可以將庫存欄位設為 `INT UNSIGNED`（無號整數），這意味著該欄位的值**絕對不允許為負數**。

- **運作機制：** 當庫存只剩 0 時，如果兩個併發請求同時執行 `UPDATE stock = stock - 1`，無論誰先誰後，只要運算結果會變成 -1，資料庫就會直接報錯並拒絕更新（例如 MySQL 會拋出 `Data truncation: Out of range value` 的 Exception）。
- **優點：** 實作零成本，完全不需要寫額外的鎖定邏輯。
- **缺點：** 你的後端程式必須做好「捕捉資料庫例外錯誤 (Exception Catching)」的機制。不是每個資料庫 (Database) 都支援 `INT UNSIGNED` (Ex. PostgreSQL)。

### 2. 邏輯防禦：使用檢查約束 (CHECK Constraint)

如果你使用的資料庫不支援 UNSIGNED，或者你想把規則定義得更明確，可以在建立 Table 時加上 `CHECK` 約束。

```sql
ALTER TABLE products ADD CONSTRAINT check_stock_positive CHECK (stock >= 0);
```

- **運作機制：** 與 UNSIGNED 類似，只要任何 `INSERT` 或 `UPDATE` 會讓庫存小於 0，資料庫層級就會主動擋下這筆交易並報錯。
- **優缺點：** 與 UNSIGNED 類似，但 CHECK Constraint 更具可讀性與彈性，也比較符合跨資料庫的資料完整性設計。但仍然需要後端正確捕捉 DB exception，且不能取代主要的併發控制邏輯。

`UNSIGNED` / `CHECK Constraint` 是作為資料庫層級的最後防線，避免程式 bug 或其他入口造成負庫存，不建議作為主要扣庫存邏輯。

## 結論

上述提到的方法，都是針對資料庫層級避免 Race Condition 的防禦方式。但是在實務上，我們除了在資料庫層級處理外，也需要留意 Application 層級的 Try-Catch、Commit、Rollback 處理。

此外，我們還可以搭配 Redis、Message Queue 來降低資料庫本身的讀寫壓力，在下一篇文章將會說明這部分的實作方式。

## 參考

- [閒談軟體設計：樂觀鎖](https://vocus.cc/article/6947bbc7fd89780001a704db)
- [淺談悲觀鎖與實戰 - HackMD](https://hackmd.io/@andydiary-java/Sytx-m_oj)
- [Just curious, why are there no unsigned integers in postgres?](https://www.reddit.com/r/PostgreSQL/comments/sr1mvu/just_curious_why_are_there_no_unsigned_integers/?tl=zh-hant)
