// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { CartProvider } from '../features/cart/model/CartProvider'
import productsService from '../features/products/api/productsService'
import App from './App'

vi.mock('../features/products/api/productsService', () => ({
  default: {
    getAll: vi.fn(),
    getById: vi.fn(),
  },
}))

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  )
}

function createLocalStorageMock() {
  const values = new Map()

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  }
}

describe('App product data scope', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorageMock(),
    })
    productsService.getAll.mockResolvedValue([])
    productsService.getById.mockResolvedValue(null)
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  test('loads the catalog on the catalog route', async () => {
    renderRoute('/')

    await waitFor(() => expect(productsService.getAll).toHaveBeenCalledOnce())
    expect(productsService.getById).not.toHaveBeenCalled()
  })

  test('loads only the requested product on a detail route', async () => {
    renderRoute('/products/product-1')

    await waitFor(() =>
      expect(productsService.getById).toHaveBeenCalledWith(
        'product-1',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      )
    )
    expect(productsService.getAll).not.toHaveBeenCalled()
  })

  test('does not load products on the cart route', () => {
    renderRoute('/cart')

    expect(productsService.getAll).not.toHaveBeenCalled()
    expect(productsService.getById).not.toHaveBeenCalled()
  })
})
