import { Provider } from './components/ui/provider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { ApiProvider } from './ApiProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
      <App /> 
      </Provider>
    </BrowserRouter>  
  </StrictMode>,
)
