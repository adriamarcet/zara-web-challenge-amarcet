import styled from 'styled-components'
import { MEDIA_QUERIES } from '../../../styles/breakpoints'

export const CartSummaryElement = styled.div`
  display: grid;
  gap: var(--size-xl) var(--size-xs);
  grid-template-areas:
    'total total'
    'continue pay';
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-block-start: auto;
  padding-block-start: var(--size-2xl);
  width: 100%;

  @media ${MEDIA_QUERIES.tablet} {
    align-items: center;
    column-gap: var(--size-xl);
    grid-template-areas: 'continue total pay';
    grid-template-columns: 180px auto 252px;
    justify-content: space-between;
  }

  @media ${MEDIA_QUERIES.desktop} {
    column-gap: 80px;
    grid-template-areas: 'continue . total pay';
    grid-template-columns: 256px minmax(0, 1fr) auto 256px;
  }
`

export const CartSummaryContinue = styled.div`
  grid-area: continue;
`

export const CartSummaryTotal = styled.dl`
  display: flex;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-regular);
  grid-area: total;
  justify-content: space-between;
  text-transform: uppercase;

  @media ${MEDIA_QUERIES.tablet} {
    font-size: var(--font-size-s);
    gap: var(--size-xl);
    justify-content: center;
  }
`

export const CartSummaryPay = styled.button`
  align-items: center;
  background-color: var(--color-gray-90);
  border: 1px solid var(--color-gray-90);
  color: var(--color-white);
  cursor: pointer;
  display: inline-flex;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  grid-area: pay;
  justify-content: center;
  min-height: 52px;
  padding: var(--size-s) var(--size-l);
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`
