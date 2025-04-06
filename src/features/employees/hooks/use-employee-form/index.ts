'use client'

import { use } from 'react'

import {
  StepsContext,
  StepsContextProps
} from '@m-care/features/@shared/context'

import { EmployeeFormStepEnum } from '../../enums'

export const useEmployeeForm = () => {
  const context = use(StepsContext)

  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider')
  }

  return context as StepsContextProps<EmployeeFormStepEnum>
}
