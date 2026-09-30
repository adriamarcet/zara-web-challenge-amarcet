import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../../../shared/styles/breakpoints'

const ProductListContainer = styled.div`
  padding-block-end: calc(
    (var(--size-xl) * 2) + env(safe-area-inset-bottom, 0px)
  );
`

const ProductGrid = styled.ul`
  border: 1px solid var(--color-gray-90);
  border-bottom: 0;
  padding: 0;

  > li {
    border-bottom: 1px solid var(--color-gray-90);
  }

  @media ${MEDIA_QUERIES.tablet} {
    border: 0;
    border-block-start: 1px solid var(--color-gray-90);
    border-inline-start: 1px solid var(--color-gray-90);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    > li {
      border-inline-end: 1px solid var(--color-gray-90);
    }
  }

  @media ${MEDIA_QUERIES.wideDesktop} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`

export { ProductGrid, ProductListContainer }
