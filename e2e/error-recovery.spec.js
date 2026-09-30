import { test, expect, PRODUCTS_API_URL } from './fixtures/store'

const catalogUrl = `${PRODUCTS_API_URL}/products?*`
const detailUrl = `${PRODUCTS_API_URL}/products/e2e-phone`
const failures = [
  {
    name: 'server error',
    respond: (route) =>
      route.fulfill({ status: 500, json: { error: 'Unavailable' } }),
  },
  { name: 'network failure', respond: (route) => route.abort('failed') },
]

async function expectUsableCatalog(page) {
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('list', { name: 'Products list' })).toBeVisible()
  await expect(
    page.getByRole('link', { name: /Journey Phone by Example/ })
  ).toBeVisible()
  await expect(page.getByRole('alert')).toHaveCount(0)
}

for (const failure of failures) {
  test.describe(`Feature: Catalog — ${failure.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.route(catalogUrl, failure.respond)
      await page.goto('/')
      await expect(page.getByRole('alert')).toHaveText(
        'An error has occurred, and no products are available.'
      )
    })

    test('shows an error instead of product cards', async ({ page }) => {
      await expect(
        page.getByRole('list', { name: 'Products list' })
      ).toHaveCount(0)
      await expect(
        page.getByRole('link', { name: 'MBST Shop', exact: true })
      ).toBeVisible()
    })

    test('reloads a usable catalog through the logo after the API recovers', async ({
      page,
    }) => {
      // Remove only this failure handler, preserving the normal API fixture.
      await page.unroute(catalogUrl, failure.respond)
      await page.getByRole('link', { name: 'MBST Shop', exact: true }).click()
      await expectUsableCatalog(page)
    })
  })

  test.describe(`Feature: Product — ${failure.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.route(detailUrl, failure.respond)
      await page.goto('/products/e2e-phone')
      await expect(page.getByRole('alert')).toHaveText(
        'Failed to load the product.'
      )
    })

    test('prevents adding a product that failed to load', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'Add to cart' })
      ).toHaveCount(0)
      await expect(page.getByRole('radio')).toHaveCount(0)
      await expect(
        page.getByRole('link', { name: 'Go back to main page.' })
      ).toBeVisible()
    })

    test('returns to a usable catalog through the recovery link', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Go back to main page.' }).click()
      await expectUsableCatalog(page)
    })
  })
}

test.describe('Feature: Product — nonexistent product', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${PRODUCTS_API_URL}/products/missing-phone`, (route) =>
      route.fulfill({ status: 404, json: { error: 'Product not found' } })
    )
    await page.goto('/products/missing-phone')
    await expect(
      page.getByText('No product found', { exact: true })
    ).toBeVisible()
  })

  test('shows the missing-product state without a configurator', async ({
    page,
  }) => {
    await expect(page.getByRole('alert')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(
      0
    )
    await expect(
      page.getByRole('link', { name: 'Go back to main page.' })
    ).toBeVisible()
  })

  test('returns to a usable catalog from the missing product', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Go back to main page.' }).click()
    await expectUsableCatalog(page)
  })
})

test.describe('Feature: Navigation — unknown route', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/unknown-page')
  })

  test('shows the not-found page and its recovery link', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Go back to main page.' })
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(
      0
    )
  })

  test('returns to a usable catalog from the unknown route', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Go back to main page.' }).click()
    await expectUsableCatalog(page)
  })
})
