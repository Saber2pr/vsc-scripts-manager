import Input from 'antd/lib/input'
import React from 'react'

import UploadOutlined from '@ant-design/icons/UploadOutlined'
import { callService } from '@saber2pr/vscode-webview'

import type { Services } from '../../../../src/api/type'

export interface SelectFileProps {
  value?: string
  onChange?: (path: string) => void
}

export const SelectFile = ({ value, onChange }: SelectFileProps) => {
  return (
    <Input
      readOnly
      value={value}
      addonAfter={
        <UploadOutlined
          onClick={async () => {
            if (onChange) {
              const path = await callService<Services, 'openFile'>(
                'openFile',
                null
              )
              if (path) {
                onChange(path)
              }
            }
          }}
        />
      }
    />
  )
}
