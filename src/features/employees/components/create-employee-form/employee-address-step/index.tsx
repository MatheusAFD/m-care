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
      <div className="w-full grid gap-4 grid-cols-2 animate-fadeRender">
        <MaskField
          control={control}
          id="zipCode"
          name="zipCode"
          pattern="ddddd-ddd"
          label="CEP"
          placeholder="Ex: 12345-678"
        />
        <TextField
          {...register('address')}
          id="address"
          label="Endereço"
          placeholder="Ex: Rua das Flores"
        />
        <TextField
          {...register('number')}
          id="number"
          label="Número"
          placeholder="Ex: 123"
        />
        <TextField
          {...register('neighborhood')}
          id="neighborhood"
          label="Bairro"
          placeholder="Ex: Centro"
        />
        <TextField
          {...register('city')}
          id="city"
          label="Cidade"
          placeholder="Ex: São Paulo"
        />
        <TextField
          {...register('state')}
          id="state"
          label="Estado"
          placeholder="Ex: SP"
        />
      </div>

      <footer className="w-full flex gap-3 justify-end mt-8 place-self-end">
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
