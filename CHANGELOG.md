# ChangeLog

## 2025-02-20: v0.4.4
### Feature
1. Support multline formula render inline.

## 2025-02-19: v0.4.3
### Performance Optimization
1. Significantly reduce bundle size to 3.8MB.

## 2025-02-18: v0.4.2
### Documentation
1. Update images in README.md to show in raw format.

## 2025-02-18: v0.4.1
### Miscellaneous
1. Add some snippets: `ce`, `cancelto`.

## 2025-02-18: v0.4.0
### Feature
1. Support intelligent completion within formula code wrapping symbol, you can disable it by setting `comment-formula.completion` to `false`.
2. Show `Reload Window` notification when changing `comment-formula.inline`.

### Fix
1. Remove `action` package in mathjax input configuration because it's a mathml extension.

### Miscellaneous
1. Now the default value of `comment-formula.symbol` is `$` rather than `\\$`, program will automatically add `\\` before special symbols for `RegExp`.

## 2025-02-15: v0.3.5
### Fix
1. Resolve element detachment from document flow causing scrollbar width miscalculation.

## 2025-02-13: v0.3.4
### Performance Optimization
1. Just create document once when initializing.

## 2025-02-13: v0.3.3
### Performance Optimization
1. Optimize the performance of rendering when changing text-editor selection.

### Feature
1. Enhance TeX input configuration to include all tex packages.

## 2025-02-11: v0.3.2
### Fix
1. Detect wrong formula format and not render it.

## 2025-02-11: v0.3.1
1. Remove verbose log.

## 2025-02-11: v0.3.0
Now feel free to use `"comment-formula.inline": "all"` to render all formulas inline, if you don't mind that the large formula might slightly cover your code.

![responsive](https://github.com/howcasperwhat/comment-formula/blob/main/res/responsive.gif)

### :warning::warning::warning: Breaking Change
1. `inlineColor` and `messageColor` are merged into `color` to avoid rendering twice. If you need this feature, new an [issue](https://github.com/howcasperwhat/comment-formula/issues/new).
2. Config Key Migration: `style` -> `code`, `enableLanguages` -> `languages`.
3. Now default `style` is `font-weight: bold;` rather than `bold`. Write css style in `code` if you want to customize it (be careful of injection security).

### Feature
1. Add `interval` to control the update interval of formula.
2. Add `preview` to customize the style of inline formula-preview.

### Experimental Feature
1. Add `api.prefix` and `api.suffix` to support custom API. Note that the rendering engine must be [MathJax](https://www.mathjax.org/).

## 2024-01-07: v0.2.0
### Feature
1. Use it in language that you want.
2. Multi-line formula is supported.
3. Style of formula code is supported.
4. Set the symbol other than `$` to mark formula (just support '@' or '#' now).

## 2023-11-23: v0.1.0
### Fix
1. Height of formula will adapt to the font size of your editor now.

## 2023-11-18: v0.0.2
### Feature 
1. You can set color in message and inline-editor respectively.

## 2023-11-18: v0.0.1
### Initial Version