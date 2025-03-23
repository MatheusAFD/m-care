import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { EmployeeFormSchemaType } from '@m-care/features/employees/types'
import { Button } from '@m-care/features/@shared/components/ui'
import { useEmployeeForm } from '@m-care/features/employees/hooks'
import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'

export const EmployeeAddressStep = () => {
  const { updateFormStep } = useEmployeeForm()

  const { register, control } = useFormContext<EmployeeFormSchemaType>()

  const handleGoBack = () => {
    updateFormStep(EmployeeFormStepEnum.PersonalData)
  }

  return (
    <>
      <div className="w-full grid gap-4 grid-cols-2">
        <MaskField
          control={control}
          name="zipCode"
          label="CEP"
          pattern="ddddd-ddd"
        />
        <TextField {...register('address')} label="Endereço" />
        <TextField {...register('number')} label="Número" />
        <TextField {...register('neighborhood')} label="Bairro" />
        <TextField {...register('city')} label="Cidade" />
        <TextField {...register('state')} label="Estado" />
      </div>

      <footer className="w-full flex gap-4 justify-end mt-8">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleGoBack}
        >
          Voltar
        </Button>

        <Button size="lg" type="submit">
          Criar colaborador
        </Button>
      </footer>
    </>
  )
}
