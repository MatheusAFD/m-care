import { PaginatedResponse } from '@m-care/features/@shared/types'
import { Unit } from '../units'

export type GetUnitsResponse = PaginatedResponse<Unit[]>
