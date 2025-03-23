'use client'
import { FormProvider, useForm } from 'react-hook-form'

import { EmployeeFormStepEnum } from '../../enums'
import { useEmployeeForm } from '../../hooks'
import { EmployeeFormSchemaType, EmployeeFormSchema } from '../../types'
import { EmployeePersonalDataStep } from './employee-personal-data-step'
import { EmployeeAddressStep } from './employee-address-step'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreateEmployeeForm = () => {
  const { formStep } = useEmployeeForm()

  const formMethods = useForm<EmployeeFormSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(EmployeeFormSchema)
  })

  const componentbyStep = {
    [EmployeeFormStepEnum.PersonalData]: EmployeePersonalDataStep,
    [EmployeeFormStepEnum.Address]: EmployeeAddressStep
  }

  const CurrentStepComponent = componentbyStep[formStep]

  return (
    <form>
      <FormProvider {...formMethods}>
        <CurrentStepComponent />
      </FormProvider>
    </form>
  )
}
