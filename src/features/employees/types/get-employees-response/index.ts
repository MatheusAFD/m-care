import { PaginatedResponse } from '@m-care/features/@shared/types'
import { Employee } from '../employee'

export type EmployeesResponse = PaginatedResponse<Employee[]>
