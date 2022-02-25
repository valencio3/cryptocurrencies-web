import { BaseSyntheticEvent, useEffect } from 'react'
import { useState } from 'react'
import Loading from 'react-loading'
import { CryptoCard } from '../../components/CryptoCard'
import Price from '../../models/Price'
import CurrencyService from '../../services/CurrencyService'
import { Container, ContainerCurrencyType, CurrencyType, Filter, LoadingArea } from './styles'


export const Home = () => {
    const [prices, setprices] = useState<Price[]>([])
    const [pricesToBeDisplayed, setpricesToBeDisplayed] = useState<Price[]>([])
    const [isListLoaded, setIsListLoaded] = useState<boolean>(false)
    const [currency, setCurrency] = useState<string>('usd')

    const currencyService = new CurrencyService()

    const loadPrices = async () => {
        setIsListLoaded(false)
        const currentPrices = await currencyService.getPrices(currency)
        setprices(currentPrices)
        setpricesToBeDisplayed(currentPrices)
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

    const handleCurrencyType = (currency: string) => {
        setCurrency(currency)
    }

    const filterPrices = (filter: string) => {
        if (filter) {
            const filteredPrices = prices.filter(
                p => p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            )
            setpricesToBeDisplayed(filteredPrices)
        } else {
            setpricesToBeDisplayed(prices)
        }
    }
    return (
        <Container>
            {isListLoaded &&
                <>
                    <Filter
                        placeholder='Type desired crypocurrency'
                        onKeyUp={(e: BaseSyntheticEvent) => filterPrices(e.target.value)}
                    />

                    <ContainerCurrencyType>
                        <CurrencyType
                            name='currency'
                            value='usd'
                            checked={currency === 'usd'}
                            onChange={(e: BaseSyntheticEvent) => handleCurrencyType(e.target.value)}
                        /> USD
                        <CurrencyType
                            name='currency'
                            value='eur'
                            checked={currency === 'eur'}
                            onChange={(e: BaseSyntheticEvent) => handleCurrencyType(e.target.value)}
                        /> EUR
                        <CurrencyType
                            name='currency'
                            value='brl'
                            checked={currency === 'brl'}
                            onChange={(e: BaseSyntheticEvent) => handleCurrencyType(e.target.value)} /> BRL
                    </ContainerCurrencyType>
                    {pricesToBeDisplayed.map(p => renderCryptoCard(p))}
                </>
            }
            {
                !isListLoaded &&
                <LoadingArea>
                    <Loading
                        type='bubbles'
                        width={'100%'}
                        color='#8c14fc'
                    />
                </LoadingArea>
            }
        </Container>

    )
}