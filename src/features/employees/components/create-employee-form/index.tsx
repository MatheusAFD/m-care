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
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      number: '',
      neighborhood: '',
      zipcode: '',
      status: false,
      isWhatsapp: false
    }
  })

  const componentsbyStep = {
    [EmployeeFormStepEnum.PersonalData]: EmployeePersonalDataStep,
    [EmployeeFormStepEnum.Address]: EmployeeAddressStep
  }

  const CurrentStepComponent = componentsbyStep[formStep]

  return (
    <section className="flex flex-col justify-between">
      <FormProvider {...formMethods}>
        <CurrentStepComponent />
      </FormProvider>
    </section>
  )
}
