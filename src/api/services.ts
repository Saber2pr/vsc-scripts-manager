import { homedir } from 'os'
import { join } from 'path'
import vscode from 'vscode'

import { createServiceHandler } from '@saber2pr/vscode-webview'

import { FILE_CONFIG } from '../constants'
import { RCManager } from '../store/rc'
import { openFile } from '../utils/openFile'
import { parseArgs } from '../utils/parseArgs'
import { runScript } from '../utils/runner'
import { saveWorkspaceFileAs } from '../utils/saveWorkspaceFile'
import { Services } from './type'

export const FILE_CONFIG_PATH = join(homedir(), FILE_CONFIG)

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
  async createTerminal({ id, path, args, type }) {
    runScript(id, path, args, type)
  },
  async parseScriptArgs(path) {
    return parseArgs(path)
  },
  SaveFileAs: ({ name, content }) => saveWorkspaceFileAs(name, content),
  readFile: () => openFile(),
})

export { handleServiceMessage }
