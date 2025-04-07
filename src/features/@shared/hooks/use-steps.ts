'use client'

import { use } from 'react'

import {
  StepsContext,
  StepsContextProps
} from '@m-care/features/@shared/context'

import { EmployeeFormStepEnum } from '../../employees/enums'

export const useSteps = () => {
  const context = use(StepsContext)

  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider')
  }

  return context as StepsContextProps<EmployeeFormStepEnum>
}
