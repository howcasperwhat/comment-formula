import type { AdvancedRegExpOptions, BasicRegExpOptions, LiteRange, Marker, MarkerOptions, RegExpOptions } from './types'
import { resolve as _resolve, isAbsolute, join } from 'pathe'
import { workspace } from 'vscode'
import { CHARACTERS_NEED_ESCAPING, MATHJAX_TEX_EX } from './store/constant'
import { config, lineHeight } from './store/shared'

export function isTruthy<T>(value: T | false | null | undefined): value is T {
  return Boolean(value)
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

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

// Make sure `range.start >= last.end`
export function mergeRange(ranges: LiteRange[], range: LiteRange) {
  if (ranges.length === 0) {
    ranges.push(range)
  }
  const last = ranges.at(-1)!
  if (last.end === range.start) {
    last.end = range.end
  }
  else {
    ranges.push(range)
  }
}

// Make sure ranges is sorted and non-overlapping
export function mergeRanges(
  lhs: LiteRange[],
  rhs: LiteRange[],
): LiteRange[] {
  const result: LiteRange[] = []
  let [i, j] = [0, 0]

  while (i < lhs.length && j < rhs.length) {
    mergeRange(
      result,
      lhs[i].start <= rhs[j].start
        ? lhs[i++]
        : rhs[j++],
    )
  }
  while (i < lhs.length) {
    mergeRange(result, lhs[i++])
  }
  while (j < rhs.length) {
    mergeRange(result, rhs[j++])
  }

  return result
}

export function duplicate<T>(arr: T[]): T[] {
  const seen = new Set<string>()
  const result: T[] = []
  for (const item of arr) {
    const key = JSON.stringify(item)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}

export function escapeRegExpKeywords(str: string) {
  const ans: string[] = []
  for (const char of str) {
    CHARACTERS_NEED_ESCAPING.has(char)
      ? ans.push(`\\${char}`)
      : ans.push(char)
  }
  return ans.join('')
}

const processers = {
  str: escapeRegExpKeywords,
  reg: (str: string) => str,
}

export function normMarkerOptions(
  marker: Marker,
): Required<MarkerOptions> {
  marker = isString(marker)
    ? { type: 'str', value: marker }
    : marker
  return {
    type: marker.type,
    value: marker.value,
    include: marker.include ?? false,
  }
}

export function normBasicRegExpOption(
  options: BasicRegExpOptions,
) {
  const [prefix, suffix] = [
    'marker' in options ? options.marker : options.prefix,
    'marker' in options ? options.marker : options.suffix,
  ].map(normMarkerOptions)
  return {
    prefix: {
      value: processers[prefix.type](prefix.value),
      include: prefix.include,
    },
    suffix: {
      value: processers[suffix.type](suffix.value),
      include: suffix.include,
    },
    strict: options.strict ?? true,
    breakable: options.breakable ?? true,
    sanitize: options.sanitize ?? [],
  }
}

export function normRegExpOption(
  options: RegExpOptions,
): Required<AdvancedRegExpOptions> {
  if ('pattern' in options) {
    return {
      pattern: options.pattern,
      flags: options.flags ?? '',
      group: options.group ?? 0,
      sanitize: options.sanitize ?? [],
    }
  }
  const minute = normBasicRegExpOption(options)
  const [pi, si] = [minute.prefix.include, minute.suffix.include]
  return {
    pattern: [
      pi ? '(' : '',
      minute.prefix.value,
      pi ? '' : '(',
      '.+?',
      si ? '' : ')',
      minute.suffix.value,
      si ? ')' : '',
    ].join(''),
    flags: minute.breakable ? 'gs' : 'g',
    group: 1,
    sanitize: minute.sanitize,
  }
}
