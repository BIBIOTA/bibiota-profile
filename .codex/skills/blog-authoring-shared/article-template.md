# Bibiota Blog Article Template

Use this template as the starting point for technical articles.

```md
---
layout: doc
title: "{title}"
description: {description}
date: {YYYY-MM-DD}
avatar: {avatar}
tags:
  - {tag}
head:
  - - meta
    - property: og:title
      content: "{title}"
  - - meta
    - property: og:description
      content: {description}
  - - meta
    - name: twitter:title
      content: "{title}"
  - - meta
    - name: twitter:description
      content: {description}
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## {Main Concept}

{Opening context}

## {Core Section}

{Explanation}

## {Practical Section}

{Scenario or trade-off}

## 總結

{Summary}

## 參考

- [{Source Title}]({Source URL})
```

## Daily Questions Challenge Index Pattern

Add new links to:

```text
docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md
```

Use this format under the confirmed category:

```md
- [Article Title](./YYYY-MM-DD-slug.md)
```
