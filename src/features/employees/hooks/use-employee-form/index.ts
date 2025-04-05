'use client'

import { use } from 'react'

import { EmployeeFormStepsContext } from '../../contexts'

export const useEmployeeForm = () => {
  const context = use(EmployeeFormStepsContext)

  return context
}
