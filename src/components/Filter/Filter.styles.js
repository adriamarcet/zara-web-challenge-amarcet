import styled from 'styled-components'

const FilterComponent = styled.div`
  padding-block: 12px;
  margin-block-end: 15px;
`
const FilterInput = styled.input`
  border: 0;
  border-bottom: 1px solid var(--color-gray-90);
  margin-block-end: 12px;
  padding-inline-end: 30px;
  width: 100%;
`

const FilterInputWrap = styled.div`
  position: relative;
`

const FilterClearButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`

export { FilterComponent, FilterInputWrap, FilterInput, FilterClearButton }
