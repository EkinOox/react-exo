import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './components/auth/AuthContext'
import { AppErrorWrapper } from './components/error/AppErrorWrapper'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import store from '../src/redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorWrapper>
      <AuthProvider>
        <BrowserRouter>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </AppErrorWrapper>
  </StrictMode>,
)
