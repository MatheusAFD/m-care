import { useState, useTransition } from 'react'

import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'

import { useEmployeeForm } from '@m-care/features/employees/hooks'
import { useDisclosure } from '@m-care/features/@shared/hooks'

import { getAddressByCep } from '@m-care/features/@shared/services'
import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'
import { EmployeeFormData } from '@m-care/features/employees/types'

interface EmployeeAddressStepProps {
  saveText?: string
  onSubmit: (data: EmployeeFormData) => VoidFunction | Promise<void>
}

export const EmployeeAddressStep = (props: EmployeeAddressStepProps) => {
  const { onSubmit, saveText = 'Criar colaborador' } = props

  const [addressFetchIsCompleted, setAddressFetchIsCompleted] = useState(true)

  const [isFetchingAddress, startTransition] = useTransition()

  const { dismissDialog } = useDisclosure()

  const { updateFormStep } = useEmployeeForm()

  const {
    register,
    control,
    resetField,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useFormContext<EmployeeFormData>()

  const handleGoBack = () => {
    updateFormStep(EmployeeFormStepEnum.PersonalData)
  }

  const handleEmployeeFormSubmit = async (data: EmployeeFormData) => {
    await onSubmit(data)

    reset()
    dismissDialog()
    updateFormStep(EmployeeFormStepEnum.PersonalData)

    return
  }

  const disableLocation = addressFetchIsCompleted

  return (
    <form onSubmit={handleSubmit(handleEmployeeFormSubmit)}>
      <div className="w-full grid gap-4 grid-cols-2 animate-fadeRender">
        <MaskField
          control={control}
          id="zipcode"
          name="zipcode"
          pattern="00000-000"
          label="CEP"
          placeholder="Ex: 12345-678"
          errorMessage={errors.zipcode?.message}
          onValidate={(value) => {
            startTransition(async () => {
              const [error, response] = await getAddressByCep(value)

              if (error) {
                setAddressFetchIsCompleted(false)
                return
              }

              setAddressFetchIsCompleted(true)

              resetField('address', { defaultValue: response?.address })
              resetField('city', { defaultValue: response?.city })
              resetField('state', { defaultValue: response?.state })
              resetField('neighborhood', {
                defaultValue: response?.neighborhood
              })

              setFocus('number')
            })
          }}
        />
        <TextField
          {...register('address')}
          id="address"
          label="Endereço"
          placeholder="Ex: Rua das Flores"
          errorMessage={errors.address?.message}
        />
        <MaskField
          control={control}
          name="number"
          pattern="0000000000"
          id="number"
          label="Número"
          placeholder="Ex: 123"
          inputMode="numeric"
          errorMessage={errors.number?.message}
        />
        <TextField
          {...register('neighborhood')}
          id="neighborhood"
          label="Bairro"
          placeholder="Ex: Centro"
          errorMessage={errors.neighborhood?.message}
        />
        <TextField
          {...register('city')}
          id="city"
          label="Cidade"
          placeholder="Ex: São Paulo"
          disabled={disableLocation}
          errorMessage={errors.city?.message}
        />
        <TextField
          {...register('state')}
          id="state"
          label="Estado"
          placeholder="Ex: SP"
          disabled={disableLocation}
          errorMessage={errors.state?.message}
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

        <Button
          size="lg"
          type="submit"
          disabled={!isValid || isSubmitting || isFetchingAddress}
          isLoading={isSubmitting}
        >
          {saveText}
        </Button>
      </footer>
    </form>
  )
}
