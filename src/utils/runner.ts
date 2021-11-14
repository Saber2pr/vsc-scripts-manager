import { window } from 'vscode'
import { parse, resolve } from 'path'

const Runner = {
  '.js': 'node',
  '.sh': 'sh',
  '.ts': 'ts-node',
}

export const runScript = (path: string) => {
  const terminal = window.createTerminal()
  terminal.show()
  const { ext } = parse(path)
  const scriptPath = resolve(path)
  if (ext in Runner) {
    terminal.sendText(`${Runner[ext]} ${scriptPath}`)
  } else {
    window.showErrorMessage(`Cannot run script: ${scriptPath}`)
  }
}
