import { Divider } from 'antd'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import React from 'react'
import { useSettingsModal } from '../../components'

import { i18n } from '../../i18n'

type ModalApi = {
  setVisible: (value: boolean) => void
}

export interface ControllerProps {
  onCreate(): void
  onUpdate(): void
  onSaveAs: VoidFunction
  onImport: (api: ModalApi) => Promise<void>
}

export const Controller = ({
  onCreate,
  onUpdate,
  onSaveAs,
  onImport,
}: ControllerProps) => {
  const { modal, setVisible } = useSettingsModal({
    initValues: {},
    async onFinish() {},
    onSaveAs: onSaveAs,
    onImport: () => onImport(modalApi),
  })

  const modalApi: ModalApi = {
    setVisible,
  }

  return (
    <>
      <Space
        direction="horizontal"
        style={{ width: '100%' }}
        split={<Divider type="vertical" />}
      >
        <Button type="text" onClick={onCreate}>
          {i18n.format('create')}
        </Button>
        <Button type="text" onClick={onUpdate}>
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
      {modal}
    </>
  )
}
