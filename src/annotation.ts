import type { DecorationOptions, ExtensionContext } from 'vscode'
import { Position, Range, Uri, window, workspace } from 'vscode'
import {
  useActiveTextEditor, useTextEditorSelections,
  useDocumentText, useActiveEditorDecorations,
  computed
} from 'reactive-vscode'

import { transformer } from './transformer'
import { store, config, enabled } from './config'

export interface FormulaCode {
  range: Range,
  tex: string,
}

export function useAnnotation(context: ExtensionContext) {
  const InlinePreviewDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; vertical-align:top;`,
  })
  const MultilPreviewDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; vertical-align:top;`,
  })
  const ShowCodeDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; vertical-align:top; ${config.extension.code}`,
  })
  const HideCodeDecoration = window.createTextEditorDecorationType({
    textDecoration: 'none; vertical-align:top; display: none;',
  })

  const editor = useActiveTextEditor()
  const selections = useTextEditorSelections(editor)
  const text = useDocumentText(() => editor.value?.document)

  const injection = ['position:relative', 'display:inline-block', 'top:50%',
    'transform:translateY(-50%)', 'vertical-align:top'].join(';')

  useActiveEditorDecorations(MultilPreviewDecoration, () =>
    store.formulas.value.filter(({ code }) => !code.range.isSingleLine)
      .map(({ code, preview }) => {
        const start = code.range.start.line
        const end = code.range.end.line
        const mid = (start + end) >> 1
        const decorations = new Array<DecorationOptions>()
        for (let i = start; i <= end; ++i) {
          const position = new Position(i, 0)
          decorations.push({
            range: new Range(
              position, position.translate(0, Number.MAX_SAFE_INTEGER)
            ),
            renderOptions: preview.inline ? {
              before: {
                contentIconPath: '',
                width: `${preview.width}ex`,
                margin: `0 .25rem 0 0;${config.extension.preview}`
              }
            } : undefined,
          })
        }
        const position = new Position(mid, 0)
        decorations[mid - start] = {
          range: new Range(
            position, position.translate(0, Number.MAX_SAFE_INTEGER)
          ),
          renderOptions: preview.inline ? {
            before: {
              contentIconPath: Uri.parse(preview.url),
              width: `${preview.width}ex`,
              border: `none;${injection}`,
              margin: `0 .25rem 0 0;${config.extension.preview}`
            }
          } : undefined,
        }
        return decorations
      }).flat()
  )
  useActiveEditorDecorations(InlinePreviewDecoration, () =>
    store.formulas.value.filter(({ code }) => code.range.isSingleLine)
      .map(({ code, preview }) => {
        return {
          range: code.range,
          renderOptions: preview.inline ? {
            after: {
              contentIconPath: Uri.parse(preview.url),
              border: `none;${injection}`,
              margin: `0 0 0 .25rem;${config.extension.preview}`
            }
          } : undefined,
        }
      })
  )
  useActiveEditorDecorations(ShowCodeDecoration, () =>
    store.formulas.value
      .map(({ code, preview }) => {
        return {
          range: code.range,
          hoverMessage: preview.error ? store.message : `![](${preview.url})`
        }
      })
  )
  useActiveEditorDecorations(HideCodeDecoration, () =>
    store.formulas.value
      .filter(({ code, preview }) =>
        preview.inline && selections.value.every(
        (selection) => !selection.intersection(code.range)
      )).map(({ code }) => ({ range: code.range }))
  )

  const reg = computed(() => {
    const special = ['.', '^', '$', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\']
    const symbol = config.extension.symbol.split('').map((char) =>
      special.includes(char) ? `\\${char}` : char).join('')
    return new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g')
  })

  const update = async () => {
    if (!editor.value) return
    if (!enabled(editor.value)) return
    const codes: FormulaCode[] = []
    const { document } = editor.value
    let match
    reg.value.lastIndex = 0
    while ((match = reg.value.exec(text.value!))) {
      const tex = `${match[1].slice(2, -2)}`
      if (!tex) continue
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      const range = new Range(startPos, endPos)
      codes.push({ range, tex })
    }
    store.formulas.value = (await Promise.all(codes.map(
      async (code) => transformer.from(code.tex, store.color.value)
          .then((preview) => ({ code, preview }))
    ))).filter(Boolean)
  }

  let timeout: Parameters<typeof clearTimeout>[0] = undefined
  const trigger = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    timeout = setTimeout(update, config.extension.interval)
  }

  window.onDidChangeActiveTextEditor(() => {
    // If don't clear the decorations when switching files, two problems will occur:
    // 1. Decorations are still visible after switching to a language that does not trigger the extension
    // 2. Decorations will still exist for `interval` milliseconds after switching files
    store.formulas.value = []
    trigger()
  }, null, context.subscriptions)

  void ([
    window.onDidChangeActiveColorTheme,
    workspace.onDidChangeTextDocument,
    workspace.onDidChangeConfiguration
  ].forEach((callback) => 
    callback(trigger, null,
    context.subscriptions)
  ))
}