import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NusaSite from './pages/NusaSite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NusaSite />
  </StrictMode>,
)
