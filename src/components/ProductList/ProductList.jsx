import { useProducts } from '../../context/useProducts'
import ProductCardItem from '../ProductCardItem/ProductCardItem'
import { ProductGrid } from './ProductList.styles'

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
        <p>No results where found.</p>
      </div>
    )
  }

  return (
    <div className="container">
      <ProductGrid aria-label="Products list" role="list">
        {products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default ProductList
