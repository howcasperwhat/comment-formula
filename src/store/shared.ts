
import { useIsDarkTheme, computed, shallowRef } from "reactive-vscode"
import { config } from '../config'
import { GLODEB_LINE_HEIGHT_RATIO, BASE_HEIGHT } from './constant'
import type { Formula } from '../types'

export const isDark = useIsDarkTheme()

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
