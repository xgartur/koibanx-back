import dayjs from 'dayjs'
import { Commerce } from "../commerce/commerce.entity"

const currencyFormat = (amount: number) => `$${amount}`
const dateFormat = (date: string) => dayjs(date).format('DD/MM/YYYY hh:m')
const booleanFormat = (bool: boolean) => bool ? 'Si' : 'No'

const commercePresenter = (item: Commerce) => {
  return {
    id: item._id,
    commerce: item.commerce,
    concepts: item.concepts,
    cuit: item.cuit,
    balance: currencyFormat(item.balance),
    active: booleanFormat(item.active),
    lastSell: dateFormat(item.lastSell)
  }
}
const commercesPresenter = (items: Commerce[]) => {
  return items.map((item: Commerce) => commercePresenter(item))
}
export { currencyFormat, dateFormat, booleanFormat, commercePresenter, commercesPresenter }
