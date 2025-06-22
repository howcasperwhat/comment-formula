import type { Config } from './types'
import { defineConfigObject } from 'reactive-vscode'
import * as Meta from './generated/meta'

export const config = {
  extension: defineConfigObject<Config>(
    Meta.scopedConfigs.scope,
    Meta.scopedConfigs.defaults,
  ),
  editor: defineConfigObject<{ fontSize: number }>(
    'editor',
    { fontSize: 14 },
  ),
}
