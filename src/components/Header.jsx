import styled from 'styled-components'
import logo from '../assets/logo.svg'
import cartActive from '../assets/cartActive.svg'
import cartInactive from '../assets/cartInactive.svg'

const cartHasItems = false // TO DO

const HeaderElement = styled.header`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 26px 0 25px;
`
const HeaderLogo = styled.a`
`
const HeaderAction = styled.a`
    display: flex;
`

const Header = function() {
    return (
        <HeaderElement>
            <div className="container flex">
                <HeaderLogo href='/' aria-label='MBST Shop'>
                    <img src={logo} alt="MBST logo" loading='eager' />
                </HeaderLogo>
                <HeaderAction href='/' aria-label="Cesta de la compra">
                    <img src={cartHasItems ? cartActive : cartInactive } alt={cartHasItems ? 'La cesta tiene X productos' : 'La cesta está vacía'} />
                    <span>0</span>
                </HeaderAction>
            </div>
        </HeaderElement>
    )
}

export default Header
