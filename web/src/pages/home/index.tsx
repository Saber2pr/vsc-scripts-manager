import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Affix from 'antd/lib/affix'
import Divider from 'antd/lib/divider'
import message from 'antd/lib/message'
import React from 'react'

import { callService } from '@saber2pr/vscode-webview'

import { KEY_SCRIPTS_LIST } from '../../../../src/constants'
import { useSettingsModal } from '../../components'
import { useQuery } from '../../hooks/useQuery'
import { useScriptsData } from '../../hooks/useScriptsData'
import { useSetParticalState } from '../../hooks/useSetParticalState'
import { i18n } from '../../i18n'
import { ScriptItem } from '../../type/interface'
import { IAPP_ARGS } from '../../utils'
import { dedup, getArray } from '../../utils/getArray'
import { Creator } from './creator'
import { Runner } from './runner'
import { TableList } from './table-list'

import type { Services } from '../../../../src/api/type'
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

  const query = useQuery<IAPP_ARGS>()
  const name = query?.name

  const { modal, setVisible } = useSettingsModal({
    initValues: {},
    async onFinish(values) {},
    onSaveAs: async () => {
      await callService<Services, 'SaveFileAs'>('SaveFileAs', {
        content: JSON.stringify({
          [KEY_SCRIPTS_LIST]: list,
        }),
        name: `${name}.scripts`,
      })
    },
    onImport: async () => {
      const content = await callService<Services, 'readFile'>('readFile', null)
      if (content) {
        const newList = getArray(content[KEY_SCRIPTS_LIST])
        const nextList = dedup(
          getArray(list).concat(newList),
          (a, b) => a.id === b.id
        )
        await saveList(nextList)
        message.success(i18n.format('import_tip'))
        setVisible(false)
      }
    },
  })

  return (
    <>
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
      <Affix offsetBottom={0}>
        <div className="tools-wrapper">
          <Divider className="tools-wrapper-div" style={{ margin: 0 }} />
          <Space
            direction="horizontal"
            style={{ width: '100%' }}
            split={<Divider type="vertical" />}
          >
            <Button
              type="text"
              onClick={() => setState({ showCreate: true, currentEdit: null })}
            >
              {i18n.format('create')}
            </Button>
            <Button type="text" onClick={updateList}>
              {i18n.format('update')}
            </Button>
            <Button
              type="text"
              onClick={() => {
                setVisible(true)
              }}
            >
              {i18n.format('setting')}
            </Button>
          </Space>
        </div>
      </Affix>
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
      {modal}
    </>
  )
}
