import { readFile } from 'fs'
import { promisify } from 'util'
import { window } from 'vscode'

import { ArgsType } from '../api/type'

const ARG_DEF = /\/\/ args:\[(\S+?)\]/

export const parseArgs = async (path: string): Promise<ArgsType[]> => {
  let buf: Buffer
  try {
    buf = await promisify(readFile)(path)
  } catch (error) {
    window.showErrorMessage(`read file fail: ${path}`)
    return
  }
  const content = buf.toString()
  const result = content.match(ARG_DEF)
  if (result && result[1]) {
    const argsDef = result[1]
    if (argsDef) {
      const args = argsDef.split(',')
      return args.map(arg => {
        arg = arg.trim()
        if (arg.endsWith('?')) {
          return {
            type: 'checkbox',
            label: arg.replace(/\?$/, ''),
          }
        } else if (arg.includes('{')) {
          const valuesDef = arg.match(/{(\S+?)}/)?.[1] ?? ''
          return {
            type: 'select',
            label: arg.match(/\S+(?={)/)?.[0],
            values: valuesDef.split('|'),
          }
        } else {
          return {
            type: 'input',
            label: arg,
          }
        }
      })
    }
  }
}
