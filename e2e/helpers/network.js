export async function holdApiResponse(page, url) {
  let releaseResponse
  const pendingResponse = new Promise((resolve) => {
    releaseResponse = resolve
  })

  await page.route(url, async (route) => {
    await pendingResponse
    // Resume through the existing deterministic product fixtures.
    await route.fallback()
  })

  return releaseResponse
}
