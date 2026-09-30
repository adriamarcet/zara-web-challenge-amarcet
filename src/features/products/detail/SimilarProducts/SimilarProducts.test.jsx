// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import SimilarProducts from './SimilarProducts'

const products = [
  {
    id: 'APL-IP15P',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    basePrice: 1219,
    imageUrl: 'https://example.com/iphone-15-pro.png',
  },
  {
    id: 'GPX-8A',
    brand: 'Google',
    name: 'Pixel 8a',
    basePrice: 459,
    imageUrl: 'https://example.com/pixel-8a.png',
  },
]

function renderSimilarItems(similarProducts = products) {
  return render(
    <MemoryRouter>
      <SimilarProducts products={similarProducts} />
    </MemoryRouter>
  )
}

describe('SimilarProducts', () => {
  afterEach(() => {
    cleanup()
  })

  test('does not render the section without similar products', () => {
    const { container } = renderSimilarItems([])

    expect(container.firstChild).toBeNull()
  })

  test('renders every similar product with a link to its detail page', () => {
    renderSimilarItems()

    expect(screen.getByRole('region', { name: 'Similar items' })).toBeTruthy()
    expect(screen.getByRole('list', { name: 'Similar products' })).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    const links = screen.getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/products/APL-IP15P',
      '/products/GPX-8A',
    ])
  })

  test('keeps the CSS scroll indicator with the product list', () => {
    const { container } = renderSimilarItems()
    const productList = screen.getByRole('list', { name: 'Similar products' })
    const scrollIndicator = container.querySelector('[aria-hidden="true"]')

    expect(scrollIndicator.children).toHaveLength(products.length)
    expect(scrollIndicator.parentElement).toBe(productList.parentElement)
  })
})
