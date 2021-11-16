import Space from 'antd/lib/space'
import React, { useState } from 'react'

import { useScriptsData } from '../../hooks/useScriptsData'
import { ScriptItem } from '../../type/interface'
import { Controller } from './controller'
import { Creator } from './creator'
import { Runner } from './runner'
import { TableList } from './table-list'

export interface Home {}

export const Home = ({}: Home) => {
  const [currentEdit, setCurrentEdit] = useState<ScriptItem>({} as any)
  const [showCreate, setShowCreate] = useState(false)
  const [showRunner, setShowRunner] = useState(false)

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
        onRun={item => {
          setCurrentEdit(item)
          setShowRunner(true)
        }}
        onUpdate={saveList}
      />
      <Creator
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onSave={onSave}
        initialValues={currentEdit}
      />
      <Runner
        visible={showRunner}
        onCancel={() => {
          setShowRunner(false)
        }}
        script={currentEdit}
      />
    </Space>
  )
}
