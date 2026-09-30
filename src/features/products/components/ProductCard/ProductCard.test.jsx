// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { optimizeProductImage } from '../ProductImage/optimizeProductImage'
import ProductCard from './ProductCard'

vi.mock('../ProductImage/optimizeProductImage', () => ({
  optimizeProductImage: vi.fn(),
  revokeOptimizedImage: vi.fn(),
}))

describe('ProductCard', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  test('renders the product information and links to its detail page', async () => {
    const product = {
      id: 'APL-IP15',
      brand: 'Apple',
      name: 'iPhone 15',
      basePrice: 959,
      imageUrl: 'https://example.com/iphone-15.png',
    }
    optimizeProductImage.mockResolvedValue(product.imageUrl)

    render(
      <MemoryRouter>
        <ul>
          <ProductCard product={product} />
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

    const skeleton = screen.getByTestId('product-image-skeleton')

    expect(skeleton.tagName).toBe('DIV')
    expect(getComputedStyle(skeleton).opacity).toBe('1')

    fireEvent.load(image)

    await waitFor(() => {
      expect(getComputedStyle(skeleton).opacity).toBe('0')
      expect(getComputedStyle(image.parentElement).opacity).toBe('1')
    })
  })
})
