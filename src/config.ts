import type { TextEditor } from 'vscode'
import type { Formula } from './types'
import { isAbsolute } from 'node:path'
import process from 'node:process'
import { sync as glob, convertPathToPattern as norm } from 'fast-glob'
import {
  computed,
  defineConfigObject,
  shallowRef,
  useFsWatcher,
  useIsDarkTheme,
  watch,
} from 'reactive-vscode'
import { Uri, workspace } from 'vscode'
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
  preload: shallowRef<string[]>([]),
}

function _resolve(path: string): Uri[] {
  const folders = workspace.workspaceFolders
  if (isAbsolute(path))
    return glob(norm(path)).map(p => Uri.file(p))
  if (!folders || !folders.length)
    return []
  return glob(norm(Uri.joinPath(
    // TODO: support multiple workspace
    folders[0].uri,
    path,
  ).fsPath)).map(p => Uri.file(p))
}

function resolve() {
  return Array.from(new Set(
    config.extension.preload,
  )).map(p => _resolve(p)).flat()
}

async function preload() {
  store.preload.value = await Promise.all(
    resolve().map(async uri =>
      (await workspace.fs.readFile(uri)).toString(),
    ),
  )
}

export async function setupWatcher() {
  const watcher = useFsWatcher(() =>
    resolve().map(uri => uri.fsPath),
  )
  watcher.onDidChange(preload)
  watcher.onDidCreate(preload)
  watcher.onDidDelete(preload)
  watch(() => config.extension.preload, preload, { immediate: true })
}

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
