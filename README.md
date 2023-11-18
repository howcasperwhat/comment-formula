![](res/logo.png)
# comment-formula

A VSCode extension to render LaTeX formula in comment. Now you can use it in python.
Extension code is modified from [vscode-iconify](https://github.com/antfu/vscode-iconify)

## Configure options

```json
{
  // auto: dark theme will use white color, light theme will use black color
  "comment-formula.color": "#ff0000", // (default: "auto"),
  // a large formula will scale down to very small size, so I select "partial" as default
  // you can hover in the no-inline formula to preview the full formula
  // you can set it to "none" to disable inline formula
  "comment-formula.inline": "all", // (default: "partial"),
}
```

Enjoy it!