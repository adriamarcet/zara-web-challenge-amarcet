import formatPrice from '../../../utils/formatPrice'
import {
  ProductDetailFeaturedAction,
  ProductDetailFeaturedWrapper,
  ProductDetailFeaturedElement,
  ProductDetailFeaturedMedia,
  ProductDetailFeaturedImage,
  ProductDetailFeaturedInfo,
  ProductDetailFeaturedPrice,
  ProductDetailFeaturedTitle,
} from './ProductDetailFeatured.styles'
import ColorSelector from '../ColorSelector/ColorSelector'
import StorageSelector from '../StorageSelector/StorageSelector'

const ProductDetailFeatured = ({
  product,
  image,
  selectedCapacity,
  onStorageChange,
  displayedPrice,
  onColorChange,
  selectedColorName,
  canAddToCart,
  onAddToCart,
}) => {
  return (
    <ProductDetailFeaturedWrapper>
      <ProductDetailFeaturedElement>
        <ProductDetailFeaturedMedia>
          {image && (
            <ProductDetailFeaturedImage
              src={image}
              alt={`${product.name} de ${product.brand}`}
              width="1080"
              height="1080"
              loading="eager"
              fetchPriority="high"
            />
          )}
        </ProductDetailFeaturedMedia>
        <ProductDetailFeaturedInfo>
          <div>
            <ProductDetailFeaturedTitle className="font-l text-uppercase font-weight-light margin-block-end-xs">
              {product.name}
            </ProductDetailFeaturedTitle>
            <ProductDetailFeaturedPrice
              className="font-s font-weight-light"
              aria-live="polite"
              aria-atomic="true"
            >
              From {formatPrice(displayedPrice)} EUR
            </ProductDetailFeaturedPrice>
          </div>
          <div>
            <StorageSelector
              storageOptions={product.storageOptions}
              selectedCapacity={selectedCapacity}
              onStorageChange={onStorageChange}
            />
            <ColorSelector
              colorOptions={product.colorOptions}
              selectedColorName={selectedColorName}
              onColorChange={onColorChange}
            />
          </div>
          <ProductDetailFeaturedAction>
            <button
              type="button"
              className="button button--primary button--full"
              disabled={!canAddToCart}
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </ProductDetailFeaturedAction>
        </ProductDetailFeaturedInfo>
      </ProductDetailFeaturedElement>
    </ProductDetailFeaturedWrapper>
  )
}

export default ProductDetailFeatured
