import type { ExtensionContext } from 'vscode'
import { defineExtension } from 'reactive-vscode'
import { useAnnotation } from './annotation'
import { useCommands } from './command'
import { useCompletion } from './completion'

const { activate, deactivate } = defineExtension(
  (context: ExtensionContext) => {
    useCommands()
    useAnnotation(context)
    useCompletion(context)
  },
)
export { activate, deactivate }
