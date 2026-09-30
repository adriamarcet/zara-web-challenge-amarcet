import styled from 'styled-components'

const ColorSelectorOptions = styled.div`
  display: flex;
  gap: var(--size-xs);
  margin-block-end: var(--size-s);
`
const ColorSelectorLabel = styled.label`
  display: inline-flex;
  width: 24px;
  height: 24px;
  outline: 1px solid var(--color-gray-20);
  outline-offset: 1px;
  cursor: pointer;

  &:has(input:checked) {
    outline: 1px solid var(--color-gray-90);
  }

  &:has(input:focus-visible) {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`

const ColorSelectorSquare = styled.span`
  width: 100%;
  height: 100%;
`

export { ColorSelectorOptions, ColorSelectorLabel, ColorSelectorSquare }
