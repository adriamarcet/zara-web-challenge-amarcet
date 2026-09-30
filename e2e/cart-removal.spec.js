import { test, expect } from './fixtures/store'
import {
  addConfiguredPhone,
  cartItems,
  cartLink,
  cartVariant,
  configureAndAddPhone,
  expectCartSummary,
  openCart,
} from './helpers/shop'

test.describe('Feature: Cart — removing one of several articles', () => {
  test.beforeEach(async ({ page }) => {
    await addConfiguredPhone(page)
    await addConfiguredPhone(page, { capacity: '256 GB', color: 'Blue' })
    await addConfiguredPhone(page, { productId: 'e2e-explorer' })
    await openCart(page, 3)
  })

  test('removes only the chosen article and preserves the others', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Remove Journey Phone, 256 GB, Blue' })
      .click()
    await expect(cartItems(page)).toHaveCount(2)
    await expect(cartVariant(page, '256 GB | Blue')).toHaveCount(0)
    for (const [name, price] of [
      ['Journey Phone', '699 EUR'],
      ['Explorer Phone', '499 EUR'],
    ]) {
      const item = cartItems(page).filter({
        has: page.getByRole('heading', { name, exact: true }),
      })
      await expect(item).toHaveCount(1)
      await expect(
        item.getByText('128 GB | Black', { exact: true })
      ).toBeVisible()
      await expect(item.getByText(price, { exact: true })).toBeVisible()
    }
  })

  test('recalculates the total and item counts after removal', async ({
    page,
  }) => {
    await expectCartSummary(page, 3, 2047)
    await page
      .getByRole('button', { name: 'Remove Journey Phone, 256 GB, Blue' })
      .click()
    await expectCartSummary(page, 2, 1198)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(cartLink(page, 2)).toHaveText('2')
  })
})

test.describe('Feature: Cart — removing the last article', () => {
  test.beforeEach(async ({ page }) => {
    await addConfiguredPhone(page)
    await openCart(page, 1)
  })

  test('leaves the cart empty with only Continue shopping offered', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Remove Journey Phone, 128 GB, Black' })
      .click()
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible()
    await expect(page.getByRole('list', { name: 'Cart items' })).toHaveCount(0)
    await expect(
      page.getByRole('term').filter({ hasText: /^Total$/ })
    ).toHaveCount(0)
    await expect(
      page.getByRole('button', { name: 'Pay', exact: true })
    ).toHaveCount(0)
    await expect(
      page.getByRole('link', { name: 'Continue shopping' })
    ).toBeVisible()
  })

  test('returns to the catalog with a zero header count', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Remove Journey Phone, 128 GB, Black' })
      .click()
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(page).toHaveURL('/')
    await expect(cartLink(page, 0)).toHaveText('0')
  })

  test('allows buying another product after emptying the cart', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Remove Journey Phone, 128 GB, Black' })
      .click()
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await page.getByRole('link', { name: /Explorer Phone by Example/ }).click()
    await configureAndAddPhone(page)
    await openCart(page, 1)
    await expectCartSummary(page, 1, 499)
    await expect(
      cartItems(page).getByRole('heading', { name: 'Explorer Phone' })
    ).toBeVisible()
  })
})

test.describe('Feature: Cart — empty state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart')
  })

  test('offers Continue shopping without a payment action', async ({
    page,
  }) => {
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Continue shopping' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Pay', exact: true })
    ).toHaveCount(0)
  })

  test('navigates home through Continue shopping', async ({ page }) => {
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(page).toHaveURL('/')
  })
})
