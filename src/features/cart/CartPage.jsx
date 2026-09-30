import { useCart } from './model/useCart'
import CartItem from './CartItem/CartItem'
import CartSummary from './CartSummary/CartSummary'
import ContinueShopping from './ContinueShopping/ContinueShopping'
import {
  CartItemsList,
  CartPageEmptyActions,
  CartPageSection,
  CartPageTitle,
} from './CartPage.styles'

function CartPage() {
  const { items, itemCount, cartTotal, removeItem } = useCart()
  const hasItems = items.length > 0

  return (
    <CartPageSection className="container">
      <CartPageTitle>Cart ({itemCount})</CartPageTitle>
      {hasItems ? (
        <>
          <CartItemsList aria-label="Cart items">
            {items.map((item) => (
              <CartItem key={item.lineId} item={item} onRemove={removeItem} />
            ))}
          </CartItemsList>
          <CartSummary total={cartTotal} />
        </>
      ) : (
        <CartPageEmptyActions>
          <ContinueShopping />
        </CartPageEmptyActions>
      )}
    </CartPageSection>
  )
}

export default CartPage
