// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import ProductSpecs from './ProductSpecs'

const product = {
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  description: 'Flagship phone',
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: '3120 x 1440 pixels',
    mainCamera: '200 MP',
    selfieCamera: '12 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz',
  },
}

afterEach(cleanup)

describe('ProductSpecs', () => {
  test('renders every available product specification', () => {
    render(<ProductSpecs product={product} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Specifications' })
    ).toBeTruthy()

    const expectedSpecs = [
      ['Brand', 'Samsung'],
      ['Name', 'Galaxy S24 Ultra'],
      ['Description', 'Flagship phone'],
      ['Screen', '6.8" Dynamic AMOLED 2X'],
      ['Resolution', '3120 x 1440 pixels'],
      ['Main Camera', '200 MP'],
      ['Selfie Camera', '12 MP'],
      ['Battery', '5000 mAh'],
      ['OS', 'Android 14'],
      ['Screen Refresh Rate', '120 Hz'],
    ]

    expectedSpecs.forEach(([label, value]) => {
      expect(screen.getByText(label)).toBeTruthy()
      expect(screen.getByText(value)).toBeTruthy()
    })
  })

  test('omits specifications whose value is missing', () => {
    render(
      <ProductSpecs
        product={{
          ...product,
          specs: {
            ...product.specs,
            battery: null,
            selfieCamera: undefined,
          },
        }}
      />
    )

    expect(screen.queryByText('Battery')).toBeNull()
    expect(screen.queryByText('Selfie Camera')).toBeNull()
    expect(screen.getByText('Brand')).toBeTruthy()
    expect(screen.getByText('Samsung')).toBeTruthy()
  })
})
