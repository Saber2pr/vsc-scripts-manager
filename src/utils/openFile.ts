import { readFile } from 'fs'
import { promisify } from 'util'
import { window } from 'vscode'

export const openFile = async () => {
  const uris = await window.showOpenDialog({
    canSelectMany: false,
    filters: {
      Scripts: ['scripts'],
    },
  })
  if (uris && uris[0]) {
    const uri = uris[0]
    const buf = await promisify(readFile)(uri.fsPath)
    return JSON.parse(buf.toString())
  }
}
