'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSteps } from '@m-care/features/@shared/hooks'

import { EmployeeFormStepEnum } from '../../enums'
import { EmployeeFormData, EmployeeFormSchema } from '../../types'
import { EmployeeAddressStep } from './employee-address-step'
import { EmployeePersonalDataStep } from './employee-personal-data-step'

interface EmployeeFormProps {
  saveText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Partial<EmployeeFormData> | any
  onSubmit: (data: EmployeeFormData) => VoidFunction | Promise<void>
}

export const EmployeeForm = (props: EmployeeFormProps) => {
  const { saveText = 'Criar colaborador', onSubmit, defaultValues } = props

  const defaultFormValues =
    defaultValues ??
    ({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      number: '',
      neighborhood: '',
      zipcode: ''
    } as EmployeeFormData)

  const { formStep } = useSteps()

  const formMethods = useForm<EmployeeFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: defaultFormValues
  })

  const componentsbyStep = {
    [EmployeeFormStepEnum.PersonalData]: EmployeePersonalDataStep,
    [EmployeeFormStepEnum.Address]: EmployeeAddressStep
  }

  const CurrentStepComponent = componentsbyStep[formStep]

  return (
    <section className="flex flex-col justify-between">
      <FormProvider {...formMethods}>
        <CurrentStepComponent onSubmit={onSubmit} saveText={saveText} />
      </FormProvider>
    </section>
  )
}
