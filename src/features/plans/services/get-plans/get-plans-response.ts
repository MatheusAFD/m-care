export interface Plan {
  id: string
  name: string
  title: string
  description: string
  price: string
  status: string
  duration: number
  isRecommended: boolean
  isTrial: boolean
  isFree: boolean
  stripePriceId: string
  stripeProductId: string
  updated_at?: Date
  created_at: string
  deleted_at?: Date
}
