# Article Brief: 演算法常見解題 Pattern 總覽

## Working Topic

演算法常見的解題 Pattern 有哪些？

## Article Type

Daily Questions Challenge — 演算法分類（DQC #37）

## Intended Reader

準備後端工程師面試的開發者，已了解基本資料結構（陣列、Hash Map、Tree、Graph）與時間/空間複雜度，希望能在白板題中快速辨識應使用哪種解題策略。

## Article Purpose

提供一份面試前快速複習的 Pattern 參考手冊，幫助讀者在看到題目時，能夠套用正確的解題框架，而不是從零開始想。

## Core Question

面試白板題中最常見的演算法 Pattern 有哪些？遇到哪類題目該用哪個 Pattern？

## Scope

涵蓋以下 Pattern（每個包含：說明 + 適用時機 + Python 程式碼簡短範例 + 時間/空間複雜度）：

1. Two Pointers（雙指針）
2. Sliding Window（滑動視窗）
3. Binary Search 變形（Modified Binary Search）
4. Hash Map / Set 優化（將 O(n²) 降為 O(n)）
5. BFS（廣度優先搜尋，適用樹/圖的層級遍歷）
6. DFS / Backtracking（深度優先搜尋 / 回溯法）
7. Heap / Top-K Elements
8. Dynamic Programming（動態規劃，DP）

末尾提供一張「題目特徵 → 對應 Pattern」的速查表。

## Non-Goals

- 不逐題拆解 LeetCode 例題（只用最小範例說明概念）
- 不深入講解每個 Pattern 的所有變形（未來可以各自成篇）
- 不涵蓋進階圖論（Dijkstra、Topological Sort 等）

## Daily Questions Challenge Category

演算法

## Notes from Similar Existing Posts

- DQC #01「時間複雜度」採「概念 + 情境 + Python 程式碼」格式，每個段落獨立，可以對照本篇的格式
- DQC #02「空間複雜度」風格一致
- 現有「演算法」分類只有 2 篇，本篇可以顯著擴充此分類的份量
- 程式碼範例應使用 Python，與現有演算法文章一致
