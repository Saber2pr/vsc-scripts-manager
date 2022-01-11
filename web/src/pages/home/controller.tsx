import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import React from 'react'

import { i18n } from '../../i18n'

export interface ControllerProps {
  onCreate(): void
  onUpdate(): void
}

export const Controller = ({ onCreate, onUpdate }: ControllerProps) => {
  return (
    <Space direction="horizontal" style={{ width: '100%' }}>
      <Button size="small" onClick={onCreate}>{i18n.format('create')}</Button>
      <Button size="small" onClick={onUpdate}>{i18n.format('update')}</Button>
    </Space>
  )
}
