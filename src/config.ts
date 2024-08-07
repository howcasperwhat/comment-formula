import { workspace } from "vscode";
import { EXT_NAMESPACE } from "./meta";

export const getColor = (type: 'message' | 'inline') => {
  const typeConfigMap = {
    'message': 'messageColor',
    'inline': 'inlineColor',
  };
  const color: string = workspace.getConfiguration(EXT_NAMESPACE).get(typeConfigMap[type], 'auto');
  const colorTheme = workspace.getConfiguration('workbench').get('colorTheme') as string;
  if (color === "auto") {
    if (colorTheme.includes('Dark') || colorTheme.includes('Black')) { return '#aaa'; }
    else if (colorTheme.includes('Light')) { return '#555'; }
    else { return '#888'; }
  } else {
    return color;
  }
};

export const getInline = () => {
  return workspace.getConfiguration(EXT_NAMESPACE).get('inline', 'partial');
};

export const getFontSize = () => {
  return parseFloat(workspace.getConfiguration('editor').get('fontSize')!);
};

const styleMapper: { [key: string]: string } = {
  'underline': 'border-bottom: 1px dashed;',
  'bold': 'font-weight: bold;',
  'italic': 'font-style: italic;',
  'line-through': 'text-decoration: line-through;',
  'none': '',
};

export const getStyle = () => {
  const style: string = workspace.getConfiguration(EXT_NAMESPACE).get('style')!;
  return styleMapper[style];
};

export const getEnableLanguages = (): string[] => {
  return workspace.getConfiguration(EXT_NAMESPACE).get('enableLanguages')!;
};

export const getSymbol = () => {
  return workspace.getConfiguration(EXT_NAMESPACE).get('symbol')!;
};