import { workspace } from "vscode"
import { EXT_NAMESPACE } from "./meta"

export const getColor = () => {
  const color: string = workspace.getConfiguration(EXT_NAMESPACE).get('color', 'auto')
  const colorTheme = workspace.getConfiguration('workbench').get('colorTheme') as string
  if (color == "auto") {
    if (colorTheme.includes('Dark') || colorTheme.includes('Black')) {
      return '#aaa'
    } else if (colorTheme.includes('Light')) {
      return '#555'
    } else {
      return '#888'
    }
  } else {
    return color
  }
}

export const getInline = () => {
  return workspace.getConfiguration(EXT_NAMESPACE).get('inline', 'partial')
}