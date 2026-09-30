import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../../styles/breakpoints'
import ProductImage from '../../ProductImage/ProductImage'

const HEADER_HEIGHT = 80
const BACK_NAVIGATION_HEIGHT = 44
const FEATURED_START_SEPARATION = 56

const ProductDetailFeaturedWrapper = styled.section`
  padding-block-start: ${FEATURED_START_SEPARATION}px;

  @media ${MEDIA_QUERIES.desktop} {
    padding-block-start: 106px;
  }
`

const ProductDetailFeaturedElement = styled.div`
  align-items: center;
  display: grid;
  gap: var(--size-2xl);
  min-height: calc(
    100vh -
      ${HEADER_HEIGHT + BACK_NAVIGATION_HEIGHT + FEATURED_START_SEPARATION}px
  );
  min-height: calc(
    100svh -
      ${HEADER_HEIGHT + BACK_NAVIGATION_HEIGHT + FEATURED_START_SEPARATION}px
  );

  @media ${MEDIA_QUERIES.tablet} {
    grid-template-columns: minmax(0, 344px) minmax(0, 310px);
    justify-content: space-between;
    min-height: 520px;
  }

  @media ${MEDIA_QUERIES.desktop} {
    grid-template-columns: minmax(0, 510px) minmax(0, 380px);
    margin-inline: auto;
    max-width: 1200px;
    min-height: 630px;
    width: 100%;
  }
`

const ProductDetailFeaturedImage = styled(ProductImage)`
  aspect-ratio: 1;
  display: flex;
  max-width: 220px;
  width: 100%;

  > img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  @media ${MEDIA_QUERIES.tablet} {
    max-width: 344px;
  }

  @media ${MEDIA_QUERIES.desktop} {
    max-width: 444px;
  }
`

const ProductDetailFeaturedMedia = styled.div`
  display: flex;
  justify-content: flex-start;

  @media ${MEDIA_QUERIES.tablet} {
    justify-content: center;
  }

  @media ${MEDIA_QUERIES.desktop} {
    align-items: center;
    align-self: stretch;
  }
`

const ProductDetailFeaturedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-2xl);
  min-width: 0;
  width: 100%;

  @media ${MEDIA_QUERIES.desktop} {
    legend {
      font-size: var(--font-size-m);
    }
  }
`

const ProductDetailFeaturedTitle = styled.h1`
  @media ${MEDIA_QUERIES.tablet} {
    font-size: var(--font-size-xl);
  }

  @media ${MEDIA_QUERIES.desktop} {
    font-size: var(--font-size-2xl);
  }
`

const ProductDetailFeaturedPrice = styled.p`
  @media ${MEDIA_QUERIES.tablet} {
    font-size: var(--font-size-m);
  }

  @media ${MEDIA_QUERIES.desktop} {
    font-size: var(--font-size-xl);
  }
`

const ProductDetailFeaturedAction = styled.div`
  bottom: calc(var(--size-l) + env(safe-area-inset-bottom, 0px));
  position: sticky;
  z-index: 1;

  @media ${MEDIA_QUERIES.tablet} {
    bottom: auto;
    position: static;
    z-index: auto;
  }
`

export {
  ProductDetailFeaturedAction,
  ProductDetailFeaturedElement,
  ProductDetailFeaturedImage,
  ProductDetailFeaturedInfo,
  ProductDetailFeaturedMedia,
  ProductDetailFeaturedPrice,
  ProductDetailFeaturedTitle,
  ProductDetailFeaturedWrapper,
}
