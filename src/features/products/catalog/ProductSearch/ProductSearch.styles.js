import styled from 'styled-components'

const ProductSearchContainer = styled.div`
  padding-block: 12px;
  margin-block-end: 15px;
`
const ProductSearchInput = styled.input`
  border: 0;
  border-bottom: 1px solid var(--color-gray-90);
  margin-block-end: 12px;
  padding-inline-end: 30px;
  width: 100%;
`

const ProductSearchInputWrapper = styled.div`
  position: relative;
`

const ProductSearchClearButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`

export {
  ProductSearchClearButton,
  ProductSearchContainer,
  ProductSearchInput,
  ProductSearchInputWrapper,
}
