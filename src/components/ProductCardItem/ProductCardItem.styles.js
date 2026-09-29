import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PRODUCT_IMAGE_WIDTH = 329
const PRODUCT_IMAGE_HEIGHT = 257

const ProductCardInfo = styled.div`
  flex: 0 0 auto;
  position: relative;
  transition: filter 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
`

const ProductCardItemElement = styled.li`
  list-style: none;
  position: relative;

  &::after {
    background-color: white;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    transition:
      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    width: 100%;
  }

  &:hover ${ProductCardInfo}, &:focus-within ${ProductCardInfo} {
    filter: invert(1);
  }

  &:hover::after,
  &:focus-within::after {
    background-color: var(--color-gray-90);
    transform: scaleY(1);
  }
`

const ProductCardItemLink = styled(Link)`
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  position: relative;
  text-decoration: none;
  z-index: 1;

  &:hover {
    color: inherit;
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: -2px;
  }
`

const ProductCardImageWrapper = styled.div`
  align-items: center;
  aspect-ratio: ${PRODUCT_IMAGE_WIDTH} / ${PRODUCT_IMAGE_HEIGHT};
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  margin: 0 auto;
  min-height: 0;
  position: relative;
  width: min(100%, ${PRODUCT_IMAGE_WIDTH}px);
  z-index: 1;
`

const ProductCardImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`

const ProductCardSummary = styled.div`
  display: flex;
  gap: var(--size-1xs);
  justify-content: space-between;
`

export {
  ProductCardItemElement,
  ProductCardItemLink,
  ProductCardImage,
  ProductCardImageWrapper,
  ProductCardInfo,
  ProductCardSummary,
}
