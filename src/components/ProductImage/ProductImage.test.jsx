// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import ProductImage, { getRemoteSource } from './ProductImage'
import { optimizeProductImage } from './optimizeProductImage'

vi.mock('./optimizeProductImage', () => ({
  optimizeProductImage: vi.fn(),
}))

describe('ProductImage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  test('loads the database image directly before optimizing it', () => {
    const source = 'https://example.com/images/phone.webp'
    render(<ProductImage src={source} alt="Phone" />)

    const image = screen.getByRole('img', { name: 'Phone' })

    expect(image.getAttribute('src')).toBe(source)
    expect(image.getAttribute('crossorigin')).toBe('anonymous')
    expect(image.getAttribute('decoding')).toBe('async')
    expect(image.getAttribute('loading')).toBe('lazy')
  })

  test('replaces the remote source with the in-memory optimized image', async () => {
    const source = 'https://example.com/images/phone.webp'
    optimizeProductImage.mockResolvedValue('blob:optimized-phone')
    render(<ProductImage src={source} alt="Phone" />)

    const image = screen.getByRole('img', { name: 'Phone' })
    fireEvent.load(image)

    await waitFor(() => {
      expect(image.getAttribute('src')).toBe('blob:optimized-phone')
    })

    expect(optimizeProductImage).toHaveBeenCalledWith(source, image)
  })

  test('reports ready only after the optimized image has loaded', async () => {
    const source = 'https://example.com/images/phone.webp'
    const onReady = vi.fn()
    optimizeProductImage.mockResolvedValue('blob:optimized-phone')
    render(<ProductImage src={source} alt="Phone" onReady={onReady} />)

    const image = screen.getByRole('img', { name: 'Phone' })
    fireEvent.load(image)

    await waitFor(() => {
      expect(image.getAttribute('src')).toBe('blob:optimized-phone')
    })

    expect(onReady).not.toHaveBeenCalled()

    fireEvent.load(image)

    expect(onReady).toHaveBeenCalledTimes(1)
  })

  test('allows eager loading for a primary image', () => {
    render(
      <ProductImage
        src="https://example.com/images/phone.webp"
        alt="Phone"
        loading="eager"
        fetchPriority="high"
      />
    )

    const image = screen.getByRole('img', { name: 'Phone' })

    expect(image.getAttribute('loading')).toBe('eager')
    expect(image.getAttribute('fetchpriority')).toBe('high')
  })

  test('upgrades API image URLs to HTTPS before loading them', () => {
    expect(
      getRemoteSource(
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/phone.webp'
      )
    ).toBe(
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/phone.webp'
    )
  })
})
