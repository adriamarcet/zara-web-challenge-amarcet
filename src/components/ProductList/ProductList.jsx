import { useProducts } from "../../context/useProducts"
import {
    ProductGrid,
    ProductCard,
    ProductImageWrapper,
    ProductImage,
} from "./ProductList.styles"

function ProductList() {
    const { products, loading, error } = useProducts()

    if(loading) {
        return (
            <div className="container">
                <p>Cargando</p>
            </div>
        )
    }
    
    if(error) {
        return (
            <div className="container">
                <p>Ha habido un error y no hay productos disponibles.</p>
            </div>
        )
    }

    return (
        <div className="container">
            <ProductGrid aria-label="Listado de productos">
            {products.map( (product) => (
                <ProductCard className="product-card" key={product.id.concat('_', product.name.replace(/\s/g, '') )}>
                    <ProductImageWrapper className="flex justify-content-center">
                        <ProductImage src={product.imageUrl} width="329" height="257" alt={product.name} />
                    </ProductImageWrapper>
                    <div className="textInfo">
                        <p className="font-xs text-uppercase">{product.brand}</p>
                        <div className="flex justify-content-between">
                            <p className="font-s text-uppercase">{product.name}</p>
                            <p className="font-s text-uppercase">{product.basePrice} EUR</p>
                        </div>
                    </div>
                </ProductCard>
            ))}
            </ProductGrid>
        </div>
    )
}

export default ProductList
