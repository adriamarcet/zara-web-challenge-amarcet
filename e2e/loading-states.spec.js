import { test, expect, PRODUCTS_API_URL } from './fixtures/store'
import { holdApiResponse } from './helpers/network'

test.describe('Feature: Catalog — loading', () => {
  test('shows loading until products become available', async ({ page }) => {
    const release = await holdApiResponse(
      page,
      `${PRODUCTS_API_URL}/products?*`
    )
    const loading = page.getByRole('status').filter({ hasText: /^Loading$/ })
    try {
      await page.goto('/')
      await expect(loading).toBeVisible()
      await expect(
        page.getByRole('list', { name: 'Products list' })
      ).toHaveCount(0)
    } finally {
      release()
    }
    await expect(
      page.getByRole('list', { name: 'Products list' })
    ).toBeVisible()
    await expect(loading).toHaveCount(0)
  })
})

test.describe('Feature: Product — loading', () => {
  test('shows loading before displaying the product configurator', async ({
    page,
  }) => {
    const release = await holdApiResponse(
      page,
      `${PRODUCTS_API_URL}/products/e2e-phone`
    )
    const loading = page
      .getByRole('status')
      .filter({ hasText: /^Loading product\.\.\.$/ })
    try {
      await page.goto('/products/e2e-phone')
      await expect(loading).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Add to cart' })
      ).toHaveCount(0)
    } finally {
      release()
    }
    await expect(
      page.getByRole('heading', { name: 'Journey Phone', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Add to cart' })
    ).toBeDisabled()
    await expect(loading).toHaveCount(0)
  })
})
