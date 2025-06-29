import type { FormulaCode } from './annotation'
import type { FormulaPreview } from './transformer'
import { MarkdownString } from 'vscode'
import { config } from './config'
import { PLAYGROUND_URL } from './store/constant'

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
    result.push(`$(error) RENDER ERROR`)
  }
  else if (preview === 'all'
    || (preview === 'partial' && inline === 'partial' && large)
    || (preview === 'partial' && inline === 'none')
  ) {
    result.push(`![](${url})`)
  }
  return new MarkdownString(result.join('\n\n---\n\n'), true)
}
