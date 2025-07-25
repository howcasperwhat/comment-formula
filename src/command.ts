import { useCommand } from 'reactive-vscode'
import { config } from './store/shared'

export function useCommands() {
  useCommand('mathjax-intellisense.edit', () => {
    config.extension.mode = 'edit'
  })
  useCommand('mathjax-intellisense.view', () => {
    config.extension.mode = 'view'
  })
  useCommand('mathjax-intellisense.both', () => {
    config.extension.mode = 'both'
  })
  useCommand('mathjax-intellisense.toggle', () => {
    config.extension.mode = config.extension.mode === 'edit'
      ? 'view'
      : 'edit'
  })
}
