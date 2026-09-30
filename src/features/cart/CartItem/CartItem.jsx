import formatPrice from '../../../shared/lib/formatPrice'
import {
  CartItemElement,
  CartItemImage,
  CartItemInfo,
  CartItemMedia,
  CartItemName,
  CartItemPrice,
  CartItemRemove,
  CartItemVariant,
} from './CartItem.styles'

function CartItem({ item, onRemove }) {
  return (
    <CartItemElement>
      <CartItemMedia>
        <CartItemImage
          src={item.imageUrl}
          alt={`${item.name}, ${item.colorName}`}
        />
      </CartItemMedia>
      <CartItemInfo>
        <CartItemName>{item.name}</CartItemName>
        <CartItemVariant>
          {item.capacity} | {item.colorName}
        </CartItemVariant>
        <CartItemPrice>{formatPrice(item.price)} EUR</CartItemPrice>
        <CartItemRemove
          type="button"
          aria-label={`Remove ${item.name}, ${item.capacity}, ${item.colorName}`}
          onClick={() => onRemove(item.lineId)}
        >
          Remove
        </CartItemRemove>
      </CartItemInfo>
    </CartItemElement>
  )
}

export default CartItem
