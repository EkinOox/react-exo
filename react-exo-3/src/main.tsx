import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './components/auth/AuthContext'
import { AppErrorWrapper } from './components/error/AppErrorWrapper'
import './index.css'
import AppRoutes from './routes/AppRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorWrapper>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </AppErrorWrapper>
  </StrictMode>,
)
