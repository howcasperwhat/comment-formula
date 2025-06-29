export const PLAYGROUND_URL = 'https://howcasperwhat.github.io/mathjax-playground/'
// @see: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/fontInfo.ts#L14
// eslint-disable-next-line node/prefer-global/process
export const GLODEB_LINE_HEIGHT_RATIO = process.platform === 'darwin' ? 1.5 : 1.35
// use devtools to get the value of 1ex
export const MATHJAX_TEX_EX = 8.64
export const BASE_HEIGHT = 24
export const CHARACTERS_NEED_ESCAPING = new Set([
  '.',
  '^',
  '$',
  '*',
  '+',
  '?',
  '|',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '\\',
])
export const DEFAULT_CAPTURE = [
  { marker: '$$', breakable: true },
  { marker: '$', breakable: false },
]
