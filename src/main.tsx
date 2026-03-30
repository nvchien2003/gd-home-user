
import { createRoot } from 'react-dom/client'
import './style/index.css'
import './style/main.scss'
import React from 'react'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './provider/AuthProvider'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

