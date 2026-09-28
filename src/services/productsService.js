const baseUrl = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

const LIMIT = 20

const getAll = async ({ search = '', signal } = {}) => {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': import.meta.env.VITE_X_API_KEY,
    },
    signal,
  }

  const params = new URLSearchParams({ limit: LIMIT })
  if (search) params.set('search', search)

  const response = await fetch(`${baseUrl}/products?${params}`, options)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  return [...new Map(data.map((product) => [product.id, product])).values()]
}

export default { getAll }
