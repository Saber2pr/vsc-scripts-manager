import { ScriptItem } from './../type/interface';

export const parsePathName = (path: string) => {
  if (typeof path === 'string') {
    const paths = path.split(/\/|\\/g)
    return paths.pop()
  }
}

export const parseScriptName = (script: ScriptItem) => {
  if(script?.type === 'file'){
    return parsePathName(script?.path)
  }
  return script?.path
}
