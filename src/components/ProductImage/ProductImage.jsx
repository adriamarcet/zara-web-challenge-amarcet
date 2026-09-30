import { useEffect, useRef, useState } from 'react'
import { optimizeProductImage } from './optimizeProductImage'

function getRemoteSource(source) {
  if (!source) return source

  try {
    const url = new URL(source)

    if (
      url.protocol === 'http:' &&
      url.hostname === 'prueba-tecnica-api-tienda-moviles.onrender.com'
    ) {
      url.protocol = 'https:'
    }

    return url.toString()
  } catch {
    return source
  }
}

function ProductImage({
  src,
  alt,
  className,
  decoding = 'async',
  loading = 'lazy',
  onLoad,
  onReady,
  ...imageProps
}) {
  const remoteSource = getRemoteSource(src)
  const [displaySource, setDisplaySource] = useState(remoteSource)
  const currentSource = useRef(remoteSource)

  useEffect(() => {
    currentSource.current = remoteSource
    setDisplaySource(remoteSource)
  }, [remoteSource])

  function handleLoad(event) {
    onLoad?.(event)

    if (displaySource !== remoteSource) {
      onReady?.()
      return
    }

    optimizeProductImage(remoteSource, event.currentTarget).then(
      (optimizedSource) => {
        if (currentSource.current === remoteSource) {
          if (optimizedSource === remoteSource) {
            onReady?.()
            return
          }

          setDisplaySource(optimizedSource)
        }
      }
    )
  }

  return (
    <picture className={className}>
      <img
        {...imageProps}
        src={displaySource}
        alt={alt}
        crossOrigin="anonymous"
        decoding={decoding}
        loading={loading}
        onLoad={handleLoad}
      />
    </picture>
  )
}

export { getRemoteSource }
export default ProductImage
