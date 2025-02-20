import { FormulaPreview } from './transformer'
import { FormulaCode } from './annotation'

export interface Formula {
  code: FormulaCode
  preview: FormulaPreview
}