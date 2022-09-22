
export class CommercePresenter {
  _id?: string

  commerce: string

  concepts: string[]

  cuit: string

  balance: string

  active: string

  lastSell: string
}
export class CommercesPresenter {
  data: CommercePresenter[]
  page: number
  pages: number
  limit: number
  total: number
}

