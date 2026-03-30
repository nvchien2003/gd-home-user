
import { createRoot } from 'react-dom/client'
import './style/index.css'
import './style/main.scss'
import React from 'react'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './provider/AuthProvider'
import { Provider } from 'react-redux'
import { store } from './store'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
      <AppRouter />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
