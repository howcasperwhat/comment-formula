import type { DecorationOptions, ExtensionContext } from 'vscode'
import { Range, Uri, window, workspace } from 'vscode'
import {
  useActiveTextEditor, useTextEditorSelections,
  useDocumentText, shallowRef, watchEffect,
  useActiveEditorDecorations, defineExtension,
  computed
} from 'reactive-vscode'

import { transformer } from './transformer'
import { store, config, enabled } from './config'
interface DecorationMatch extends DecorationOptions {
  content: string,
  large: boolean,
}

function useAnnotations(context: ExtensionContext) {
  // `none; `: a hack to inject custom style
  const InlineIconDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; ${config.extension.code}`,
  })
  const HideTextDecoration = window.createTextEditorDecorationType({
    textDecoration: 'none; display: none;',
  })

  const editor = useActiveTextEditor()
  const selections = useTextEditorSelections(editor)
  const text = useDocumentText(() => editor.value?.document)

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(InlineIconDecoration, decorations)
  useActiveEditorDecorations(HideTextDecoration, () => decorations.value.filter(
    ({ range, large }) => !large && !selections.value.map(({ start }) => start.line
      ).includes(range.start.line)).map(({ range }) => range))

  const reg = computed(() => {
    const symbol = config.extension.symbol
    return new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g')
  })

  const update = async () => {
    if (!enabled(editor.value)) return
    if (!editor.value) return
    const keys: [Range, string, boolean][] = []
    const { document } = editor.value
    let match
    reg.value.lastIndex = 0
    while ((match = reg.value.exec(text.value!))) {
      const key = `${match[1].slice(2, -2)}`
      if (!key) continue
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      keys.push([new Range(startPos, endPos), key, /[\n\r]/.test(key)])
    }
    decorations.value = (await Promise.all(keys.map(async ([range, key, multiline]) => {
      return transformer.svg2url(key, store.color.value).then((attr) => {
        const large = attr.large || multiline
        const item: DecorationMatch = {
          range, content: key, large: large,
          renderOptions: large ? undefined : {
            after: {
              contentIconPath: Uri.parse(attr.url),
              // a hack to inject custom style
              border: 'none; position: absolute; top: 50%; transform: translateY(-50%);',
              margin: `0 0 0 .25rem;${config.extension.preview}`
            }
          },
          hoverMessage: `![](${attr.url})`,
        }
        return item
      })
    }))).filter(Boolean)
  }

  let timeout: NodeJS.Timeout | number | undefined = undefined
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
    window.onDidChangeTextEditorSelection,
    window.onDidChangeActiveColorTheme,
    workspace.onDidChangeTextDocument,
    workspace.onDidChangeConfiguration
  ].forEach((callback) => {
    callback(() => {
      trigger()
    }, null,
    context.subscriptions)
  }))
}

const { activate, deactivate } = defineExtension((context) => useAnnotations(context))
export { activate, deactivate }