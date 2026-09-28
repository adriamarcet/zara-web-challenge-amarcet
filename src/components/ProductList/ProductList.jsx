import { useProducts } from "../../context/useProducts"
import {
    ProductGrid,
    ProductCard,
    ProductImageWrapper,
    ProductImage,
} from "./ProductList.styles"

function ProductList() {
    const { products, loading, error } = useProducts()

    if(loading && products.length === 0) {
        return (
            <div className="container" role="status" aria-atomic="true">
                <p>Loading</p>
            </div>
        )
    }
    
    if(error) {
        return (
            <div className="container" role="alert">
                <p>An error has occurred, and no products are available.</p>
            </div>
        )
    }

    if (!loading && products.length === 0) {
        return (
            <div className="container" role="status" aria-atomic="true">
                <p>No results where found.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <ProductGrid aria-label="Products list" role="list">
            {products.map( (product) => {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 0,
                    useGrouping: false,
                }).format(product.basePrice)

                return (
                    <ProductCard className="product-card" key={product.id} role="listitem">
                        <ProductImageWrapper className="flex justify-content-center">
                            <ProductImage src={product.imageUrl} width="329" height="257" alt={product.name + ' by ' + product.brand} />
                        </ProductImageWrapper>
                        <div className="textInfo">
                            <p className="font-xs text-uppercase">{product.brand}</p>
                            <div className="flex justify-content-between">
                                <p className="font-s text-uppercase">{product.name}</p>
                                <p className="font-s text-uppercase">
                                    {formattedPrice} EUR
                                </p>
                            </div>
                        </div>
                    </ProductCard>
                )
            })}
            </ProductGrid>
        </div>
    )
}

export default ProductList
