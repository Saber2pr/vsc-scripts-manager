import vscode from 'vscode'

import { createServiceHandler } from '@saber2pr/vscode-webview'

import { RCManager } from '../store/rc'
import { parseArgs } from '../utils/parseArgs'
import { runScript } from '../utils/runner'
import { Services } from './type'

const handleServiceMessage = createServiceHandler<Services>({
  async saveData({ path, key, value }) {
    const rc = new RCManager(path)
    await rc.set(key, value)
  },
  async getData({ path, key }) {
    const rc = new RCManager(path)
    return rc.get(key)
  },
  async getLang() {
    return vscode.env.language
  },
  async openFile() {
    const uri = await vscode.window.showOpenDialog({
      canSelectMany: false,
      filters: {
        JavaScript: ['js'],
        Shell: ['sh'],
        TypeScript: ['ts'],
      },
    })
    return uri?.[0].fsPath
  },
  async showFileEditor(path) {
    vscode.window.showTextDocument(vscode.Uri.file(path), {
      viewColumn: vscode.ViewColumn.Beside,
    })
  },
  async createTerminal({ path, args }) {
    runScript(path, args)
  },
  async parseScriptArgs(path) {
    return parseArgs(path)
  },
})

export { handleServiceMessage }
