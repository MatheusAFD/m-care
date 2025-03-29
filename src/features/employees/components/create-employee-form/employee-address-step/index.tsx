import { useState, useTransition } from 'react'

import { toast } from 'sonner'
import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { EmployeeFormSchemaType } from '@m-care/features/employees/types'
import { Button } from '@m-care/features/@shared/components/ui'
import { useEmployeeForm } from '@m-care/features/employees/hooks'
import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'
import { getAddressByCep } from '@m-care/features/@shared/services'
import { createEmployee } from '@m-care/features/employees/services'

import { useDisclosure } from '@m-care/features/@shared/hooks'

export const EmployeeAddressStep = () => {
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
  } = useFormContext<EmployeeFormSchemaType>()

  const handleGoBack = () => {
    updateFormStep(EmployeeFormStepEnum.PersonalData)
  }

  const onSubmit = async (data: EmployeeFormSchemaType) => {
    const [error, response] = await createEmployee(data)

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao criar colaborador.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Colaborador criado com sucesso.'
    })

    reset()
    dismissDialog()

    return response
  }

  const disableLocation = addressFetchIsCompleted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          {...register('number')}
          id="number"
          label="Número"
          placeholder="Ex: 123"
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
        >
          Criar colaborador
        </Button>
      </footer>
    </form>
  )
}
