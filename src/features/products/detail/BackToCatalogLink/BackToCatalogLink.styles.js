import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BackToCatalogNav = styled.nav`
  display: flex;
  padding-block: 12px;
`

const BackToCatalogNavLink = styled(Link)`
  display: inline-flex;
  gap: var(--size-2xs);
  color: var(--color-text);
  padding-inline-end: var(--size-2xs);

  &:hover {
    background-color: gainsboro;
    color: inherit;
  }
`

export { BackToCatalogNav, BackToCatalogNavLink }
