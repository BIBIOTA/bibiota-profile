# Bibiota Blog Style Guide

Use this guide when planning, drafting, or reviewing bibiota-blog articles.

## Language And Tone

- Default language is Traditional Chinese.
- Tone is practical, clear, and explanatory.
- Personal context is allowed when it helps the reader understand the motivation.
- Avoid exaggerated claims and vague motivational language.
- Prefer short paragraphs and concrete examples.

## Technical Article Shape

A typical technical article should include:

1. Context or problem.
2. Core concept.
3. How it works.
4. Practical scenario or trade-off.
5. Summary.
6. References.

Use English technical terms in parentheses when helpful, for example `冪等性（Idempotency）`.

## Daily Questions Challenge

Daily Questions Challenge entries should:

- Use a title like `[Daily Questions Challenge NN] Article Title`.
- Use `avatar: /daily-questions-challenge.png`.
- Be linked from `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`.
- Be grouped under the confirmed category in the pinned index.

Do not guess the category if it is ambiguous.

## References

Use a final section:

```md
## 參考

- [Title](https://example.com)
```

For technical topics, prefer official documentation, standards, primary sources, and credible engineering references. Use live web verification for time-sensitive facts.

## Formatting

- Use Markdown headings consistently.
- Avoid excessive bold text.
- Use lists for comparisons, steps, and trade-offs.
- Use code blocks only when code or exact syntax is needed.
- Keep image paths compatible with VitePress public assets.
