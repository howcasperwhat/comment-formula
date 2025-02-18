import type { TextEditor } from 'vscode'
import type { DecorationMatch } from './types'
import {
  computed, defineConfigObject, useIsDarkTheme,
  shallowRef, watch
} from 'reactive-vscode'
import { commands, window } from 'vscode'
import * as Meta from './generated/meta'

// @see: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/fontInfo.ts#L14
const GLODEB_LINE_HEIGHT_RATIO = process.platform === 'darwin' ? 1.5 : 1.35
// use devtools to get the value of 1ex
const MATHJAX_TEX_EX = 8.64
const isDark = useIsDarkTheme()

export const config = {
  extension: defineConfigObject<Meta.NestedScopedConfigs>(
    Meta.scopedConfigs.scope,
    Meta.scopedConfigs.defaults
  ),
  editor: defineConfigObject<{ fontSize: number }>(
    'editor',
    { fontSize: 14 }
  ), 
}
export const store = {
  isDark: useIsDarkTheme(),
  height: computed(() => {
    return Math.round(config.editor.fontSize * GLODEB_LINE_HEIGHT_RATIO)
  }),
  color: computed(() => {
    const color = config.extension.color
    if (color === "auto")
      return isDark.value ? '#eee' : '#111'
    return color
  }),
  decorations: shallowRef<DecorationMatch[]>([])
}

export const isLarge = (height: number) => {
  if (config.extension.inline === 'all')
    return false
  if (config.extension.inline === 'none')
    return true
  return (height * MATHJAX_TEX_EX >= store.height.value)
}
export const enabled = (editor: TextEditor) => {
  if (!editor.document) return false
  if (!editor.document.languageId) return false
  return config.extension.languages.includes(editor.document.languageId)
}

watch(
  () => config.extension.code,
  async () => {
    if (await window.showInformationMessage(
      'The code style has been updated, please reload the window to take effect',
      'Reload Window') === 'Reload Window'
    ) commands.executeCommand('workbench.action.reloadWindow')
  }
)