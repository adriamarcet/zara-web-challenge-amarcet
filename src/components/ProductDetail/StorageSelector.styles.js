import styled from 'styled-components'

const StorageSelectorLabelWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0px, 89px));
`

const StorageSelectorLabel = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid var(--color-gray-20);

    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    padding: var(--size-s) var(--size-l);
    margin-block-end: -1px;
    margin-inline-end: -1px;

    &:has(.sr-only:checked) {
        border: 1px solid var(--color-gray-90);
        z-index: 1;
    }

    &:has(.sr-only:focus-visible) {
        outline: 2px solid #0057ff;
        outline-offset: 2px;
    }
`

const StorageSelectorInput = styled.span`

`
export { StorageSelectorLabel, StorageSelectorInput, StorageSelectorLabelWrapper }

// @include breakpoint(desktop) {
//       font-size: var(--font-size-base);
//     }

//     &[data-selected='true'] {
//       z-index: var(--z-base);
//       border-color: var(--color-text-primary);
//     }
