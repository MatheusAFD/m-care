'use client'

import { useTransition } from 'react'
import { useFormContext } from 'react-hook-form'

import { MaskField, TextField } from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'

import { useDisclosure } from '@m-care/features/@shared/hooks'

import { queryClient } from '@m-care/features/@shared/lib'
import { getAddressByCep } from '@m-care/features/@shared/services'
import { UnitFormData } from '../../types'

interface UnitFormProps {
  saveText?: string
  onSubmit: (data: UnitFormData) => VoidFunction | Promise<void>
}

export const UnitFormFields = (props: UnitFormProps) => {
  const [isFetchingAddress, startTransition] = useTransition()

  const { saveText, onSubmit } = props

  const { dismissDialog } = useDisclosure()

  const {
    register,
    control,
    resetField,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useFormContext<UnitFormData>()

  const handleUnitFormSubmit = async (data: UnitFormData) => {
    await onSubmit(data)

    queryClient.invalidateQueries({
      queryKey: ['get-units']
    })

    reset()
    dismissDialog()

    return
  }

  const disableLocation = !isFetchingAddress

  return (
    <form onSubmit={handleSubmit(handleUnitFormSubmit)}>
      <div className="w-full grid gap-4 grid-cols-[1fr_1fr_auto] animate-fadeRender">
        <div className="col-span-3">
          <TextField
            {...register('name')}
            id="name"
            label="Nome da unidade"
            placeholder="Ex: Unidade São Paulo"
            errorMessage={errors.name?.message}
            className="col-span-2"
          />
        </div>

        <MaskField
          label="Telefone"
          control={control}
          name="phone"
          placeholder="Ex: (00) 0 0000-0000"
          pattern="(00) 0 0000-0000"
          inputMode="numeric"
          errorMessage={errors.phone?.message}
        />

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
                return
              }

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

        <MaskField
          control={control}
          name="number"
          pattern="0000000000"
          id="number"
          label="Número"
          placeholder="Ex: 123"
          inputMode="numeric"
          errorMessage={errors.number?.message}
          className="max-w-20"
        />

        <div className="col-span-3 flex gap-4">
          <TextField
            {...register('address')}
            id="address"
            label="Endereço"
            placeholder="Ex: Rua das Flores"
            errorMessage={errors.address?.message}
          />
          <TextField
            {...register('neighborhood')}
            id="neighborhood"
            label="Bairro"
            placeholder="Ex: Centro"
            errorMessage={errors.neighborhood?.message}
          />
        </div>

        <div className="col-span-3 flex gap-4">
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
      </div>

      <footer className="w-full flex gap-3 justify-end mt-8 place-self-end">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={dismissDialog}
        >
          Cancelar
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
