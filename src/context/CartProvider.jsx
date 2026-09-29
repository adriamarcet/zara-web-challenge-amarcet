import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'

export const CART_STORAGE_KEY = 'mbst-cart-items'

let fallbackLineIdSequence = 0

function createLineId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  fallbackLineIdSequence += 1

  return `cart-line-${Date.now().toString(36)}-${fallbackLineIdSequence.toString(36)}`
}

function createUniqueLineId(existingLineIds) {
  let lineId = createLineId()

  while (existingLineIds.has(lineId)) {
    lineId = createLineId()
  }

  return lineId
}

function isStoredCartItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    (item.lineId === undefined ||
      (typeof item.lineId === 'string' && item.lineId.length > 0)) &&
    typeof item.productId === 'string' &&
    typeof item.brand === 'string' &&
    typeof item.name === 'string' &&
    typeof item.capacity === 'string' &&
    typeof item.colorName === 'string' &&
    typeof item.imageUrl === 'string' &&
    Number.isFinite(item.price) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  )
}

function getStoredItems() {
  if (typeof window === 'undefined') return []

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) return []

    const parsedCart = JSON.parse(storedCart)

    if (!Array.isArray(parsedCart)) return []

    const existingLineIds = new Set()

    return parsedCart.filter(isStoredCartItem).flatMap((item) =>
      Array.from({ length: item.quantity }, (_, index) => {
        const canReuseStoredLineId =
          index === 0 &&
          typeof item.lineId === 'string' &&
          !existingLineIds.has(item.lineId)
        const lineId = canReuseStoredLineId
          ? item.lineId
          : createUniqueLineId(existingLineIds)

        existingLineIds.add(lineId)

        return { ...item, lineId, quantity: 1 }
      })
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getStoredItems)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // The in-memory cart remains usable when storage is unavailable.
    }
  }, [items])

  function addItem(productVariant) {
    setItems((currentItems) => [
      ...currentItems,
      {
        ...productVariant,
        lineId: createUniqueLineId(
          new Set(currentItems.map((item) => item.lineId))
        ),
        quantity: 1,
      },
    ])
  }

  function removeItem(lineId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.lineId !== lineId)
    )
  }

  const itemCount = items.length
  const cartTotal = items.reduce((total, item) => total + item.price, 0)

  return (
    <CartContext.Provider
      value={{ items, itemCount, cartTotal, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  )
}
