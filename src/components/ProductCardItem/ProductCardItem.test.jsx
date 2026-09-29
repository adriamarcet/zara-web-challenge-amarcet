// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import ProductCardItem from './ProductCardItem'

describe('ProductCardItem', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders the product information and links to its detail page', () => {
    const product = {
      id: 'APL-IP15',
      brand: 'Apple',
      name: 'iPhone 15',
      basePrice: 959,
      imageUrl: 'https://example.com/iphone-15.png',
    }

    render(
      <MemoryRouter>
        <ul>
          <ProductCardItem product={product} />
        </ul>
      </MemoryRouter>
    )

    expect(screen.getByRole('listitem')).toBeTruthy()
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('iPhone 15')).toBeTruthy()
    expect(screen.getByText('959 EUR')).toBeTruthy()

    const productLink = screen.getByRole('link')
    expect(productLink.getAttribute('href')).toBe('/products/APL-IP15')

    const image = screen.getByRole('img', {
      name: 'iPhone 15 by Apple',
    })
    expect(image.getAttribute('src')).toBe(product.imageUrl)
  })
})
