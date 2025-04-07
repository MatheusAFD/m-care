'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UnitFormData, UnitFormSchema } from '../../types'
import { UnitFormFields } from '../unit-form-fields'

interface UnitFormProps {
  saveText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Partial<UnitFormData> | any
  onSubmit: (data: UnitFormData) => VoidFunction | Promise<void>
}

export const UnitForm = (props: UnitFormProps) => {
  const { saveText = 'Criar colaborador', onSubmit, defaultValues } = props

  const defaultFormValues =
    defaultValues ??
    ({
      name: '',
      phone: '',
      address: '',
      zipcode: '',
      number: '',
      neighborhood: '',
      city: '',
      state: ''
    } as UnitFormData)

  const formMethods = useForm<UnitFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(UnitFormSchema),
    defaultValues: defaultFormValues
  })

  return (
    <section className="flex flex-col justify-between">
      <FormProvider {...formMethods}>
        <UnitFormFields saveText={saveText} onSubmit={onSubmit} />
      </FormProvider>
    </section>
  )
}
