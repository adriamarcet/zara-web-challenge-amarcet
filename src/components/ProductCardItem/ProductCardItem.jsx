import { useState } from 'react'
import formatPrice from '../../utils/formatPrice'
import {
  ProductCardItemElement,
  ProductCardItemLink,
  ProductCardImage,
  ProductCardImageSkeleton,
  ProductCardImageWrapper,
  ProductCardInfo,
  ProductCardSummary,
} from './ProductCardItem.styles'

function ProductCardItem({
  product,
  imageLoading = 'lazy',
  imageFetchPriority = 'auto',
}) {
  const [loadedImageUrl, setLoadedImageUrl] = useState(null)
  const imageLoaded = loadedImageUrl === product.imageUrl

  return (
    <ProductCardItemElement>
      <ProductCardItemLink to={`/products/${product.id}`}>
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
      </ProductCardItemLink>
    </ProductCardItemElement>
  )
}

export default ProductCardItem
