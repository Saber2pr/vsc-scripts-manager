import { Button } from 'antd'
import Space from 'antd/lib/space'
import React from 'react'
import { i18n } from '../../i18n'

export interface ControllerProps {
  onCreate(): void
  onUpdate(): void
}

export const Controller = ({ onCreate }: ControllerProps) => {
  return (
    <Space direction="horizontal" style={{ width: '100%' }}>
      <Button onClick={onCreate}>{i18n.format('create')}</Button>
    </Space>
  )
}
