export interface Unit {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  color: string
  phone: string
  isWhatsapp: boolean
  birthdate: Date | null
  address: string
  number: string
  zipcode: string
  neighborhood: string
  city: string
  state: string
  userId: string
  unitId: string
  companyId: string
  updatedAt: Date | null
  createdAt: Date | null
  deletedAt: Date | null
}
