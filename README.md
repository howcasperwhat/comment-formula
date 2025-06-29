<br>

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/logo.png?raw=true" width="120" alt="logo" />
</p>

<h1 align="center">Comment Formula</h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=howcasperwhat.comment-formula" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/howcasperwhat.comment-formula.svg?color=blue&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=howcasperwhat.comment-formula" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/d/howcasperwhat.comment-formula.svg?color=BD976A" alt="Visual Studio Marketplace Downloads" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=howcasperwhat.comment-formula" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/i/howcasperwhat.comment-formula.svg?color=63ba83" alt="Visual Studio Marketplace Installs" /></a>
<br/>
<a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img src="https://img.shields.io/github/last-commit/howcasperwhat/comment-formula.svg?color=c977be" alt="GitHub last commit" /></a>
<a href="https://github.com/howcasperwhat/comment-formula/issues" target="__blank"><img src="https://img.shields.io/github/issues/howcasperwhat/comment-formula.svg?color=a38eed" alt="GitHub issues" /></a>
<a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/howcasperwhat/comment-formula?style=social"></a>
</p>

## Introduction

A VSCode extensions to preview LaTeX formulas within the lines of your editor.

> Render Engine: [MathJax](https://www.mathjax.org/)

## Feature

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/feature.png?raw=true" alt="feature" />
</p>

## Usage

You are supposed to write formulas between `$$` and `$$`.

> [!IMPORTANT]
> Two ways to enable highlight:
> 1. Use [MathJax Highlight](https://marketplace.visualstudio.com/items?itemName=howcasperwhat.mathjax-highlight). (**Recommended**)
> 2. Config `scopes` in User Settings, see [MathJax Highlight Configurations](https://github.com/howcasperwhat/mathjax-highlight?tab=readme-ov-file#configurations) for `scopes` configuration guide.

## Configurations

<!-- configs -->

| Key                                  | Description                                                                                         | Type      | Default                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- | --------- | ----------------------------- |
| `comment-formula.color`              | Color of rendered formulas.                                                                         | `string`  | `"auto"`                      |
| `comment-formula.inline`             | When will the inline formula preview be displayed.                                                  | `string`  | `"all"`                       |
| `comment-formula.languages`          | Enable extension in these [languages id](https://code.visualstudio.com/docs/languages/identifiers). | `array`   | `["c","cpp","java","python"]` |
| `comment-formula.interval`           | Formula update interval(ms).                                                                        | `number`  | `200`                         |
| `comment-formula.code`               | Style of matched LaTeX code.                                                                        | `string`  | `"font-weight: bold;"`        |
| `comment-formula.preview`            | Style of the inline formula preview.                                                                | `string`  | `""`                          |
| `comment-formula.annotation`         | Enable render formula for preview or not.                                                           | `boolean` | `true`                        |
| `comment-formula.completion`         | Enable intelligent completion.                                                                      | `boolean` | `true`                        |
| `comment-formula.multiple`           | Set preview position of multiple line LaTeX or disable it.                                          | `string`  | `"after"`                     |
| `comment-formula.single`             | Set preview position of single line LaTeX or disable it.                                            | `string`  | `"after"`                     |
| `comment-formula.hidden`             | Enable hiding code when selections are out of range.                                                | `string`  | `"scope"`                     |
| `comment-formula.autotab`            | Enable auto tabbing rendered formulas.                                                              | `boolean` | `true`                        |
| `comment-formula.scale`              | Scale factor of the preview formula.                                                                | `number`  | `1`                           |
| `comment-formula.defines`            | Define Language with glob file patterns, where key is language id, value is a list of glob pattern. | `object`  | `{}`                          |
| `comment-formula.capture`            | Set RegExp for capturing math for rendering in comments.                                            | `object`  | `{}`                          |
| `comment-formula.message.playground` | Display link of mathjax-playground in hover message.                                                | `boolean` | `true`                        |
| `comment-formula.message.preview`    | Display rendered formula in hover message.                                                          | `string`  | `"partial"`                   |
| `comment-formula.api.prefix`         | API prefix (Experimental).                                                                          | `string`  | `""`                          |
| `comment-formula.api.suffix`         | API suffix (Experimental).                                                                          | `string`  | `""`                          |
| `comment-formula.preload`            | Paths to files containing LaTeX preamble to preload.                                                | `array`   | `[]`                          |

<!-- configs -->

> Feel free to [open an issue](https://github.com/howcasperwhat/comment-formula/issues/new) if you encounter any problem or have any suggestion.

## Reference

[VSCode Iconify](https://github.com/howcasperwhat/comment-formula) | [MathJax](https://www.mathjax.org/) | [KaTeX](https://katex.org/) | [VSCode Markdown](https://github.com/yzhang-gh/vscode-markdown) | [LaTeX Workshop](https://github.com/James-Yu/LaTeX-Workshop) | [VSCode Markdown Math](https://github.com/microsoft/vscode/tree/main/extensions/markdown-math)

## License

Code is under the [MIT License](https://github.com/howcasperwhat/comment-formula/blob/main/LICENSE).

Logo using [carbon:function](https://github.com/carbon-design-system/carbon) as an element is under the [Apache License 2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE).

Fonts used in feature image are `Dancing Script` (for `Before` and `After`) under the [Open Font License](https://openfontlicense.org/open-font-license-official-text/) and `Input` (for code) under the [Input Font License](https://input.djr.com/license/).

## Support

If you find this project useful, please consider giving it a star on GitHub. Your support is greatly appreciated! <a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/badge/Github-🌟-688D78?logo=github" align="center"></a>
