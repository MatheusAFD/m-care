export interface CreateUnitResponse {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  phone: string
  address: string
  number: string
  zipcode: string
  neighborhood: string
  city: string
  state: string
  companyId: string
  updatedAt: Date
  createdAt: Date
  deletedAt: Date | null
}
