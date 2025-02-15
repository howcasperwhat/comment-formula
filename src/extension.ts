import type { DecorationOptions, ExtensionContext } from 'vscode'
import { Range, Uri, window, workspace } from 'vscode'
import {
  useActiveTextEditor, useTextEditorSelections,
  useDocumentText, useActiveEditorDecorations,
  computed, shallowRef, watchEffect,
  defineExtension
} from 'reactive-vscode'

import { transformer } from './transformer'
import { store, config, enabled } from './config'
interface DecorationMatch extends DecorationOptions {
  content: string,
  inline: boolean,
}

function useAnnotations(context: ExtensionContext) {
  const InlineIconDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; vertical-align:top; ${config.extension.code}`,
  })
  const HideTextDecoration = window.createTextEditorDecorationType({
    textDecoration: 'none; vertical-align:top; display: none;',
  })

  const editor = useActiveTextEditor()
  const selections = useTextEditorSelections(editor)
  const text = useDocumentText(() => editor.value?.document)

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(InlineIconDecoration, decorations)
  useActiveEditorDecorations(HideTextDecoration, () => decorations.value.filter(
    ({ range, inline }) => inline && !selections.value.map(({ start }) => start.line
      ).includes(range.start.line)).map(({ range }) => range))

  const reg = computed(() => {
    const symbol = config.extension.symbol
    return new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g')
  })
  const inject = ['position:relative', 'display:inline-block', 'top:50%',
    'transform:translateY(-50%)', 'vertical-align:top'].join(';')
  const message = '**WRONG FORMULA FORMAT**'

  const update = async () => {
    if (!enabled(editor.value)) return
    if (!editor.value) return
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
    decorations.value = (await Promise.all(contents.map(
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
    ))).filter(x => !!x)
  }

  let timeout: Parameters<typeof clearTimeout>[0] = undefined
  const trigger = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    timeout = setTimeout(update, config.extension.interval)
  }

  watchEffect(trigger)

  window.onDidChangeActiveTextEditor(() => {
    // If don't clear the decorations when switching files, two problems will occur:
    // 1. Decorations are still visible after switching to a language that does not trigger the extension
    // 2. Decorations will still exist for `interval` milliseconds after switching files
    decorations.value = []
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

const { activate, deactivate } = defineExtension(useAnnotations)
export { activate, deactivate }