import { describe, expect, test } from 'vitest'
import { removeConnectedWhiteBackground } from './optimizeProductImage'

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

    expect(Array.from(result.data.filter((_, index) => index % 4 === 3))).toEqual(
      [0, 0, 0, 0, 255, 0, 0, 0, 0]
    )
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
