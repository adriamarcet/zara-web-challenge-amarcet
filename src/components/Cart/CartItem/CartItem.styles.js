import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../../styles/breakpoints'

export const CartItemElement = styled.li`
  display: grid;
  gap: var(--size-l);
  grid-template-columns: minmax(0, 45%) minmax(0, 1fr);
  max-width: 600px;
  width: 100%;

  @media ${MEDIA_QUERIES.tablet} {
    gap: 64px;
    grid-template-columns: 250px minmax(0, 1fr);
  }
`

export const CartItemMedia = styled.div`
  align-items: center;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
`

export const CartItemImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-block: var(--size-l);

  @media ${MEDIA_QUERIES.tablet} {
    padding-block: 0;
  }
`

export const CartItemName = styled.h2`
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
`

export const CartItemVariant = styled.p`
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
`

export const CartItemPrice = styled.p`
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  margin-block-start: var(--size-xl);
`

export const CartItemRemove = styled.button`
  align-self: flex-start;
  color: #d00000;
  cursor: pointer;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  margin-block-start: auto;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`
