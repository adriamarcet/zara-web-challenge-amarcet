// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { ProductsContext } from '../../context/ProductsContext'
import Filter from './Filter'

describe('Filter', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('renders an accessible search input with a placeholder', () => {
    render(
      <ProductsContext.Provider
        value={{ products: [], loading: false, setQuery: vi.fn() }}
      >
        <Filter />
      </ProductsContext.Provider>,
    )

    const input = screen.getByRole('searchbox', {
      name: 'Search for a smartphone',
    })

    expect(input.getAttribute('placeholder')).toBe('Search for a smartphone')
  })

  test('clears the input and sends an empty query after the debounce', () => {
    vi.useFakeTimers()
    const setQuery = vi.fn()

    render(
      <ProductsContext.Provider
        value={{ products: [], loading: false, setQuery }}
      >
        <Filter />
      </ProductsContext.Provider>,
    )

    const input = screen.getByRole('searchbox', {
      name: 'Search for a smartphone',
    })
    fireEvent.change(input, { target: { value: 'iphone' } })
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(input.value).toBe('')
    expect(setQuery).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(setQuery).toHaveBeenCalledOnce()
    expect(setQuery).toHaveBeenCalledWith('')
  })

  test('shows an empty result count when there are no products and loading is false', () => {
    render(
      <ProductsContext.Provider
        value={{ products: [], loading: false, setQuery: vi.fn() }}
      >
        <Filter />
      </ProductsContext.Provider>,
    )

    expect(screen.getByRole('status').textContent).toBe('0 results')
  })
})
