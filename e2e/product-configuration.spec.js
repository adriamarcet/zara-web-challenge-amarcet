import { test, expect } from './fixtures/store'
import {
  cartItems,
  expectImageColor,
  openCart,
  selectOption,
} from './helpers/shop'

test.describe('Feature: Product — configuration requirements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products/e2e-phone')
    await expect(
      page.getByRole('heading', { name: 'Journey Phone' })
    ).toBeVisible()
  })

  test('disables Add until a capacity and color are selected', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Add to cart' })
    ).toBeDisabled()
    for (const name of ['128 GB', '256 GB', 'Black', 'Blue']) {
      await expect(
        page.getByRole('radio', { name, exact: true })
      ).not.toBeChecked()
    }
  })

  for (const firstOption of ['128 GB', 'Black']) {
    test(`keeps Add disabled with only ${firstOption} selected`, async ({
      page,
    }) => {
      await selectOption(page, firstOption)
      await expect(
        page.getByRole('radio', { name: firstOption, exact: true })
      ).toBeChecked()
      await expect(
        page.getByRole('button', { name: 'Add to cart' })
      ).toBeDisabled()
    })

    test(`enables Add when both options are selected, choosing ${firstOption} first`, async ({
      page,
    }) => {
      await selectOption(page, firstOption)
      await selectOption(page, firstOption === '128 GB' ? 'Black' : '128 GB')
      await expect(page.getByRole('radio', { name: '128 GB' })).toBeChecked()
      await expect(page.getByRole('radio', { name: 'Black' })).toBeChecked()
      await expect(
        page.getByRole('button', { name: 'Add to cart' })
      ).toBeEnabled()
    })
  }
})

test.describe('Feature: Product — changing configuration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products/e2e-phone')
    await selectOption(page, '128 GB')
    await selectOption(page, 'Black')
  })

  test('updates the price and capacity selection without changing color', async ({
    page,
  }) => {
    await expect(page.getByText('From 699 EUR', { exact: true })).toBeVisible()
    await selectOption(page, '256 GB')
    await expect(page.getByText('From 849 EUR', { exact: true })).toBeVisible()
    await expect(page.getByRole('radio', { name: '256 GB' })).toBeChecked()
    await expect(page.getByRole('radio', { name: '128 GB' })).not.toBeChecked()
    await expect(page.getByRole('radio', { name: 'Black' })).toBeChecked()
    await expect(
      page.getByRole('button', { name: 'Add to cart' })
    ).toBeEnabled()
  })

  test('updates the image and color selection without changing capacity or price', async ({
    page,
  }) => {
    const image = page.getByRole('img', { name: 'Journey Phone by Example' })
    await expectImageColor(image, 'Black')
    await selectOption(page, 'Blue')
    await expectImageColor(image, 'Blue')
    await expect(page.getByRole('radio', { name: 'Blue' })).toBeChecked()
    await expect(page.getByRole('radio', { name: 'Black' })).not.toBeChecked()
    await expect(page.getByText('Selected color: Blue')).toBeVisible()
    await expect(page.getByRole('radio', { name: '128 GB' })).toBeChecked()
    await expect(page.getByText('From 699 EUR', { exact: true })).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Add to cart' })
    ).toBeEnabled()
  })

  test('adds the final configuration after changing both options', async ({
    page,
  }) => {
    await selectOption(page, '256 GB')
    await selectOption(page, 'Blue')
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await openCart(page, 1)
    await expect(cartItems(page)).toHaveCount(1)
    await expect(
      cartItems(page).getByText('256 GB | Blue', { exact: true })
    ).toBeVisible()
    await expect(
      cartItems(page).getByText('849 EUR', { exact: true })
    ).toBeVisible()
    await expectImageColor(
      cartItems(page).getByRole('img', { name: 'Journey Phone, Blue' }),
      'Blue'
    )
  })
})
