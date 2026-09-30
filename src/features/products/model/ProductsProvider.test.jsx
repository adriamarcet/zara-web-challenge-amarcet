// @vitest-environment jsdom

import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import productsService from '../api/productsService'
import { ProductsProvider } from './ProductsProvider'
import { useProducts } from './useProducts'

vi.mock('../api/productsService', () => ({
  default: {
    getAll: vi.fn(),
  },
}))

const wrapper = ({ children }) => (
  <ProductsProvider>{children}</ProductsProvider>
)

describe('ProductsProvider', () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  test('loads and stores products successfully', async () => {
    const products = [
      { id: '1', brand: 'Apple', name: 'iPhone 15', price: 959 },
    ]
    productsService.getAll.mockResolvedValue(products)

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(productsService.getAll).toHaveBeenCalledOnce()
      expect(result.current.products).toEqual(products)
      expect(result.current.loading).toBe(false)
    })
  })

  test('stores the error and finishes loading when the request fails', async () => {
    const error = new Error('Network error')
    productsService.getAll.mockRejectedValue(error)

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toBe(error)
      expect(result.current.loading).toBe(false)
    })
  })

  test('requests products again with search when the query changes', async () => {
    productsService.getAll.mockResolvedValue([])

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(productsService.getAll).toHaveBeenCalledOnce()
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setQuery('samsung')
    })

    await waitFor(() => {
      expect(productsService.getAll).toHaveBeenCalledTimes(2)
      expect(productsService.getAll).toHaveBeenLastCalledWith(
        expect.objectContaining({ search: 'samsung' })
      )
    })
  })
})
