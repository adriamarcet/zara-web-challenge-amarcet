import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProductsProvider } from './context/ProductsProvider.jsx'
import './reset.css'
import './globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>,
)
