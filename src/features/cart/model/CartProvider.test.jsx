// @vitest-environment jsdom

import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { CART_STORAGE_KEY, CartProvider } from './CartProvider'
import { useCart } from './useCart'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const productVariant = {
  productId: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  capacity: '256 GB',
  colorName: 'Titanium Gray',
  imageUrl: 'https://example.com/galaxy-s24-ultra.png',
  price: 1099,
}

function createLocalStorageMock() {
  const values = new Map()

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  }
}

describe('CartProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorageMock(),
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('creates a unique cart line for every added variant', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)

    act(() => {
      result.current.addItem(productVariant)
    })

    expect(result.current.items).toEqual([
      {
        ...productVariant,
        lineId: expect.any(String),
        quantity: 1,
      },
    ])
    expect(result.current.itemCount).toBe(1)

    act(() => {
      result.current.addItem(productVariant)
      result.current.addItem({
        ...productVariant,
        colorName: 'Titanium Black',
      })
    })

    expect(result.current.items).toHaveLength(3)
    expect(new Set(result.current.items.map((item) => item.lineId)).size).toBe(
      3
    )
    expect(result.current.items.every((item) => item.quantity === 1)).toBe(true)
    expect(result.current.items[0].colorName).toBe('Titanium Gray')
    expect(result.current.items[1].colorName).toBe('Titanium Gray')
    expect(result.current.items[2].colorName).toBe('Titanium Black')
    expect(result.current.itemCount).toBe(3)
    expect(result.current.cartTotal).toBe(3297)
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY))).toEqual(
      result.current.items
    )

    const removedLineId = result.current.items[0].lineId

    act(() => result.current.removeItem(removedLineId))

    expect(result.current.items).toHaveLength(2)
    expect(
      result.current.items.some((item) => item.lineId === removedLineId)
    ).toBe(false)
    expect(result.current.items.map((item) => item.colorName)).toEqual([
      'Titanium Gray',
      'Titanium Black',
    ])
    expect(result.current.itemCount).toBe(2)
    expect(result.current.cartTotal).toBe(2198)
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY))).toEqual(
      result.current.items
    )
  })

  test('restores the cart after the provider is mounted again', () => {
    const firstRender = renderHook(() => useCart(), { wrapper })

    act(() => {
      firstRender.result.current.addItem(productVariant)
    })

    const storedLineId = firstRender.result.current.items[0].lineId

    firstRender.unmount()

    const secondRender = renderHook(() => useCart(), { wrapper })

    expect(secondRender.result.current.items).toEqual([
      { ...productVariant, lineId: storedLineId, quantity: 1 },
    ])
    expect(secondRender.result.current.itemCount).toBe(1)
    expect(secondRender.result.current.cartTotal).toBe(1099)
  })

  test('ignores invalid persisted cart data', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, '{invalid json')

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)
    expect(result.current.cartTotal).toBe(0)
  })

  test('migrates grouped persisted quantities into unique cart lines', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ ...productVariant, quantity: 2 }])
    )

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toHaveLength(2)
    expect(new Set(result.current.items.map((item) => item.lineId)).size).toBe(
      2
    )
    expect(result.current.items.every((item) => item.quantity === 1)).toBe(true)
    expect(result.current.itemCount).toBe(2)
    expect(result.current.cartTotal).toBe(2198)
  })
})
