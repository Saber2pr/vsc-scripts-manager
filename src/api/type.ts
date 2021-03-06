import { Pair } from '@saber2pr/vscode-webview'

// service type define
export type Services = {
  saveData: Pair<{ path: string; key: string; value: any }>
  getData: Pair<{ path: string; key?: string }>
  getLang: Pair<any, any>
  openFile: Pair<any, string>
  showFileEditor: Pair<string, any>
  createTerminal: Pair<
    { id: string; path: string; args: string[]; type: 'file' | 'cli' },
    any
  >
  parseScriptArgs: Pair<string, ArgsType[]>
  SaveFileAs: Pair<{ name: string; content: string }, any>
  readFile: Pair<any, any>
}

export interface ArgsType {
  type: 'input' | 'select' | 'checkbox'
  label: string
  values?: string[]
}
