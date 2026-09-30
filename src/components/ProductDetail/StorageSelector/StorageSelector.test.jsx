// TO DO
// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import StorageSelector from './StorageSelector'

const storageOptions = [
  { capacity: '128 GB', price: 499 },
  { capacity: '256 GB', price: 599 },
]

afterEach(cleanup)

describe('StorageSelector', () => {
  test('renders the storage options and marks the selected capacity', () => {
    render(
      <StorageSelector
        storageOptions={storageOptions}
        selectedCapacity="256 GB"
        onStorageChange={vi.fn()}
      />
    )

    const options = screen.getAllByRole('radio')

    expect(options).toHaveLength(2)
    expect(screen.getByRole('radio', { name: '128 GB' }).checked).toBe(false)
    expect(screen.getByRole('radio', { name: '256 GB' }).checked).toBe(true)
  })

  test('notifies the selected capacity when an option changes', () => {
    const onStorageChange = vi.fn()

    render(
      <StorageSelector
        storageOptions={storageOptions}
        selectedCapacity={null}
        onStorageChange={onStorageChange}
      />
    )

    fireEvent.click(screen.getByRole('radio', { name: '128 GB' }))

    expect(onStorageChange).toHaveBeenCalledOnce()
    expect(onStorageChange).toHaveBeenCalledWith('128 GB')
  })
})
