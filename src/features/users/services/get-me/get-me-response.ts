import { RolesEnum } from '@m-care/features/@shared/enums'

export interface GetMeResponse {
  id: string
  name: string
  email: string
  companyId: string
  roleId: string
  birthday: string
  genre: string
  updated_at?: Date
  created_at: Date
  deleted_at?: Date
  roles: Roles
  companies: Companies
  activeCompanyPlans: ActiveCompanyPlans
}

export interface Roles {
  type: RolesEnum
}

export interface Companies {
  id: string
  name: string
  isActive: boolean
}

export interface ActiveCompanyPlans {
  isActive: boolean
  remainingDaysWithActivePlan: number
  startDate: Date
  endDate: Date
}
