import type { FormulaCode } from './annotation'
import type * as Meta from './generated/meta'
import type { FormulaPreview } from './transformer'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}

export type RelativePosition = 'before' | 'after' | 'none'

export interface MarkerOptions {
  type: 'str' | 'reg'
  value: string
  include?: boolean
}

export type Marker = MarkerOptions | string

export interface SharedRegExpOptions {
  sanitize?: string[]
}

export interface BasicBaseRegExpOptions extends SharedRegExpOptions {
  strict?: boolean
  breakable?: boolean
}

export interface MinuteRegExpOptions extends BasicBaseRegExpOptions {
  prefix: Marker
  suffix: Marker
}

export interface UnshapedRegExpOptions extends BasicBaseRegExpOptions {
  marker: Marker
}

export interface AdvancedRegExpOptions extends SharedRegExpOptions {
  pattern: string
  flags?: string
  group?: number
}

export type BasicRegExpOptions
  = MinuteRegExpOptions | UnshapedRegExpOptions

export type RegExpOptions
  = BasicRegExpOptions | AdvancedRegExpOptions

export interface LiteRange {
  start: number
  end: number
}

export type ReplaceKeyType<T, K extends keyof T, N>
  = Omit<T, K> & { [P in K]: N }

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
