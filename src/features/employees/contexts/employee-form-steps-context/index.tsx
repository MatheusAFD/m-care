'use client'

import React, { createContext, useState, PropsWithChildren } from 'react'

import { EmployeeFormStepEnum } from '../../enums'

interface EmployeeFormStepsContextProps {
  formStep: EmployeeFormStepEnum
  updateFormStep: (step: EmployeeFormStepEnum) => void
}

export const EmployeeFormStepsContext = createContext(
  {} as EmployeeFormStepsContextProps
)

export const EmployeeFormStepsProvider = ({ children }: PropsWithChildren) => {
  const [formStep, setFormStep] = useState<EmployeeFormStepEnum>(
    EmployeeFormStepEnum.PersonalData
  )

  const updateFormStep = (step: EmployeeFormStepEnum) => {
    setFormStep(step)
  }

  const contextValue: EmployeeFormStepsContextProps = {
    formStep,
    updateFormStep
  }

  return (
    <EmployeeFormStepsContext.Provider value={contextValue}>
      {children}
    </EmployeeFormStepsContext.Provider>
  )
}
