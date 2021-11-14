import { Pair } from '@saber2pr/vscode-webview'

// service type define
export type Services = {
  saveData: Pair<{ path: string; key: string; value: any }>
  getData: Pair<{ path: string; key?: string }>
  getLang: Pair<any, any>
  openFile: Pair<any, string>
  showFileEditor: Pair<string, any>
  createTerminal: Pair<string, any>
}
