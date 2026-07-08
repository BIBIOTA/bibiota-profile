import { describe, it, expect } from 'vitest'
import { stripMarkdown } from '../../docs/.vitepress/loadData.js'

describe('stripMarkdown', () => {
  it('內文純文字化', () => {
    const md = [
      '# 標題',
      '',
      '這是一段 **粗體** 與 *斜體* 文字，含 `inline code`。',
      '',
      '```js',
      'const secret = "should-not-appear"',
      '```',
      '',
      '> 引言區塊',
      '',
      '- 清單項目',
      '',
      '參考 [連結文字](https://example.com) 與圖片 ![替代文字](https://example.com/a.png)。',
      '',
      '<div class="note">HTML 內容</div>',
    ].join('\n')

    const text = stripMarkdown(md)

    // 程式碼區塊內容整段移除
    expect(text).not.toContain('should-not-appear')
    expect(text).not.toContain('```')
    // HTML 標籤移除
    expect(text).not.toContain('<div')
    expect(text).not.toContain('</div>')
    // markdown 語法符號移除
    expect(text).not.toContain('**')
    expect(text).not.toContain('#')
    expect(text).not.toContain('`')
    expect(text).not.toMatch(/!\[/)
    expect(text).not.toContain('](')
    // 連結/圖片的可讀文字保留
    expect(text).toContain('連結文字')
    expect(text).toContain('標題')
    expect(text).toContain('引言區塊')
    // 無多餘連續空白
    expect(text).not.toMatch(/\s{2,}/)
  })
})
