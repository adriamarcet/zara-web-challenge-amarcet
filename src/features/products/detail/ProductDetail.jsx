import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../../cart/model/useCart'
import { useProductDetail } from '../model/useProductDetail'
import BackToCatalogLink from './BackToCatalogLink/BackToCatalogLink'
import ProductConfigurator from './ProductConfigurator/ProductConfigurator'
import ProductSpecs from './ProductSpecs/ProductSpecs'
import SimilarProducts from './SimilarProducts/SimilarProducts'

function ProductDetail() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const { product, loading, error } = useProductDetail(productId)
  const [selectedCapacity, setSelectedCapacity] = useState(null)
  const [selectedColorName, setSelectedColorName] = useState(null)

  useEffect(() => {
    setSelectedCapacity(null)
    setSelectedColorName(null)
  }, [productId])

  if (loading) {
    return (
      <section className="container">
        <p role="status">Loading product...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container">
        <p role="alert">Failed to load the product.</p>
        <Link to="/">Go back to main page.</Link>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="container">
        <p>No product found</p>
        <Link to="/">Go back to main page.</Link>
      </section>
    )
  }

  const selectedColor = product.colorOptions?.find(
    (option) => option.name === selectedColorName
  )

  const image = selectedColor?.imageUrl ?? product.colorOptions?.[0]?.imageUrl

  const selectedStorage = product.storageOptions?.find(
    (option) => option.capacity === selectedCapacity
  )
  const displayedPrice = selectedStorage?.price ?? product.basePrice
  const canAddToCart = Boolean(selectedStorage && selectedColor)

  function handleAddToCart() {
    if (!selectedStorage || !selectedColor) return

    addItem({
      productId: product.id,
      brand: product.brand,
      name: product.name,
      capacity: selectedStorage.capacity,
      colorName: selectedColor.name,
      imageUrl: selectedColor.imageUrl,
      price: displayedPrice,
    })
  }

  return (
    <article className="container">
      <BackToCatalogLink />
      <ProductConfigurator
        product={product}
        image={image}
        selectedCapacity={selectedCapacity}
        onStorageChange={setSelectedCapacity}
        displayedPrice={displayedPrice}
        selectedColorName={selectedColorName}
        onColorChange={setSelectedColorName}
        canAddToCart={canAddToCart}
        onAddToCart={handleAddToCart}
      />
      <ProductSpecs product={product} />
      <SimilarProducts products={product.similarProducts} />
    </article>
  )
}

export default ProductDetail
