# ChangeLog

## 2025-06-20: v0.5.12
### Fix
1. Use `matchesGlob` instead of `micromatch` to resolve the issue caused by `pathe` converting Windows drive letters to uppercase.

## 2025-05-08: v0.5.11
### Feature
1. Support more flexible configuration strategies to enable extension.
2. `preload` for multiple folders workspaces is available now.
### Fix
1. `preview` style display error.
### Deprecation Warning
1. The configuration `comment-formula.scopes` is now deprecated, and would be removed in the next version. Please use [MathJax Highlight](https://github.com/howcasperwhat/mathjax-highlight) instead.

## 2025-04-24: v0.5.10
### Performance Optimization
1. Avoid update twice when editor updates in `useActiveEditorDecorations`.

## 2025-04-23: v0.5.9
### Fix
1. Bug in multiple line equations with compact form, regarding [#18](https://github.com/howcasperwhat/comment-formula/issues/18)
### Miscellaneous
1. Improve UX of multiple line preview. 

## 2025-04-17: v0.5.8
### Feature
1. Support `comment-formula.preload` to preload the LaTeX preamble when the editor is opened (thanks to [@hchoi405](https://github.com/hchoi405) via [#17](https://github.com/howcasperwhat/comment-formula/pull/17)).

## 2025-04-11: v0.5.7
### Feature
1. Supports line granularity hiding code, which is scope granularity in the past.
### Fix
1. Fix `comment-formula.inline: partial` not working.
2. Code will display now when `comment-formula.single: none` or `comment-formula.multiple: none`.
3. Annotation isn't activated when startup the extension.
### :warning::warning::warning: Breaking Change
1. The `autotab` feature is now enabled by default.
2. Remove default margin for inline preview, which can be set in `comment-formula.preview`, e.g. `"comment-formula.preview": "margin: 0 .5ch 0 .5ch;"` for margin (left and right) half of a character.

## 2025-04-04: v0.5.6
### Feature
1. Support auto tab for multiple line formulas mentioned in [#14](https://github.com/howcasperwhat/comment-formula/issues/14).

## 2025-04-01: v0.5.5
### Fix
1. Highlight bleeding, fixes [#11](https://github.com/howcasperwhat/comment-formula/issues/11)

## 2025-03-29: v0.5.4
### Fix
1. Remove empty line for svg pseudo-element, now vertical alignment can perfectly be centered.

## 2025-03-10: v0.5.3
### Feature
1. Migrate completion functionality from KaTeX to MathJax.
2. Add `physics` package for `MathJax`.
3. Add support for commenting in formula blocks using LaTeX syntax.
4. Support disabling rendering formula.
## Fix
1. Conflict with [mathjax-highlight](https://github.com/howcasperwhat/mathjax-highlight).
2. Remove tab `\t` for formula block completion.

## 2025-03-03: v0.5.2
### Feature
1. Support inline snippet and block snippet.
### Fix
1. Disable completion suggestion for two backslashes.
### Miscellaneous
1. Update env. for `BeginEnd` functions.

## 2025-03-01: v0.5.1
### Miscellaneous
1. Update docs.

## 2025-02-28: v0.5.0
### Feature
1. Support highlighting the formula code, it's disabled by default, read the [doc](https://github.com/howcasperwhat/comment-formula?tab=readme-ov-file#usage) to enable it.
![highlight](https:///github.com/howcasperwhat/comment-formula/blob/main/res/highlight.gif)

### :warning::warning::warning: Breaking Change
1. Remove `symbol` option due to the low usage rate, if you need this feature, new an [issue](https://github.com/howcasperwhat/comment-formula/issues/new) and let me know your needs, I will consider make it more flexible and reintroduce it.
2. Default Value Changed:
   a. `comment-formula.inline` from `partial` to `all`.
   b. `comment-formula.multiple` from `before` to `after`, to align with the default value of `comment-formula.single`.

## 2025-02-27: v0.4.12
### Fix
1. Correct the calculation of `maxLine`.

## 2025-02-27: v0.4.11
### Feature
1. Automatically avoid covering codes for multiple line inline preview formulas.
### Fix
1. Adjust snippet insertion logic for inline formulas.

## 2025-02-26: v0.4.10
### Fix
1. Different ex size in px unit from svg and document env.
2. Reduce the default base size because it's too large.

## 2025-02-25: v0.4.9
### Fix
1. Without treeshake due to version of `tsup`.

## 2025-02-25: v0.4.8
### Feature
1. Support scaling the rendered formula manually or based on font size.

## 2025-02-25: v0.4.7
### Feature
1. Support customizing `code` style without reloading window.

## 2025-02-23: v0.4.6
### Miscellaneous
1. Add `.vscodeignore` to exclude unnecessary files.
2. Use ESLint to format code.

## 2025-02-22: v0.4.5
### Feature
1. Support customizing the relative position of rendered preview.
2. Support disabling codes' hidden behavior.
### Miscellaneous
1. Use new logo.

## 2025-02-20: v0.4.4
### Feature
1. Support multiline formula render inline.

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
1. Remove `action` package in MathJax input configuration because it's a MathML extension.

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
1. Enhance TeX input configuration to include all TeX packages.

## 2025-02-11: v0.3.2
### Fix
1. Detect wrong formula format and not render it.

## 2025-02-11: v0.3.1
1. Remove verbose log.

## 2025-02-11: v0.3.0
Now feel free to use `"comment-formula.inline": "all"` to render all formulas inline, if you don't mind that the large formula might slightly cover your code.

<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/feature.png?raw=true" style="width: 80%" />

### :warning::warning::warning: Breaking Change
1. `inlineColor` and `messageColor` are merged into `color` to avoid rendering twice. If you need this feature, new an [issue](https://github.com/howcasperwhat/comment-formula/issues/new).
2. Config Key Migration: `style` -> `code`, `enableLanguages` -> `languages`.
3. Now default `style` is `font-weight: bold;` rather than `bold`. Write css style in `code` if you want to customize it (be careful of injection security).

### Feature
1. Add `interval` to control the update interval of formula.
2. Add `preview` to customize the style of inline formula-preview.

### Experimental Feature
1. Add `api.prefix` and `api.suffix` to support customizing API. Note that the rendering engine must be [MathJax](https://www.mathjax.org/).

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