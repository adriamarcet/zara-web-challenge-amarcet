import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../../styles/breakpoints'

const ProductDetailSpecsSection = styled.section`
  margin-block-start: var(--size-2xl);

  @media ${MEDIA_QUERIES.desktop} {
    margin-inline: auto;
    margin-block-start: 160px;
    max-width: 1200px;
  }
`

const ProductDetailSpecsWrapper = styled.div`
  border-block-start: 1px solid var(--color-gray-90);
`
const ProductDetailSpecsView = styled.dl`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) minmax(55%, 1fr);
  gap: var(--size-m);
  padding-block: var(--size-m);
  border-block-end: 1px solid var(--color-gray-90);

  dt,
  dd {
    min-width: 0;
    margin: 0;
    font-size: var(--font-size-s);
    font-weight: var(--font-weight-light);
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  dt {
    text-transform: uppercase;
  }
`
export {
  ProductDetailSpecsSection,
  ProductDetailSpecsView,
  ProductDetailSpecsWrapper,
}
