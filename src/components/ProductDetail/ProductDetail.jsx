import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import productsService from '../../services/productsService'
import ProductDetailBackNav from './ProductDetailBackNav'
import ProductDetailFeatured from './ProductDetailFeatured'

function ProductDetail() {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [selectedCapacity, setSelectedCapacity] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadProduct() {
            setLoading(true)
            setError(false)
            setProduct(null)

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
        return <p role="status">Cargando producto...</p>
    }

    if (error) {
        return <p role="alert">No se pudo cargar el producto.</p>
    }

    if (!product) {
        return <p role="status">No se encontró el producto.</p>
    }

    if(!product) {
        return (
            <>
                <p>No product found</p>
                <Link to="/">Go back to main page.</Link>
            </>
        )
    }

    const image = product.colorOptions?.[0]?.imageUrl
    const selectedStorage = product.storageOptions?.find(
        (option) => {
            console.log('Comparing option.capacity:', option.capacity, 'with selectedCapacity:', selectedCapacity)
            return option.capacity === selectedCapacity
        }
    )
    const displayedPrice = selectedStorage?.price ?? product.basePrice
    const canAddToCart = selectedStorage && selectedColor

    return (
        <article>
            <ProductDetailBackNav />
            <ProductDetailFeatured 
                product={product} 
                image={image}
                selectedCapacity={selectedCapacity}
                onStorageChange={setSelectedCapacity}
                displayedPrice={displayedPrice}
            />
        </article>
    )
}

export default ProductDetail
