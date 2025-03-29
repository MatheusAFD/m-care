import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { Button, DialogClose } from '@m-care/features/@shared/components/ui'

import { useEmployeeForm } from '@m-care/features/employees/hooks'

import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'
import { EmployeeFormSchemaType } from '@m-care/features/employees/types'

export const EmployeePersonalDataStep = () => {
  const { updateFormStep } = useEmployeeForm()

  const {
    control,
    register,
    formState: { errors },
    getFieldState
  } = useFormContext<EmployeeFormSchemaType>()

  const handleNextStep = async () => {
    updateFormStep(EmployeeFormStepEnum.Address)
  }

  const fields = [
    getFieldState('name'),
    getFieldState('email'),
    getFieldState('phone')
  ] as const

  const allFieldsIsValid = fields.every(
    (field) => !field.invalid && field.isTouched
  )

  return (
    <form>
      <div className="w-full grid grid-cols-1 gap-4 items-end md:grid-cols-2 animate-fadeRender">
        <div className="md:col-span-2">
          <TextField
            {...register('name')}
            id="name"
            label="Nome completo"
            placeholder="Ex: João da Silva"
            className="md:col-span-2"
            errorMessage={errors.name?.message}
          />
        </div>

        <TextField
          {...register('email')}
          id="email"
          label="E-mail"
          errorMessage={errors.email?.message}
          placeholder="Ex: joao@email.com"
        />

        <MaskField
          label="Telefone"
          control={control}
          name="phone"
          placeholder="Ex: (00) 0 0000-0000"
          pattern="(00) 0 0000-0000"
          inputMode="numeric"
          errorMessage={errors.phone?.message}
        />
      </div>

      <footer className="w-full flex gap-3 justify-end mt-8">
        <DialogClose asChild>
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
        </DialogClose>

        <Button size="lg" onClick={handleNextStep} disabled={!allFieldsIsValid}>
          Avançar
        </Button>
      </footer>
    </form>
  )
}
