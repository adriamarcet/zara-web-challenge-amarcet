import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  getOptimizationSize,
  removeConnectedWhiteBackground,
  revokeOptimizedImage,
} from './optimizeProductImage'

function createImageData(pixels, width, height) {
  return {
    data: new Uint8ClampedArray(pixels.flat()),
    width,
    height,
  }
}

describe('removeConnectedWhiteBackground', () => {
  test('removes white pixels connected to the image border', () => {
    const white = [255, 255, 255, 255]
    const red = [200, 0, 0, 255]
    const imageData = createImageData(
      [white, white, white, white, red, white, white, white, white],
      3,
      3
    )

    const result = removeConnectedWhiteBackground(imageData)

    expect(
      Array.from(result.data.filter((_, index) => index % 4 === 3))
    ).toEqual([0, 0, 0, 0, 255, 0, 0, 0, 0])
  })

  test('preserves image data when the corners are transparent', () => {
    const transparent = [0, 0, 0, 0]
    const white = [255, 255, 255, 255]
    const imageData = createImageData(
      [
        transparent,
        transparent,
        transparent,
        transparent,
        white,
        transparent,
        transparent,
        transparent,
        transparent,
      ],
      3,
      3
    )
    const original = Array.from(imageData.data)

    removeConnectedWhiteBackground(imageData)

    expect(Array.from(imageData.data)).toEqual(original)
  })
})

describe('getOptimizationSize', () => {
  function createImage({ clientWidth = 0, clientHeight = 0, width, height }) {
    return {
      clientWidth,
      clientHeight,
      getAttribute(attribute) {
        return { width, height }[attribute] ?? null
      },
    }
  }

  test('uses the rendered size and device pixel ratio', () => {
    const image = createImage({ clientWidth: 240, clientHeight: 190 })

    expect(getOptimizationSize(image, 2)).toBe(480)
  })

  test('caps large images and high-density screens at 1080 pixels', () => {
    const image = createImage({ clientWidth: 800, clientHeight: 800 })

    expect(getOptimizationSize(image, 3)).toBe(1080)
  })

  test('uses declared dimensions before the image has a rendered size', () => {
    const image = createImage({ width: '329', height: '257' })

    expect(getOptimizationSize(image, 1)).toBe(329)
  })
})

describe('revokeOptimizedImage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('releases object URLs and ignores remote sources', () => {
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {})

    revokeOptimizedImage('blob:optimized-phone')
    revokeOptimizedImage('https://example.com/phone.webp')

    expect(revokeObjectURL).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:optimized-phone')
  })
})
