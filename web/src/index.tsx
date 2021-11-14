import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import { setLogLevel } from 'webpack-dev-server/client/utils/log'

import { App } from './app'

setLogLevel('none')

ReactDOM.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  document.querySelector('#root')
)
