import { test, expect } from './fixtures/store'
import {
  addConfiguredPhone,
  cartItems,
  cartLink,
  cartVariant,
  expectCartSummary,
  expectImageColor,
  openCart,
} from './helpers/shop'

test.describe('Feature: Cart — duplicate lines', () => {
  test.beforeEach(async ({ page }) => {
    await addConfiguredPhone(page)
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await openCart(page, 2)
  })

  test('shows two independent lines for the same configuration', async ({
    page,
  }) => {
    await expect(cartVariant(page, '128 GB | Black')).toHaveCount(2)
    for (const line of await cartItems(page).all()) {
      await expect(
        line.getByRole('heading', { name: 'Journey Phone' })
      ).toBeVisible()
      await expect(line.getByText('699 EUR', { exact: true })).toBeVisible()
      await expect(line.getByRole('button')).toHaveCount(1)
    }
  })

  test('removes only one of the identical lines', async ({ page }) => {
    await cartVariant(page, '128 GB | Black')
      .first()
      .getByRole('button')
      .click()
    await expect(cartItems(page)).toHaveCount(1)
    await expect(cartVariant(page, '128 GB | Black')).toHaveCount(1)
    await expect(
      cartItems(page).getByText('699 EUR', { exact: true })
    ).toBeVisible()
  })

  test('counts both lines and doubles the total', async ({ page }) => {
    await expectCartSummary(page, 2, 1398)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(cartLink(page, 2)).toHaveText('2')
  })
})

test.describe('Feature: Cart — duplicates with another variant', () => {
  test.beforeEach(async ({ page }) => {
    await addConfiguredPhone(page)
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await addConfiguredPhone(page, { capacity: '256 GB', color: 'Blue' })
    await openCart(page, 3)
  })

  test('keeps two identical lines and another variant separately', async ({
    page,
  }) => {
    await expect(cartItems(page)).toHaveCount(3)
    await expect(cartVariant(page, '128 GB | Black')).toHaveCount(2)
    await expect(cartVariant(page, '256 GB | Blue')).toHaveCount(1)
    await expectCartSummary(page, 3, 2247)
  })

  test('preserves the other duplicate and variant when removing one line', async ({
    page,
  }) => {
    await cartVariant(page, '128 GB | Black')
      .first()
      .getByRole('button')
      .click()
    const duplicate = cartVariant(page, '128 GB | Black')
    const variant = cartVariant(page, '256 GB | Blue')
    await expect(duplicate).toHaveCount(1)
    await expect(variant).toHaveCount(1)
    await expect(duplicate.getByText('699 EUR', { exact: true })).toBeVisible()
    await expect(variant.getByText('849 EUR', { exact: true })).toBeVisible()
    await expectImageColor(
      duplicate.getByRole('img', { name: 'Journey Phone, Black' }),
      'Black'
    )
    await expectImageColor(
      variant.getByRole('img', { name: 'Journey Phone, Blue' }),
      'Blue'
    )
  })

  test('updates the total and counter after removing a duplicate', async ({
    page,
  }) => {
    await cartVariant(page, '128 GB | Black')
      .first()
      .getByRole('button')
      .click()
    await expectCartSummary(page, 2, 1548)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(cartLink(page, 2)).toHaveText('2')
  })
})
