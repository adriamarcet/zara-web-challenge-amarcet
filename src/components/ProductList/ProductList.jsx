import { useProducts } from '../../context/useProducts'
import ProductCardItem from '../ProductCardItem/ProductCardItem'
import { ProductGrid, ProductListContainer } from './ProductList.styles'

function ProductList() {
  const { products, loading, error } = useProducts()

  if (loading && products.length === 0) {
    return (
      <div className="container" role="status" aria-atomic="true">
        <p>Loading</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container" role="alert">
        <p>An error has occurred, and no products are available.</p>
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div className="container" role="status" aria-atomic="true">
        <p>No results were found.</p>
      </div>
    )
  }

  return (
    <ProductListContainer className="container">
      <ProductGrid aria-label="Products list" role="list">
        {products.map((product, index) => (
          <ProductCardItem
            key={product.id}
            product={product}
            imageLoading={index < 5 ? 'eager' : 'lazy'}
            imageFetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
      </ProductGrid>
    </ProductListContainer>
  )
}

export default ProductList
