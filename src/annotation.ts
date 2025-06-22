import type { DecorationOptions, DecorationRenderOptions, ExtensionContext } from 'vscode'
import type { FormulaPreview } from './transformer'
import type { RelativePosition } from './types'
import { computed, useEditorDecorations, watch } from 'reactive-vscode'
import { Position, Range, Uri, window, workspace } from 'vscode'
import { config } from './config'
import { getMessage } from './message'
import { setupWatcher } from './preload'
import { activated, color, doc, editor, formulas, lineHeight, preloads, selections, text } from './store/shared'
import { transformer } from './transformer'
import { debounce } from './utils'

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
  const MockHeightOptions: DecorationRenderOptions = {
    textDecoration: `none; vertical-align:top;;`,
  }
  const AutoTabOptions: DecorationRenderOptions = {
    textDecoration: `none; vertical-align:top;`,
  }

  function useActiveEditorDecorations(
    decorationTypeOrOptions: Parameters<typeof useEditorDecorations>[1],
    rangesOrOptions: Parameters<typeof useEditorDecorations>[2],
  ) {
    useEditorDecorations(
      editor,
      decorationTypeOrOptions,
      rangesOrOptions,
      { updateOn: ['effect'] },
    )
  }

  const INJECTION = [
    'position:relative',
    'display:inline-block',
    'top:50%',
    'transform:translateY(-50%)',
    'vertical-align:top',
    'line-height:0',
  ].join(';')

  const decorate = (
    position: Range | Position,
    relative: RelativePosition,
    inline: boolean,
    injection: string = '',
    contentIconPath: Uri | '' = '',
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
            border: `none;${injection};`,
          },
        }
      : undefined,
  })

  const needHiding = (
    range: Range,
  ): boolean => {
    if (range.isSingleLine && config.extension.single === 'none')
      return false
    if (!range.isSingleLine && config.extension.multiple === 'none')
      return false
    if (config.extension.hidden === 'scope') {
      return selections.value.every(
        selection => !selection.intersection(range),
      )
    }
    else if (config.extension.hidden === 'line') {
      return !new Set(Array.from({
        length: range.end.line - range.start.line + 1,
      }, (_, i) => i + range.start.line)).intersection(
        new Set(Array.from({
          length: selections.value[0].end.line - selections.value[0].start.line + 1,
        }, (_, i) => i + selections.value[0].start.line)),
      ).size
    }
    return false
  }

  const longestLine = (
    code: FormulaCode,
    preview: FormulaPreview,
  ) => {
    const codeStartLine = code.range.start.line
    const codeEndLine = code.range.end.line
    const midLine = (codeStartLine + codeEndLine) >> 1
    if (!doc.value)
      return midLine
    const midChars = doc.value.lineAt(midLine).text.length
    const previewHalfLines = Math.ceil((
      preview.height * 0.5
      + +!((codeStartLine + codeEndLine) % 2)
      * lineHeight.value * 0.5
    ) / lineHeight.value)
    const previewStartLine = Math.max(codeStartLine, midLine - (previewHalfLines - 1))
    const previewEndLine = Math.min(codeEndLine, midLine + (previewHalfLines - 1))
    let [_maxChars, _maxLine] = [midChars, midLine]
    for (let line = previewStartLine; line <= previewEndLine; ++line) {
      const chars = doc.value.lineAt(line).text.length
      if (chars > _maxChars)
        [_maxChars, _maxLine] = [chars, line]
    }
    return _maxLine
  }

  const getLeadingWhitespaceWidth = (
    line: number,
  ) => {
    if (!editor.value)
      return 0
    const content = doc.value!.lineAt(line).text.match(/^\s+/)?.at(0) ?? ''
    const tabSize = Number.parseInt(`${editor.value.options.tabSize}`) || 0
    const spaceSize = 1
    const tabCount = content.match(/\t/g)?.length ?? 0
    const spaceCount = content.match(/ /g)?.length ?? 0
    return (tabCount * tabSize) + (spaceCount * spaceSize)
  }

  useActiveEditorDecorations(AutoTabOptions, () =>
    (!config.extension.hidden || !config.extension.autotab)
      ? []
      : formulas.value
          .filter(({ code, preview }) =>
            preview.inline
            && !code.range.isSingleLine
            && needHiding(code.range),
          )
          .map(({ code, preview }) => {
            const start = code.range.start.line
            const end = code.range.end.line
            return Array.from({ length: end - start }).map((_, i) =>
              decorate(
                new Position(start + i + 1, 0),
                'before',
                preview.inline,
                `width:${getLeadingWhitespaceWidth(start)}ch;${INJECTION};`,
              ),
            )
          })
          .flat())
  useActiveEditorDecorations(MultiplePreviewOptions, () =>
    config.extension.multiple === 'none'
      ? []
      : formulas.value.filter(({ code }) => !code.range.isSingleLine)
          .map(({ code, preview }) => {
            const start = code.range.start.line
            const end = code.range.end.line

            const hide = needHiding(code.range)
            const before = config.extension.multiple === 'before'

            const line = (!before && !hide) ? longestLine(code, preview) : end
            const col = (before && !hide) ? getLeadingWhitespaceWidth(start) : 0
            const pos = (!before && hide) ? code.range : new Position(line, col)
            const style = before ? 'position:absolute' : ''

            return decorate(
              pos,
              config.extension.multiple,
              preview.inline,
              `${config.extension.preview};${INJECTION};${style};top:${50 + ((start + end) / 2 - line) * 100}%`,
              Uri.parse(preview.url),
            )
          }))
  useActiveEditorDecorations(MockHeightOptions, () =>
    config.extension.multiple !== 'before'
      ? []
      : formulas.value.filter(({ code }) =>
          !code.range.isSingleLine
          && !needHiding(code.range),
        ).map(({ code, preview }) => {
          const start = code.range.start.line
          const end = code.range.end.line
          return Array.from({ length: end - start + 1 }, (_, i) =>
            decorate(
              new Position(start + i, getLeadingWhitespaceWidth(start)),
              config.extension.multiple,
              preview.inline,
              `width:${preview.width}px;${INJECTION};`,
            ))
        }).flat())
  useActiveEditorDecorations(SinglePreviewOptions, () =>
    config.extension.single === 'none'
      ? []
      : formulas.value.filter(({ code }) => code.range.isSingleLine)
          .map(({ code, preview }) => decorate(
            code.range,
            config.extension.single,
            preview.inline,
            `${config.extension.preview}${INJECTION}`,
            Uri.parse(preview.url),
          )))
  useActiveEditorDecorations(ShowCodeOptions, () =>
    formulas.value
      .map(({ code, preview }) => ({
        range: code.range,
        hoverMessage: getMessage(code, preview),
      })))
  useActiveEditorDecorations(HideCodeOptions, () =>
    !config.extension.hidden
      ? []
      : formulas.value
          .filter(({ code, preview }) =>
            preview.inline
            && needHiding(code.range),
          )
          .map(({ code }) => ({ range: code.range }),
          ))

  const reg = /\$\$([\s\S]*?)\$\$/g

  const update = async () => {
    if (!activated.value || !config.extension.annotation)
      return
    const codes: FormulaCode[] = []
    const document = doc.value!
    // Match Comment In Document
    let match
    reg.lastIndex = 0
    // eslint-disable-next-line no-cond-assign
    while ((match = reg.exec(text.value!))) {
      const tex = match[1]
      if (!tex)
        continue
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      const range = new Range(startPos, endPos)
      codes.push({ range, tex })
    }
    formulas.value = (await Promise.all(codes.map(
      async code => transformer.from(code.tex, color.value)
        .then(preview => ({ code, preview })),
    ))).filter(Boolean)
  }
  const trigger = debounce(update, config.extension.interval)

  watch(preloads, (content) => {
    transformer.reset(content.join('\n'))
    trigger()
  })
  // Transformer haven't been init after constructed (before `reset` is called).
  // However, `setupWatcher` will setup `useFsWatcher` and `preload` watcher (immediate),
  // so `transformer` will be `reset` before `trigger` immediately by above `WatchCallback`.
  setupWatcher()

  window.onDidChangeActiveTextEditor(() => {
    // If don't clear the decorations when switching files, two problems will occur:
    // 1. Decorations are still visible after switching to a language that does not trigger the extension
    // 2. Decorations will still exist for `interval` milliseconds after switching files
    formulas.value = []
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
