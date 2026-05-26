---
layout: doc
title: "[Daily Questions Challenge 01] 解釋時間複雜度 (Time Complexity)"
description: 解釋時間複雜度及常見的 Big O
date: 2026-05-26
tags:
  - Algorithm
  - Python
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 01] 解釋時間複雜度 (Time Complexity)"
  - - meta
    - property: og:description
      content: 解釋時間複雜度及常見的 Big O
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 01] 解釋時間複雜度 (Time Complexity)"
  - - meta
    - name: twitter:description
      content: 解釋時間複雜度及常見的 Big O
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

演算法的時間複雜度（time complexity）是一個函式，用於定性描述該演算法的執行時間，這是一個代表演算法輸入值的字串的長度的函式。

在工程上，我們通常用 **Big O 符號 (O)** 來表示。

### 如何看懂並計算一個 Function 的複雜度？

你可以把計算複雜度想像成「**計算程式碼執行的基本步驟數量**」。以下是從「最快到最慢」排序的常見複雜度級別，並搭配 Python 開發情境與範例：

### 1. O(1) - 常數時間 (Constant Time)

不管資料量是一筆還是一百萬筆，執行的時間都一樣，這是最理想的狀態。

- **情境：** 從 Redis 透過 Key 讀取一筆快取，或是從 Python 的 Dictionary (字典) 透過 Key 取值。
- **特徵：** 沒有依賴資料長度的迴圈。

```python
def get_first_item(items):
    # 只執行一次，不管 items 串列有多大，複雜度就是 O(1)
    return items[0]
```

### 2. O(log n) - 對數時間 (Logarithmic Time)

資料量大幅增加時，執行時間只會「微微」增加。通常是每次操作都能將剩餘的資料量「砍半」。

- **情境：** 在資料庫的 B-Tree 索引中尋找資料，或是經典的「二分搜尋法 (Binary Search)」。
- **特徵：** 迴圈或遞迴每次都將搜尋範圍縮小一半。

```python
def binary_search(sorted_list, target):
    left, right = 0, len(sorted_list) - 1
    while left <= right:
        mid = (left + right) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

### 3. O(n) - 線性時間 (Linear Time)

資料量有 n 筆，程式就需要執行 n 次。執行時間隨著資料量等比例增加。

- **情境：** 遍歷整個 List 來轉換 API 回傳的資料格式，或是在未排序的資料中尋找特定值。
- **特徵：** 有一層迴圈跑遍所有的資料。

```python
def process_all_users(users):
    for user in users:
        # 如果有 100 個 user，這裡就執行 100 次 -> O(n)
        format_data(user)
```

### 4. O(n log n) - 線性對數時間 (Linearithmic Time)

稍微比 O(n) 慢一點，通常是將資料切半處理後，再全部合併掃描。這是大多數「高效能排序演算法」的速度極限。

- **情境：** 呼叫 Python 內建的 `sort()` 或 `sorted()` 函數（底層是 Timsort），或是使用合併排序 (Merge Sort)。
- **特徵：** 在拆分的過程中 O(log n) 進行線性操作 O(n)。

```python
def sort_my_data(data):
    # Python 內建的排序演算法高度優化，時間複雜度為 O(n log n)
    return sorted(data)
```

### 5. O(n^2) - 平方時間 (Quadratic Time)

當資料量變大時，執行時間會呈「平方」暴增。這是效能殺手，通常是我們在處理大量資料時需要極力避免的。

- **情境：** 雙層迴圈比對資料。例如找出兩個大型列表中的交集，但沒有先使用 Set 或 Dictionary 建立索引。
- **特徵：** 有兩層巢狀迴圈（外層跑 n 次，內層也跑 n 次）。

```python
def find_duplicates(array1, array2):
    for item1 in array1:
        for item2 in array2:
            # 如果兩個串列各有 100 筆，這裡要執行 100 * 100 = 10,000 次 -> O(n^2)
            if item1 == item2:
                return True
    return False
```

### 6. O(2^n) - 指數時間 (Exponential Time)

資料量每增加 1，執行時間就「翻倍」。在實務上極度危險，只要資料量稍微大一點（例如 n=50），程式就會跑到當機。

- **情境：** 沒有經過優化（如快取機制 Cache、動態規劃 DP）的遞迴演算法，例如最原始的費氏數列求值、破解密碼的暴力法。
- **特徵：** 一個函式裡呼叫了多次自己（呈樹狀分支展開）。

```python
def fibonacci(n):
    if n <= 1:
        return n
    # 每次呼叫都會再產生兩個子呼叫，呈指數爆炸 -> O(2^n)
    return fibonacci(n-1) + fibonacci(n-2)
```

### 7. O(n!) - 階乘時間 (Factorial Time)

最可怕的複雜度，比指數時間還慘。資料量只要增加一點點，計算量就會突破天際。

- **情境：** 求出所有的「排列組合」，例如旅行推銷員問題 (TSP) 的純暴力解法。
- **特徵：** 找出所有可能性的全排列。

```python
import itertools

def get_all_permutations(items):
    # 如果有 5 個元素，就會產生 5*4*3*2*1 = 120 種組合 -> O(n!)
    # 如果有 10 個元素，會產生 3,628,800 種組合
    return list(itertools.permutations(items))
```

### 總結：實務上的心法

如果以執行效能「從最快到最慢」（也就是資料量增加時，執行時間增長幅度由小到大）依序為：

**O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)**

在後端開發的日常中，我們追求的目標通常是：

1. 盡量利用 **Hash Table (Python 的 Dictionary / Set)** 把 O(n^2) 的比對降級為 O(n)。
2. 對於需要頻繁搜尋的資料，確保資料庫有建索引 (Index)，讓查詢維持在 O(log n)。
3. 看到巢狀的 `for` 迴圈要有警覺心；看到遞迴函數則要思考有沒有可能引發 O(2^n) 的運算災難。

參考：

- [時間複雜度 - 維基百科](https://zh.wikipedia.org/zh-tw/%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
- [時間複雜度(Time Complexity) - HackMD](https://hackmd.io/@Aquamay/SkjWuni9u)
