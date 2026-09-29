import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import productsService from '../../services/productsService'
import ProductDetailBackNav from './ProductDetailBackNav/ProductDetailBackNav'
import ProductDetailFeatured from './ProductDetailFeatured/ProductDetailFeatured'
import ProductDetailSimilarItems from './ProductDetailSimilarItems/ProductDetailSimilarItems'
import ProductDetailSpecs from './ProductDetailSpecs/ProductDetailSpecs'

function ProductDetail() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedCapacity, setSelectedCapacity] = useState(null)
  const [selectedColorName, setSelectedColorName] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setLoading(true)
      setError(false)
      setProduct(null)
      setSelectedCapacity(null)
      setSelectedColorName(null)

      try {
        const result = await productsService.getById(productId, {
          signal: controller.signal,
        })
        setProduct(result)
      } catch {
        if (!controller.signal.aborted) {
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => controller.abort()
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
      <ProductDetailBackNav />
      <ProductDetailFeatured
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
      <ProductDetailSpecs product={product} />
      <ProductDetailSimilarItems products={product.similarProducts} />
    </article>
  )
}

export default ProductDetail
