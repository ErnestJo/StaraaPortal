import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Provider } from 'react-redux'
import store from './store'
import { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
