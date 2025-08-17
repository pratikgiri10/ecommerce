import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='top-right' />
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </Provider>,
)
