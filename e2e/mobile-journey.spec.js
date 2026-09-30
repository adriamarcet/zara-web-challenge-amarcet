import { test, expect } from './fixtures/store'
import {
  cartItems,
  cartLink,
  expectCartSummary,
  expectImageColor,
} from './helpers/shop'
import {
  addPhoneWithTouch,
  expectNoHorizontalOverflow,
  selectOptionWithTouch,
} from './helpers/mobile'

test.describe('Feature: Mobile — catalog navigation', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('searches, clears the search, and opens a product using touch', async ({
    page,
  }) => {
    await expect(
      page.getByRole('list', { name: 'Products list' }).getByRole('listitem')
    ).toHaveCount(2)
    await expectNoHorizontalOverflow(page)
    await page.getByRole('searchbox', { name: 'Search for a smartphone' }).tap()
    await page.keyboard.type('Journey')
    await expect(
      page.getByRole('list', { name: 'Products list' }).getByRole('listitem')
    ).toHaveCount(1)
    await page.getByRole('button', { name: 'Clear search' }).tap()
    await expect(
      page.getByRole('list', { name: 'Products list' }).getByRole('listitem')
    ).toHaveCount(2)
    await page.getByRole('link', { name: /Journey Phone by Example/ }).tap()
    await expect(page).toHaveURL('/products/e2e-phone')
    await expect(
      page.getByRole('heading', { name: 'Journey Phone', exact: true })
    ).toBeVisible()
    await expectNoHorizontalOverflow(page)
  })
})

test.describe('Feature: Mobile — product and cart controls', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Journey Phone by Example/ }).tap()
  })

  test('selects capacity and color using touch before enabling Add', async ({
    page,
  }) => {
    const add = page.getByRole('button', { name: 'Add to cart' })
    await expect(add).toBeDisabled()
    await selectOptionWithTouch(page, '256 GB')
    await expect(add).toBeDisabled()
    await expect(page.getByText('From 849 EUR', { exact: true })).toBeVisible()
    await selectOptionWithTouch(page, 'Blue')
    await expect(page.getByRole('radio', { name: '256 GB' })).toBeChecked()
    await expect(
      page.getByRole('radio', { name: 'Blue', exact: true })
    ).toBeChecked()
    await expectImageColor(
      page.getByRole('img', { name: 'Journey Phone de Example' }),
      'Blue'
    )
    await expect(add).toBeEnabled()
    await expectNoHorizontalOverflow(page)
  })

  test('adds the selected variant and opens its cart using touch', async ({
    page,
  }) => {
    await addPhoneWithTouch(page)
    await expect(page).toHaveURL('/cart')
    await expectCartSummary(page, 1, 849)
    await expect(
      cartItems(page).getByRole('heading', { name: 'Journey Phone' })
    ).toBeVisible()
    await expect(
      cartItems(page).getByText('256 GB | Blue', { exact: true })
    ).toBeVisible()
    await expectImageColor(
      cartItems(page).getByRole('img', { name: 'Journey Phone, Blue' }),
      'Blue'
    )
    await expectNoHorizontalOverflow(page)
  })

  test('removes the article and continues shopping using touch', async ({
    page,
  }) => {
    await addPhoneWithTouch(page)
    await page
      .getByRole('button', { name: 'Eliminar Journey Phone, 256 GB, Blue' })
      .tap()
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible()
    await expect(cartItems(page)).toHaveCount(0)
    await page.getByRole('link', { name: 'Continue shopping' }).tap()
    await expect(page).toHaveURL('/')
    await expect(cartLink(page, 0)).toHaveText('0')
  })
})
