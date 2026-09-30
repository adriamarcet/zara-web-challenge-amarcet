// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { ProductsContext } from '../../model/ProductsContext'
import ProductList from './ProductList'

function renderProductList(value) {
  return render(
    <MemoryRouter>
      <ProductsContext.Provider value={value}>
        <ProductList />
      </ProductsContext.Provider>
    </MemoryRouter>
  )
}

describe('ProductList', () => {
  afterEach(() => {
    cleanup()
  })

  test('shows Loading when products are empty and loading is true', () => {
    renderProductList({ products: [], loading: true, error: null })

    expect(screen.getByRole('status').textContent).toBe('Loading')
  })

  test('renders the product list with its image and product information', () => {
    const products = [
      {
        id: '1',
        brand: 'Apple',
        name: 'iPhone 15',
        basePrice: 959,
        imageUrl: 'https://example.com/iphone-15.png',
      },
    ]

    renderProductList({ products, loading: false, error: null })

    expect(screen.getByRole('list', { name: 'Products list' })).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    const image = screen.getByRole('img', {
      name: 'iPhone 15 by Apple',
    })
    expect(image.getAttribute('src')).toBe('https://example.com/iphone-15.png')
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('iPhone 15')).toBeTruthy()
    expect(screen.getByText('959 EUR')).toBeTruthy()

    const productLink = screen.getByRole('link')
    expect(productLink.getAttribute('href')).toBe('/products/1')
  })
})
