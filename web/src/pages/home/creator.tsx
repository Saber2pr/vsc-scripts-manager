import { Input, Modal, Form } from 'antd'
import React, { useEffect } from 'react'
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
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
  }, [initialValues])
  return (
    <Modal
      title={i18n.format('create')}
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
    >
      <Form
        initialValues={initialValues}
        validateMessages={{
          required: "'${name}' 是必选字段",
        }}
        form={form}
        onFinish={values => {
          onSave({
            id: initialValues?.id ?? Date.now(),
            ...values,
          })
        }}
      >
        <Form.Item
          label={i18n.format('path')}
          name="path"
          rules={[{ required: true }]}
        >
          <SelectFile />
        </Form.Item>
        <Form.Item label={i18n.format('description')} name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
