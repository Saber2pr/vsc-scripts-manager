import Space from 'antd/lib/space'
import React from 'react'

import { useScriptsData } from '../../hooks/useScriptsData'
import { useSetParticalState } from '../../hooks/useSetParticalState'
import { ScriptItem } from '../../type/interface'
import { Controller } from './controller'
import { Creator } from './creator'
import { Runner } from './runner'
import { TableList } from './table-list'

export interface Home {}

export const Home = ({}: Home) => {
  const [{ showCreate, currentEdit, showRunner }, setState] =
    useSetParticalState({
      showCreate: false,
      showRunner: false,
      currentEdit: null as ScriptItem,
    })

  const { list, saveList, updateList, loading } = useScriptsData()

  const onSave = async (item: ScriptItem) => {
    const script = list.find(script => script.id === item.id)
    if (script) {
      Object.assign(script, item)
      await saveList([...list])
    } else {
      await saveList([item, ...list])
    }
    setState({ showCreate: false, currentEdit: item })
  }

  const onDelete = async (item: ScriptItem) => {
    await saveList(list.filter(script => script.id !== item.id))
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Controller
        onCreate={() => {
          setState({ showCreate: true, currentEdit: null })
        }}
        onUpdate={updateList}
      />
      <TableList
        list={list}
        loading={loading}
        onDelete={onDelete}
        onEdit={item => {
          setState({ showCreate: true, currentEdit: item })
        }}
        onRun={item => {
          setState({ currentEdit: item, showRunner: true })
        }}
        onUpdate={saveList}
      />
      <Creator
        visible={showCreate}
        onCancel={() => setState({ showCreate: false })}
        onSave={onSave}
        initialValues={currentEdit}
      />
      <Runner
        visible={showRunner}
        onCancel={() => {
          setState({ showRunner: false })
        }}
        script={currentEdit}
      />
    </Space>
  )
}
