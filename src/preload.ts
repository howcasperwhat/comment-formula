import { sync as glob } from 'fast-glob'
import { isAbsolute, join } from 'pathe'
import {
  useFsWatcher,
  watch,
} from 'reactive-vscode'
import { Uri, workspace } from 'vscode'
import { config, store } from './config'

function _resolve(path: string): Uri[] {
  const folders = workspace.workspaceFolders
  if (isAbsolute(path))
    return glob(path).map(p => Uri.file(p))
  if (!folders || !folders.length)
    return []
  return glob(join(
    // TODO: support multiple workspace
    folders[0].uri.fsPath,
    path,
  )).map(p => Uri.file(p))
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
  const watcher = useFsWatcher(() => resolve().map(uri => uri.fsPath))
  watcher.onDidChange(preload)
  watcher.onDidCreate(preload)
  watcher.onDidDelete(preload)
  watch(() => config.extension.preload, preload, { immediate: true })
}
