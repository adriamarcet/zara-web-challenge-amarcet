import { expect } from '@playwright/test'
import { cartLink } from './shop'

export async function tabTo(page, target, { reverse = false } = {}) {
  await expect(target).toBeAttached()
  // Navigate through the actual tab order; never assign focus programmatically.
  for (let tabs = 0; tabs < 20; tabs += 1) {
    if (
      await target.evaluate((element) => element === document.activeElement)
    ) {
      return
    }
    await page.keyboard.press(reverse ? 'Shift+Tab' : 'Tab')
  }
  await expect(target).toBeFocused()
}

export async function activateWithKeyboard(page, target, options) {
  await tabTo(page, target, options)
  await page.keyboard.press('Enter')
}

export async function openPhoneWithKeyboard(page) {
  await activateWithKeyboard(
    page,
    page.getByRole('link', { name: /Journey Phone by Example/ })
  )
  await expect(
    page.getByRole('heading', { name: 'Journey Phone', exact: true })
  ).toBeVisible()
}

export async function configureWithKeyboard(page) {
  await tabTo(page, page.getByRole('radio', { name: '128 GB', exact: true }))
  await page.keyboard.press('Space')
  await page.keyboard.press('ArrowRight')
  const storage = page.getByRole('radio', { name: '256 GB' })
  await expect(storage).toBeChecked()
  await expect(storage).toBeFocused()
  await expect(page.locator('label').filter({ has: storage })).toHaveCSS(
    'outline-width',
    '2px'
  )
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeDisabled()
  await tabTo(page, page.getByRole('radio', { name: 'Black', exact: true }))
  await page.keyboard.press('Space')
  await page.keyboard.press('ArrowRight')
  await expect(
    page.getByRole('radio', { name: 'Blue', exact: true })
  ).toBeChecked()
}

export async function addPhoneWithKeyboard(page) {
  await openPhoneWithKeyboard(page)
  await configureWithKeyboard(page)
  await activateWithKeyboard(
    page,
    page.getByRole('button', { name: 'Add to cart' })
  )
  // The header precedes the configurator; navigate backwards instead of
  // assuming that Tab wraps from the last page control to the first.
  await activateWithKeyboard(page, cartLink(page, 1), { reverse: true })
}
