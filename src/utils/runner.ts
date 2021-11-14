import { readFileSync } from 'fs'
import { parse, resolve } from 'path'
import { window } from 'vscode'

import { getArray } from './getArray'

const Runner = {
  '.js': 'node',
  '.sh': 'sh',
  '.ts': 'ts-node',
}

export const runScript = (path: string, args: string[]) => {
  const scriptPath = resolve(path)
  const { ext } = parse(path)
  try {
    readFileSync(scriptPath)
    if (ext in Runner) {
      const terminal = window.createTerminal()
      terminal.show()
      terminal.sendText(
        `${Runner[ext]} ${scriptPath} ${getArray(args).join(' ')}`
      )
    } else {
      window.showErrorMessage(`Cannot run script: ${scriptPath}`)
    }
  } catch (error) {
    window.showErrorMessage(`run script fail: ${scriptPath}`)
  }
}
