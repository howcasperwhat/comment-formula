import type { DecorationOptions } from 'vscode'

export interface DecorationMatch extends DecorationOptions {
  content: string,
  inline: boolean,
}