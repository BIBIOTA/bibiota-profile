# Bibiota Blog Style Guide

Use this guide when planning, drafting, or reviewing bibiota-blog articles.

## Language And Tone

- Default language is Traditional Chinese.
- Tone is practical, clear, and explanatory.
- Personal context is allowed when it helps the reader understand the motivation.
- Avoid exaggerated claims and vague motivational language.
- Prefer short paragraphs and concrete examples.
- Do not open or close an article with an interview scenario as the hook (e.g. 「面試被問到…」). Lead with the problem, a counter-intuitive pain point, or why the concept matters instead. This holds even for Daily Questions Challenge entries.

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

Even though the series is interview-preparation material, do not frame the article opening or closing around an interview scenario. Keep the interview context in the pinned index and tags; let the body stand on the concept itself.

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
