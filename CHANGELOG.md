# ChangeLog

## 2023-11-18: v0.0.1
### Initial Version

## 2023-11-18: v0.0.2
### Feature 
1. You can set color in message and inline-editor respectively.

## 2023-11-23: v0.1.0
### Fix
1. Height of formula will adapt to the font size of your editor now.

## 2024-01-07: v0.2.0
### Feature
1. Use it in language that you want.
2. Multi-line formula is supported.
3. Style of formula code is supported.
4. Set the symbol other than `$` to mark formula (just support '@' or '#' now).

## 2025-02-11: v0.3.0
Now feel free to use `"comment-formula.inline": "all"` to render all formulas inline, if you don't mind that the large formula might slightly cover your code.

![responsive](res/responsive.gif)

### :warning::warning::warning: Breaking Change
1. `inlineColor` and `messageColor` are merged into `color` to avoid rendering twice. If you need this feature, new an [issue](https://github.com/howcasperwhat/comment-formula/issues/new).
2. Config Key Migration: `style` -> `code`, `enableLanguages` -> `languages`.
3. Now default `style` is `font-weight: bold;` rather than `bold`. Write css style in `code` if you want to customize it (be careful of injection security).

### Feature
1. Add `interval` to control the update interval of formula.
2. Add `preview` to customize the style of inline formula-preview.

### Experimental Feature
1. Add `api.prefix` and `api.suffix` to support custom API. Note that the rendering engine must be [MathJax](https://www.mathjax.org/).

## 2025-02-11: v0.3.1
1. Remove verbose log.

## 2025-02-11: v0.3.2
### Fix
1. Detect wrong formula format and not render it.

## 2025-02-13: v0.3.3
### Performance Optimization
1. Optimize the performance of rendering when changing text-editor selection.

### Feature
1. Enhance TeX input configuration to include all tex packages.

## 2025-02-13: v0.3.4