import * as vscode from 'vscode'

import { WebviewEditor } from './WebviewEditor'

let webviewPanel: vscode.WebviewPanel

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'custom.editor',
      new WebviewEditor(context)
    )
  )
}

export function deactivate() {
  if (webviewPanel) {
    webviewPanel.dispose()
  }
  webviewPanel = null
}
