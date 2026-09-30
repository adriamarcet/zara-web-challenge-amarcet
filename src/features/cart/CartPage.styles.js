import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../shared/styles/breakpoints'

const HEADER_HEIGHT = 80

export const CartPageSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  min-height: calc(100svh - ${HEADER_HEIGHT}px);
  padding-block-end: calc(var(--size-l) + env(safe-area-inset-bottom, 0px));
  padding-block-start: var(--size-2xl);

  @media ${MEDIA_QUERIES.tablet} {
    padding-block-end: var(--size-xl);
  }

  @media ${MEDIA_QUERIES.desktop} {
    padding-block-end: calc(var(--size-xl) * 2);
  }
`

export const CartPageTitle = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
`

export const CartItemsList = styled.ul`
  display: grid;
  gap: var(--size-2xl);
  list-style: none;
  margin-block-start: calc(var(--size-2xl) * 2);
  padding: 0;
`

export const CartPageEmptyActions = styled.div`
  margin-block-start: auto;
  width: 100%;

  @media ${MEDIA_QUERIES.tablet} {
    width: 180px;
  }

  @media ${MEDIA_QUERIES.desktop} {
    width: 256px;
  }
`
