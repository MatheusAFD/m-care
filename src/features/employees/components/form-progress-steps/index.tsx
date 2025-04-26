'use client'

import { User, Home } from 'lucide-react'

import { StepControl } from '@m-care/features/@shared/components/progress-step'

import { EmployeeFormStepEnum } from '../../enums'
import { useSteps } from '@m-care/features/@shared/hooks'

export const FormProgressSteps = () => {
  const steps = [
    { name: 'Dados pessoais', icon: User },
    { name: 'Endereço', icon: Home }
  ]

  const { formStep } = useSteps()

  const currentStep = {
    [EmployeeFormStepEnum.PersonalData]: 0,
    [EmployeeFormStepEnum.Address]: 1
  }

  return (
    <div className="pt-3">
      <StepControl steps={steps} currentStep={currentStep[formStep]} />
    </div>
  )
}
