import { BaseSyntheticEvent, useEffect } from 'react'
import { useState } from 'react'
import Loading from 'react-loading'

import { CryptoCard } from '../../components/CryptoCard'
import { CurrencyFilter } from '../../components/CurrencyFilter'
import Price from '../../models/Price'
import CurrencyService from '../../services/CurrencyService'
import { currencies } from '../../utils'
import { Container, Filter, LoadingArea } from './styles'


export const Home = () => {
  const [prices, setPrices] = useState<Price[]>([])
  const [pricesToBeDisplayed, setPricesToBeDisplayed] = useState<Price[]>([])
  const [isListLoaded, setIsListLoaded] = useState<boolean>(false)
  const [currency, setCurrency] = useState<string>('usd')

  const currencyService = new CurrencyService()
  const loadPrices = async () => {
    setIsListLoaded(false)
    const currentPrices = await currencyService.getPrices(currency)
    setPrices(currentPrices)
    setPricesToBeDisplayed(currentPrices)
    setIsListLoaded(true)
  }

  useEffect(() => {
    loadPrices()
  }, [currency])

  const renderCryptoCard = (price: Price) => (
    <CryptoCard
      key={price.id}
      id={price.id}
      title={price.name}
      logo={price.image}
      price={price.currentPrice}
      priceChange={price.priceChange}
      currency={price.currency}
    />
  )

  const filterPrices = (filter: string) => {
    if (filter) {
      const filteredPrices = prices.filter(
        p => p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
      setPricesToBeDisplayed(filteredPrices)
    } else {
      setPricesToBeDisplayed(prices)
    }
  }

  return (
    <Container>
      {isListLoaded
        ? (
          <>
            <Filter
              placeholder='Type desired crypocurrency'
              onKeyUp={(e: BaseSyntheticEvent) => filterPrices(e.target.value)}
            />
            <CurrencyFilter
              currencies={currencies}
              setCurrency={setCurrency}
              currencySelected={currency}
            />
            {pricesToBeDisplayed.map(p => renderCryptoCard(p))}
          </>
        )
        : (
          <LoadingArea>
            <Loading
              type='bubbles'
              width={'100%'}
              color='#8c14fc'
            />
          </LoadingArea>
        )
      }
    </Container>

  )
}