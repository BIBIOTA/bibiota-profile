---
layout: doc
title: "[Daily Questions Challenge 20] 資料庫正規化（Database Normalization）"
description: 介紹資料庫正規化的三個主要階段（1NF、2NF、3NF），說明各階段解決的資料異常問題，並探討反正規化的實務取捨。
date: 2026-06-14
avatar: /daily-questions-challenge.png
tags:
  - Database
  - Backend
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 20] 資料庫正規化（Database Normalization）"
  - - meta
    - property: og:description
      content: 介紹資料庫正規化的三個主要階段（1NF、2NF、3NF），說明各階段解決的資料異常問題，並探討反正規化的實務取捨。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 20] 資料庫正規化（Database Normalization）"
  - - meta
    - name: twitter:description
      content: 介紹資料庫正規化的三個主要階段（1NF、2NF、3NF），說明各階段解決的資料異常問題，並探討反正規化的實務取捨。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 為什麼需要正規化

資料庫正規化（Database Normalization）是設計關聯式資料庫（Relational Database）時，用來消除資料冗餘與異常的一套方法論。

假設學校要記錄學生的選課狀況，最直覺的做法可能是設計一張這樣的表：

| StudentID | StudentName | Courses |
|---|---|---|
| S01 | 小明 | 資料庫設計, 演算法 |
| S02 | 小華 | 資料庫設計 |

這個設計看起來簡單，但會帶來幾個問題：

- **更新異常**：如果小明的名稱需要修改，必須找出他出現的每一筆資料並逐一更新。
- **插入異常**：想新增一門課，但還沒有學生選課，就無法插入這筆資料。
- **刪除異常**：刪除小華的選課紀錄，可能同時失去關於小華本人的資訊。
- **查詢困難**：Courses 欄位存放逗號分隔的字串，無法直接用 SQL 篩選特定課程的學生。

正規化的目的，就是透過拆分資料表，系統性地解決這些問題。

## 第一正規化（1NF）

**規則：每個欄位只能存放原子值（Atomic Value），不允許多值欄位或重複的欄位群組。**

原始設計中，Courses 欄位同時存放了多門課，違反了 1NF 的要求。修正方式是將每門課拆成獨立的一行：

| StudentID | StudentName | CourseID | CourseName | Grade |
|---|---|---|---|---|
| S01 | 小明 | C01 | 資料庫設計 | A |
| S01 | 小明 | C02 | 演算法 | B |
| S02 | 小華 | C01 | 資料庫設計 | C |

這張表的主鍵（Primary Key）是 `(StudentID, CourseID)` 的組合，因為兩個欄位合在一起才能唯一識別一筆資料。

不過，這樣的設計仍有問題：`StudentName` 只跟 `StudentID` 有關，`CourseName` 只跟 `CourseID` 有關，它們都只依賴主鍵的一部分，而不是整個組合——這是第二正規化要解決的問題。

## 第二正規化（2NF）

**規則：必須先滿足 1NF，且所有非主鍵欄位必須完全相依於整個主鍵，不允許部分相依（Partial Dependency）。**

上面的表中有兩個部分相依：

- `StudentName` 只依賴 `StudentID`，與 `CourseID` 無關
- `CourseName` 只依賴 `CourseID`，與 `StudentID` 無關

修正方式是將這些部分相依的欄位拆出去，形成獨立的資料表：

**Students 表**

| StudentID | StudentName |
|---|---|
| S01 | 小明 |
| S02 | 小華 |

**Courses 表**

| CourseID | CourseName |
|---|---|
| C01 | 資料庫設計 |
| C02 | 演算法 |

**Enrollments 表**

| StudentID | CourseID | Grade |
|---|---|---|
| S01 | C01 | A |
| S01 | C02 | B |
| S02 | C01 | C |

現在每張表的非主鍵欄位都完整地依賴自己的主鍵，達到 2NF。

但如果 Courses 表進一步加上授課老師的資訊：

| CourseID | CourseName | InstructorID | InstructorDept |
|---|---|---|---|
| C01 | 資料庫設計 | T01 | 資訊工程系 |
| C02 | 演算法 | T01 | 資訊工程系 |

`InstructorDept` 並非直接依賴 `CourseID`，而是透過 `InstructorID` 間接相依——這是遞移相依，也是第三正規化要解決的問題。

## 第三正規化（3NF）

**規則：必須先滿足 2NF，且所有非主鍵欄位必須直接相依於主鍵，不允許透過其他非主鍵欄位間接相依（Transitive Dependency）。**

上例中的相依關係是：

```
CourseID → InstructorID → InstructorDept
```

`InstructorDept` 透過 `InstructorID` 間接依賴 `CourseID`，形成遞移相依。修正方式是將老師資訊拆成獨立的資料表：

**Courses 表**

| CourseID | CourseName | InstructorID |
|---|---|---|
| C01 | 資料庫設計 | T01 |
| C02 | 演算法 | T01 |

**Instructors 表**

| InstructorID | InstructorDept |
|---|---|
| T01 | 資訊工程系 |

每個非主鍵欄位現在都直接依賴自己所在表的主鍵，達到 3NF。

在實務上，3NF 是多數生產系統的設計目標。達到 3NF 之後，資料冗餘大幅減少，更新資料時只需修改一個地方，插入與刪除異常也隨之消失。

## 反正規化（Denormalization）的取捨

正規化改善了資料一致性，但也有代價：查詢時需要更多 JOIN。

當系統面臨讀取效能瓶頸時，有時會刻意做出反正規化（Denormalization）的選擇，透過引入冗餘來換取查詢速度。

舉例來說，一個分析報表系統需要頻繁地查詢學生姓名、課程名稱與成績。在嚴格正規化的設計下，每次查詢都需要 JOIN Students、Courses、Instructors 三張表。當資料量龐大、查詢頻率極高時，這些 JOIN 會成為效能瓶頸。

常見的反正規化手法包括：

- **合併資料表**：將 Enrollments 直接存入 StudentName、CourseName，減少查詢時的 JOIN 次數。
- **新增冗餘欄位**：在訂單表中直接存放商品名稱，即使商品資訊日後異動，歷史訂單仍保有當時的快照。
- **預計算欄位**：將複雜的聚合結果（如學生已修學分數）預先計算並存放，減少查詢時的運算量。

正規化與反正規化的取捨可以這樣對比：

| | 正規化 | 反正規化 |
|---|---|---|
| 資料一致性 | 高（單一來源） | 較低（多處需同步） |
| 寫入複雜度 | 低 | 高（需同步更新多處） |
| 讀取效能 | 較慢（JOIN 多） | 較快（JOIN 少） |
| 適合情境 | OLTP（高寫入頻率） | OLAP、報表、快取層 |

反正規化不等於設計不良，而是根據系統的讀寫比例與一致性需求，做出的刻意取捨。

## 總結

資料庫正規化是一個循序漸進的過程：

- **1NF**：消除多值欄位，讓每個欄位只存單一原子值。
- **2NF**：消除部分相依，確保非主鍵欄位完整依賴整個主鍵。
- **3NF**：消除遞移相依，確保非主鍵欄位直接依賴主鍵，而非透過其他非主鍵欄位間接相依。

三個階段完成後，資料冗餘大幅降低，更新與刪除異常也隨之消失。面試時能說清楚各階段解決的具體問題，並補充反正規化的取捨，是這道題目的完整回答。

## 參考

- [Database Normalization – Normal Forms 1NF 2NF 3NF Table Examples](https://www.freecodecamp.org/news/database-normalization-1nf-2nf-3nf-table-examples/)
- [Database Normalization: 1NF, 2NF, 3NF & BCNF Examples | DigitalOcean](https://www.digitalocean.com/community/tutorials/database-normalization)
- [什麼是資料庫正規化？為什麼需要正規化？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/database-normalization)
- [什麼是資料庫反正規化？優缺點是什麼？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/database-denormalization)
