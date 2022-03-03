export const formatCurrency = (currency: string, price: number) => {
  const formatter = new Intl.NumberFormat(currency, { style: 'currency', currency })
  return formatter.format(price)
}

export const currencies = [
  'usd',
  'eur',
  'brl'
]