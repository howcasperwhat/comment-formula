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
A VSCode extensions to preview LaTeX formulas within the line of your editor.

> Render Engine: [MathJax](https://www.mathjax.org/)

## Feature

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/feature.png?raw=true" style="width: 80%" />
</p>

## Usage
You are supposed to write formulas between `$$` and `$$`.

**Enable Highlight**
> [!IMPORTANT]
> Use cammand `Developer: Inspect Editor Tokens and Scopes` to get the global scope of the language current file is using.
>
> For example:
> ``` js
> 'source.c'
> 'source.cpp'
> 'source.java'
> 'source.python'
> ```
>
> Set this configuration in **user settings** rather than workspace settings, or every time you open a workspace with different language, you will get a message to reload the editor which is needed to take effect.
>
> Note that the suffix of scopes aren't always the same as the languageId (e.g. `javascript` -> `source.js`).
>
> The syntax highlight in vscode can't be modified until the next opening of the editor. So every time you change the configuration, you need to reload the editor following the message.
>
> Next, if you don't want to bold the code, set `comment-formula.code` to `""`.
>
> So the best practice is shown below:
> ``` json
> // user settings (JSON)
> {
>   "comment-formula.scopes": [
>     "source.c",
>     "source.cpp",
>     "source.java",
>     "source.python"
>   ],
>   "comment-formula.code": ""
> }
> ```

## Configurations

<!-- configs -->

| Key                          | Description                                                                                                                                 | Type      | Default                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------- |
| `comment-formula.color`      | Color of rendered formulas.                                                                                                                 | `string`  | `"auto"`                      |
| `comment-formula.inline`     | When will the inline formula preview be displayed.                                                                                          | `string`  | `"all"`                       |
| `comment-formula.languages`  | Enable comment-formula in these languages. LanguageId: https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers | `array`   | `["c","cpp","java","python"]` |
| `comment-formula.scopes`     | Enable highlight in these scopes.                                                                                                           | `array`   | `[]`                          |
| `comment-formula.interval`   | Formula update interval(ms).                                                                                                                | `number`  | `200`                         |
| `comment-formula.code`       | Style of matched LaTeX code.                                                                                                                | `string`  | `"font-weight: bold;"`        |
| `comment-formula.preview`    | Style of the inline formula preview.                                                                                                        | `string`  | `""`                          |
| `comment-formula.completion` | Enable intelligent completion.                                                                                                              | `boolean` | `true`                        |
| `comment-formula.multiple`   | Set preview position of multiple line LaTeX or disable it.                                                                                  | `string`  | `"after"`                     |
| `comment-formula.single`     | Set preview position of single line LaTeX or disable it.                                                                                    | `string`  | `"after"`                     |
| `comment-formula.hidden`     | Enable hiding code when selections are out of range.                                                                                        | `boolean` | `true`                        |
| `comment-formula.scale`      | Scale factor of the preview formula.                                                                                                        | `number`  | `1`                           |
| `comment-formula.api.prefix` | API prefix (Experimental).                                                                                                                  | `string`  | `""`                          |
| `comment-formula.api.suffix` | API suffix (Experimental).                                                                                                                  | `string`  | `""`                          |

<!-- configs -->

> Feel free to [new an issue](https://github.com/howcasperwhat/comment-formula/issues/new) if you encounter any problem or have any suggestion.

## Reference
[VSCode Iconify](https://github.com/howcasperwhat/comment-formula) | [MathJax](https://www.mathjax.org/) | [KaTeX](https://katex.org/) | [VSCode Markdown](https://github.com/yzhang-gh/vscode-markdown) | [LaTeX Workshop](https://github.com/James-Yu/LaTeX-Workshop) | [VSCode Markdown Math](https://github.com/microsoft/vscode/tree/main/extensions/markdown-math)

## License

Code is under the [MIT License](https://github.com/howcasperwhat/comment-formula/blob/main/LICENSE).

Logo using [carbon:function](https://github.com/carbon-design-system/carbon) as an element is under the [Apache License 2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE).

Fonts using in feature image are `Dancing Script` (for `Before` and `After`) under the [Open Font License](https://openfontlicense.org/open-font-license-official-text/) and `Input` (for code) under the [Open Font License](https://input.djr.com/license/).

## Support
If you find this project useful, please consider giving it a star on GitHub. Your support is greatly appreciated!
