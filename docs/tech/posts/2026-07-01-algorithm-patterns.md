---
layout: doc
title: "[Daily Questions Challenge 37] 演算法常見解題 Pattern 總覽"
description: 整理白板題中最常出現的 8 種解題 Pattern，包含使用時機、Python 範例與複雜度速查表。
date: 2026-07-01
avatar: /daily-questions-challenge.png
tags:
  - Algorithm
  - Python
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 37] 演算法常見解題 Pattern 總覽"
  - - meta
    - property: og:description
      content: 整理白板題中最常出現的 8 種解題 Pattern，包含使用時機、Python 範例與複雜度速查表。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 37] 演算法常見解題 Pattern 總覽"
  - - meta
    - name: twitter:description
      content: 整理白板題中最常出現的 8 種解題 Pattern，包含使用時機、Python 範例與複雜度速查表。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 為什麼要學 Pattern？

面對白板題時，大多數人的直覺是逐題練習——刷越多題越好。但這個策略有個盲點：每道題看起來都是全新的，難以快速辨識解法。

更有效率的做法是從「Pattern」的角度切入。常見的面試白板題，其實大多可以歸類到幾個固定的解題框架。當你看到題目的特徵，就能快速對應到正確的 Pattern，進而套用解法。

這篇文章整理了 8 個最高頻的演算法 Pattern，每個 Pattern 包含：說明、使用時機、Python 範例與時間/空間複雜度。

---

## Pattern 1：Two Pointers（雙指針）

**說明**：在陣列或字串上使用兩個指針（通常是 `left` 和 `right`）同時移動，利用指針的方向性減少不必要的比較。

**適用時機**：
- 已排序的陣列，找符合條件的「一對元素」
- 判斷回文（Palindrome）
- 移除重複元素、合併兩個有序陣列

**Python 範例**（在排序陣列中找兩數之和等於目標值）：

```python
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []
```

**複雜度**：時間 O(n)、空間 O(1)

---

## Pattern 2：Sliding Window（滑動視窗）

**說明**：用一個可變或固定長度的「視窗」在陣列或字串上滑動，每次加入新元素並移除舊元素，避免重複計算視窗內的結果。

**適用時機**：
- 找「連續子陣列」或「子字串」中的最大值、最小值或特定條件
- 關鍵字：**最長**、**最短**、**恰好 k 個**、**不超過 k 個**

**Python 範例**（找長度 k 的子陣列最大總和）：

```python
def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum
```

**複雜度**：時間 O(n)、空間 O(1)

---

## Pattern 3：Modified Binary Search（二分搜尋變形）

**說明**：標準二分搜尋每次將搜尋範圍砍半，達到 O(log n)。面試中常出現各種「變形」：在旋轉排序陣列中搜尋、找第一個或最後一個符合條件的位置、對答案做二分搜尋等。

**適用時機**：
- 資料已排序，或答案空間有明確的單調性
- 題目明確要求或暗示 O(log n) 解法

**Python 範例**（標準二分搜尋）：

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**複雜度**：時間 O(log n)、空間 O(1)

---

## Pattern 4：Hash Map / Set 優化

**說明**：利用 Hash Map（Python 的 `dict`）或 Hash Set（Python 的 `set`）將「查找」從 O(n) 降為 O(1)，常用來消除雙層迴圈，把 O(n²) 解法優化成 O(n)。

**適用時機**：
- 需要快速查找「某個值是否出現過」
- 記錄元素的出現次數或上次出現的位置
- 題目涉及「兩數之和」、「重複元素」、「字元頻率」

**Python 範例**（兩數之和，無序版本）：

```python
def two_sum(nums, target):
    seen = {}  # {value: index}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

**複雜度**：時間 O(n)、空間 O(n)

---

## Pattern 5：BFS（廣度優先搜尋）

**說明**：用 Queue（先進先出）做層級遍歷，先探索距起點最近的節點，再往外一層一層擴展。

**適用時機**：
- 樹的層序遍歷（Level Order Traversal）
- 圖中找「最短路徑」（無權重圖）
- 關鍵字：**最少幾步**、**最短距離**、**最近的**

**Python 範例**（二元樹層序遍歷）：

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

**複雜度**：時間 O(n)、空間 O(n)

---

## Pattern 6：DFS / Backtracking（深度優先搜尋 / 回溯法）

**說明**：遞迴地往深處探索，遇到死路或已找到答案則回頭（backtrack），嘗試下一條路徑。DFS 強調遍歷所有節點；Backtracking 強調枚舉所有可能並在不符合條件時提早放棄（剪枝）。

**適用時機**：
- 找所有可能的組合、排列、子集
- 樹或圖的路徑搜尋
- 約束滿足問題（N 皇后、數獨）

**Python 範例**（找所有子集）：

```python
def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(list(current))
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # 回溯，移除最後加入的元素
    backtrack(0, [])
    return result
```

**複雜度**：時間 O(2^n)、空間 O(n)（遞迴堆疊深度）

---

## Pattern 7：Heap / Top-K Elements（堆積）

**說明**：Python 的 `heapq` 提供最小堆（Min-Heap）。透過維護一個大小為 K 的堆，可以在 O(n log k) 時間內找出 Top-K 元素，比全排序的 O(n log n) 更有效率。

**適用時機**：
- 找第 K 大 / 第 K 小的元素
- 從大量資料中動態取最大值或最小值
- 合併多個有序串列（K-way Merge）

**Python 範例**（找第 K 大的元素）：

```python
import heapq

def find_kth_largest(nums, k):
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]  # 堆頂就是第 K 大的元素
```

**複雜度**：時間 O(n log k)、空間 O(k)

---

## Pattern 8：Dynamic Programming（動態規劃，DP）

**說明**：把問題拆解成子問題，將子問題的結果儲存起來（記憶化），避免重複計算。解題核心三步驟：定義**狀態** → 找**轉移方程式** → 確認**邊界條件**。

**適用時機**：
- 求最大值、最小值、計數、是否可行
- 題目具有「重疊子問題」與「最優子結構」
- 關鍵字：**最多**、**最少**、**幾種方式**、**能否達成**

**Python 範例**（爬樓梯：每次可爬 1 或 2 階，共幾種方式）：

```python
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]  # 轉移方程式
    return dp[n]
```

**複雜度**：時間 O(n)、空間 O(n)（可用兩個變數滾動優化至 O(1)）

---

## 速查表：看到什麼特徵，用什麼 Pattern？

| 題目特徵 | 優先考慮的 Pattern |
|---|---|
| 排序陣列、找一對元素 | Two Pointers |
| 連續子陣列 / 子字串、最長 / 最短 | Sliding Window |
| 已排序 / 單調性、要求 O(log n) | Modified Binary Search |
| 查找存在性 / 頻率 / 位置 | Hash Map / Set |
| 最短距離 / 最少步數 / 層級遍歷 | BFS |
| 所有組合 / 排列 / 子集 / 路徑 | DFS / Backtracking |
| 第 K 大 / 第 K 小 / 動態最大最小值 | Heap |
| 最優值 / 計數 / 能否達成 | Dynamic Programming |

---

## 總結

這 8 個 Pattern 並不互斥，很多題目需要組合使用（例如 BFS + Hash Map 記錄已訪問節點）。建議的學習策略：

1. 先把每個 Pattern 的**使用時機**背熟，讓自己看到題目就能觸發正確的聯想。
2. 每個 Pattern 只需要熟悉 1～2 道**經典例題**，建立直覺。
3. 遇到新題時，先問自己：「這題的關鍵特徵是什麼？對應哪個 Pattern？」

掌握這些框架之後，大多數面試白板題都能在 5 分鐘內看出解題方向。

## 參考

- [14 Patterns to Ace Any Coding Interview Question - HackerNoon](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed)
- [10+ Top LeetCode Patterns to Ace FAANG Coding Interviews - Educative](https://www.educative.io/blog/coding-interview-leetcode-patterns)
- [Grokking the Coding Interview Patterns - Educative](https://www.educative.io/courses/grokking-coding-interview)
- [DSA Patterns you need to know - LeetCode Discuss](https://leetcode.com/discuss/post/5886397/dsa-patterns-you-need-to-know-by-anubhav-x7og/)
