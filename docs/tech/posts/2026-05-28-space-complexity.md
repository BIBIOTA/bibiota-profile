---
layout: doc
title: "[Daily Questions Challenge 03] 解釋空間複雜度 (Space Complexity)"
description: 解釋空間複雜度及常見的 Big O
date: 2026-05-28
avatar: /daily-questions-challenge.png
tags:
  - Algorithm
  - Python
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 03] 解釋空間複雜度 (Space Complexity)"
  - - meta
    - property: og:description
      content: 解釋空間複雜度及常見的 Big O
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 03] 解釋空間複雜度 (Space Complexity)"
  - - meta
    - name: twitter:description
      content: 解釋空間複雜度及常見的 Big O
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在 [**\[Daily Questions Challenge 01\] 解釋時間複雜度（Time Complexity）**](./2026-05-26-time-complexity.md) 中介紹了時間複雜度，這篇接著解釋空間複雜度（Space Complexity）。

如果說時間複雜度衡量的是「程式跑多快」，那空間複雜度衡量的就是「程式佔用多少記憶體」。

在嚴格的電腦科學定義中，**空間複雜度（Space Complexity）** 包含兩個部分：

1. **輸入空間（Input Space）：** 儲存輸入資料本身所需的記憶體。
2. **輔助空間（Auxiliary Space）：** 演算法執行過程中，為了運算而「額外」宣告的變數、資料結構，或遞迴呼叫堆疊（Call Stack）所佔用的記憶體。

在實務與面試場合中，我們通常所說的空間複雜度，指的是**輔助空間（Auxiliary Space）**，也就是**不含輸入資料本身**、演算法額外佔用的記憶體大小。

## 時間複雜度與空間複雜度的相同之處

在工程上，兩者同樣使用 **Big O 符號（O）** 來表示，遵循同一套數學標準。

- **判斷邏輯一樣：** 都是看「當資料量 n 趨近於無限大時，資源消耗的增長趨勢」。只是時間複雜度看的是**執行步驟數（CPU）**，空間複雜度看的是**額外佔用的記憶體（RAM）**。
- **優劣排序一樣：** 從最省資源到最耗資源，排序完全相同：

**O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)**

## 時間複雜度與空間複雜度的相異之處

### 崩潰的邊界不同：Timeout vs. OOM

- **時間複雜度（太慢）：** 若時間複雜度過高（例如 O(n²)），系統通常表現為「卡頓」或 API 請求超時（Timeout）。這雖然影響使用者體驗，但伺服器本身通常仍能繼續運行。
- **空間複雜度（太耗記憶體）：** 若空間複雜度過高，系統會直接觸及物理記憶體的上限，引發 **OOM（Out of Memory）崩潰**。在高併發場景（如搶票、報名系統）中，若每個 Request 都頻繁配置大型陣列，瞬間湧入的流量可能讓 Process 記憶體瞬間耗盡，導致整台伺服器當機。

## 常見空間複雜度等級

以下從「最省到最耗空間」依序介紹常見的複雜度等級：

**O(1) < O(log n) < O(n) < O(n²)**

> 更高的空間複雜度如 O(2ⁿ)、O(n!)，通常程式在資料量達到那個量級之前就會引發 OOM 崩潰，實務上極少遇到，因此不在此討論。

### 1. O(1)：常數空間（Constant Space）

不管傳入的資料量是一筆還是一百萬筆，執行時額外佔用的記憶體空間都相同，對系統的記憶體負擔最小。

- **情境：** 使用幾個簡單的變數做狀態紀錄，或直接在原本的陣列上進行原地修改（In-place 操作，如 Two Pointers 技巧）。
- **特徵：** 沒有建立會隨輸入資料量增長的 List、Dictionary 等資料結構，也沒有遞迴呼叫深度與資料量成正比的遞迴函式。

```python
def get_sum(items):
    total = 0  # 只宣告了常數個變數，不論 items 有多長，額外佔用的空間都不變 -> O(1)
    for item in items:
        total += item
    return total
```

### 2. O(log n)：對數空間（Logarithmic Space）

隨著資料量增大，所需空間只會「微微」增加。最常見於需要遞迴（Recursion）、且每次遞迴都將資料範圍砍半的情境。

- **情境：** 典型的「二分搜尋法（Binary Search）」遞迴寫法——每一層遞迴都會在 Call Stack 上佔用空間，最大遞迴深度為 log n。
- **特徵：** 遞迴深度為 log n。

```python
def binary_search_recursive(sorted_list, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if sorted_list[mid] == target:
        return mid
    # 每次遞迴都會消耗 Call Stack 的空間，最大遞迴深度為 log n -> O(log n)
    elif sorted_list[mid] < target:
        return binary_search_recursive(sorted_list, target, mid + 1, right)
    else:
        return binary_search_recursive(sorted_list, target, left, mid - 1)
```

### 3. O(n)：線性空間（Linear Space）

輸入資料量有 n 筆，程式就需要額外配置 n 個單位的記憶體。消耗的記憶體隨資料量等比例增長。

- **情境：** 將 API 回傳的資料存入一個新的 List，或使用遞迴走訪長度為 n 的資料結構（最大堆疊深度為 n）。
- **特徵：** 建立了一個長度與輸入資料量 n 成正比的資料結構。

```python
def clone_users(users):
    copied_users = []
    for user in users:
        # 若有 100 個 user，就會在新的 List 中新增 100 筆資料 -> O(n)
        copied_users.append(user.copy())
    return copied_users
```

### 4. O(n²)：平方空間（Quadratic Space）

隨著資料量增大，所耗費的記憶體會呈平方暴增，通常出現在建立二維陣列（矩陣）的情況。

- **情境：** 動態規劃（DP）演算法中用來儲存子問題解的二維表格，或處理圖形（Graph）時建立的相鄰矩陣（Adjacency Matrix）。
- **特徵：** 建立了一個長寬皆為 n 的二維資料結構。

```python
def create_matrix(n):
    matrix = []
    for i in range(n):
        # 建立一個 n * n 的二維陣列，記憶體消耗為 O(n²)
        row = [0] * n
        matrix.append(row)
    return matrix
```

## 總結：空間與時間的取捨

在實務中，我們極少能同時完美優化時間與空間，大多數的架構設計都是在兩者之間尋求平衡。

像是：

### 用空間換時間（Space-Time Tradeoff）

- **快取機制：** 將高頻讀取的資料放入 Redis（增加 O(n) 空間消耗），使 API 查詢時間從 O(n) 降至 O(1)。
- **資料庫索引：** 在 MySQL 為常用欄位建立 B-Tree 索引。雖然會增加磁碟與記憶體的空間消耗，但能讓查詢時間從全表掃描的 O(n) 銳減至 O(log n)。
- **Hash Map 比對：** 在程式碼中以 Dictionary／Set 預先儲存資料（消耗 O(n) 空間），將雙層迴圈的 O(n²) 時間複雜度降至 O(n)。

### 用時間換空間（Time-Space Tradeoff）

- **Streaming 處理大檔案：** 不一次將整個檔案載入記憶體，而是使用 iterator 逐行讀取，以額外的 I/O 時間換取極低的記憶體佔用。

提升時間效率，通常需要犧牲空間；而節省空間，則往往需要以重複計算來換取。這個取捨（trade-off）是演算法設計中的核心思考之一。

在理解時間複雜度與空間複雜度之後，開發時便能更有意識地思考：**如何在空間與時間中找到良好的平衡點，並在效能與成本之間做出合理的取捨。**

## 參考

- [2.4 空間複雜度 - Hello 演算法](https://www.hello-algo.com/zh-hant/chapter_computational_complexity/space_complexity/#3-on2)
- [時間複雜度 與 空間複雜度 - HackMD](https://hackmd.io/@joe94113/time_complexity_and_space_complexity)
