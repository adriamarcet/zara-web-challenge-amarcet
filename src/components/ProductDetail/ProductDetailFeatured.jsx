import formatPrice from '../../utils/formatPrice'
import { 
    ProductDetailFeaturedWrapper, 
    ProductDetailFeaturedElement, 
    ProductDetailFeaturedMedia, 
    ProductDetailFeaturedImage, 
    ProductDetailFeaturedInfo 
} from './ProductDetailFeatured.styles'
import StorageSelector from './StorageSelector'

const ProductDetailFeatured = ({ product, image, selectedCapacity, onStorageChange, displayedPrice }) => {

    return (
        <ProductDetailFeaturedWrapper>
            <ProductDetailFeaturedElement>
                <ProductDetailFeaturedMedia>
                    {image && <ProductDetailFeaturedImage src={image} alt={`${product.name} de ${product.brand}`} />}
                </ProductDetailFeaturedMedia>
                <ProductDetailFeaturedInfo>
                    <div>
                        <h1 className="font-l text-uppercase font-weight-light margin-block-end-xs">{product.name}</h1>
                        <p className="font-s font-weight-light">From {formatPrice(displayedPrice)} EUR</p>
                    </div>
                    <div>
                        <StorageSelector
                            storageOptions={product.storageOptions}
                            selectedCapacity={selectedCapacity}
                            onStorageChange={onStorageChange}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" disabled={!selectedCapacity}>
                            Add to cart
                        </button>
                    </div>
                </ProductDetailFeaturedInfo>
            </ProductDetailFeaturedElement>
        </ProductDetailFeaturedWrapper>
    )
}

export default ProductDetailFeatured