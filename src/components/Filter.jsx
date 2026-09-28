import { useEffect, useOptimistic, useState } from "react";
import { useProducts } from "../context/useProducts";

const Filter = function() {
    const { products, loading, setQuery } = useProducts()
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setQuery(inputValue.trim())
        }, 250)
        return () => clearTimeout(timeoutId)
    }, [inputValue, setQuery])

    const handleFilterInput = e => {
        setInputValue(e.target.value)
    }

    return (
        <div className="container">
            <form onSubmit={e => e.preventDefault()} role="search">
                <input 
                    aria-label="Search for a smartphone" 
                    placeholder="Search for a smartphone" 
                    type="search"
                    value={inputValue}
                    name="filterInput" 
                    onChange={handleFilterInput} 
                />
            </form>
            <p className="font-xs text-uppercase" aria-live="polite">
                {loading ? 'Searching...' : `${products.length} results`}
            </p>
        </div>
    )

}

export default Filter;