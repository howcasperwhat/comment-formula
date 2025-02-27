import type { DecorationOptions, DecorationRenderOptions, ExtensionContext } from 'vscode'
import type { FormulaPreview } from './transformer'
import type { RelativePosition } from './types'
import {
  computed,
  useActiveEditorDecorations,
  useActiveTextEditor,
  useDocumentText,
  useTextEditorSelections,
} from 'reactive-vscode'
import { Position, Range, Uri, window, workspace } from 'vscode'
import { config, enabled, store } from './config'
import { transformer } from './transformer'

export interface FormulaCode {
  range: Range
  tex: string
}

export function useAnnotation(context: ExtensionContext) {
  const SinglePreviewOptions: DecorationRenderOptions = {
    textDecoration: `none; vertical-align:top;`,
  }
  const MultiplePreviewOptions: DecorationRenderOptions = {
    textDecoration: `none; vertical-align:top;`,
  }
  const ShowCodeOptions = computed<DecorationRenderOptions>(() => ({
    textDecoration: `none; vertical-align:top; ${config.extension.code}`,
  }))
  const HideCodeOptions: DecorationRenderOptions = {
    textDecoration: 'none; vertical-align:top; display: none;',
  }

  const editor = useActiveTextEditor()
  const selections = useTextEditorSelections(editor)
  const text = useDocumentText(() => editor.value?.document)

  const INJECTION = [
    'position:relative',
    'display:inline-block',
    'top:50%',
    'transform:translateY(-50%)',
    'vertical-align:top',
  ].join(';')

  const decorate = (
    position: Range | Position,
    relative: RelativePosition,
    inline: boolean,
    injection: string = '',
    contentIconPath: Uri | '' = '',
    margin: string = '.25rem',
  ): DecorationOptions => ({
    range: position instanceof Range
      ? position
      : new Range(
        position,
        position.translate(0, Number.MAX_SAFE_INTEGER),
      ),
    renderOptions: inline
      ? {
          [relative]: {
            contentIconPath,
            border: `none;${injection};${config.extension.preview};`,
            margin: relative === 'before'
              ? `0 ${margin} 0 0`
              : `0 0 0 ${margin}`,
          },
        }
      : undefined,
  })

  const maxLine = (
    code: FormulaCode,
    preview: FormulaPreview,
  ) => {
    const codeStartLine = code.range.start.line
    const codeEndLine = code.range.end.line
    const midLine = (codeStartLine + codeEndLine) >> 1
    if (!editor.value)
      return midLine
    const midChars = editor.value.document.lineAt(midLine).text.length
    const previewHalfLines = Math.ceil((
      preview.height * 0.5
      + +!((codeStartLine + codeEndLine) % 2)
      * store.height.value * 0.5
    ) / store.height.value)
    const previewStartLine = Math.max(codeStartLine, midLine - (previewHalfLines - 1))
    const previewEndLine = Math.min(codeEndLine, midLine + (previewHalfLines - 1))
    let [_maxChars, _maxLine] = [midChars, midLine]
    for (let line = previewStartLine; line <= previewEndLine; ++line) {
      const chars = editor.value.document.lineAt(line).text.length
      if (chars > _maxChars)
        [_maxChars, _maxLine] = [chars, line]
    }
    return _maxLine
  }

  useActiveEditorDecorations(MultiplePreviewOptions, () =>
    config.extension.multiple === 'none'
      ? []
      : store.formulas.value.filter(({ code }) => !code.range.isSingleLine)
          .map(({ code, preview }) => {
            const start = code.range.start.line
            const end = code.range.end.line
            const line = config.extension.multiple === 'before'
              ? end
              : maxLine(code, preview)
            return [decorate(
              new Position(line, 0),
              config.extension.multiple,
              preview.inline,
              `width:${preview.width}px;${INJECTION};top:${
                50 + ((start + end) / 2 - line) * 100
              }%`,
              Uri.parse(preview.url),
            )].concat(config.extension.multiple === 'after'
              ? []
              : Array.from({ length: end - start }, (_, i) =>
                  decorate(
                    new Position(start + i, 0),
                    config.extension.multiple,
                    preview.inline,
                    `width:${preview.width}px;${INJECTION}`,
                  )),
            )
          })
          .flat())
  useActiveEditorDecorations(SinglePreviewOptions, () =>
    config.extension.single === 'none'
      ? []
      : store.formulas.value.filter(({ code }) => code.range.isSingleLine)
          .map(({ code, preview }) => decorate(
            code.range,
            config.extension.single,
            preview.inline,
            INJECTION,
            Uri.parse(preview.url),
          )))
  useActiveEditorDecorations(ShowCodeOptions, () =>
    store.formulas.value
      .map(({ code, preview }) => ({
        range: code.range,
        hoverMessage: preview.error
          ? store.message
          : `![](${preview.url})`,
      })))
  useActiveEditorDecorations(HideCodeOptions, () =>
    !config.extension.hidden
      ? []
      : store.formulas.value
          .filter(({ code, preview }) =>
            preview.inline && selections.value.every(
              selection => !selection.intersection(code.range),
            ))
          .map(({ code }) => ({ range: code.range }),
          ))

  const reg = computed(() => {
    const special = ['.', '^', '$', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\']
    const symbol = config.extension.symbol.split('').map(char =>
      special.includes(char) ? `\\${char}` : char).join('')
    return new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g')
  })

  const update = async () => {
    if (!editor.value)
      return
    if (!enabled(editor.value))
      return
    const codes: FormulaCode[] = []
    const { document } = editor.value
    let match
    reg.value.lastIndex = 0
    // eslint-disable-next-line no-cond-assign
    while ((match = reg.value.exec(text.value!))) {
      const tex = `${match[1].slice(2, -2)}`
      if (!tex)
        continue
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      const range = new Range(startPos, endPos)
      codes.push({ range, tex })
    }
    store.formulas.value = (await Promise.all(codes.map(
      async code => transformer.from(code.tex, store.color.value)
        .then(preview => ({ code, preview })),
    ))).filter(Boolean)
  }

  let timeout: Parameters<typeof clearTimeout>[0]
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
    workspace.onDidChangeConfiguration,
  ].forEach(callback =>
    callback(trigger, null, context.subscriptions),
  ))
}
