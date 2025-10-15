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
} from 'reactive-vscode'
import * as Meta from '../generated/meta'
import { Performance } from '../performance'
import { duplicate, escapeRegExpKeywords, normRegExpOption, resolves } from '../utils'
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
  const options = duplicate(
    (
      _options.length > 0
        ? _options
        : captures.default ?? DEFAULT_CAPTURE
    ).map(normRegExpOption),
  )

  return options.map((opt) => {
    const sanitizeTokens = opt.breakable && opt.sanitize
      ? opt.sanitize
          .map(escapeRegExpKeywords)
      : []
    const sanitize = opt.breakable && opt.sanitize
      ? new RegExp([
        '^\\s*',
        '(?:',
        sanitizeTokens.join('|'),
        ')?',
      ].join(''), 'gm')
      : null

    return {
      match: new RegExp([
        ...(opt.breakable && opt.sanitize
          ? [
              '(?:',
              sanitizeTokens.join('|'),
              '\\s*)?',
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
