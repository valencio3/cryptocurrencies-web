import { BaseSyntheticEvent } from 'react'
import { Card, Container, Filter, Label } from './styles'

interface Props {
  currencies: string[]
  currencySelected: string
  setCurrency: (currency: string) => void
}

export const CurrencyFilter = ({ currencies, currencySelected, setCurrency }: Props) => {
  
  function handleCurrencyFilter(currency: string) {
    setCurrency(currency)
  }

  const renderCurrencyFilter = (currency: string) => {
    return (
      <Card key={currency}>
        <Filter
          key={currency}
          name='currencyFilter'
          value={currency}
          checked={currency === currencySelected}
          onChange={(e: BaseSyntheticEvent) => handleCurrencyFilter(e.target.value)}
          aria-label={currency}
        />
        <Label>{currency.toUpperCase()}</Label>
      </Card>
    )
  }

  return (
    <Container>
      {currencies.map(p => renderCurrencyFilter(p))}
    </Container>
  )
}