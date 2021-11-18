import { readFileSync } from 'fs'
import { parse, resolve } from 'path'
import { window } from 'vscode'

import { getArray } from './getArray'

const Runner = {
  '.js': 'node',
  '.sh': 'sh',
  '.ts': 'ts-node',
}

const RunnerName = 'scripts-runner'

const getTerminal = () => {
  if (window.terminals && window.terminals.length > 0) {
    const result = window.terminals.find(item => item.name === RunnerName)
    if (result) {
      return result
    }
  }
  return window.createTerminal(RunnerName)
}

const runTerminal = (command: string) => {
  const terminal = getTerminal()
  terminal.show()
  terminal.sendText(command)
}

export const runScript = (
  path: string,
  args: string[],
  type: 'file' | 'cli'
) => {
  if (type === 'cli') {
    runTerminal(`${path} ${getArray(args).join(' ')}`)
    return
  }
  const scriptPath = resolve(path)
  const { ext } = parse(path)
  try {
    readFileSync(scriptPath)
    if (ext in Runner) {
      runTerminal(`${Runner[ext]} ${scriptPath} ${getArray(args).join(' ')}`)
    } else {
      window.showErrorMessage(`Cannot run script: ${scriptPath}`)
    }
  } catch (error) {
    window.showErrorMessage(`run script fail: ${scriptPath}`)
  }
}
