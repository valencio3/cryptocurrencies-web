import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import CryptoCoin from '../../models/CryptoCoin'
import CurrencyService from '../../services/CurrencyService'
import { BackButton, BackLink, BackLinkPanel, Container, CryptoPanel, PanelRow, RowValue, RowwKey } from './styles'
type Params = {
    id: string
    name: string
}
export const Crypto = () => {
    const { id, name } = useParams<Params>()
    const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>({
        id: '',
        name: '',
        usd24hChange: 0,
        usd24hVolume: 0,
        usdMarketCap: 0,
        usdPrice: 0
    })
    const currencyService = new CurrencyService()
    const loadCryptoCoin = async () => {
        if (id && name) {
            const crypto = await currencyService.getCoin(id, name)
            setCryptoCoin(crypto)
        }
    }

    useEffect(() => {
        loadCryptoCoin()
    }, [])
    const navigate = useNavigate()
    return (
        <Container>
            <CryptoPanel>
                <PanelRow>
                    <RowwKey>Coin:</RowwKey>
                    <RowValue>{cryptoCoin.name}</RowValue>
                </PanelRow>
                <PanelRow>
                    <RowwKey>USD value:</RowwKey>
                    <RowValue>{cryptoCoin.usdPrice.toFixed(2)}</RowValue>
                </PanelRow>
                <PanelRow>
                    <RowwKey>Market Cap (USD):</RowwKey>
                    <RowValue>{cryptoCoin.usdMarketCap.toFixed(2)}</RowValue>
                </PanelRow>
                <PanelRow>
                    <RowwKey>24 Volume (USD):</RowwKey>
                    <RowValue>{cryptoCoin.usd24hVolume.toFixed(2)}</RowValue>
                </PanelRow>
                <PanelRow>
                    <RowwKey>24 Change (USD):</RowwKey>
                    <RowValue>{cryptoCoin.usd24hChange.toFixed(4)}%</RowValue>
                </PanelRow>
            </CryptoPanel>
            <BackLinkPanel>
                <BackLink to='/'>
                 <BackButton>Back to currencies</BackButton>
                </BackLink>
            </BackLinkPanel>
            {/* <h1 onClick={() => navigate('/')}>{JSON.stringify(cryptoCoin)}</h1> */}
        </Container>
    )
}