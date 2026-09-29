import { ProductDetailSpecsView, ProductDetailSpecsWrapper } from './ProductDetailSpecs.styles'

const ProductDetailSpecs = ({ product }) => {
    console.log(product.specs)
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

    const availableSpecs = SPECS.filter(([, value]) => value !== undefined && value !== null)

    return (
        <section className='padding-block-start-xl'>
            <h2 className='text-uppercase margin-block-end-2xl'>Specifications</h2>
            <ProductDetailSpecsWrapper>
                {availableSpecs.map(([label, value]) => (
                    <ProductDetailSpecsView key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </ProductDetailSpecsView>
                ))}
            </ProductDetailSpecsWrapper>
        </section>
    )
}

export default ProductDetailSpecs