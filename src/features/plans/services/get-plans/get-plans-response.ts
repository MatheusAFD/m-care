export interface Plan {
  id: string
  name: string
  title: string
  description: string
  price: string
  status: string
  stripePriceId: string
  stripeProductId: string
  duration: number
  isRecommended: boolean
  isTrial: boolean
  isFree: boolean
  limitations: {
    maxRooms: number
    maxUnits: number
    maxEmployees: number
  }
  updated_at?: Date
  created_at: string
  deleted_at?: Date
}
