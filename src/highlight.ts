import type { ExtensionContext } from 'vscode'
import { Buffer } from 'node:buffer'
import { ref, watch } from 'reactive-vscode'
import { commands, Uri, window, workspace } from 'vscode'
import { config } from './config'

export function useHighlight(context: ExtensionContext) {
  const { readFile, writeFile } = workspace.fs
  watch(() => config.extension.scopes, async () => {
    const packagePath = Uri.joinPath(
      context.extension.extensionUri,
      'package.json',
    )
    const formulaPath = Uri.joinPath(
      context.extension.extensionUri,
      'syntaxes',
      'formula.json',
    )
    const packageJSON = await JSON.parse(
      (await readFile(packagePath)).toString(),
    )
    const formulaJSON = await JSON.parse(
      (await readFile(formulaPath)).toString(),
    )
    const configScopes = config.extension.scopes.toSorted()
    const packageScopes = await packageJSON.contributes.grammars.at(-1).injectTo.toSorted()
    const formulaScopes = await formulaJSON._scopes.toSorted()
    const isChanged = ref(false)
    if (configScopes.toString() !== packageScopes.toString()) {
      isChanged.value = true
      packageJSON.contributes.grammars[
        packageJSON.contributes.grammars.length - 1
      ].injectTo = configScopes
      await writeFile(
        packagePath,
        new Uint8Array(Buffer.from(
          `${JSON.stringify(packageJSON, null, 2)}\n`,
        )),
      )
    }
    if (configScopes.toString() !== formulaScopes.toString()) {
      isChanged.value = true
      formulaJSON._scopes = configScopes
      formulaJSON.injectionSelector = [
        `L:${configScopes.join(',')}`,
        '-meta.embedded.litemath.markdown',
      ].join(' ')
      await writeFile(
        formulaPath,
        new Uint8Array(Buffer.from(
          `${JSON.stringify(formulaJSON, null, 2)}\n`,
        )),
      )
    }
    (isChanged.value && (await window.showInformationMessage(
      'You have updated the scopes should be highlighted, please reload the window to take effect.',
      'Reload Window',
    )) === 'Reload Window')
    && commands.executeCommand('workbench.action.reloadWindow')
  }, { immediate: true })
}
