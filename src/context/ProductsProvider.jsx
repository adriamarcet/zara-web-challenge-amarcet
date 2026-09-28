import { useState, useEffect } from 'react'
import { ProductsContext } from './ProductsContext'
import productsService from '../services/productsService'

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function populateProducts() {
      try {
        setLoading(true)
        setError(null)

        const products = await productsService.getAll({
          search: query,
          signal: controller.signal,
        })

        setProducts(products)
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    populateProducts()

    return () => {
      controller.abort()
    }
  }, [query])

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, query, setQuery }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
