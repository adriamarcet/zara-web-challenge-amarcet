import { useEffect, useState } from 'react'
import { useProducts } from '../../context/useProducts'
import {
  FilterComponent,
  FilterInputWrap,
  FilterInput,
  FilterClearButton,
} from './Filter.styles'
const Filter = function () {
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

  const handleFilterInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <FilterComponent className="container">
      <form onSubmit={(e) => e.preventDefault()} role="search">
        <FilterInputWrap>
          <label htmlFor="filterInput" className="sr-only">
            Search for a smartphone
          </label>
          <FilterInput
            aria-describedby="results-count"
            autoComplete="off"
            id="filterInput"
            name="filterInput"
            onChange={handleFilterInput}
            placeholder="Search for a smartphone"
            type="search"
            value={inputValue}
          />
          {inputValue.trim() && (
            <FilterClearButton
              type="button"
              aria-label="Clear search"
              onClick={() => setInputValue('')}
            >
              <span aria-hidden="true">×</span>
            </FilterClearButton>
          )}
        </FilterInputWrap>
      </form>
      <p
        id="results-count"
        className="font-s text-uppercase"
        role="status"
        aria-atomic="true"
      >
        {showLoading ? 'Searching...' : `${products.length} results`}
      </p>
    </FilterComponent>
  )
}

export default Filter
