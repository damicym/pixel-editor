import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CanvasConfigProvider } from './components/CanvasConfigProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CanvasConfigProvider>
      <App />
    </CanvasConfigProvider>
  </StrictMode>,
)
