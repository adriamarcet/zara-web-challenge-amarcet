// Hook to deal with a specific ProductId query. Handles query, loading and error states.

import { useEffect, useState } from 'react'
import productsService from '../api/productsService'

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setLoading(true)
      setError(false)
      setProduct(null)

      try {
        const result = await productsService.getById(productId, {
          signal: controller.signal,
        })
        if (!controller.signal.aborted) {
          setProduct(result)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [productId])

  return { product, loading, error }
}
