// tests/htmlToBBCode.test.ts
import { describe, it, expect } from 'vitest';
import { htmlToBBCode } from '../src/utils/htmlToBBCode';

describe('htmlToBBCode', () => {
  it('converts plain HTML to BBCode', () => {
    const html = '<p><strong>Привіт</strong>, світ!</p>';
    const expectedBBCode = '[b]Привіт[/b], світ!';
    const bbCode = htmlToBBCode(html);
    expect(bbCode).toBe(expectedBBCode);
  });

  it('handles nested tags', () => {
    const html = '<p><strong>Привіт, <em>світ</em></strong>!</p>';
    const expectedBBCode = '[b]Привіт, [i]світ[/i][/b]!';
    const bbCode = htmlToBBCode(html);
    expect(bbCode).toBe(expectedBBCode);
  });

  it('handles links', () => {
    const html = '<a href="https://example.com">Натисніть тут</a>';
    const expectedBBCode = '[url=https://example.com]Натисніть тут[/url]';
    const bbCode = htmlToBBCode(html);
    expect(bbCode).toBe(expectedBBCode);
  });

  it('ignores unknown tags', () => {
    const html = '<unknown>Текст</unknown>';
    const expectedBBCode = 'Текст';
    const bbCode = htmlToBBCode(html);
    expect(bbCode).toBe(expectedBBCode);
  });

  it('processes the image', () => {
    const html = '<img src="image.png" />';
    const expectedBBCode = '[img]image.png[/img]';
    const bbCode = htmlToBBCode(html);
    expect(bbCode).toBe(expectedBBCode);
  });

  // Додайте більше тестів за потребою
});
