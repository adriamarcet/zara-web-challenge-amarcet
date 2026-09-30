// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, test, vi } from 'vitest'

import cartActive from '../../assets/cartActive.svg'
import { CartProvider } from '../../context/CartProvider'
import { useCart } from '../../context/useCart'
import productsService from '../../services/productsService'
import Header from '../Header'
import ProductDetail from './ProductDetail'

vi.mock('../../services/productsService', () => ({
  default: {
    getById: vi.fn(),
  },
}))

const product = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1099,
  description: 'Samsung flagship phone',
  storageOptions: [
    { capacity: '256 GB', price: 1099 },
    { capacity: '512 GB', price: 1199 },
  ],
  colorOptions: [
    {
      name: 'Titanium Gray',
      hexCode: '#70706e',
      imageUrl: 'https://example.com/galaxy-s24-ultra-gray.png',
    },
    {
      name: 'Titanium Black',
      hexCode: '#4c4c54',
      imageUrl: 'https://example.com/galaxy-s24-ultra-black.png',
    },
  ],
  similarProducts: [],
}

function CartContents() {
  const { items } = useCart()

  return <output data-testid="cart-contents">{JSON.stringify(items)}</output>
}

function renderProductDetail() {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={['/products/SMG-S24U']}>
        <Header />
        <CartContents />
        <Routes>
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('ProductDetail cart flow', () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  test('adds the selected product variant and updates the header cart', async () => {
    productsService.getById.mockResolvedValue(product)
    renderProductDetail()

    const addToCartButton = await screen.findByRole('button', {
      name: 'Add to cart',
    })
    expect(addToCartButton.disabled).toBe(true)
    expect(
      screen.getByRole('link', {
        name: 'Cesta de la compra, 0 productos',
      })
    ).toBeTruthy()

    fireEvent.click(screen.getByRole('radio', { name: '256 GB' }))
    fireEvent.click(screen.getByRole('radio', { name: 'Titanium Gray' }))

    expect(addToCartButton.disabled).toBe(false)
    fireEvent.click(addToCartButton)

    await waitFor(() => {
      const cartButton = screen.getByRole('link', {
        name: 'Cesta de la compra, 1 producto',
      })

      expect(cartButton.textContent).toBe('1')
      expect(cartButton.querySelector('img').getAttribute('src')).toBe(
        cartActive
      )
      expect(
        JSON.parse(screen.getByTestId('cart-contents').textContent)
      ).toEqual([
        {
          lineId: expect.any(String),
          productId: 'SMG-S24U',
          brand: 'Samsung',
          name: 'Galaxy S24 Ultra',
          capacity: '256 GB',
          colorName: 'Titanium Gray',
          imageUrl: 'https://example.com/galaxy-s24-ultra-gray.png',
          price: 1099,
          quantity: 1,
        },
      ])
    })
  })
})
