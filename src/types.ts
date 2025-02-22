import { FormulaPreview } from './transformer'
import { FormulaCode } from './annotation'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}

export type RelativePosition = 'before' | 'after' | 'none'