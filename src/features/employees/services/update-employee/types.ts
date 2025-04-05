import { EmployeeFormData } from '../../types'

export interface EditEmployeeParams {
  employeeId: string
  data: EmployeeFormData
}

export interface CreateEmployeeResponse {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  color: string
  phone: string
  isWhatsapp: boolean
  address: string
  number: string
  zipcode: string
  neighborhood: string
  city: string
  state: string
  userId: string
  companyId: string
  updatedAt: Date
  createdAt: Date
  deletedAt: Date | null
}
