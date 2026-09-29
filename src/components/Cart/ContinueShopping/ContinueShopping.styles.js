import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ContinueShoppingLink = styled(Link)`
  align-items: center;
  border: 1px solid var(--color-gray-50);
  color: var(--color-text);
  display: inline-flex;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-light);
  justify-content: center;
  min-height: 52px;
  padding: var(--size-s) var(--size-l);
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    background-color: var(--color-gray-90);
    color: var(--color-white);
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`
