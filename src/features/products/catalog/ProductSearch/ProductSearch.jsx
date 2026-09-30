import { useEffect, useState } from 'react'
import { useProducts } from '../../model/useProducts'
import {
  ProductSearchClearButton,
  ProductSearchContainer,
  ProductSearchInput,
  ProductSearchInputWrapper,
} from './ProductSearch.styles'

function ProductSearch() {
  const { products, loading, setQuery } = useProducts()
  const [inputValue, setInputValue] = useState('')
  const [showLoading, setShowLoading] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(inputValue.trim())
    }, 250)
    return () => clearTimeout(timeoutId)
  }, [inputValue, setQuery])

  useEffect(() => {
    if (!loading) {
      setShowLoading(false)
      return
    }
    const delayId = setTimeout(() => {
      setShowLoading(true)
    }, 450)
    return () => clearTimeout(delayId)
  }, [loading])

  const handleSearchInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <ProductSearchContainer className="container">
      <form onSubmit={(e) => e.preventDefault()} role="search">
        <ProductSearchInputWrapper>
          <label htmlFor="filterInput" className="sr-only">
            Search for a smartphone
          </label>
          <ProductSearchInput
            aria-describedby="results-count"
            autoComplete="off"
            id="filterInput"
            name="filterInput"
            onChange={handleSearchInput}
            placeholder="Search for a smartphone"
            type="search"
            value={inputValue}
          />
          {inputValue.trim() && (
            <ProductSearchClearButton
              type="button"
              aria-label="Clear search"
              onClick={() => setInputValue('')}
            >
              <span aria-hidden="true">×</span>
            </ProductSearchClearButton>
          )}
        </ProductSearchInputWrapper>
      </form>
      <p
        id="results-count"
        className="font-s text-uppercase"
        role="status"
        aria-atomic="true"
      >
        {showLoading ? 'Searching...' : `${products.length} results`}
      </p>
    </ProductSearchContainer>
  )
}

export default ProductSearch
