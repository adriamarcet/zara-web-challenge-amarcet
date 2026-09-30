import formatPrice from '../../../../shared/lib/formatPrice'
import {
  ProductConfiguratorAction,
  ProductConfiguratorElement,
  ProductConfiguratorImage,
  ProductConfiguratorInfo,
  ProductConfiguratorMedia,
  ProductConfiguratorPrice,
  ProductConfiguratorTitle,
  ProductConfiguratorWrapper,
} from './ProductConfigurator.styles'
import ColorSelector from '../ColorSelector/ColorSelector'
import StorageSelector from '../StorageSelector/StorageSelector'

const ProductConfigurator = ({
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
    <ProductConfiguratorWrapper>
      <ProductConfiguratorElement>
        <ProductConfiguratorMedia>
          {image && (
            <ProductConfiguratorImage
              src={image}
              alt={`${product.name} de ${product.brand}`}
              width="1080"
              height="1080"
              loading="eager"
              fetchPriority="high"
            />
          )}
        </ProductConfiguratorMedia>
        <ProductConfiguratorInfo>
          <div>
            <ProductConfiguratorTitle className="font-l text-uppercase font-weight-light margin-block-end-xs">
              {product.name}
            </ProductConfiguratorTitle>
            <ProductConfiguratorPrice
              className="font-s font-weight-light"
              aria-live="polite"
              aria-atomic="true"
            >
              From {formatPrice(displayedPrice)} EUR
            </ProductConfiguratorPrice>
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
          <ProductConfiguratorAction>
            <button
              type="button"
              className="button button--primary button--full"
              disabled={!canAddToCart}
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </ProductConfiguratorAction>
        </ProductConfiguratorInfo>
      </ProductConfiguratorElement>
    </ProductConfiguratorWrapper>
  )
}

export default ProductConfigurator
