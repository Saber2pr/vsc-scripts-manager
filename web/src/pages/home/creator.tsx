import Tabs from 'antd/lib/tabs'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import React, { useEffect, useState } from 'react'

import { i18n } from '../../i18n'
import { ScriptItem } from '../../type/interface'
import { SelectFile } from './select-file'

export interface CreatorProps {
  onSave(scriptItem: ScriptItem): void
  visible?: boolean
  onCancel: Function
  initialValues?: ScriptItem
}

export const Creator = ({
  onSave,
  onCancel,
  visible,
  initialValues,
}: CreatorProps) => {
  const isEdit = !!initialValues
  const [form] = Form.useForm()

  const [tab, setTab] = useState<ScriptItem['type']>()

  useEffect(() => {
    form.resetFields()
    setTab(initialValues?.type ?? 'file')
  }, [initialValues?.id, initialValues?.type])

  const isCli = tab === 'cli'

  return (
    <Modal
      title={isEdit ? i18n.format('edit') : i18n.format('create')}
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={i18n.format('ok')}
      cancelText={i18n.format('cancel')}
      forceRender
    >
      {isEdit || (
        <Tabs
          size="small"
          centered
          activeKey={tab}
          onChange={tab => setTab(tab as any)}
        >
          <Tabs.TabPane key="file" tab={i18n.format('file')}></Tabs.TabPane>
          <Tabs.TabPane key="cli" tab={i18n.format('cli')}></Tabs.TabPane>
        </Tabs>
      )}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialValues}
        validateMessages={{
          required: i18n.format('required'),
        }}
        form={form}
        onFinish={values => {
          onSave({
            id: initialValues?.id ?? Date.now(),
            ...values,
            type: tab,
          })
        }}
      >
        <Form.Item
          label={isCli ? i18n.format('cli') : i18n.format('file')}
          name="path"
          rules={[{ required: true }]}
        >
          {isCli ? <Input /> : <SelectFile />}
        </Form.Item>
        <Form.Item label={i18n.format('description')} name="description">
          <Input />
        </Form.Item>
        <Form.Item hidden>
          <Input type="submit" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
