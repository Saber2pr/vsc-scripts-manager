import Descriptions from 'antd/lib/descriptions'
import React from 'react'

import { useCopy } from '../../hooks/useCopy'

export const FormatFormContent: React.FC<{ values: any; id: string }> = ({
  values,
  id,
}) => {
  if (!values) return <></>
  const keys = Object.keys(values)
  const { target } = useCopy(`#${id}`)
  return (
    <div ref={target}>
      <Descriptions
        bordered
        column={1}
        layout="horizontal"
        labelStyle={{
          whiteSpace: 'nowrap',
        }}
      >
        {keys.map(key => (
          <Descriptions.Item key={key} label={key}>
            {values[key]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  )
}
