
import {
  useIsDarkTheme,
  computed,
  shallowRef,
  useActiveTextEditor,
  useTextEditorSelections,
  useDocumentText
} from "reactive-vscode"
import { config } from '../config'
import { GLODEB_LINE_HEIGHT_RATIO, BASE_HEIGHT, CHARACTERS_NEED_ESCAPING } from './constant'
import type { Formula, MinuteRegExpOptions, RegExpOptions } from '../types'
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

export const regexOf = (opt: MinuteRegExpOptions) => {
  const pattern = []
  for (const char of opt.prefix) {
    CHARACTERS_NEED_ESCAPING.has(char)
      ? pattern.push(`\\${char}`)
      : pattern.push(char)
  }
  opt.strict && pattern.push(`(?<!\\\\)`)
  for (const char of opt.suffix) {
    CHARACTERS_NEED_ESCAPING.has(char)
      ? pattern.push(`\\${char}`)
      : pattern.push(char)
  }
  return new RegExp(
    pattern.join(''),
    opt.breakable ? 'gs' : 'g',
  )
}

export const regexes = computed(() => {
  const captures = config.extension.capture
  const _default: RegExpOptions[] = [
    { marker: '$$', breakable: true },
    { marker: '$', breakable: false }
  ]

  const options = languages.value.flatMap(lang => captures[lang] ?? [])
  const regexes = options.length > 0
    ? options
    : captures['default'] ?? _default

  const filtered: Required<MinuteRegExpOptions>[] = []
  const seen = new Set<string>()
  for (const regex of regexes) {
    const key = JSON.stringify(regex)
    if (!seen.has(key)) {
      seen.add(key)
      filtered.push({
        prefix: 'marker' in regex ? regex.marker : regex.prefix,
        suffix: 'marker' in regex ? regex.marker : regex.suffix,
        strict: regex.strict ?? true,
        breakable: regex.breakable ?? true,
      })
    }
  }

  return filtered.map(opt => regexOf(opt))
})