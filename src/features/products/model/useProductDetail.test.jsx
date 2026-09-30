// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import productsService from '../api/productsService'
import { useProductDetail } from './useProductDetail'

vi.mock('../api/productsService', () => ({ default: { getById: vi.fn() } }))
afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

test.each([{ id: 'first' }, null])(
  'loads a product or a missing response: %s',
  async (product) => {
    productsService.getById.mockResolvedValue(product)
    const { result } = renderHook(() => useProductDetail('first'))
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.product).toEqual(product)
    expect(result.current.error).toBe(false)
  }
)

test('reports a request failure', async () => {
  productsService.getById.mockRejectedValue(new Error('Network error'))
  const { result } = renderHook(() => useProductDetail('first'))
  await waitFor(() => expect(result.current.error).toBe(true))
  expect(result.current.loading).toBe(false)
  expect(result.current.product).toBeNull()
})

test('aborts previous requests and ignores late responses', async () => {
  let resolveFirst
  productsService.getById.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveFirst = resolve
      })
  )
  const { result, rerender, unmount } = renderHook(
    ({ id }) => useProductDetail(id),
    { initialProps: { id: 'first' } }
  )
  const firstSignal = productsService.getById.mock.calls[0][1].signal
  productsService.getById.mockResolvedValueOnce({ id: 'second' })
  rerender({ id: 'second' })
  expect(firstSignal.aborted).toBe(true)
  await waitFor(() => expect(result.current.product).toEqual({ id: 'second' }))
  await act(async () => resolveFirst({ id: 'first' }))
  expect(result.current.product).toEqual({ id: 'second' })
  const secondSignal = productsService.getById.mock.calls[1][1].signal
  unmount()
  expect(secondSignal.aborted).toBe(true)
})
