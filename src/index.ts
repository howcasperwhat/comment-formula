import type { ExtensionContext } from 'vscode'
import { defineExtension } from 'reactive-vscode'
import { useAnnotation } from './annotation'
import { useCompletion } from './completion'
import { useHighlight } from './highlight'

const { activate, deactivate } = defineExtension(
  (context: ExtensionContext) => {
    useAnnotation(context)
    useCompletion(context)
    useHighlight(context)
  },
)
export { activate, deactivate }
