import formatPrice from '../../../utils/formatPrice'
import ContinueShopping from '../ContinueShopping/ContinueShopping'
import {
  CartSummaryContinue,
  CartSummaryElement,
  CartSummaryPay,
  CartSummaryTotal,
} from './CartSummary.styles'

function CartSummary({ total }) {
  return (
    <CartSummaryElement>
      <CartSummaryContinue>
        <ContinueShopping />
      </CartSummaryContinue>
      <CartSummaryTotal>
        <dt>Total</dt>
        <dd>{formatPrice(total)} EUR</dd>
      </CartSummaryTotal>
      <CartSummaryPay type="button">Pay</CartSummaryPay>
    </CartSummaryElement>
  )
}

export default CartSummary
