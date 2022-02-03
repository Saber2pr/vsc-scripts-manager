import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Space from 'antd/lib/space'
import React, { useEffect, useState } from 'react'

import { i18n } from '../../i18n'

export interface SettingsProps {
  visible?: boolean
  onCancel: VoidFunction
  onFinish: (values: FormValues) => Promise<void>
  onSaveAs: () => Promise<void>
  onImport: () => Promise<void>
  initValues?: FormValues
}

type FormValues = {}

export const SettingsModal: React.FC<SettingsProps> = ({
  visible,
  onCancel,
  onFinish,
  initValues,
  onSaveAs,
  onImport,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [initValues])

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={i18n.format('setting')}
      onOk={() => form.submit()}
      okText={i18n.format('confirm')}
      cancelText={i18n.format('cancel')}
    >
      {/* <Form form={form} onFinish={onFinish} initialValues={initValues}>
        <Form.Item
          label={i18n.format('scroll_virtual')}
          tooltip={i18n.format('scroll_virtual_tip')}
          name="virtual"
        >
          <FormCheckbox />
        </Form.Item>
      </Form> */}
      <Divider>{i18n.format('more_options')}</Divider>
      <Space split={<Divider type="vertical" />}>
        <Button type="text" onClick={onSaveAs}>
          {i18n.format('export')}
        </Button>
        <Button type="text" onClick={onImport}>
          {i18n.format('import')}
        </Button>
      </Space>
    </Modal>
  )
}

export interface SettingsModalOps {
  onFinish: (values: FormValues) => any
  onSaveAs: () => any
  onImport: () => Promise<void>
  initValues: FormValues
}

export const useSettingsModal = (ops: SettingsModalOps) => {
  const [visible, setVisible] = useState(false)
  return {
    modal: (
      <SettingsModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onFinish={ops.onFinish}
        initValues={ops.initValues}
        onSaveAs={ops.onSaveAs}
        onImport={ops.onImport}
      />
    ),
    setVisible,
  }
}
