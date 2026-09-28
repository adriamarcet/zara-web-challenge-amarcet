import styled from 'styled-components'

const PRODUCT_IMAGE_WIDTH = 329
const PRODUCT_IMAGE_HEIGHT = 257

const ProductGrid = styled.ul`
  border: 1px solid var(--color-gray-90);
  border-bottom: 0;
  padding: 0;

  @media (min-width: 834px) {
    border: 0;
    border-block-start: 1px solid var(--color-gray-90);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const ProductCard = styled.li`
  border-bottom: 1px solid var(--color-gray-90);
  list-style: none;
  padding: 16px;
  position: relative;

  > * {
    position: relative;
    z-index: 10;
  }

  &:after {
    background-color: white;
    content: '';
    height: 100%;
    transform: scaleY(0);
    transform-origin: bottom;
    transition:
      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &:hover {
    > .textInfo {
      filter: invert(1);
    }
  }

  &:hover:after {
    background-color: var(--color-gray-90);
    transform: scaleY(1);
    z-index: 0;
  }

  @media (min-width: 834px) and (max-width: 1920px) {
    &:nth-child(2n + 1) {
      border-inline: 1px solid var(--color-gray-90);
    }
    &:nth-child(2n) {
      border-inline-end: 1px solid var(--color-gray-90);
    }
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
    border-inline-end: 1px solid gray;
    &:nth-child(5n + 1) {
      border-inline-start: 1px solid gray;
    }
  }
`

const ProductImageWrapper = styled.div`
  aspect-ratio: ${PRODUCT_IMAGE_WIDTH} / ${PRODUCT_IMAGE_HEIGHT};
  margin: 0 auto;
  width: min(100%, ${PRODUCT_IMAGE_WIDTH}px);
`
const ProductImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`

export { ProductGrid, ProductCard, ProductImageWrapper, ProductImage }
