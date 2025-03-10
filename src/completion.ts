import type { CompletionItemProvider, ExtensionContext, TextDocument } from 'vscode'
import {
  CompletionItem,
  CompletionItemKind,
  languages,
  Position,
  Range,
  SnippetString,
} from 'vscode'
import { config, store } from './config'
import {
  CHARACTERS,
  COMMANDS,
  DELIMITERS,
  ENVIRONMENTS,
} from './store/mathjax'

export function useCompletion(context: ExtensionContext) {
  const symbol = '$'
  const frame: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position) {
      if (!config.extension.completion)
        return

      const line = document.getText(new Range(
        new Position(position.line, 0),
        new Position(position.line, position.character),
      ))
      if (!line.endsWith(symbol))
        return

      const inline = new CompletionItem(
        `${symbol}${symbol}.inline.${symbol}${symbol}`,
        CompletionItemKind.Snippet,
      )
      inline.insertText = new SnippetString(
        `${line.endsWith(`${symbol}${symbol}`) ? '' : symbol} $1 ${symbol}${symbol}`,
      )
      inline.documentation = 'Insert an inline formula'

      const block = new CompletionItem(
        `${symbol}${symbol}.block.${symbol}${symbol}`,
        CompletionItemKind.Snippet,
      )
      block.insertText = new SnippetString(
        `${line.endsWith(`${symbol}${symbol}`) ? '' : symbol}\n$1\n${symbol}${symbol}`,
      )
      block.documentation = 'Insert a block formula'

      return [inline, block]
    },
    resolveCompletionItem(item: CompletionItem) {
      return item
    },
  }

  const flag = '\\'
  const unit: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position) {
      if (!config.extension.completion)
        return

      const line = document.getText(new Range(
        new Position(position.line, 0),
        new Position(position.line, position.character),
      ))
      if (!line.endsWith(`${flag}`))
        return
      if (line.endsWith(`${flag}${flag}`))
        return
      if (!store.formulas.value.find(
        ({ code }) => code.range.contains(position),
      )) {
        return
      }

      return [
        ...Array.from(new Set(CHARACTERS)).map(
          func => Object.assign(new CompletionItem(
            flag + func,
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func}`),
          }),
        ),
        ...Array.from(new Set(COMMANDS)).map(
          func => Object.assign(new CompletionItem(
            flag + func.name + (func.format ?? ''),
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func.name}${func.snippet ?? ''}`),
          }),
        ),
        ...Array.from(new Set(DELIMITERS)).map(
          func => Object.assign(new CompletionItem(
            flag + func,
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func}`),
          }),
        ),
        Object.assign(new CompletionItem(
          `${flag}begin`,
          CompletionItemKind.Module,
        ), {
          insertText: new SnippetString(
            `begin{\${1|${ENVIRONMENTS.join(',')}|}}\n\t$2\n\\end{$1}`,
          ),
        }),
      ]
    },
    resolveCompletionItem(item: CompletionItem) {
      return item
    },
  }

  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      config.extension.languages,
      frame,
      symbol,
    ),
    languages.registerCompletionItemProvider(
      config.extension.languages,
      unit,
      flag,
    ),
  )
}
