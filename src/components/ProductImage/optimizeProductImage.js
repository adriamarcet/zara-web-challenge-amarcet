const OUTPUT_SIZE = 1080
const WHITE_THRESHOLD = 238
const optimizedImages = new Map()

function isOpaqueWhite(data, pixelIndex) {
  const offset = pixelIndex * 4

  return (
    data[offset] >= WHITE_THRESHOLD &&
    data[offset + 1] >= WHITE_THRESHOLD &&
    data[offset + 2] >= WHITE_THRESHOLD &&
    data[offset + 3] >= 250
  )
}

function removeConnectedWhiteBackground(imageData) {
  const { data, width, height } = imageData
  const cornerIndexes = [0, width - 1, (height - 1) * width, width * height - 1]
  const hasWhiteBackground =
    cornerIndexes.filter((index) => isOpaqueWhite(data, index)).length >= 2

  if (!hasWhiteBackground) return imageData

  const visited = new Uint8Array(width * height)
  const queue = new Uint32Array(width * height)
  let readIndex = 0
  let writeIndex = 0

  function enqueue(pixelIndex) {
    if (visited[pixelIndex] || !isOpaqueWhite(data, pixelIndex)) return

    visited[pixelIndex] = 1
    queue[writeIndex] = pixelIndex
    writeIndex += 1
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x)
    enqueue((height - 1) * width + x)
  }

  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width)
    enqueue(y * width + width - 1)
  }

  while (readIndex < writeIndex) {
    const pixelIndex = queue[readIndex]
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)

    readIndex += 1
    data[pixelIndex * 4 + 3] = 0

    if (x > 0) enqueue(pixelIndex - 1)
    if (x < width - 1) enqueue(pixelIndex + 1)
    if (y > 0) enqueue(pixelIndex - width)
    if (y < height - 1) enqueue(pixelIndex + width)
  }

  return imageData
}

function waitForIdleTime() {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(resolve, { timeout: 500 })
      return
    }

    window.setTimeout(resolve, 0)
  })
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('The optimized image could not be encoded'))
      },
      'image/webp',
      0.82
    )
  })
}

async function createOptimizedImage(image) {
  await waitForIdleTime()

  const sourceWidth = image.naturalWidth
  const sourceHeight = image.naturalHeight

  if (!sourceWidth || !sourceHeight) return image.currentSrc || image.src

  const scale = Math.min(OUTPUT_SIZE / sourceWidth, OUTPUT_SIZE / sourceHeight)
  const renderedWidth = Math.max(1, Math.round(sourceWidth * scale))
  const renderedHeight = Math.max(1, Math.round(sourceHeight * scale))
  const sourceCanvas = document.createElement('canvas')
  const sourceContext = sourceCanvas.getContext('2d', {
    willReadFrequently: true,
  })

  if (!sourceContext) return image.currentSrc || image.src

  sourceCanvas.width = renderedWidth
  sourceCanvas.height = renderedHeight
  sourceContext.drawImage(image, 0, 0, renderedWidth, renderedHeight)

  const imageData = sourceContext.getImageData(
    0,
    0,
    renderedWidth,
    renderedHeight
  )

  sourceContext.putImageData(removeConnectedWhiteBackground(imageData), 0, 0)

  const outputCanvas = document.createElement('canvas')
  const outputContext = outputCanvas.getContext('2d')

  if (!outputContext) return image.currentSrc || image.src

  outputCanvas.width = OUTPUT_SIZE
  outputCanvas.height = OUTPUT_SIZE
  outputContext.drawImage(
    sourceCanvas,
    Math.round((OUTPUT_SIZE - renderedWidth) / 2),
    Math.round((OUTPUT_SIZE - renderedHeight) / 2)
  )

  const blob = await canvasToBlob(outputCanvas)
  return URL.createObjectURL(blob)
}

function optimizeProductImage(source, image) {
  if (!optimizedImages.has(source)) {
    optimizedImages.set(
      source,
      createOptimizedImage(image).catch(() => source)
    )
  }

  return optimizedImages.get(source)
}

export { optimizeProductImage, removeConnectedWhiteBackground }
