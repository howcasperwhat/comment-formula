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
import * as Meta from '../generated/meta'
import { Performance } from '../performance'
import { duplicate, escapeRegExpKeywords, normRegExpOption, resolves } from '../utils'
import { BASE_HEIGHT, DEFAULT_CAPTURE, GLODEB_LINE_HEIGHT_RATIO } from './constant'
import { Range } from 'vscode'

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
    const sanitizeTokens = opt.breakable && opt.sanitize.length
      ? opt.sanitize
        // Fixes passing ['#', '##']
        // The produced regexp will match '#' first
        // leaving an undesired '#' in case the value is '##'
          .sort((a, b) => b.length - a.length)
          .map(escapeRegExpKeywords)
      : []
    const sanitize = opt.breakable && opt.sanitize.length
      ? new RegExp([
        '^(?:\\s*(?:',
        sanitizeTokens.join('|'),
        '))?',
      ].join(''), 'gm')
      : null

    return {
      match: new RegExp([
        ...(opt.breakable && opt.sanitize.length
          ? [
              '(?:(?:',
              sanitizeTokens.join('|'),
              ')\\s*)?',
            ]
          : []),
        opt.prefix,
        '(.+?)',
        opt.strict ? '(?<!\\\\)' : '',
        opt.suffix,
      ].join(''), opt.breakable ? 'gs' : 'g'),
      sanitize,
    }
  })
})

export const vranges = useTextEditorVisibleRanges(editor)
export const vinterval = computed(() =>
  vranges.value.length && config.extension.optimize.overflow
    ? new Range(
      vranges.value.at(0)!.start,
      vranges.value.at(-1)!.end,
    )
    : undefined
)