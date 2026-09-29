import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../styles/breakpoints'

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
    grid-template-columns: 1fr 1fr;

    > li {
      border-inline-end: 1px solid var(--color-gray-90);
    }
  }

  @media ${MEDIA_QUERIES.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
`

export { ProductGrid }
