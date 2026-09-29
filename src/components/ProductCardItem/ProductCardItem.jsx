import formatPrice from '../../utils/formatPrice'
import {
  ProductCardItemElement,
  ProductCardItemLink,
  ProductCardImage,
  ProductCardImageWrapper,
  ProductCardInfo,
  ProductCardSummary,
} from './ProductCardItem.styles'

function ProductCardItem({ product }) {
  return (
    <ProductCardItemElement>
      <ProductCardItemLink to={`/products/${product.id}`}>
        <ProductCardImageWrapper>
          <ProductCardImage
            src={product.imageUrl}
            width="329"
            height="257"
            alt={`${product.name} by ${product.brand}`}
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
