import { test, expect } from './fixtures/store'
import { cartLink } from './helpers/shop'

test.describe('Feature: Header navigation', () => {
  test('navigates home through the logo', async ({ page }) => {
    await page.goto('/cart')
    await page.getByRole('link', { name: 'MBST Shop', exact: true }).click()
    await expect(page).toHaveURL('/')
  })

  test('opens the cart through the header icon', async ({ page }) => {
    await page.goto('/')
    await cartLink(page, 0).click()
    await expect(page).toHaveURL('/cart')
  })
})
