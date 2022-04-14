import React, { useMemo } from 'react'
import MenuOutlined from '@ant-design/icons/MenuOutlined'

import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
} from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import { i18n } from '../../i18n'
import Table, { ColumnsType, TableProps } from 'antd/lib/Table'

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
))
const SortableItem = sortableElement(props => <tr {...props} />)
const SortableContainer = sortableContainer(props => <tbody {...props} />)

export function SortTable<T extends { id: string }>({
  columns,
  dataSource,
  onSort,
  ...props
}: TableProps<T> & { onSort: (data: T[]) => void }) {
  // 添加拖拽icon
  const columnsNew = useMemo(
    () =>
      [
        {
          title: i18n.format('sort'),
          key: 'sort',
          width: 72,
          align: 'center',
          className: 'drag-visible',
          render: () => <DragHandle />,
        } as ColumnsType<T>[0],
      ].concat(columns),
    [columns]
  )

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter(el => !!el)
      onSort(newData)
    }
  }

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = dataSource.findIndex(x => x.id === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }

  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  return (
    <Table
      {...props}
      dataSource={dataSource}
      pagination={false}
      columns={columnsNew}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  )
}
