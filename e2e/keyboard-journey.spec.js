import { test, expect } from './fixtures/store'
import {
  cartItems,
  cartLink,
  expectCartSummary,
  expectImageColor,
} from './helpers/shop'
import {
  activateWithKeyboard,
  addPhoneWithKeyboard,
  configureWithKeyboard,
  openPhoneWithKeyboard,
  tabTo,
} from './helpers/keyboard'

for (const screen of [
  { name: 'desktop', viewport: { width: 1280, height: 720 } },
  { name: 'mobile width', viewport: { width: 390, height: 844 } },
]) {
  test.describe(`Feature: Keyboard — ${screen.name}`, () => {
    test.use({ viewport: screen.viewport })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    test('searches and clears results through Tab, typing, and Enter', async ({
      page,
    }) => {
      const search = page.getByRole('searchbox', {
        name: 'Search for a smartphone',
      })
      await tabTo(page, search)
      await expect(search).toBeFocused()
      await page.keyboard.type('Journey')
      const products = page
        .getByRole('list', { name: 'Products list' })
        .getByRole('listitem')
      await expect(products).toHaveCount(1)
      await activateWithKeyboard(
        page,
        page.getByRole('button', { name: 'Clear search' })
      )
      await expect(search).toHaveValue('')
      await expect(products).toHaveCount(2)
    })

    test('opens a product with a visible keyboard focus indicator', async ({
      page,
    }) => {
      const product = page.getByRole('link', {
        name: /Journey Phone by Example/,
      })
      await tabTo(page, product)
      await expect(product).toBeFocused()
      await expect(product).toHaveCSS('outline-style', 'solid')
      await expect(product).toHaveCSS('outline-width', '2px')
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL('/products/e2e-phone')
      await expect(
        page.getByRole('heading', { name: 'Journey Phone', exact: true })
      ).toBeVisible()
    })

    test('configures both radio groups with Space and arrows and exposes their focus', async ({
      page,
    }) => {
      await openPhoneWithKeyboard(page)
      await configureWithKeyboard(page)
      const color = page.getByRole('radio', { name: 'Blue', exact: true })
      await expect(color).toBeFocused()
      const label = page.locator('label').filter({ has: color })
      await expect(label).toHaveCSS('outline-width', '2px')
      await expect(page.getByText('Selected color: Blue')).toBeVisible()
      await expect(
        page.getByText('From 849 EUR', { exact: true })
      ).toBeVisible()
      await expectImageColor(
        page.getByRole('img', { name: 'Journey Phone de Example' }),
        'Blue'
      )
      await expect(
        page.getByRole('button', { name: 'Add to cart' })
      ).toBeEnabled()
    })

    test('adds the configured phone and opens the cart using only the keyboard', async ({
      page,
    }) => {
      await addPhoneWithKeyboard(page)
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
    })

    test('removes the last article and returns to the catalog using only the keyboard', async ({
      page,
    }) => {
      await addPhoneWithKeyboard(page)
      await activateWithKeyboard(
        page,
        page.getByRole('button', {
          name: 'Eliminar Journey Phone, 256 GB, Blue',
        })
      )
      await expect(cartItems(page)).toHaveCount(0)
      await expect(
        page.getByRole('heading', { name: 'Cart (0)' })
      ).toBeVisible()
      await activateWithKeyboard(
        page,
        page.getByRole('link', { name: 'Continue shopping' })
      )
      await expect(page).toHaveURL('/')
      await expect(cartLink(page, 0)).toHaveText('0')
    })
  })
}
