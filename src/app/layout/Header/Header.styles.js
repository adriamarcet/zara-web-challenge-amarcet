import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderElement = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 26px 0 25px;
`

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const HeaderLogo = styled.a``

const HeaderAction = styled(Link)`
  align-items: center;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-light);
  gap: var(--size-2xs);
  line-height: 1;
  text-decoration: none;

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }
`

export { HeaderAction, HeaderContent, HeaderElement, HeaderLogo }
