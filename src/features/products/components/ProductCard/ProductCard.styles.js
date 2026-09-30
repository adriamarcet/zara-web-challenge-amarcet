import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import ProductImage from '../ProductImage/ProductImage'

const PRODUCT_IMAGE_WIDTH = 329
const PRODUCT_IMAGE_HEIGHT = 257

const skeletonPulse = keyframes`
  from {
    opacity: 0.55;
  }

  to {
    opacity: 1;
  }
`

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

const ProductCardImageSkeleton = styled.div`
  aspect-ratio: 9 / 18.5;
  background-color: var(--color-gray-20);
  border: 1px solid var(--color-gray-20);
  border-radius: 14px;
  height: 78%;
  left: 50%;
  max-height: 220px;
  opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 200ms ease-out;

  &::before {
    animation: ${skeletonPulse} 900ms ease-in-out infinite alternate;
    animation-play-state: ${({ $loaded }) => ($loaded ? 'paused' : 'running')};
    background-color: var(--color-gray-10);
    border-radius: 9px;
    content: '';
    inset: 6px;
    position: absolute;
  }

  &::after {
    background-color: var(--color-gray-20);
    border-radius: 999px;
    content: '';
    height: 4px;
    left: 50%;
    position: absolute;
    top: 9px;
    transform: translateX(-50%);
    width: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      animation: none;
    }
  }
`

const ProductCardImage = styled(ProductImage)`
  display: flex;
  height: 100%;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  position: relative;
  transition: opacity 200ms ease-out;
  width: 100%;
  z-index: 1;

  > img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
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
  ProductCardImageSkeleton,
  ProductCardImageWrapper,
  ProductCardInfo,
  ProductCardSummary,
}
