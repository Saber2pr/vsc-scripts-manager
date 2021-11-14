import { Form, Input, Modal, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import { callService } from '@saber2pr/vscode-webview'

import { i18n } from '../../i18n'
import { ScriptItem } from '../../type/interface'
import { getArray } from '../../utils/getArray'
import { FormCheckbox } from './checkbox'

import type { ArgsType, Services } from '../../../../src/api/type'

export interface RunnerProps {
  script: ScriptItem
  visible?: boolean
  onCancel: Function
}

export const Runner = ({ script, visible, onCancel }: RunnerProps) => {
  const [form] = Form.useForm()
  const [args, setArgs] = useState<ArgsType[]>([])
  const [loading, setLoading] = useState(false)

  const run = (values?: any) => {
    callService<Services, 'createTerminal'>('createTerminal', {
      path: script.path,
      args: values ? Object.values(values) : [],
    }).then(() => onCancel())
  }

  useEffect(() => {
    if (script?.path && visible) {
      setLoading(true)
      callService<Services, 'parseScriptArgs'>(
        'parseScriptArgs',
        script.path
      ).then(args => {
        setArgs(args)
        setLoading(false)
      })
    }
  }, [script?.path, visible])

  useEffect(() => {
    form.resetFields()
  }, [script, args])

  return (
    <Modal
      title={i18n.format('run')}
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          validateMessages={{
            required: i18n.format('required'),
          }}
          onFinish={run}
        >
          {getArray(args).map(arg => {
            let content = <Input />
            switch (arg.type) {
              case 'checkbox':
                content = <FormCheckbox />
                break
              case 'input':
                content = <Input />
                break
              case 'select':
                content = (
                  <Select>
                    {getArray(arg.values).map(item => (
                      <Select.Option value={item} key={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                )
                break
              default:
                break
            }
            return (
              <Form.Item
                key={arg.label}
                label={arg.label}
                name={arg.label}
                rules={[{ required: true }]}
              >
                {content}
              </Form.Item>
            )
          })}
          <Form.Item hidden>
            <Input type="submit" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
