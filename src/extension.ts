/**
 * code is modified from vscode-iconify
 * https://github.com/antfu/vscode-iconify
 */
import type { DecorationOptions, ExtensionContext, TextEditor } from 'vscode'
import { DecorationRangeBehavior, Range, Uri, window, workspace } from 'vscode'
import { htmlToDateURL, markdownToHTML } from './transformer'

interface DecorationMatch extends DecorationOptions {
	key: string,
	big: boolean,
}

export function activate(context: ExtensionContext) {
	const InlineIconDecoration = window.createTextEditorDecorationType({
		textDecoration: 'none; opacity: 0.8 !important; font-weight: bold;',
		rangeBehavior: DecorationRangeBehavior.ClosedClosed,
	})
	const HideTextDecoration = window.createTextEditorDecorationType({
		textDecoration: 'none; display: none;', // a hack to inject custom style
	})

	let editor = window.activeTextEditor
	let decorations: DecorationMatch[] = []

	async function updateDecorations() {
		if (!editor)
			return
		const regEx = /(\$\$[\s\S]*?\$\$)/g
		const document = editor.document
		const keys: [Range, string][] = []
		for (let i = 0; i < document.lineCount; ++i) {
			regEx.lastIndex = 0
			let match
			const text = document.lineAt(i).text
			const offset = editor.document.offsetAt(document.lineAt(i).range.start)
			// don't use split, think about the case: `###$$11$$## ##$$ 22 $$ #`
			const commentIndex = text.indexOf('#')
			const prefix = text.slice(0, commentIndex)
			const comment = text.slice(commentIndex)
			while ((match = regEx.exec(comment))) {
				const key = match[1]
				if (!key)
					continue
				const startPos = editor.document.positionAt(prefix.length + offset + match.index)
				const endPos = editor.document.positionAt(prefix.length + offset + match.index + match[0].length)
				keys.push([new Range(startPos, endPos), key])
			}
		}
		decorations = (await Promise.all(keys.map(async ([range, key]) => {
			const { originHTML, scaleHTML, big } = markdownToHTML(key)
			const originURL = htmlToDateURL(originHTML)
			const scaleURL = htmlToDateURL(scaleHTML)
			const item: DecorationMatch = {
				range,
				renderOptions: big ? undefined : {
					after: {
						contentIconPath: Uri.parse(scaleURL),
					}
				},
				hoverMessage: `![](${originURL})`,
				key,
				big: big,
			}
			return item
		}))).filter(decoration => decoration !== undefined)
		refreshDecorations()
	}

	function refreshDecorations() {
		if (!editor)
			return
		editor.setDecorations(InlineIconDecoration, decorations)
		editor.setDecorations(
			HideTextDecoration,
			decorations
				.filter(({ range, big }) => !big && (range.start.line !== editor!.selection.start.line))
				.map(({ range }) => range)
		)
	}

	function updateEditor(_editor?: TextEditor) {
		if (!_editor || editor === _editor)
			return
		editor = _editor
		decorations = []
	}

	let timeout: NodeJS.Timeout | number | undefined = undefined
	function triggerUpdateDecorations(_editor?: TextEditor) {
		updateEditor(_editor)
		if (timeout) {
			clearTimeout(timeout)
			timeout = undefined
		}
		timeout = setTimeout(() => {
			updateDecorations()
		}, 200)
	}

	if (editor)
		triggerUpdateDecorations(editor)

	window.onDidChangeActiveTextEditor((e) => {
		triggerUpdateDecorations(e)
	}, null, context.subscriptions)

	workspace.onDidChangeTextDocument((event) => {
		if (window.activeTextEditor && event.document === window.activeTextEditor.document)
			triggerUpdateDecorations(window.activeTextEditor)
	}, null, context.subscriptions)

	workspace.onDidChangeConfiguration(() => {
		triggerUpdateDecorations()
	}, null, context.subscriptions)

	window.onDidChangeVisibleTextEditors((editors) => {
		triggerUpdateDecorations(editors[0])
	}, null, context.subscriptions)

	window.onDidChangeTextEditorSelection((e) => {
		updateEditor(e.textEditor)
		refreshDecorations()
	}, null, context.subscriptions)
}

// This method is called when your extension is deactivated
export function deactivate() { }
