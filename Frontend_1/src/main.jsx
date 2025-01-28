import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/UseContexts'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// import './output.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);