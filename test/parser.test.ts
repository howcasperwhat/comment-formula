import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { captureBlock, captureInline } from '../src/parser'

const dir = 'test/inputs/'
const input = readFileSync(`${dir}/_.py`, 'utf-8')

describe('Capture Inline', () => {
  it('should capture formula', () => {
    const result = captureInline(input, 5)
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "end": 9,
          "formula": "A",
          "start": 8,
        },
        {
          "end": 13,
          "formula": "B",
          "start": 12,
        },
        {
          "end": 17,
          "formula": "C",
          "start": 16,
        },
        {
          "end": 379,
          "formula": "1\\$",
          "start": 376,
        },
        {
          "end": 389,
          "formula": "2\\\\",
          "start": 386,
        },
        {
          "end": 405,
          "formula": "3%comment",
          "start": 396,
        },
        {
          "end": 419,
          "formula": "1",
          "start": 418,
        },
        {
          "end": 460,
          "formula": "2\\$",
          "start": 457,
        },
        {
          "end": 469,
          "formula": "3%",
          "start": 467,
        },
        {
          "end": 472,
          "formula": " ",
          "start": 471,
        },
      ]
    `)
  })
})

describe('Capture Block', () => {
  it('should capture formula', () => {
    const result = captureBlock(input, 5)
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "end": 298,
          "formula": "
        \\begin{eqnarray*}
        \\sum_{i=1}^{n} i^2 &=& \\frac{n(n+1)(2n+1)}{6} \\\\
        \\sum_{i=1}^{n} i^3 &=& \\left(\\frac{n(n+1)}{2}\\right)^2 \\\\
        \\sum_{i=1}^{n} i^4 &=& \\frac{n(n+1)(2n+1)(3n^2 + 3n - 1)}{30} \\\\
        \\end{eqnarray*}
        ",
          "start": 79,
        },
        {
          "end": 424,
          "formula": " ... $2\\\\$ ... $3%comment$$ignore

      # $1$ ...",
          "start": 380,
        },
      ]
    `)
  })
})
