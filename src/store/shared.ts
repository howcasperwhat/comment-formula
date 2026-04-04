import type { Config, Formula } from '../types'
import { matchesGlob as isMatch } from 'pathe'
import {
  computed,
  defineConfigObject,
  shallowRef,
  useActiveTextEditor,
  useDocumentText,
  useIsDarkTheme,
  useTextEditorSelections,
  useTextEditorVisibleRanges,
} from 'reactive-vscode'
import { Range } from 'vscode'
import * as Meta from '../generated/meta'
import { Performance } from '../performance'
import { duplicate, escapeRegExpKeywords, isTruthy, normRegExpOption, resolves } from '../utils'
import { BASE_HEIGHT, DEFAULT_CAPTURE, GLODEB_LINE_HEIGHT_RATIO } from './constant'

export const config = {
  extension: defineConfigObject<Config>(
    Meta.scopedConfigs.scope,
    Meta.scopedConfigs.defaults,
  ),
  editor: defineConfigObject<{ fontSize: number }>(
    'editor',
    { fontSize: 14 },
  ),
}

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

export const perf = new Performance('Main')

export const regexes = computed(() => {
  const captures = config.extension.capture

  const _options = languages.value.flatMap(lang => captures[lang] ?? [])
  const options = _options.length > 0
    ? _options
    : captures.default ?? DEFAULT_CAPTURE

  return duplicate(
    options.map(normRegExpOption),
  ).map((opt) => {
    const sanitize = opt.flags.includes('s') && opt.sanitize.length
      // remove `<whitespace>#` for each line, so use `^` and `gm`
      // ['#', '##'] => ['##', '#'] (match prefix later)
      ? new RegExp(`^\\s*${opt.sanitize
          .toSorted((a, b) => b.length - a.length)
          .map(escapeRegExpKeywords)
          .join('|')}`, 'gm')
      : undefined
    const sanitizer = sanitize
      ? (content: string) => content.replaceAll(sanitize, '')
      : undefined
    return {
      matcher: new RegExp(opt.pattern, opt.flags),
      group: opt.group,
      processers: [sanitizer].filter(isTruthy),
    }
  })
})

export const vranges = useTextEditorVisibleRanges(editor)
export const vinterval = computed(() => {
  if (!config.extension.optimize.overflow || vranges.value.length === 0)
    return undefined
  return new Range(
    vranges.value.at(0)!.start,
    vranges.value.at(-1)!.end,
  )
})
