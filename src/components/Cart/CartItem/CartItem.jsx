import formatPrice from '../../../utils/formatPrice'
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
          aria-label={`Eliminar ${item.name}, ${item.capacity}, ${item.colorName}`}
          onClick={() => onRemove(item.lineId)}
        >
          Eliminar
        </CartItemRemove>
      </CartItemInfo>
    </CartItemElement>
  )
}

export default CartItem
