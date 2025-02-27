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
import { ENVS, FUNC0, FUNC1, FUNC2, SPECIAL } from './store/latex'

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

      const item = new CompletionItem(
        `${symbol}${symbol}.|.${symbol}${symbol}`,
        CompletionItemKind.Snippet,
      )
      item.insertText = new SnippetString(
        `${line.endsWith(`${symbol}${symbol}`) ? '' : symbol} $1 ${symbol}${symbol}`,
      )
      item.documentation = `Insert an inline formula`

      return [item]
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
      if (!line.endsWith(flag))
        return
      if (!store.formulas.value.find(
        ({ code }) => code.range.contains(position),
      )) {
        return
      }

      return [
        ...Array.from(new Set(Object.values(FUNC0).flat())).map(
          (func: string) => Object.assign(new CompletionItem(
            flag + func,
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func}`),
          }),
        ),
        ...Array.from(new Set(Object.values(FUNC1).flat())).map(
          (func: string) => Object.assign(new CompletionItem(
            `${flag + func}{}`,
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func}{$1}`),
          }),
        ),
        ...Array.from(new Set(Object.values(FUNC2).flat())).map(
          (func: string) => Object.assign(new CompletionItem(
            `${flag + func}{}{}`,
            CompletionItemKind.Function,
          ), {
            insertText: new SnippetString(`${func}{$1}{$2}`),
          }),
        ),
        Object.assign(new CompletionItem(
          `${flag}begin`,
          CompletionItemKind.Module,
        ), {
          insertText: new SnippetString(
            `begin{\${1|${ENVS.join(',')}|}}\n\t$2\n\\end{$1}`,
          ),
        }),
        ...SPECIAL.map(({ name, format, snippet }) => Object.assign(
          new CompletionItem(flag + name + format, CompletionItemKind.Function),
          { insertText: new SnippetString(name + snippet) },
        )),
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
