import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import createStore from './store/create-store'
import AppRoot from './components/app-root'

import ThemeProvider from './theme-provider'

import './index.css'

const store = createStore()

const App = () => (
  <ThemeProvider>
    <Provider store={store}>
      <AppRoot />
    </Provider>
  </ThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
