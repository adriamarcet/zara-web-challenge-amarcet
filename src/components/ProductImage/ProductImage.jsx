import { useEffect, useRef, useState } from 'react'
import {
  optimizeProductImage,
  revokeOptimizedImage,
} from './optimizeProductImage'
import { getRemoteSource } from './productImageUtils'

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
  const optimizedSource = useRef(null)

  useEffect(() => {
    currentSource.current = remoteSource
    setDisplaySource(remoteSource)

    return () => {
      currentSource.current = null
      revokeOptimizedImage(optimizedSource.current)
      optimizedSource.current = null
    }
  }, [remoteSource])

  function handleLoad(event) {
    onLoad?.(event)

    if (displaySource !== remoteSource) {
      onReady?.()
      return
    }

    optimizeProductImage(remoteSource, event.currentTarget).then(
      (nextOptimizedSource) => {
        if (currentSource.current !== remoteSource) {
          revokeOptimizedImage(nextOptimizedSource)
          return
        }

        if (nextOptimizedSource === remoteSource) {
          onReady?.()
          return
        }

        optimizedSource.current = nextOptimizedSource
        setDisplaySource(nextOptimizedSource)
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

export default ProductImage
