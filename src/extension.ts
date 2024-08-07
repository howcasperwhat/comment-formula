/**
 * code is modified from vscode-iconify
 * https://github.com/antfu/vscode-iconify
 */
import type { DecorationOptions, ExtensionContext, TextEditor } from 'vscode';
import { Range, Uri, window, workspace } from 'vscode';
import { htmlToDateURL, markdownToHTML } from './transformer';
import { getFontSize, getStyle, getEnableLanguages, getSymbol } from './config';

interface DecorationMatch extends DecorationOptions {
  key: string,
  big: boolean,
}

function isEnableLanguage(editor: TextEditor | undefined) {
  return editor && editor.document.languageId && getEnableLanguages().includes(editor.document.languageId);
}

export function activate(context: ExtensionContext) {
  let InlineIconDecoration = window.createTextEditorDecorationType({
    textDecoration: `none; ${getStyle()}`,
  });
  let HideTextDecoration = window.createTextEditorDecorationType({
    textDecoration: 'none; display: none;', // a hack to inject custom style
  });

  let editor = window.activeTextEditor;
  let decorations: DecorationMatch[] = [];

  async function updateDecorations() {
    if (!editor) { return; }
    const symbol = getSymbol();
    const regEx = new RegExp(`(${symbol}${symbol}[\\s\\S]*?${symbol}${symbol})`, 'g');
    const keys: [Range, string, boolean][] = [];
    const text = editor.document.getText();
    let match;
    regEx.lastIndex = 0;
    while ((match = regEx.exec(text))) {
      const key = `$$${match[1].slice(2, -2)}$$`;
      if (!key) { continue; }
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      keys.push([new Range(startPos, endPos), key, /[\n\r]/.test(key)]);
    }
    decorations = (await Promise.all(keys.map(async ([range, key, multiline]) => {
      const { messageHTML, inlineHTML, textInline } = markdownToHTML(key);
      const big = textInline || multiline;
      const messageURL = htmlToDateURL(messageHTML);
      const inlineURL = htmlToDateURL(inlineHTML);
      const item: DecorationMatch = {
        range, key, big,
        renderOptions: big ? undefined : {
          after: {
            contentIconPath: Uri.parse(inlineURL),
            margin: `-${getFontSize()}px 2px; transform: translate(-2px, 3px);`,
            width: `${getFontSize() * 1.1}px`,
          }
        },
        hoverMessage: `![](${messageURL})`,
      };
      return item;
    }))).filter(decoration => decoration !== undefined);
    refreshDecorations();
  }

  function refreshDecorations() {
    if (!editor) { return; }
    InlineIconDecoration.dispose();
    InlineIconDecoration = window.createTextEditorDecorationType({
      textDecoration: `none; ${getStyle()}`,
    });
    editor.setDecorations(InlineIconDecoration, decorations);
    editor.setDecorations(
      HideTextDecoration,
      decorations
        .filter(({ range, big }) => !big && (range.start.line !== editor!.selection.start.line))
        .map(({ range }) => range)
    );
  }

  function updateEditor(_editor?: TextEditor) {
    if (!_editor || editor === _editor) { return; }
    editor = _editor;
    decorations = [];
  }

  let timeout: NodeJS.Timeout | number | undefined = undefined;
  function triggerUpdateDecorations(_editor?: TextEditor) {
    if (!isEnableLanguage(_editor)) { return; }
    updateEditor(_editor);
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(() => {
      updateDecorations();
    }, 200);
  }

  if (editor) { triggerUpdateDecorations(editor); }

  window.onDidChangeActiveTextEditor((e) => {
    triggerUpdateDecorations(e);
  }, null, context.subscriptions);

  workspace.onDidChangeTextDocument((event) => {
    if (window.activeTextEditor && event.document === window.activeTextEditor.document) { triggerUpdateDecorations(window.activeTextEditor); }
  }, null, context.subscriptions);

  workspace.onDidChangeConfiguration(() => {
    triggerUpdateDecorations();
  }, null, context.subscriptions);

  window.onDidChangeVisibleTextEditors((editors) => {
    triggerUpdateDecorations(editors[0]);
  }, null, context.subscriptions);

  window.onDidChangeTextEditorSelection((e) => {
    if (isEnableLanguage(e.textEditor)) {
      updateEditor(e.textEditor);
      refreshDecorations();
    }
  }, null, context.subscriptions);
}

// This method is called when your extension is deactivated
export function deactivate() { }
