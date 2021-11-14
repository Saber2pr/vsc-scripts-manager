import './style.less'

import React, { useState } from 'react'
import { useQuery } from '../../hooks/useQuery'
import { IAPP_ARGS } from '../../utils'
import { TableList } from './table-list'
import Space from 'antd/lib/space'
import { Controller } from './controller'
import { Creator } from './creator'
import { ScriptItem } from '../../type/interface'
import { useScriptsData } from '../../hooks/useScriptsData'
import { callService } from '@saber2pr/vscode-webview'
import { Services } from '../../../../src/api/type'

export interface Home {}

export const Home = ({}: Home) => {
  const query = useQuery<IAPP_ARGS>()
  console.log(query)

  const [currentEdit, setCurrentEdit] = useState<ScriptItem>({} as any)
  const [showCreate, setShowCreate] = useState(false)

  const { list, saveList, updateList, loading } = useScriptsData()

  const onSave = async (item: ScriptItem) => {
    const script = list.find(script => script.id === item.id)
    if (script) {
      Object.assign(script, item)
      await saveList([...list])
    } else {
      await saveList(list.concat(item))
    }
    setShowCreate(false)
  }

  const onDelete = async (item: ScriptItem) => {
    await saveList(list.filter(script => script.id !== item.id))
  }

  const onRun = async (item: ScriptItem) => {
    await callService<Services, 'createTerminal'>('createTerminal', item.path)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Controller
        onCreate={() => {
          setCurrentEdit({} as any)
          setShowCreate(true)
        }}
        onUpdate={updateList}
      />
      <TableList
        list={list}
        loading={loading}
        onDelete={onDelete}
        onEdit={item => {
          setCurrentEdit(item)
          setShowCreate(true)
        }}
        onRun={onRun}
      />
      <Creator
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onSave={onSave}
        initialValues={currentEdit}
      />
    </Space>
  )
}
