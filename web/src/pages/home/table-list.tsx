import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Table, { ColumnsType } from 'antd/lib/Table'
import React from 'react'
import { i18n } from '../../i18n'
import { ScriptItem } from '../../type/interface'
import { getArray } from '../../utils/getArray'
import { parsePathName } from '../../utils/parsePathName'
import { callService } from '@saber2pr/vscode-webview'
import { Services } from '../../../../src/api/type'

export interface TableListProps {
  list: ScriptItem[]
  onRun: (item: ScriptItem) => void
  onEdit: (item: ScriptItem) => void
  onDelete: (item: ScriptItem) => void
  loading?: boolean
}

export const TableList = ({
  list,
  onDelete,
  onEdit,
  onRun,
  loading,
}: TableListProps) => {
  const columns: ColumnsType<ScriptItem> = [
    {
      title: i18n.format('filename'),
      width: 200,
      dataIndex: 'path',
      render: path => (
        <Button
          type="link"
          onClick={() =>
            callService<Services, 'showFileEditor'>('showFileEditor', path)
          }
        >
          {parsePathName(path)}
        </Button>
      ),
    },
    {
      title: i18n.format('description'),
      dataIndex: 'description',
    },
    {
      title: i18n.format('option'),
      width: 114,
      render: (value, record, index) => {
        return (
          <Space size="small" direction="vertical">
            <Button type="link" onClick={() => onRun(record)}>
              {i18n.format('option_run')}
            </Button>
            <Button type="link" onClick={() => onEdit(record)}>
              {i18n.format('edit')}
            </Button>
            <Button type="link" onClick={() => onDelete(record)}>
              {i18n.format('delete')}
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <Table
      loading={loading}
      size="small"
      columns={columns}
      rowKey="id"
      dataSource={getArray(list)}
    >
      test
    </Table>
  )
}
