import { useState } from 'react'
import formatPrice from '../../../../shared/lib/formatPrice'
import {
  ProductCardElement,
  ProductCardImage,
  ProductCardImageSkeleton,
  ProductCardImageWrapper,
  ProductCardInfo,
  ProductCardLink,
  ProductCardSummary,
} from './ProductCard.styles'

function ProductCard({
  product,
  imageLoading = 'lazy',
  imageFetchPriority = 'auto',
}) {
  const [loadedImageUrl, setLoadedImageUrl] = useState(null)
  const imageLoaded = loadedImageUrl === product.imageUrl

  return (
    <ProductCardElement>
      <ProductCardLink to={`/products/${product.id}`}>
        <ProductCardImageWrapper>
          <ProductCardImageSkeleton
            data-testid="product-image-skeleton"
            $loaded={imageLoaded}
          />
          <ProductCardImage
            src={product.imageUrl}
            width="329"
            height="257"
            alt={`${product.name} by ${product.brand}`}
            $loaded={imageLoaded}
            loading={imageLoading}
            fetchPriority={imageFetchPriority}
            onReady={() => setLoadedImageUrl(product.imageUrl)}
          />
        </ProductCardImageWrapper>

        <ProductCardInfo>
          <p className="font-xs text-uppercase">{product.brand}</p>
          <ProductCardSummary>
            <p className="font-s text-uppercase">{product.name}</p>
            <p className="font-s text-uppercase">
              {formatPrice(product.basePrice)} EUR
            </p>
          </ProductCardSummary>
        </ProductCardInfo>
      </ProductCardLink>
    </ProductCardElement>
  )
}

export default ProductCard
