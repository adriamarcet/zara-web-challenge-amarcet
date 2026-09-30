import { test, expect } from './fixtures/store'
import {
  cartItems,
  cartLink,
  configureAndAddPhone,
  expectCartSummary,
  expectImageColor,
  openCart,
} from './helpers/shop'

test.describe('Feature: Catalog — product navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens the selected product detail', async ({ page }) => {
    await page.getByRole('link', { name: /Journey Phone by Example/ }).click()
    await expect(page).toHaveURL('/products/e2e-phone')
    await expect(
      page.getByRole('heading', { name: 'Journey Phone', exact: true })
    ).toBeVisible()
  })
})

test.describe('Feature: Cart — configured product', () => {
  test.beforeEach(async ({ page }) => {
    // Keep the catalog-to-cart journey in the setup for each independent check.
    await page.goto('/')
    await page.getByRole('link', { name: /Journey Phone by Example/ }).click()
    await configureAndAddPhone(page, { capacity: '256 GB', color: 'Blue' })
  })

  test('updates the header item count after adding', async ({ page }) => {
    await expect(cartLink(page, 1)).toHaveText('1')
  })

  test('shows the product name, selected variant, and unit price', async ({
    page,
  }) => {
    await openCart(page, 1)
    await expect(cartItems(page)).toHaveCount(1)
    const item = cartItems(page).first()
    await expect(
      item.getByRole('heading', { name: 'Journey Phone' })
    ).toBeVisible()
    await expect(item.getByText('256 GB | Blue', { exact: true })).toBeVisible()
    await expect(item.getByText('849 EUR', { exact: true })).toBeVisible()
  })

  test('renders and stores the selected color image', async ({ page }) => {
    await openCart(page, 1)
    await expectImageColor(
      cartItems(page).getByRole('img', { name: 'Journey Phone, Blue' }),
      'Blue'
    )
    // Image optimization may replace the displayed source with a blob URL.
    await expect
      .poll(() =>
        page.evaluate(() => {
          return JSON.parse(localStorage.getItem('mbst-cart-items'))[0]
            ?.imageUrl
        })
      )
      .toBe('https://e2e.example/phone-blue.svg')
  })

  test('shows the item count, total, and shopping actions', async ({
    page,
  }) => {
    await openCart(page, 1)
    await expect(page).toHaveURL('/cart')
    await expectCartSummary(page, 1, 849)
    await expect(
      page.getByRole('term').filter({ hasText: /^Total$/ })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Pay', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Continue shopping' })
    ).toBeVisible()
  })
})
