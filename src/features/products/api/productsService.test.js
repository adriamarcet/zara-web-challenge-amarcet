import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import productsService from './productsService'

const API_KEY = 'test-api-key'

beforeEach(() => {
  vi.stubEnv('VITE_X_API_KEY', API_KEY)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('productsService.getAll', () => {
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

  test('sends the x-api-key header', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    })
    vi.stubGlobal('fetch', fetchMock)

    await productsService.getAll()

    const [, options] = fetchMock.mock.calls[0]
    expect(options.headers['x-api-key']).toBe(API_KEY)
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

  test('deduplicates by id and returns at most 20 products', async () => {
    const products = Array.from({ length: 24 }, (_, index) => ({
      id: `P${index}`,
    }))
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([products[0], ...products]),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await productsService.getAll()

    const [url] = fetchMock.mock.calls[0]
    expect(Number(new URL(url).searchParams.get('limit'))).toBeGreaterThan(20)
    expect(result).toHaveLength(20)
    expect(new Set(result.map((product) => product.id)).size).toBe(20)
  })

  test('throws an error when the response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)

    await expect(productsService.getAll()).rejects.toThrow(
      'Failed to fetch products'
    )
  })
})

describe('productsService.getById', () => {
  test('requests the product endpoint using GET with the x-api-key header', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 'ABC' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const product = await productsService.getById('ABC')

    expect(fetchMock).toHaveBeenCalledOnce()

    const [url, options] = fetchMock.mock.calls[0]
    expect(new URL(url).pathname).toBe('/products/ABC')
    expect(options.method).toBe('GET')
    expect(options.headers['x-api-key']).toBe(API_KEY)
    expect(product).toEqual({ id: 'ABC' })
  })

  test('returns null when the product is not found', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 404 })
    vi.stubGlobal('fetch', fetchMock)

    await expect(productsService.getById('missing')).resolves.toBeNull()
  })

  test('throws an error when the response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    vi.stubGlobal('fetch', fetchMock)

    await expect(productsService.getById('ABC')).rejects.toThrow(
      'Failed to fetch product by ID'
    )
  })
})
