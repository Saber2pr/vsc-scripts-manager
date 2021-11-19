import { readFileSync } from 'fs'
import { parse, resolve } from 'path'
import { window } from 'vscode'

import { getArray } from './getArray'

const Runner = {
  '.js': 'node',
  '.sh': 'sh',
  '.ts': 'ts-node',
}

const getRunnerName = (id: string) => id

const getTerminal = (id: string) => {
  if (window.terminals && window.terminals.length > 0) {
    const result = window.terminals.find(item => item.name === getRunnerName(id))
    if (result) {
      return result
    }
  }
  return window.createTerminal(getRunnerName(id))
}

const runTerminal = (id: string, command: string) => {
  const terminal = getTerminal(getRunnerName(id))
  terminal.show()
  terminal.sendText(command)
}

export const runScript = (
  id: string,
  path: string,
  args: string[],
  type: 'file' | 'cli'
) => {
  if (type === 'cli') {
    runTerminal(id, `${path} ${getArray(args).join(' ')}`)
    return
  }
  const scriptPath = resolve(path)
  const { ext } = parse(path)
  try {
    readFileSync(scriptPath)
    if (ext in Runner) {
      runTerminal(id, `${Runner[ext]} ${scriptPath} ${getArray(args).join(' ')}`)
    } else {
      window.showErrorMessage(`Cannot run script: ${scriptPath}`)
    }
  } catch (error) {
    window.showErrorMessage(`run script fail: ${scriptPath}`)
  }
}
