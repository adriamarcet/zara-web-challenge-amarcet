import { expect } from '@playwright/test'

export async function selectOption(page, name) {
  await page
    .locator('label')
    .filter({ has: page.getByRole('radio', { name, exact: true }) })
    .click()
}

export async function expectImageColor(image, color) {
  await expect(image).toBeVisible()
  // Check rendered pixels because image optimization can replace src with a blob.
  await expect
    .poll(() =>
      image.evaluate((img, expectedColor) => {
        if (!img.complete || !img.naturalWidth) return false
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 1
        const context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, 1, 1)
        const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
        return expectedColor === 'Blue'
          ? blue > 200 && red < 30 && green < 30
          : red < 30 && green < 30 && blue < 30
      }, color)
    )
    .toBe(true)
}

export async function addConfiguredPhone(
  page,
  { productId = 'e2e-phone', capacity = '128 GB', color = 'Black' } = {}
) {
  await page.goto(`/products/${productId}`)
  await configureAndAddPhone(page, { capacity, color })
}

export async function configureAndAddPhone(
  page,
  { capacity = '128 GB', color = 'Black' } = {}
) {
  await selectOption(page, capacity)
  await selectOption(page, color)
  const addButton = page.getByRole('button', { name: 'Add to cart' })
  await expect(addButton).toBeEnabled()
  await addButton.click()
}

export function cartLink(page, count) {
  return page.getByRole('link', {
    name: `Cesta de la compra, ${count} ${count === 1 ? 'producto' : 'productos'}`,
    exact: true,
  })
}

export async function openCart(page, count) {
  await cartLink(page, count).click()
}

export function cartVariant(page, variant) {
  return cartItems(page).filter({
    has: page.getByText(variant, { exact: true }),
  })
}

export function cartItems(page) {
  return page.getByRole('list', { name: 'Cart items' }).getByRole('listitem')
}

export async function expectCartSummary(page, count, total) {
  await expect(
    page.getByRole('heading', { name: `Cart (${count})`, exact: true })
  ).toBeVisible()
  await expect(cartItems(page)).toHaveCount(count)
  await expect(page.getByRole('definition')).toHaveText(`${total} EUR`)
}
