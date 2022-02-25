import { BaseSyntheticEvent, useEffect } from 'react'
import { useState } from 'react'
import Loading from 'react-loading'
import { CryptoCard } from '../../components/CryptoCard'
import Price from '../../models/Price'
import CurrencyService from '../../services/CurrencyService'
import { Container, Filter, LoadingArea } from './styles'

export const Home = () => {
    const [prices, setprices] = useState<Price[]>([])
    const [pricesToBeDisplayed, setpricesToBeDisplayed] = useState<Price[]>([])
    const [isListLoaded, setIsListLoaded] = useState<boolean>(false)

    const currencyService = new CurrencyService()

    const loadPrices = async () => {
        const currentPrices = await currencyService.getPrices()
        setprices(currentPrices)
        setpricesToBeDisplayed(currentPrices)
        setIsListLoaded(true)
    }

    useEffect(() => {
        loadPrices()
    }, [])

    const renderCryptoCard = (price: Price) => (
        <CryptoCard
            key={price.id}
            id={price.id}
            title={price.name}
            logo={price.image}
            price={price.currentPrice}
            priceChange={price.priceChange}
        />
    )

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