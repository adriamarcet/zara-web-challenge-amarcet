import ProductCardItem from '../../ProductCardItem/ProductCardItem'
import {
  SimilarItemsScroller,
  SimilarItemsScrollbar,
  SimilarItemsScrollbarSegment,
  SimilarItemsSection,
  SimilarItemsTrack,
} from './ProductDetailSimilarItems.styles'

function ProductDetailSimilarItems({ products = [] }) {
  if (!products.length) return null

  return (
    <SimilarItemsSection aria-labelledby="similar-items-title">
      <h2
        id="similar-items-title"
        className="text-uppercase margin-block-end-2xl"
      >
        Similar items
      </h2>

      <SimilarItemsScroller>
        <SimilarItemsTrack aria-label="Similar products">
          {products.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </SimilarItemsTrack>

        <SimilarItemsScrollbar aria-hidden="true">
          {products.map((product) => (
            <SimilarItemsScrollbarSegment key={product.id} />
          ))}
        </SimilarItemsScrollbar>
      </SimilarItemsScroller>
    </SimilarItemsSection>
  )
}

export default ProductDetailSimilarItems
