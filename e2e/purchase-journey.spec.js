import { test, expect } from '@playwright/test'

test('adds a configured smartphone from the catalog to the cart', async ({
  page,
}) => {
  const api = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
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

  // Exercise the real UI and cart with deterministic API and image responses.
  await page.route(`${api}/products?*`, (route) =>
    route.fulfill({ json: [product] })
  )
  await page.route(`${api}/products/${product.id}`, (route) =>
    route.fulfill({ json: product })
  )
  await page.route('https://e2e.example/*.svg', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      headers: { 'access-control-allow-origin': '*' },
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="200"><rect width="100" height="200" fill="${route.request().url() === blueImage ? '#0000ff' : '#111111'}"/></svg>`,
    })
  )

  await page.goto('/')
  await expect(
    page.getByRole('link', { name: 'Cesta de la compra, 0 productos' })
  ).toBeVisible()
  await page.getByRole('link', { name: /Journey Phone by Example/ }).click()
  await expect(page).toHaveURL(`/products/${product.id}`)
  await expect(
    page.getByRole('heading', { name: 'Journey Phone', exact: true })
  ).toBeVisible()

  const addButton = page.getByRole('button', { name: 'Add to cart' })
  await expect(addButton).toBeDisabled()
  await expect(page.getByText('From 699 EUR', { exact: true })).toBeVisible()
  // The radios are visually hidden behind their labels.
  await page
    .locator('label')
    .filter({ has: page.getByRole('radio', { name: '256 GB', exact: true }) })
    .click()
  await expect(page.getByText('From 849 EUR', { exact: true })).toBeVisible()
  await expect(addButton).toBeDisabled()
  await page
    .locator('label')
    .filter({ has: page.getByRole('radio', { name: 'Blue', exact: true }) })
    .click()
  await expect(page.getByRole('radio', { name: '256 GB' })).toBeChecked()
  await expect(page.getByRole('radio', { name: 'Blue' })).toBeChecked()
  await expect(page.getByText('Selected color: Blue')).toBeVisible()
  await expect(addButton).toBeEnabled()
  await addButton.click()

  const cartLink = page.getByRole('link', {
    name: 'Cesta de la compra, 1 producto',
    exact: true,
  })
  await expect(cartLink).toHaveText('1')
  await cartLink.click()
  await expect(page).toHaveURL('/cart')
  await expect(page.getByRole('heading', { name: 'Cart (1)' })).toBeVisible()

  const items = page.getByRole('list', { name: 'Cart items' })
  await expect(items.getByRole('listitem')).toHaveCount(1)
  await expect(
    items.getByRole('heading', { name: 'Journey Phone' })
  ).toBeVisible()
  await expect(items.getByText('256 GB | Blue', { exact: true })).toBeVisible()
  await expect(items.getByText('849 EUR', { exact: true })).toBeVisible()
  const image = items.getByRole('img', { name: 'Journey Phone, Blue' })
  await expect(image).toBeVisible()
  await expect
    .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
    .toBe(true)
  await expect
    .poll(() =>
      image.evaluate((img) => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 1
        const context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, 1, 1)
        const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
        return blue > 200 && red < 30 && green < 30
      })
    )
    .toBe(true)
  // Canvas processing may replace src with a blob URL; check the original
  // selected image in the persisted cart rather than that generated URL.
  await expect
    .poll(() =>
      page.evaluate(() => {
        const items = JSON.parse(localStorage.getItem('mbst-cart-items'))
        return items[0]?.imageUrl
      })
    )
    .toBe(blueImage)
  await expect(
    page.getByRole('term').filter({ hasText: /^Total$/ })
  ).toBeVisible()
  await expect(page.getByRole('definition')).toHaveText('849 EUR')
})
