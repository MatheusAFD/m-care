import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { Button, DialogClose } from '@m-care/features/@shared/components/ui'
import { useSteps } from '@m-care/features/@shared/hooks'
import { usePartialFormValidation } from '@m-care/features/@shared/hooks'
import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'
import { EmployeeFormData } from '@m-care/features/employees/types'

export const EmployeePersonalDataStep = () => {
  const { updateFormStep } = useSteps()

  const { isValid } = usePartialFormValidation<EmployeeFormData>({
    fields: ['name', 'email', 'phone']
  })

  const {
    control,
    register,
    formState: { errors }
  } = useFormContext<EmployeeFormData>()

  const handleNextStep = () => {
    updateFormStep(EmployeeFormStepEnum.Address)
  }

  return (
    <form>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 animate-fadeRender">
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

        <Button size="lg" onClick={handleNextStep} disabled={!isValid}>
          Avançar
        </Button>
      </footer>
    </form>
  )
}
