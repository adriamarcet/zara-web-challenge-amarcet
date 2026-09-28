import styled from 'styled-components'

const ProductDetailFeaturedElement = styled.div`
  display: grid;
  align-items: center;
  gap: 0.5rem;
  min-height: calc(100vh - 2.75rem - 5.3125rem - 3.5rem);    
`

const ProductDetailFeaturedImage = styled.img`
    max-width: 260px;
`

const ProductDetailMedia = styled.div`
    display: flex;
    justify-content: start;
`

const ProductDetailInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
    }

    p {
        font-size: var(--font-size-s);
        font-weight: var(--font-weight-light);
    }

    dl {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;

        dt {
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-semibold);
            text-transform: uppercase;
        }

        dd {
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-light);
            margin-block-start: 0;
            margin-block-end: 0;
        }
    }
`

export { ProductDetailFeaturedElement, ProductDetailFeaturedImage, ProductDetailMedia, ProductDetailInfo }