const baseUrl = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

const getAll = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_X_API_KEY
    }
  }

  const response = await fetch(`${baseUrl}/products`, options)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  return data
}

export default { getAll }