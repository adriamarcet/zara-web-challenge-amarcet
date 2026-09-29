import { useContext } from 'react'
import { CartContext } from './CartContext'

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
