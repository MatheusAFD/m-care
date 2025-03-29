'use client'

import { StepControl } from '@m-care/features/@shared/components/progress-step'
import { User, Home } from 'lucide-react'
import { useEmployeeForm } from '../../hooks'
import { EmployeeFormStepEnum } from '../../enums'

export const FormProgressSteps = () => {
  const steps = [
    { name: 'Dados pessoais', icon: User },
    { name: 'Endereço', icon: Home }
  ]

  const { formStep } = useEmployeeForm()

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
