import styled from 'styled-components'

const ProductDetailSpecsWrapper = styled.div`
    border-block-start: 1px solid var(--color-gray-90);
`
const ProductDetailSpecsView = styled.dl`
  display: grid;
  grid-template-columns: minmax(120px, 30%) minmax(0, 1fr);
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
export { ProductDetailSpecsWrapper, ProductDetailSpecsView }