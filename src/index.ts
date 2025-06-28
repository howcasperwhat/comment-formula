import type { ExtensionContext } from 'vscode'
import { defineExtension } from 'reactive-vscode'
import { useAnnotation } from './annotation'
import { useCompletion } from './completion'
import * as exposed from './store/exposed'

const { activate, deactivate } = defineExtension(
  (context: ExtensionContext) => {
    useAnnotation(context)
    useCompletion(context)
    return exposed
  },
)
export { activate, deactivate }
