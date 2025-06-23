import { resolve as _resolve, isAbsolute, join } from 'pathe'
import { workspace } from 'vscode'
import { config } from './config'
import { MATHJAX_TEX_EX } from './store/constant'
import { lineHeight } from './store/shared'

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
    return _resolve(path)
  const folders = workspace.workspaceFolders
  return folders?.length
    ? folders.map(f => join(f.uri.fsPath, path))
    : []
}

export function resolves(path: string | string[]) {
  path = Array.isArray(path) ? path : [path]
  return Array.from(new Set(path)).map(p => resolve(p)).flat()
}

export function isLarge(height: number) {
  if (config.extension.inline === 'all')
    return false
  if (config.extension.inline === 'none')
    return true
  return (height >= lineHeight.value)
}

export function exToPx(ex: number) {
  return ex * MATHJAX_TEX_EX
}

export function mergerSorted<T, R>(
  lhs: T[],
  rhs: R[],
  compare: (a: T, b: R) => number,
): (T | R)[] {
  const result: (T | R)[] = []
  let [i, j] = [0, 0]

  while (i < lhs.length && j < rhs.length) {
    result.push(
      compare(lhs[i], rhs[j]) <= 0
        ? lhs[i++]
        : rhs[j++],
    )
  }
  while (i < lhs.length) {
    result.push(lhs[i++])
  }
  while (j < rhs.length) {
    result.push(rhs[j++])
  }

  return result
}
