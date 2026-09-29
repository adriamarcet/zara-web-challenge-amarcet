import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ProductDetailBackNavElement = styled.nav`
    display: flex;
    padding-block: 12px;
`

const ProductDetailBackNavLink = styled(Link)`
    display: inline-flex;
    gap: var(--size-2xs);
    color: var(--color-text);
    padding-inline-end: var(--size-2xs);

    &:hover {
        background-color: gainsboro;
        color: inherit;
    }
`

export { ProductDetailBackNavElement, ProductDetailBackNavLink }