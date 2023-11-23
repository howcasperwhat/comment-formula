<br>

<p align="center">
<img src="res/logo.png" style="width:160px;" />
</p>

<h1 align="center">Comment Formula</h1>

## Introduction
A VSCode extension to render LaTeX formula in comment. Now you can use it in **python**.
> This extension is modified from [vscode-iconify](https://github.com/antfu/vscode-iconify) and use [markdown-it](https://github.com/markdown-it/markdown-it) and [markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3) to render formula.

## Feature and Usage
You are supposed to write formula between `$$` and `$$`.
Now just support write formula in one-line comment in python.  

<p align="center">
<img src="res/feature.png" style="width: 80%" />
</p>

<p align="center">
Fonts in the image are from <a href="https://github.com/githubnext/monaspace">monaspace</a>.
</p>


> In `partial inline mode`, if the formula is too large(height is much higher than the line-height in your editor), hover the formula and you can find it's rendered in the message box, just like the second formula in the above example.

## Configuration
- `comment-formula.inlineColor`: The color of the rendered formula inline the editor. Default is `auto`.
- `comment-formula.messageColor`: The color of the rendered formula in message. Default is `auto`.
- `comment-formula.inline`: The inline mode of the rendered formula. Default is `partial`.  
  - `all`: Render all formula in inline mode.
  - `none`: You can just hover on the formula to preview it.
  - `partial`: Render formula in inline mode if the formula isn't too large.

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