import { test, expect } from './fixtures/store'
import {
  addConfiguredPhone,
  cartItems,
  cartLink,
  expectCartSummary,
  expectImageColor,
  openCart,
} from './helpers/shop'

const articles = [
  {
    productId: 'e2e-phone',
    name: 'Journey Phone',
    capacity: '128 GB',
    color: 'Black',
    price: 699,
  },
  {
    productId: 'e2e-phone',
    name: 'Journey Phone',
    capacity: '256 GB',
    color: 'Blue',
    price: 849,
  },
  {
    productId: 'e2e-explorer',
    name: 'Explorer Phone',
    capacity: '128 GB',
    color: 'Black',
    price: 499,
  },
]

async function expectRestoredArticles(
  page,
  expectedArticles = articles,
  total = 2047
) {
  await expectCartSummary(page, expectedArticles.length, total)
  for (const article of expectedArticles) {
    const item = cartItems(page)
      .filter({
        has: page.getByRole('heading', { name: article.name, exact: true }),
      })
      .filter({
        has: page.getByText(`${article.capacity} | ${article.color}`, {
          exact: true,
        }),
      })
    await expect(item).toHaveCount(1)
    await expect(
      item.getByRole('heading', { name: article.name, exact: true })
    ).toBeVisible()
    await expect(
      item.getByText(`${article.capacity} | ${article.color}`, { exact: true })
    ).toBeVisible()
    await expect(
      item.getByText(`${article.price} EUR`, { exact: true })
    ).toBeVisible()
    await expectImageColor(
      item.getByRole('img', {
        name: `${article.name}, ${article.color}`,
        exact: true,
      }),
      article.color
    )
  }
}

test.describe('Feature: Cart — persisted articles', () => {
  test.beforeEach(async ({ page }) => {
    // Populate through the real configurator; do not seed localStorage.
    for (const article of articles) {
      await addConfiguredPhone(page, article)
    }
    await openCart(page, 3)
    await expectCartSummary(page, 3, 2047)
  })

  test('restores article names, variants, images, prices, counts, and total after reload', async ({
    page,
  }) => {
    await page.reload()
    await expect(page).toHaveURL('/cart')
    await expectRestoredArticles(page)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(page).toHaveURL('/')
    await expect(cartLink(page, 3)).toHaveText('3')
  })

  test('restores the cart when opened directly in another tab of the same session', async ({
    context,
  }) => {
    // Share the existing browser context and origin storage; do not copy or seed it.
    const otherTab = await context.newPage()
    try {
      await otherTab.goto('/cart')
      await expect(otherTab).toHaveURL('/cart')
      await expectRestoredArticles(otherTab)
      await otherTab.getByRole('link', { name: 'Continue shopping' }).click()
      await expect(cartLink(otherTab, 3)).toHaveText('3')
    } finally {
      await otherTab.close()
    }
  })

  test('keeps a removed article absent and restores the remaining articles after reload', async ({
    page,
  }) => {
    const remove = page.getByRole('button', {
      name: 'Eliminar Journey Phone, 256 GB, Blue',
      exact: true,
    })
    await remove.click()
    await expectCartSummary(page, 2, 1198)
    await page.reload()
    await expect(remove).toHaveCount(0)
    await expect(
      cartItems(page).getByText('256 GB | Blue', { exact: true })
    ).toHaveCount(0)
    await expectRestoredArticles(page, [articles[0], articles[2]], 1198)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(cartLink(page, 2)).toHaveText('2')
  })
})

test.describe('Feature: Cart — persisted empty state', () => {
  test.beforeEach(async ({ page }) => {
    await addConfiguredPhone(page)
    await openCart(page, 1)
    await expectCartSummary(page, 1, 699)
  })

  test('stays empty after removing the last article and reloading', async ({
    page,
  }) => {
    await page
      .getByRole('button', {
        name: 'Eliminar Journey Phone, 128 GB, Black',
        exact: true,
      })
      .click()
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Cart (0)' })).toBeVisible()
    await expect(cartItems(page)).toHaveCount(0)
    await expect(
      page.getByRole('button', { name: 'Pay', exact: true })
    ).toHaveCount(0)
    await expect(
      page.getByRole('term').filter({ hasText: /^Total$/ })
    ).toHaveCount(0)
    await page.getByRole('link', { name: 'Continue shopping' }).click()
    await expect(page).toHaveURL('/')
    await expect(cartLink(page, 0)).toHaveText('0')
  })
})
