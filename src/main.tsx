import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Flag to indicate React has loaded via dev server
if (typeof window !== 'undefined') {
  (window as any).__REACT_LOADED__ = true;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
