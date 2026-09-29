// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { CartContext } from '../../context/CartContext'
import Header from '../Header'
import CartPage from './CartPage'

const cartItem = {
  lineId: 'line-1',
  productId: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  capacity: '512 GB',
  colorName: 'Titanium Violet',
  imageUrl: 'https://example.com/galaxy-s24-ultra-violet.png',
  price: 1199,
  quantity: 1,
}

function renderCartNavigation({
  initialPath = '/',
  items = [],
  itemCount = 0,
  cartTotal = 0,
  removeItem = () => {},
} = {}) {
  return render(
    <CartContext.Provider
      value={{
        itemCount,
        items,
        cartTotal,
        addItem: () => {},
        removeItem,
      }}
    >
      <MemoryRouter initialEntries={[initialPath]}>
        <Header />
        <Routes>
          <Route path="/" element={<p>Product list</p>} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </MemoryRouter>
    </CartContext.Provider>
  )
}

describe('CartPage navigation', () => {
  afterEach(cleanup)

  test('opens the cart from the header and hides the cart action there', () => {
    renderCartNavigation({
      items: [cartItem],
      itemCount: 1,
      cartTotal: 1199,
    })

    const cartLink = screen.getByRole('link', {
      name: 'Cesta de la compra, 1 producto',
    })

    expect(cartLink.getAttribute('href')).toBe('/cart')
    fireEvent.click(cartLink)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Cart (1)' })
    ).toBeTruthy()
    expect(
      screen.queryByRole('link', { name: /Cesta de la compra/ })
    ).toBeNull()

    const continueShoppingLink = screen.getByRole('link', {
      name: 'Continue shopping',
    })

    expect(continueShoppingLink.getAttribute('href')).toBe('/')
    fireEvent.click(continueShoppingLink)

    expect(screen.getByText('Product list')).toBeTruthy()
    expect(
      screen.getByRole('link', {
        name: 'Cesta de la compra, 1 producto',
      })
    ).toBeTruthy()
  })

  test('renders the empty cart count when visiting the route directly', () => {
    renderCartNavigation({ initialPath: '/cart' })

    expect(
      screen.getByRole('heading', { level: 1, name: 'Cart (0)' })
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: 'MBST Shop' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Continue shopping' })).toBeTruthy()
    expect(
      screen.queryByRole('link', { name: /Cesta de la compra/ })
    ).toBeNull()
    expect(screen.queryByRole('button', { name: 'Pay' })).toBeNull()
    expect(screen.queryByText('Total')).toBeNull()
  })

  test('renders a cart item, its total and the payment action', () => {
    const removeItem = vi.fn()

    renderCartNavigation({
      initialPath: '/cart',
      items: [cartItem],
      itemCount: 1,
      cartTotal: 1199,
      removeItem,
    })

    expect(screen.getByRole('list', { name: 'Cart items' })).toBeTruthy()
    expect(
      screen.getByRole('img', {
        name: 'Galaxy S24 Ultra, Titanium Violet',
      })
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Galaxy S24 Ultra' })
    ).toBeTruthy()
    expect(screen.getByText('512 GB | Titanium Violet')).toBeTruthy()
    expect(screen.getAllByText('1199 EUR')).toHaveLength(2)
    expect(screen.getByText('Total')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Pay' })).toBeTruthy()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Galaxy S24 Ultra, 512 GB, Titanium Violet',
      })
    )

    expect(removeItem).toHaveBeenCalledWith(cartItem.lineId)
  })
})
