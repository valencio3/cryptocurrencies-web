import axios, { AxiosInstance } from 'axios'
import CryptoCoin from '../models/CryptoCoin'
import Price from '../models/Price'

const PER_PAGE: number = 250

export default class CurrencyService {
  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3'
    })
  }

  async getPrices(currency: string = 'usd'): Promise<Price[]> {
    const response = await this._http.get('/coins/markets', {
      params: {
        vs_currency: currency,
        per_page: PER_PAGE,
        price_change_percentage: '1h'
      }
    })

    let pricesList: Price[] = []

    if (response.status === 200) {
      const { data } = response
      pricesList = data.map((p: any) => {
        const {
          id,
          name,
          image,
          current_price,
          price_change_percentage_1h_in_currency } = p

        const price: Price = {
          id,
          name,
          image,
          currency,
          currentPrice: current_price,
          priceChange: price_change_percentage_1h_in_currency
        }

        return price
      })
    }
    return pricesList
  }

  async getCoin(
    id: string,
    name: string,
    currency: string = 'usd'
  ): Promise<CryptoCoin> {

    const response = await this._http.get('/simple/price', {
      params: {
        ids: id,
        vs_currencies: currency,
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true

      }
    })

    let cryptoCoin: CryptoCoin = {
      id: id,
      name: name,
      change24h: 0,
      volume24h: 0,
      marketCap: 0,
      price: 0,
      currencyType: currency
    }

    if (response.status === 200) {
      const data = response.data[id]
      const dataArray = Object.values(data)
      const [
        price,
        market_cap,
        vol_24h,
        change_24h] = dataArray

      cryptoCoin = {
        id: id,
        name: name,
        change24h: Number(change_24h),
        volume24h: Number(vol_24h),
        marketCap: Number(market_cap),
        price: Number(price),
        currencyType: currency
      }
    }

    return cryptoCoin
  }
}