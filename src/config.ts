import type { FileSystemWatcher, TextEditor } from 'vscode'
import type { Formula } from './types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {
  computed,
  defineConfigObject,
  shallowRef,
  useIsDarkTheme,
  watchEffect,
} from 'reactive-vscode'
import { window, workspace } from 'vscode'
import * as Meta from './generated/meta'

// @see: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/config/fontInfo.ts#L14
const GLODEB_LINE_HEIGHT_RATIO = process.platform === 'darwin' ? 1.5 : 1.35
// use devtools to get the value of 1ex
const MATHJAX_TEX_EX = 8.64
const BASE_HEIGHT = 24

const isDark = useIsDarkTheme()

export const config = {
  extension: defineConfigObject<Meta.NestedScopedConfigs>(
    Meta.scopedConfigs.scope,
    Meta.scopedConfigs.defaults,
  ),
  editor: defineConfigObject<{ fontSize: number }>(
    'editor',
    { fontSize: 14 },
  ),
}
export const store = {
  isDark: useIsDarkTheme(),
  height: computed(() => {
    return Math.round(config.editor.fontSize * GLODEB_LINE_HEIGHT_RATIO)
  }),
  color: computed(() => {
    const color = config.extension.color
    if (color === 'auto')
      return isDark.value ? '#eee' : '#111'
    return color
  }),
  scale: computed(() => {
    return config.extension.scale * Math.round(
      config.editor.fontSize * GLODEB_LINE_HEIGHT_RATIO,
    ) / BASE_HEIGHT
  }),
  formulas: shallowRef<Formula[]>([]),
  message: '**WRONG FORMULA FORMAT**',
  preload: shallowRef(''),
  preloadFileWatcher: null as FileSystemWatcher | null,
}

export function resolvePreloadPath(preloadPath: string): string | null {
  if (!preloadPath) {
    return null
  }

  if (path.isAbsolute(preloadPath)) {
    return preloadPath
  }

  if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
    return path.join(workspace.workspaceFolders[0].uri.fsPath, preloadPath)
  }

  return null
}

export async function loadPreload() {
  const preloadPath = config.extension.preload
  if (!preloadPath) {
    store.preload.value = ''
    return
  }

  try {
    const filePath = resolvePreloadPath(preloadPath)

    if (filePath && fs.existsSync(filePath)) {
      const content = await fs.promises.readFile(filePath, 'utf-8')
      store.preload.value = content
    }
    else {
      store.preload.value = ''
      window.showWarningMessage(`Preload file not found: ${preloadPath}`)
    }
  }
  catch (error) {
    store.preload.value = ''
    window.showErrorMessage(`Error loading preload file: ${error}`)
  }
}

export function setupPreloadFileWatcher() {
  if (store.preloadFileWatcher) {
    store.preloadFileWatcher.dispose()
    store.preloadFileWatcher = null
  }

  const preloadPath = config.extension.preload
  if (!preloadPath) {
    return
  }

  const filePath = resolvePreloadPath(preloadPath)
  if (!filePath) {
    return
  }

  try {
    const filePattern = filePath.replace(/\\/g, '/')
    store.preloadFileWatcher = workspace.createFileSystemWatcher(filePattern)

    store.preloadFileWatcher.onDidChange(() => {
      loadPreload()
    })

    store.preloadFileWatcher.onDidCreate(() => {
      loadPreload()
    })

    store.preloadFileWatcher.onDidDelete(() => {
      store.preload.value = ''
    })
  }
  catch (error) {
    window.showErrorMessage(`Error setting up preload file watcher: ${error}`)
  }
}

watchEffect(() => {
  const preloadPath = config.extension.preload
  if (preloadPath) {
    loadPreload()
    setupPreloadFileWatcher()
  }
  else {
    store.preload.value = ''
    if (store.preloadFileWatcher) {
      store.preloadFileWatcher.dispose()
      store.preloadFileWatcher = null
    }
  }
})

export function isLarge(height: number) {
  if (config.extension.inline === 'all')
    return false
  if (config.extension.inline === 'none')
    return true
  return (height >= store.height.value)
}
export function enabled(editor?: TextEditor) {
  if (!editor || !editor.document || !editor.document.languageId)
    return false
  return config.extension.languages.includes(editor.document.languageId)
}
export function exToPx(ex: number) {
  return ex * MATHJAX_TEX_EX
}
