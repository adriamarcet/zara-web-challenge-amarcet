import { expect } from '@playwright/test'
import { cartLink } from './shop'

export async function selectOptionWithTouch(page, name) {
  await page
    .locator('label')
    .filter({ has: page.getByRole('radio', { name, exact: true }) })
    .tap()
}

export async function addPhoneWithTouch(page) {
  await selectOptionWithTouch(page, '256 GB')
  await selectOptionWithTouch(page, 'Blue')
  await page.getByRole('button', { name: 'Add to cart' }).tap()
  await cartLink(page, 1).tap()
}

export async function expectNoHorizontalOverflow(page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth
      })
    )
    .toBe(true)
}
