import type { FormulaCode } from './annotation'
import type { FormulaPreview } from './transformer'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}

export type RelativePosition = 'before' | 'after' | 'none'
