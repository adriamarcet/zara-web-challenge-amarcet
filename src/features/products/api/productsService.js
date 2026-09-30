const baseUrl = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

const LIMIT = 20
const FETCH_LIMIT = LIMIT * 2

const getAll = async ({ search = '', signal } = {}) => {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': import.meta.env.VITE_X_API_KEY,
    },
    signal,
  }

  const params = new URLSearchParams({ limit: FETCH_LIMIT })
  if (search) params.set('search', search)

  const response = await fetch(`${baseUrl}/products?${params}`, options)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  const unique = [
    ...new Map(data.map((product) => [product.id, product])).values(),
  ]
  return unique.slice(0, LIMIT)
}

const getById = async (id, { signal } = {}) => {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': import.meta.env.VITE_X_API_KEY,
    },
    signal,
  }

  const response = await fetch(`${baseUrl}/products/${id}`, options)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to fetch product by ID')
  }

  const data = await response.json()
  return data
}

export default { getAll, getById }
