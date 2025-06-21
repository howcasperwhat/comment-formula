import type { FormulaCode } from './annotation'
import type { FormulaPreview } from './transformer'
import * as Meta from './generated/meta'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}

export type RelativePosition = 'before' | 'after' | 'none'

export interface RegExpOptions {
  pattern: string
  flags?: string
  capture?: number
}

export type ReplaceKeyType<T, K extends keyof T, N> = 
  Omit<T, K> & { [P in K]: N }

export type ConfigDefines = Record<string, string[]>
export type ConfigCaptureComment = Record<string, RegExpOptions[]>
export type ConfigCaptureFormula = Record<string, RegExpOptions[]>

export type Config = ReplaceKeyType<
  ReplaceKeyType<
    Meta.NestedScopedConfigs,
    'defines',
    ConfigDefines
  >,
  'capture',
  {
    comment: ConfigCaptureComment
    formula: ConfigCaptureFormula
  }
>
