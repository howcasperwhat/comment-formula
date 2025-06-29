import type { FormulaCode } from './annotation'
import type * as Meta from './generated/meta'
import type { FormulaPreview } from './transformer'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}

export type RelativePosition = 'before' | 'after' | 'none'

export interface BaseRegExpOptions {
  strict?: boolean
  breakable?: boolean
}

export interface MinuteRegExpOptions extends BaseRegExpOptions {
  prefix: string
  suffix: string
}

export interface UnshapedRegExpOptions extends BaseRegExpOptions {
  marker: string
}

export type RegExpOptions =
  MinuteRegExpOptions | UnshapedRegExpOptions

export interface LiteRange {
  start: number
  end: number
}

export type ReplaceKeyType<T, K extends keyof T, N> =
  Omit<T, K> & { [P in K]: N }

export type ConfigDefines = Record<string, string[]>
export type ConfigCapture = Record<string, RegExpOptions[]>

export type Config = ReplaceKeyType<
  ReplaceKeyType<
    Meta.NestedScopedConfigs,
    'defines',
    ConfigDefines
  >,
  'capture',
  ConfigCapture
>
