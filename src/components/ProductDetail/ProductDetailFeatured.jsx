import formatPrice from '../../utils/formatPrice'
import { ProductDetailFeaturedElement, ProductDetailMedia, ProductDetailFeaturedImage, ProductDetailInfo } from './ProductDetailFeatured.styles'
import StorageSelector from './StorageSelector'

const ProductDetailFeatured = ({ product, image, selectedCapacity, onStorageChange, displayedPrice }) => {

    return (
        <ProductDetailFeaturedElement>
            <ProductDetailMedia>
                {image && <ProductDetailFeaturedImage src={image} alt={`${product.name} de ${product.brand}`} />}
            </ProductDetailMedia>
            <ProductDetailInfo>
                <h1>{product.name}</h1>
                <p>From {product.description}</p>
                <p>{formatPrice(product.basePrice)} EUR</p>
                <StorageSelector
                    storageOptions={product.storageOptions}
                    selectedCapacity={selectedCapacity}
                    onStorageChange={onStorageChange}
                />
                <p>Displayed price: {formatPrice(displayedPrice)} EUR</p>

                {selectedCapacity && <p>Selected capacity: {selectedCapacity}</p>}
                {product.specs && (
                <dl>
                    {Object.entries(product.specs).map(([name, value]) => (
                    <div key={name}>
                        <dt>{name}</dt>
                        <dd>{value}</dd>
                    </div>
                    ))}
                </dl>
            )}
            </ProductDetailInfo>
        </ProductDetailFeaturedElement>
    )
}

export default ProductDetailFeatured