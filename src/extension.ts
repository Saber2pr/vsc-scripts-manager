import { join } from 'path'
import * as vscode from 'vscode'

import { FILE_CONFIG_PATH, handleServiceMessage } from './api/services'
import { COM_MAIN } from './constants'
import { isActiveThemeKind } from './utils/isActiveThemeKind'
import {
  createWebviewContent,
  WebviewParams,
} from './webview/createWebviewContent'
import { WebviewEditor } from './WebviewEditor'

let webviewPanel: vscode.WebviewPanel
let statusBar: vscode.StatusBarItem = null

const displayName = 'Scripts'

// install
export function activate(context: vscode.ExtensionContext) {
  // statusBar init
  statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    99
  )
  statusBar.text = displayName
  statusBar.command = COM_MAIN
  statusBar.show()

  // webview init
  function activeProjectCreatorWebview(
    params: WebviewParams = {},
    reload = false
  ) {
    if (webviewPanel) {
      if (reload) {
        webviewPanel.webview.html = createWebviewContent({
          webviewPanel,
          basePath: context.extensionPath,
          params,
        })
      }
      webviewPanel.reveal()
    } else {
      webviewPanel = vscode.window.createWebviewPanel(
        displayName,
        displayName,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: false,
        }
      )
      webviewPanel.iconPath = vscode.Uri.file(
        join(context.extensionPath, 'assets', 'logo.png')
      )

      webviewPanel.webview.html = createWebviewContent({
        webviewPanel,
        basePath: context.extensionPath,
        params,
      })

      webviewPanel.webview.onDidReceiveMessage(
        async message => {
          await handleServiceMessage(webviewPanel, message)
        },
        null,
        context.subscriptions
      )

      webviewPanel.onDidDispose(
        () => {
          webviewPanel = undefined
        },
        null,
        context.subscriptions
      )
    }
  }

  const params: WebviewParams = {
    file: FILE_CONFIG_PATH,
    name: 'Scripts Runner',
  }

  // subscriptions
  context.subscriptions.push(
    vscode.commands.registerCommand(COM_MAIN, () => {
      activeProjectCreatorWebview({
        theme: isActiveThemeKind(vscode.ColorThemeKind.Light)
          ? 'light'
          : 'dark',
        ...params,
      })
    }),
    vscode.window.registerCustomEditorProvider(
      'custom.editor',
      new WebviewEditor(context)
    ),
    vscode.window.onDidChangeActiveColorTheme(event => {
      webviewPanel?.visible &&
        activeProjectCreatorWebview(
          {
            theme:
              event.kind === vscode.ColorThemeKind.Light ? 'light' : 'dark',
            ...params,
          },
          true
        )
    })
  )
  context.subscriptions.push(statusBar)
}

// uninstall
export function deactivate() {
  if (statusBar) {
    statusBar.hide()
    statusBar.dispose()
  }
  if (webviewPanel) {
    webviewPanel.dispose()
  }
  statusBar = null
  webviewPanel = null
}
