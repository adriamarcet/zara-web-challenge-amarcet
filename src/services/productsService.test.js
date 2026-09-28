import { afterEach, describe, expect, test, vi } from 'vitest'

import productsService from './productsService'

describe('productsService.getAll', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('requests the products endpoint using GET', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    })
    vi.stubGlobal('fetch', fetchMock)

    await productsService.getAll()

    expect(fetchMock).toHaveBeenCalledOnce()

    const [url, options] = fetchMock.mock.calls[0]
    expect(new URL(url).pathname).toBe('/products')
    expect(options.method).toBe('GET')
  })

  test('adds the search parameter when a search value is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    })
    vi.stubGlobal('fetch', fetchMock)

    await productsService.getAll({ search: 'iphone' })

    const [url] = fetchMock.mock.calls[0]
    expect(new URL(url).searchParams.get('search')).toBe('iphone')
  })

  test('throws an error when the response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)

    await expect(productsService.getAll()).rejects.toThrow(
      'Failed to fetch products',
    )
  })
})
