import ProductCard from '../../components/ProductCard/ProductCard'
import {
  SimilarProductsScroller,
  SimilarProductsScrollbar,
  SimilarProductsScrollbarSegment,
  SimilarProductsSection,
  SimilarProductsTrack,
} from './SimilarProducts.styles'

function SimilarProducts({ products = [] }) {
  if (!products.length) return null

  return (
    <SimilarProductsSection aria-labelledby="similar-items-title">
      <h2
        id="similar-items-title"
        className="text-uppercase margin-block-end-2xl"
      >
        Similar items
      </h2>

      <SimilarProductsScroller>
        <SimilarProductsTrack aria-label="Similar products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimilarProductsTrack>

        <SimilarProductsScrollbar aria-hidden="true">
          {products.map((product) => (
            <SimilarProductsScrollbarSegment key={product.id} />
          ))}
        </SimilarProductsScrollbar>
      </SimilarProductsScroller>
    </SimilarProductsSection>
  )
}

export default SimilarProducts
