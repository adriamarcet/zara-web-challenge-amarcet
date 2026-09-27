import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext"
import productsService from '../services/productsService';

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        let ignore = false

        async function populateProducts() {
            try {
                setLoading(true)
                setError(null)

                const products = await productsService.getAll()

                if(!ignore) {
                    setProducts(products)
                }
            } catch (error) {
                if(!ignore) {
                    setError(error)
                }
            } finally {
                if(!ignore) {
                    setLoading(false)
                }
            }
        }

        populateProducts()

        return () => {
            ignore = true
        }
    }, [])

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    )
}