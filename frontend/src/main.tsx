import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)