<br>

<p align="center">
<img src="res/logo.png" style="width:160px;" />
</p>

<h1 align="center">Comment Formula</h1>

## Introduction
A VSCode Extensions to preview LaTex formulas within the line of your editor.  

> Render Engine: [MathJax](https://www.mathjax.org/)

## Feature and Usage
You are supposed to write formula between `$$` and `$$` by default.

<p align="center">
<img src="res/feature.png" style="width: 80%" />
</p>

## Configurations

<!-- configs -->

| Key                          | Description                                                                                                                                     | Type     | Default                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------- |
| `comment-formula.color`      | Color of rendered formulas.                                                                                                                     | `string` | `"auto"`                      |
| `comment-formula.inline`     | `partial` means only not-so-large formulas are rendered inline.                                                                                 | `string` | `"partial"`                   |
| `comment-formula.languages`  | Enable comment-formula in these languages. LanguageId: [ https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers ] | `array`  | `["c","cpp","python","java"]` |
| `comment-formula.symbol`     | Identifier symbol of formula code.                                                                                                              | `string` | `"\\$"`                       |
| `comment-formula.interval`   | Formula update interval(ms).                                                                                                                    | `number` | `200`                         |
| `comment-formula.code`       | Style of matched latex code.                                                                                                                    | `string` | `"font-weight: bold;"`        |
| `comment-formula.preview`    | Style of the inline formula-preview.                                                                                                            | `string` | `""`                          |
| `comment-formula.api.prefix` | API prefix                                                                                                                                      | `string` | `""`                          |
| `comment-formula.api.suffix` | API suffix                                                                                                                                      | `string` | `""`                          |

<!-- configs -->

> [!TIP] ANY QUESTION
> Feel free to new an issue if you encounter any problem or have any suggestion 👉 [New An Issue](https://github.com/howcasperwhat/comment-formula/issues/new).
