import {
    Card,
    CryptoLogo,
    CryptoTitle,
    Price,
    ViewLink
} from './styles'

type Props = {
    id: string
    logo: string
    title: string
    price: number
    priceChange: number
    currency: string
}

enum currencyType  {
    usd= '$',
    eur= '€',
    brl= 'R$'
}
const priceIncreasedStyle = {
    color: '#26c281'
}
const priceDecreaseStyle = {
    color: '#ff4c30'
}
export const CryptoCard = ({ id, logo, title, price, priceChange, currency }: Props) => {
    const priceStyle = priceChange >= 0 ? priceIncreasedStyle : priceDecreaseStyle
    return (
        <ViewLink to={`/crypto/${id}/${title}/${currency}`}>
        <Card key={id}>
            <CryptoLogo src={logo} alt={`${title} logo`} />
            <CryptoTitle>{title}</CryptoTitle>
            <Price style={priceStyle}>{(currencyType as any)[currency]} {price.toFixed(2)}</Price>
        </Card>
        </ViewLink>
            
    )
}