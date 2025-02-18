import type { ExtensionContext } from 'vscode'
import { Range, Uri, window, workspace } from 'vscode'
import {
  useActiveTextEditor, useTextEditorSelections,
  useDocumentText, useActiveEditorDecorations,
  computed
} from 'reactive-vscode'

import { transformer } from './transformer'
import { store, config, enabled } from './config'
import { DecorationMatch } from './types'

export function useAnnotation(context: ExtensionContext) {
  const InlineIconDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; vertical-align:top; ${config.extension.code}`,
  })
  const HideTextDecoration = window.createTextEditorDecorationType({
    textDecoration: 'none; vertical-align:top; display: none;',
  })

  const editor = useActiveTextEditor()
  const selections = useTextEditorSelections(editor)
  const text = useDocumentText(() => editor.value?.document)

  useActiveEditorDecorations(InlineIconDecoration, store.decorations)
  useActiveEditorDecorations(HideTextDecoration, () => store.decorations.value.filter(
    ({ range, inline }) => inline && !selections.value.map(({ start }) => start.line
      ).includes(range.start.line)).map(({ range }) => range))

  const reg = computed(() => {
    const special = ['.', '^', '$', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\']
    const symbol = config.extension.symbol.split('').map((char) =>
      special.includes(char) ? `\\${char}` : char).join('')
    return new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g')
  })
  const inject = ['position:relative', 'display:inline-block', 'top:50%',
    'transform:translateY(-50%)', 'vertical-align:top'].join(';')
  const message = '**WRONG FORMULA FORMAT**'

  const update = async () => {
    if (!editor.value) return
    if (!enabled(editor.value)) {
      store.decorations.value = []
      return
    }
    const contents: [Range, string, boolean][] = []
    const { document } = editor.value
    let match
    reg.value.lastIndex = 0
    while ((match = reg.value.exec(text.value!))) {
      const content = `${match[1].slice(2, -2)}`
      if (!content) continue
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      contents.push([new Range(startPos, endPos), content, /[\n\r]/.test(content)])
    }
    store.decorations.value = (await Promise.all(contents.map(
      async ([range, content, multiline]) =>
        transformer.svg2url(content, store.color.value)
          .then((attr) => {
            const inline = !attr.large && !multiline && !attr.error
            const item: DecorationMatch = {
              range, content, inline,
              renderOptions: inline ? {
                after: {
                  contentIconPath: Uri.parse(attr.url),
                  border: `none;${inject}`,
                  margin: `0 0 0 .25rem;${config.extension.preview}`
                }
              } : undefined,
              hoverMessage: attr.error ? message : `![](${attr.url})`,
            }
            return item
          })
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
    store.decorations.value = []
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