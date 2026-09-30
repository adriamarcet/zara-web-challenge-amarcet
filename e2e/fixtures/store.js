import { test as base, expect } from '@playwright/test'

export { expect }

export const PRODUCTS_API_URL =
  'https://prueba-tecnica-api-tienda-moviles.onrender.com'

export const test = base.extend({
  page: async ({ page, context }, runWithPage) => {
    const api = PRODUCTS_API_URL
    const blueImage = 'https://e2e.example/phone-blue.svg'
    const product = {
      id: 'e2e-phone',
      brand: 'Example',
      name: 'Journey Phone',
      basePrice: 699,
      imageUrl: 'https://e2e.example/phone-black.svg',
      colorOptions: [
        {
          name: 'Black',
          hexCode: '#111111',
          imageUrl: 'https://e2e.example/phone-black.svg',
        },
        { name: 'Blue', hexCode: '#0000ff', imageUrl: blueImage },
      ],
      storageOptions: [
        { capacity: '128 GB', price: 699 },
        { capacity: '256 GB', price: 849 },
      ],
      similarProducts: [],
    }

    const secondProduct = {
      ...product,
      id: 'e2e-explorer',
      name: 'Explorer Phone',
      basePrice: 499,
      storageOptions: [
        { capacity: '128 GB', price: 499 },
        { capacity: '256 GB', price: 599 },
      ],
    }

    // Exercise the real UI and cart with deterministic API and image responses.
    await context.route(`${api}/products?*`, (route) => {
      const search = new URL(route.request().url()).searchParams
        .get('search')
        ?.toLowerCase()
      const products = [product, secondProduct].filter(
        (item) =>
          !search || `${item.brand} ${item.name}`.toLowerCase().includes(search)
      )
      return route.fulfill({ json: products })
    })
    await context.route(`${api}/products/${product.id}`, (route) =>
      route.fulfill({ json: product })
    )
    await context.route(`${api}/products/${secondProduct.id}`, (route) =>
      route.fulfill({ json: secondProduct })
    )
    await context.route('https://e2e.example/*.svg', (route) =>
      route.fulfill({
        contentType: 'image/svg+xml',
        headers: { 'access-control-allow-origin': '*' },
        body: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="200"><rect width="100" height="200" fill="${route.request().url() === blueImage ? '#0000ff' : '#111111'}"/></svg>`,
      })
    )

    await runWithPage(page)
  },
})
