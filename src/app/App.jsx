import { Route, Routes } from 'react-router-dom'

import CartPage from '../features/cart/CartPage'
import ProductList from '../features/products/catalog/ProductList/ProductList'
import ProductSearch from '../features/products/catalog/ProductSearch/ProductSearch'
import ProductDetail from '../features/products/detail/ProductDetail'
import { ProductsProvider } from '../features/products/model/ProductsProvider'
import Header from './layout/Header/Header'
import PageLayout from './layout/PageLayout'
import NotFoundPage from './routes/NotFoundPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={
              <ProductsProvider>
                <ProductSearch />
                <ProductList />
              </ProductsProvider>
            }
          />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
