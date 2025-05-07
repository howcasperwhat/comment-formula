import { sync as glob } from 'fast-glob'
import { useFsWatcher, watch } from 'reactive-vscode'
import { Uri, workspace } from 'vscode'
import { config, store } from './config'
import { resolves } from './utils'

async function preload() {
  store.preload.value = await Promise.all(
    glob(resolves(config.extension.preload)).map(async p =>
      (await workspace.fs.readFile(Uri.file(p))).toString(),
    ),
  )
}

export async function setupWatcher() {
  const watcher = useFsWatcher(() =>
    glob(resolves(config.extension.preload))
      .map(p => Uri.file(p).fsPath),
  )
  watcher.onDidChange(preload)
  watcher.onDidCreate(preload)
  watcher.onDidDelete(preload)
  watch(() => config.extension.preload, preload, { immediate: true })
}
