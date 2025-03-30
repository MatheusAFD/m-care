import { PaginatedResponse } from '@m-care/features/@shared/types'

export type EmployeeResponse = PaginatedResponse<Employee[]>

export interface Employee {
  id: string
  name: string
  status: string
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
  companyId: string
  updatedAt: Date | null
  createdAt: Date | null
  deletedAt: Date | null
}
