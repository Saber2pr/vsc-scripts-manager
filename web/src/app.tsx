import './app.less'

import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'

import { callService } from '@saber2pr/vscode-webview'

import { Services } from '../../src/api/type'
import { i18n } from './i18n'
import { Home } from './pages'
import { APP_ARGS } from './utils'

export const App = () => {
  const history = useHistory<{ file?: string }>()
  useEffect(() => {
    callService<Services, 'getLang'>('getLang', null).then(language => {
      i18n.setLocal(language)
      history.push(
        APP_ARGS?.file
          ? `/home?file=${APP_ARGS.file}&name=${APP_ARGS?.name}`
          : `/home`
      )
    })
  }, [history])
  return (
    <div className="app" data-theme={APP_ARGS.theme ?? 'light'}>
      <Route path="/home" component={() => <Home />} />
    </div>
  )
}
