import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './components/ProductList/ProductList'
import Filter from './components/Filter/Filter'
import ProductDetail from './components/ProductDetail/ProductDetail'

function NotFound() {
  return (
    <main className="container">
      <h1>Page not found</h1>
      <Link to="/">Go back to main page.</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Filter />
              <ProductList />
            </>
          }
        />
        <Route 
          path='/products/:productId' element={<ProductDetail />}
        />
        <Route 
          path='*' element={<NotFound />}
        />
      </Routes>
    </>
  )
}

export default App
