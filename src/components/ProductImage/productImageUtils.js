function getRemoteSource(source) {
  if (!source) return source

  try {
    const url = new URL(source)

    if (
      url.protocol === 'http:' &&
      url.hostname === 'prueba-tecnica-api-tienda-moviles.onrender.com'
    ) {
      url.protocol = 'https:'
    }

    return url.toString()
  } catch {
    return source
  }
}

export { getRemoteSource }
