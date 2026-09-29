import styled from 'styled-components'

const HeaderHeight = 80;
const BackNavigationHeight = 44;
const FeautredStartSeparation = 56;

const ProductDetailFeaturedWrapper = styled.article`
    display: flex;
    flex-direction: column;
    padding-block-start: ${FeautredStartSeparation}px;
`

const ProductDetailFeaturedElement = styled.section`
    align-items: center;
    display: grid;
    gap: 40px;
    min-height: calc(100vh - ${HeaderHeight + BackNavigationHeight + FeautredStartSeparation}px);
}`

const ProductDetailFeaturedImage = styled.img`
    max-width: 260px;
`

const ProductDetailFeaturedMedia = styled.div`
    display: flex;
    justify-content: start;
`

const ProductDetailFeaturedInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

export { 
    ProductDetailFeaturedWrapper,
    ProductDetailFeaturedElement, 
    ProductDetailFeaturedImage, 
    ProductDetailFeaturedMedia, 
    ProductDetailFeaturedInfo
}