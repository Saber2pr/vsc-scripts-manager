import { promisify } from 'util'
import { getRootPath } from './getRootPath'
import { join } from 'path'
import { writeFile } from 'fs'
import { Uri, window } from 'vscode'

export const saveWorkspaceFile = async (path: string, content: string) => {
  const savePath = join(getRootPath(), path)
  const button_checkout = 'Checkout'
  window
    .showInformationMessage(`Markdown Created`, button_checkout)
    .then(selection => {
      if (selection === button_checkout) {
        window.showTextDocument(Uri.file(savePath))
      }
    })
  return promisify(writeFile)(savePath, content)
}

export const saveWorkspaceFileAs = async (name: string, content: string) => {
  const saveUri = await window.showSaveDialog({
    defaultUri: Uri.file(name),
  })
  if (saveUri) {
    const savePath = saveUri.fsPath
    const button_checkout = 'Checkout'
    window
      .showInformationMessage(`Markdown Created`, button_checkout)
      .then(selection => {
        if (selection === button_checkout) {
          window.showTextDocument(Uri.file(savePath))
        }
      })
    return promisify(writeFile)(savePath, content)
  }
}
