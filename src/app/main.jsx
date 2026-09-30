import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../features/cart/model/CartProvider.jsx'
import { ProductsProvider } from '../features/products/model/ProductsProvider.jsx'
import '../shared/styles/variables.module.css'
import '../shared/styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>
)
