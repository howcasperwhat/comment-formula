
import {
  useIsDarkTheme,
  computed,
  shallowRef,
  useActiveTextEditor,
  useTextEditorSelections,
  useDocumentText
} from "reactive-vscode"
import { config } from '../config'
import { GLODEB_LINE_HEIGHT_RATIO, BASE_HEIGHT } from './constant'
import type { Formula, RegExpOptions } from '../types'
import { matchesGlob as isMatch } from "pathe"
import { resolves } from '../utils'

export const isDark = useIsDarkTheme()
export const editor = useActiveTextEditor()
export const doc = computed(() => editor.value?.document)
export const selections = useTextEditorSelections(editor)
export const text = useDocumentText(doc)

export const languages = computed(() => {
  if (!doc.value)
    return []
  const { fileName: fname, languageId: lang } = doc.value
  const defines = config.extension.defines

  return [
    ...Object.keys(defines).filter(lang =>
      isMatch(fname, resolves(defines[lang])),
    ),
    lang,
  ]
})

export const activated = computed(() => {
    if (!doc.value)
      return false

    const langs = config.extension.languages
  
    const enabled = new Set(langs)
    const current = new Set(languages.value)
  
    return enabled.intersection(current).size > 0
})

export const lineHeight = computed(() => {
  return Math.round(config.editor.fontSize * GLODEB_LINE_HEIGHT_RATIO)
})

export const color = computed(() => {
  const color = config.extension.color
  if (color === 'auto')
    return isDark.value ? '#eee' : '#111'
  return color
})

export const scale = computed(() => {
  return config.extension.scale * Math.round(
    config.editor.fontSize * GLODEB_LINE_HEIGHT_RATIO,
  ) / BASE_HEIGHT
})

export const formulas = shallowRef<Formula[]>([])
export const preloads = shallowRef<string[]>([])

export const regexes = computed(() => {
  const captures = config.extension.capture
  const _default: RegExpOptions[] = [
    { pattern: '\\$\\$(.*?)\\$\\$', flags: 'gs', capture: 1 },
    { pattern: '(?<!\\$)\\$(?!\\$)(.*?)(?<!\\\\)\\$', flags: 'gm', capture: 1 },
  ]

  const options = languages.value.flatMap(lang => captures[lang] ?? [])
  const result = options.length > 0
    ? options
    : captures['default'] ?? _default
  // Assume that the pattern list is short
  // So we filter duplicates with O(n^2) complexity
  const filtered: Required<RegExpOptions>[] = []
  for (const { pattern, flags = '', capture = 0 } of result) {
    if (!filtered.find(
      opt => opt.pattern === pattern
        && opt.flags === flags
        && opt.capture === capture,
    )) {
      filtered.push({ pattern, flags, capture })
    }
  }
  return filtered.map(opt => ({
    regex: new RegExp(opt.pattern, opt.flags),
    capture: opt.capture,
  }))
})