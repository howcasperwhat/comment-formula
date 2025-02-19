<br>

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/logo.png?raw=true" style="width:160px;" />
</p>

<h1 align="center">Comment Formula</h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=howcasperwhat.comment-formula" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/howcasperwhat.comment-formula.svg?color=blue&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=howcasperwhat.comment-formula" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/i/howcasperwhat.comment-formula.svg?color=63ba83" alt="Visual Studio Marketplace Installs" /></a>
<br/>
<a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img src="https://img.shields.io/github/last-commit/howcasperwhat/comment-formula.svg?color=c977be" alt="GitHub last commit" /></a>
<a href="https://github.com/howcasperwhat/comment-formula/issues" target="__blank"><img src="https://img.shields.io/github/issues/howcasperwhat/comment-formula.svg?color=a38eed" alt="GitHub issues" /></a>
<a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/howcasperwhat/comment-formula?style=social"></a>
</p>

## Introduction
A VSCode Extensions to preview LaTex formulas within the line of your editor.  

> Render Engine: [MathJax](https://www.mathjax.org/)

## Feature and Usage
You are supposed to write formula between `$$` and `$$` by default.

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/feature.png?raw=true" style="width: 80%" />
</p>

> [!IMPORTANT] 
> Recommend Feature: `"comment-formula.inline": "all"`: Responsively render all formulas inline.  
> 
> ![responsive](https://github.com/howcasperwhat/comment-formula/blob/main/assets/responsive.gif?raw=true)
> 
> We set the default value to `partial` to avoid rendered large formula covering your code.

## Configurations

<!-- configs -->

| Key                          | Description                                                                                                                                     | Type      | Default                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------- |
| `comment-formula.color`      | Color of rendered formulas.                                                                                                                     | `string`  | `"auto"`                      |
| `comment-formula.inline`     | `partial` means only not-so-large formulas are rendered inline.                                                                                 | `string`  | `"partial"`                   |
| `comment-formula.languages`  | Enable comment-formula in these languages. LanguageId: [ https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers ] | `array`   | `["c","cpp","java","python"]` |
| `comment-formula.symbol`     | Identifier symbol of formula code.                                                                                                              | `string`  | `"$"`                         |
| `comment-formula.interval`   | Formula update interval(ms).                                                                                                                    | `number`  | `200`                         |
| `comment-formula.code`       | Style of matched latex code.                                                                                                                    | `string`  | `"font-weight: bold;"`        |
| `comment-formula.preview`    | Style of the inline formula-preview.                                                                                                            | `string`  | `""`                          |
| `comment-formula.completion` | Enable intelligent completion.                                                                                                                  | `boolean` | `true`                        |
| `comment-formula.api.prefix` | API prefix                                                                                                                                      | `string`  | `""`                          |
| `comment-formula.api.suffix` | API suffix                                                                                                                                      | `string`  | `""`                          |

<!-- configs -->

> [!TIP]
> Feel free to [new an issue](https://github.com/howcasperwhat/comment-formula/issues/new) if you encounter any problem or have any suggestion.

## Reference
[MathJax](https://www.mathjax.org/) | [KaTeX](https://katex.org/) | [VSCode Markdown](https://github.com/yzhang-gh/vscode-markdown) | [LaTex Workshop](https://github.com/James-Yu/LaTeX-Workshop) | [VSCode Iconify](https://github.com/howcasperwhat/comment-formula)
