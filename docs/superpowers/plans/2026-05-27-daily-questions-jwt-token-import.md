# Daily Questions JWT Token Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the Notion JWT token article as `[Daily Questions Challenge 02] 說明 JWT token` and link it from the Challenge 00 index article.

**Architecture:** Keep the existing VitePress Tech blog structure. Add one Markdown post under `docs/tech/posts/` using the current frontmatter and article component pattern, then update the Challenge 00 index Markdown with an internal relative link.

**Tech Stack:** VitePress 1.6.4, Markdown frontmatter parsed by `gray-matter`, Vue article components already used in Tech posts.

---

## File Structure

- Create: `docs/tech/posts/2026-05-27-jwt-token.md`
  - Responsibility: standalone Challenge 02 article converted from the Notion source.
- Modify: `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`
  - Responsibility: pinned Daily Questions Challenge index with links to individual question articles.

## Task 1: Create the JWT Token Article

**Files:**
- Create: `docs/tech/posts/2026-05-27-jwt-token.md`

- [ ] **Step 1: Create the Markdown post**

Create `docs/tech/posts/2026-05-27-jwt-token.md` with this exact content:

```markdown
---
layout: doc
title: "[Daily Questions Challenge 02] 說明 JWT token"
description: 說明 JWT token 的結構、登入流程與安全注意事項。
date: 2026-05-27
tags:
  - Backend
  - Authentication
  - Security
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 02] 說明 JWT token"
  - - meta
    - property: og:description
      content: 說明 JWT token 的結構、登入流程與安全注意事項。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 02] 說明 JWT token"
  - - meta
    - name: twitter:description
      content: 說明 JWT token 的結構、登入流程與安全注意事項。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

JWT token 是一種「無狀態（Stateless）認證」。

後端不需要在資料庫或記憶體中保存使用者的登入 Session 狀態，而是將使用者的身分與權限資訊打包成 Claims，透過簽名保護資料完整性後，交由前端保管。

## 核心觀念

1. **Header（標頭）：** 宣告這個 Token 的類型（通常為 JWT）以及所使用的簽名演算法（例如 HMAC SHA256 或 RSA）。
2. **Payload（內容／聲明）：** 存放實際的資料，稱為 Claims。通常會包含 `user_id`、`role`（權限角色）以及 `exp`（過期時間戳記）。
3. **Signature（簽名）：** 將 Header 與 Payload 組合後，加上只有後端才知道的 Secret Key（密鑰），透過 Header 指定的演算法計算出的雜湊值。這確保了 Token 在傳輸過程中即使遭到攔截，也無法被竄改。

組合起來的結構如下：

```plain text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Header、Payload、Signature 三個部分分別以 `.` 作為分隔，並轉換為 Base64Url 編碼字串後組合而成。

## 核發與使用流程

1. **使用者登入：** 前端將使用者輸入的帳號與密碼，透過 POST 請求發送給後端 API 進行身分驗證。
2. **後端核發 Token：** 後端比對資料庫中的帳號密碼。驗證無誤後，將使用者的基本資訊與過期時間寫入 Payload，以伺服器的 Secret Key 產生 Signature，最後將組合好的 JWT 回傳給前端。
3. **前端儲存 Token：** 前端收到 JWT 後需妥善儲存，實務上最好的存放方式是 **HttpOnly Cookie**。
4. **前端攜帶 Token 發送請求：** 當前端需要存取受保護的 API（例如獲取會員資料、進行結帳）時，會在 HTTP Request 的 Authorization Header 中帶上 Token，標準格式為：`Bearer <你的_JWT_Token>`。
5. **後端驗證 Token：** 後端收到請求後，會以自己的 Secret Key 重新計算 Token 的 Signature，並與傳入的值比對。若一致且未過期，即判定身分合法，放行請求並回傳資料。

## 使用 JWT 的注意事項

### 1. 不要在 JWT Token 中放入敏感資訊

Payload 僅經過 Base64Url 編碼，並未加密，絕對不能存放密碼或任何敏感個資。

### 2. Cross-site 攻擊的風險

任何人持有 Token 都能與後端進行溝通，因此存在 Cross-site 攻擊的風險，常見類型有兩種：

- **XSS（跨站指令碼攻擊）：** 駭客在有 XSS 漏洞的網站中注入惡意 JavaScript，當已登入且 `localStorage` 中存有 JWT 的使用者瀏覽時，瀏覽器會執行該惡意程式碼，使駭客得以竊取 JWT Token。
- **CSRF（跨站請求偽造）：** 使用者在尚未登出的情況下，被誘騙點擊或造訪駭客建立的惡意網站，該網站中隱藏了自動發送表單或 API 請求的程式碼，藉此透過使用者的身分發送惡意請求。

為避免 XSS，避免將 JWT Token 存放於 `localStorage` 或 `sessionStorage`。

為避免 CSRF，可在存有 JWT 的 Cookie 上加設 `SameSite=Strict` 或 `SameSite=Lax` 屬性，限制瀏覽器在跨站請求時不自動夾帶 Cookie；或採用 Double Submit Cookie 的方式，讓後端同時驗證瀏覽器自動帶上的 Cookie Token，以及前端手動置入 Header（或 Body）的 Token 是否一致。

### 3. JWT Token 發行後難以主動銷毀

Session 可隨時被銷毀，但 JWT 的設計原則是在過期前持續有效。為兼顧安全性與使用者體驗，現代系統通常會同時發行兩種 Token：

| Token 類型 | 壽命 | 用途 |
| --- | --- | --- |
| **Access Token** | 極短（如 15 分鐘） | 放在 HTTP Header 中隨每次請求攜帶，用於存取 API 資料。即使外洩，損害的時間窗口也很小。 |
| **Refresh Token** | 較長（如 7 至 30 天） | 通常嚴格保存於 HttpOnly Cookie 中。當 Access Token 過期時，前端會在背景以它向後端換取新的 Access Token，使用者無需重新輸入帳密。 |

參考：

- [JWT 的運作原理是什麼？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/jwt)
- [ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/articles/10334612)
- [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
- [\[第十二週\] 資訊安全 - 常見攻擊：CSRF](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)
- [Randall Degges - Please Stop Using Local Storage](https://rdegges.com/2018/please-stop-using-local-storage/)
```

- [ ] **Step 2: Verify the article file exists**

Run:

```bash
test -f docs/tech/posts/2026-05-27-jwt-token.md
```

Expected: command exits with status `0` and prints no output.

## Task 2: Link Challenge 02 from the Challenge 00 Index

**Files:**
- Modify: `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`

- [ ] **Step 1: Add the Backend section**

Replace the final `## 題目` section from:

```markdown
## 題目

### 演算法

- [解釋時間複雜度 (Time Complexity)](./2026-05-26-time-complexity.md)
```

To:

```markdown
## 題目

### 演算法

- [解釋時間複雜度 (Time Complexity)](./2026-05-26-time-complexity.md)

### Backend

- [說明 JWT token](./2026-05-27-jwt-token.md)
```

- [ ] **Step 2: Verify the link was added**

Run:

```bash
rg -n "說明 JWT token|2026-05-27-jwt-token.md" docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md
```

Expected: one matching line containing `- [說明 JWT token](./2026-05-27-jwt-token.md)`.

## Task 3: Build and Verify the Static Site

**Files:**
- Verify: `docs/.vitepress/dist/tech/posts/2026-05-27-jwt-token.html`
- Verify: `docs/.vitepress/dist/tech/posts/2026-05-26-daily-questions-challenge-2026.html`

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run docs:build
```

Expected: VitePress build succeeds with no fatal errors.

- [ ] **Step 2: Verify the generated JWT article page exists**

Run:

```bash
test -f docs/.vitepress/dist/tech/posts/2026-05-27-jwt-token.html
```

Expected: command exits with status `0` and prints no output.

- [ ] **Step 3: Verify Challenge 00 generated HTML contains the new link**

Run:

```bash
rg -n "2026-05-27-jwt-token.html|說明 JWT token" docs/.vitepress/dist/tech/posts/2026-05-26-daily-questions-challenge-2026.html
```

Expected: matching HTML includes `2026-05-27-jwt-token.html` and `說明 JWT token`.

- [ ] **Step 4: Commit the content changes**

Run:

```bash
git add docs/tech/posts/2026-05-27-jwt-token.md docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md
git commit -m "feat(blog): import jwt token challenge article"
```

Expected: commit succeeds and includes only the new JWT post plus the Challenge 00 index update.

## Self-Review

- Spec coverage: Task 1 creates the Challenge 02 article from Notion content; Task 2 links it from Challenge 00; Task 3 runs the required build and verifies generated output.
- Placeholder scan: no TBD, TODO, or open-ended implementation instructions remain.
- Scope check: the plan avoids article list UI, loader changes, automated Notion sync, and unrelated untracked files.
