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
A VSCode extensions to preview LaTeX formulas within the line of your editor.

> Render Engine: [MathJax](https://www.mathjax.org/)

## Feature

<p align="center">
<img src="https://github.com/howcasperwhat/comment-formula/blob/main/assets/feature.png?raw=true" alt="feature" />
</p>

## Usage
You are supposed to write formulas between `$$` and `$$`.

### <font color="#688D78">Enable Highlight</font>

> [!IMPORTANT]
> **TL;DR:** Two ways to enable highlight:
> 1. Config `scopes` in User Settings;
> 2. Use [MathJax Highlight](https://marketplace.visualstudio.com/items?itemName=howcasperwhat.mathjax-highlight).

#### <font color="#18F">Config `scopes` in User Settings</font>

Use the command `Developer: Inspect Editor Tokens and Scopes` to get the global scope of the language current file is using.

For example:
``` js
'source.c'
'source.cpp'
'source.java'
'source.python'
```

Note that suffixes of scopes aren't always the same as the languageId (e.g. `javascript` -> `source.js`).

The syntax highlight in VSCode can't be modified until the next opening of the editor. So every time changing the configuration, you need to reload the editor as prompted by the message shown in the corner.

Next, if you don't want to bold the code, set `comment-formula.code` to `""`.

So the best practice for default `languages` is shown below:
``` json
// Preferences: Open User Settings (JSON):
{
  "comment-formula.scopes": [
    "source.c",
    "source.cpp",
    "source.java",
    "source.python"
  ],
  "comment-formula.code": ""
}
```

Set this configuration in **user settings** rather than workspace settings, or every time you open a workspace with different languages, you will get a message to reload the editor for the changes to take effect.

#### <font color="#C66">Use MathJax Highlight</font>
Every time updating the extension, a message will be shown in the corner to reload the editor for the changes to take effect.

Therefore, you can alternatively use  [MathJax Highlight](https://marketplace.visualstudio.com/items?itemName=howcasperwhat.mathjax-highlight) with same highlight feature and lower update frequency. It enables highlight in `source.c`, `source.cpp`, `source.java`, `source.python` in default.

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

Fonts used in feature image are `Dancing Script` (for `Before` and `After`) under the [Open Font License](https://openfontlicense.org/open-font-license-official-text/) and `Input` (for code) under the [Input Font License](https://input.djr.com/license/).

## Support
If you find this project useful, please consider giving it a star on GitHub. Your support is greatly appreciated! <a href="https://github.com/howcasperwhat/comment-formula" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/badge/Github-🌟-688D78?logo=github" align="center"></a>
