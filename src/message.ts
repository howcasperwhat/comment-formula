import type { FormulaCode } from './annotation'
import type { FormulaPreview } from './transformer'
import { MarkdownString } from 'vscode'
import { PLAYGROUND_URL } from './store/constant'
import { config } from './store/shared'

export function getMessage(_code: FormulaCode, _preview: FormulaPreview) {
  const result: string[] = []
  const { preview, playground } = config.extension.message
  const { error, url, large } = _preview
  const tex = _code.tex
  const inline = config.extension.inline
  if (playground) {
    result.push(`$(pencil) [Open in MathJax Playground](${
      PLAYGROUND_URL}?tex=${encodeURIComponent(tex)})`)
  }
  if (error) {
    result.push(`$(error) ERROR\n\n---\n\n${_preview.code}`)
  }
  else if (preview === 'all'
    || (preview === 'partial' && inline === 'partial' && large)
    || (preview === 'partial' && inline === 'none')
  ) {
    result.push(`![](${url})`)
  }
  return new MarkdownString(result.join('\n\n---\n\n'), true)
}
