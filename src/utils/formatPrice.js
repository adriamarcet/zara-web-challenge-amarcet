const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    useGrouping: false,
  }).format(price)

  return formattedPrice
}

export default formatPrice
