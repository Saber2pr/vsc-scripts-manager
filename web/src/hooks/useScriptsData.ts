import { useEffect, useState } from 'react'

import { callService } from '@saber2pr/vscode-webview'

import { ScriptItem } from '../type/interface'
import { IAPP_ARGS } from '../utils/getArgs'
import { getArray } from '../utils/getArray'
import { useQuery } from './useQuery'

import type { Services } from './../../../src/api/type'
const KEY = 'scripts'

export const useScriptsData = () => {
  const [list, setList] = useState<ScriptItem[]>([])

  const [loading, setLoading] = useState(false)
  const query = useQuery<IAPP_ARGS>()
  const file = query?.file

  const updateList = async () => {
    if (file) {
      setLoading(true)
      const data = await callService<Services, 'getData'>('getData', {
        path: file,
        key: KEY,
      })
      setList(getArray(data))
      setLoading(false)
    }
  }

  const saveList = async (list: ScriptItem[]) => {
    if (file) {
      setLoading(true)
      setList(getArray(list))
      await callService<Services, 'saveData'>('saveData', {
        path: file,
        key: KEY,
        value: list,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    updateList()
  }, [])

  return { list, updateList, saveList, loading }
}
