import { useLocation } from 'react-router-dom'
import { useCart } from '../../../features/cart/model/useCart'
import cartActive from '../../../shared/assets/cartActive.svg'
import cartInactive from '../../../shared/assets/cartInactive.svg'
import logo from '../../../shared/assets/logo.svg'
import {
  HeaderAction,
  HeaderContent,
  HeaderElement,
  HeaderLogo,
} from './Header.styles'

const Header = function () {
  const { itemCount } = useCart()
  const { pathname } = useLocation()
  const cartHasItems = itemCount > 0
  const cartLabel = `Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
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
