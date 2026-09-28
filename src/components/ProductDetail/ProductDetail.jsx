import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import productsService from '../../services/productsService'

function ProductDetail() {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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

    return (
        <article>
            <div className='grid'>
                <div className='ProductDetailMedia'>
                    {image && <img src={image} alt={`${product.name} de ${product.brand}`} />}
                </div>
                <div className='ProductDetailInfo'>
                    <p>{product.brand}</p>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.basePrice} EUR</p>

                    {product.specs && (
                    <dl>
                        {Object.entries(product.specs).map(([name, value]) => (
                        <div key={name}>
                            <dt>{name}</dt>
                            <dd>{value}</dd>
                        </div>
                        ))}
                    </dl>
                )}
                </div>
            </div>
        </article>
    )
}

export default ProductDetail
