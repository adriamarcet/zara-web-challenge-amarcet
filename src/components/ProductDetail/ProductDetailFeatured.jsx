import formatPrice from '../../utils/formatPrice'
import { 
    ProductDetailFeaturedWrapper, 
    ProductDetailFeaturedElement, 
    ProductDetailFeaturedMedia, 
    ProductDetailFeaturedImage, 
    ProductDetailFeaturedInfo 
} from './ProductDetailFeatured.styles'
import StorageSelector from './StorageSelector'
import ColorSelector from './ColorSelector'

const ProductDetailFeatured = ({ 
    product, 
    image, 
    selectedCapacity, 
    onStorageChange, 
    displayedPrice,
    onColorChange,
    selectedColorName,
    canAddToCart
}) => {

    return (
        <ProductDetailFeaturedWrapper>
            <ProductDetailFeaturedElement>
                <ProductDetailFeaturedMedia>
                    {image && <ProductDetailFeaturedImage src={image} alt={`${product.name} de ${product.brand}`} />}
                </ProductDetailFeaturedMedia>
                <ProductDetailFeaturedInfo>
                    <div>
                        <h1 className="font-l text-uppercase font-weight-light margin-block-end-xs">{product.name}</h1>
                        <p 
                            className="font-s font-weight-light"
                            aria-live="polite" 
                            aria-atomic="true"
                        >From {formatPrice(displayedPrice)} EUR</p>
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
                    <div>
                        <button 
                            type="button"
                            className="button button--primary button--full"
                            disabled={!canAddToCart}
                        >
                            Add to cart
                        </button>
                    </div>
                </ProductDetailFeaturedInfo>
            </ProductDetailFeaturedElement>
        </ProductDetailFeaturedWrapper>
    )
}

export default ProductDetailFeatured