import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import cartActive from '../assets/cartActive.svg'
import cartInactive from '../assets/cartInactive.svg'
import { useCart } from '../context/useCart'

const HeaderElement = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 26px 0 25px;
`
const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const HeaderLogo = styled.a``
const HeaderAction = styled(Link)`
  align-items: center;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-light);
  gap: var(--size-2xs);
  line-height: 1;
  text-decoration: none;

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`

const Header = function () {
  const { itemCount } = useCart()
  const { pathname } = useLocation()
  const cartHasItems = itemCount > 0
  const cartLabel = `Cesta de la compra, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`
  const isCartPage = pathname === '/cart'

  return (
    <HeaderElement>
      <HeaderContent className="container">
        <HeaderLogo href="/" aria-label="MBST Shop">
          <img src={logo} alt="MBST logo" loading="eager" />
        </HeaderLogo>
        {!isCartPage && (
          <HeaderAction to="/cart" aria-label={cartLabel}>
            <img
              src={cartHasItems ? cartActive : cartInactive}
              alt=""
              aria-hidden="true"
            />
            <span aria-hidden="true">{itemCount}</span>
          </HeaderAction>
        )}
      </HeaderContent>
    </HeaderElement>
  )
}

export default Header
