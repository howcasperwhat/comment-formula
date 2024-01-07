<br>

<p align="center">
<img src="res/logo.png" style="width:160px;" />
</p>

<h1 align="center">Comment Formula</h1>

## Introduction
A VSCode extension to render LaTeX formula in comment. Now you can use it in **python**.
> This project is based on [vscode-iconify](https://github.com/antfu/vscode-iconify) and uses [markdown-it](https://github.com/markdown-it/markdown-it) and [markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3) to render formula.

## Feature and Usage
You are supposed to write formula between `$$` and `$$` by default.

<p align="center">
<img src="res/feature.png" style="width: 80%" />
</p>

<p align="center">
Fonts in the image are from <a href="https://github.com/githubnext/monaspace">monaspace</a>.
</p>

> - The formula will be rendered in the message box when it is too large in `partial inline mode`, exceeding the line-height of your editor, similar to the second formula shown above
> - Note that multi-line formula won't be rendered in inline mode due to its height, you can simply hover over it for a preview in the message box.

## Configuration
- `comment-formula.inlineColor`: The color of the rendered formula inline the editor. Default is `auto`.
- `comment-formula.messageColor`: The color of the rendered formula in message. Default is `auto`.
- `comment-formula.inline`: The inline mode of the rendered formula. Default is `partial`.  
  - `all`: Render all formula in inline mode.
  - `none`: You can just hover on the formula to preview it.
  - `partial`: Render formula in inline mode if the formula isn't too large.
- `comment-formula.symbol`: The symbol to mark formula. Default is `\\$`.
  - `\\$`: `$$x^2$$`  
  - `@`: `@@x^2@@`
  - `#`: `##x^2##`
- `comment-formula.style`: Style of formula code inline the editor.
  - `underline`: <font style="border-bottom: 1px dashed;">$$f(x)$$</font>  
  - `bold`: <font style="font-weight: bold;">$$f(x)$$</font>  
  - `italic`: <font style="font-style: italic;">$$f(x)$$</font>  
  - `line-through`: <font style="text-decoration: line-through;">$$f(x)$$</font>  
  - `none`: <font>$$f(x)$$</font>  
- `comment-formula.enableLanguages`: Enable comment-formula in these languages. <a href="https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers" target="_blank">LanguageId Reference</a>. Default is `["c", "cpp", "python", "java"]`.  

For example:  
```json
{
  "comment-formula.inlineColor": "#667466",
  "comment-formula.messageColor": "auto",  
  "comment-formula.inline": "partial",  
}
```

## Known Issues
- When you install or enable this extension, you may find that [ms-python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)'s connection to server got closed. Just restart VSCode and it will be fine.
- Install this extension in VSCode may takes a long time, please be patient or try install it again. Installing it using `.vsix` file also works.