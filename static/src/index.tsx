import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from './components'
import { store } from './redux'
import history from './utils/history'


ReactDOM.render(
  <React.StrictMode>
    <Router history={ history }>
      <Provider store={ store }>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
