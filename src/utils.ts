import { sync as glob } from 'fast-glob'
import { isAbsolute, join } from 'pathe'
import { workspace } from 'vscode'

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export function resolve(path: string) {
  if (isAbsolute(path))
    return glob(path)
  const folders = workspace.workspaceFolders
  if (!folders || !folders.length)
    return []
  return glob(join(
    // TODO: support multiple workspace
    folders[0].uri.fsPath,
    path,
  ))
}

export function resolves(paths: string[]) {
  return Array.from(new Set(paths))
    .map(p => resolve(p))
    .flat()
}
