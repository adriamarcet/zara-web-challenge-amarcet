import {
  ProductSpecsSection,
  ProductSpecsView,
  ProductSpecsWrapper,
} from './ProductSpecs.styles'

const ProductSpecs = ({ product }) => {
  const SPECS = [
    ['Brand', product.brand],
    ['Name', product.name],
    ['Description', product.description],
    ['Screen', product.specs?.screen],
    ['Resolution', product.specs?.resolution],
    ['Main Camera', product.specs?.mainCamera],
    ['Selfie Camera', product.specs?.selfieCamera],
    ['Battery', product.specs?.battery],
    ['OS', product.specs?.os],
    ['Screen Refresh Rate', product.specs?.screenRefreshRate],
  ]

  const availableSpecs = SPECS.filter(
    ([, value]) => value !== undefined && value !== null
  )

  return (
    <ProductSpecsSection>
      <h2 className="text-uppercase margin-block-end-2xl">Specifications</h2>
      <ProductSpecsWrapper>
        {availableSpecs.map(([label, value]) => (
          <ProductSpecsView key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </ProductSpecsView>
        ))}
      </ProductSpecsWrapper>
    </ProductSpecsSection>
  )
}

export default ProductSpecs
