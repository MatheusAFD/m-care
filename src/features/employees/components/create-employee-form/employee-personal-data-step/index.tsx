import {
  MaskField,
  PasswordField,
  SwitchField,
  TextField
} from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'
import { EmployeeFormStepEnum } from '@m-care/features/employees/enums'
import { useEmployeeForm } from '@m-care/features/employees/hooks'
import { EmployeeFormSchemaType } from '@m-care/features/employees/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { useFormContext } from 'react-hook-form'

export const EmployeePersonalDataStep = () => {
  const { updateFormStep } = useEmployeeForm()

  const {
    control,
    register,
    getValues,
    formState: { errors }
  } = useFormContext<EmployeeFormSchemaType>()

  const currentValues = getValues()

  console.log(currentValues)

  const handleNextStep = () => {
    updateFormStep(EmployeeFormStepEnum.Address)
  }

  return (
    <>
      <div className="w-full grid gap-4 grid-cols-2">
        <div className="col-span-2">
          <TextField
            {...register('name')}
            id="name"
            label="Nome completo"
            className="col-span-2"
            errorMessage={errors.name?.message}
          />
        </div>

        <TextField
          {...register('email')}
          id="email"
          label="E-mail"
          errorMessage={errors.email?.message}
        />

        <PasswordField
          {...register('password')}
          id="password"
          label="Senha"
          errorMessage={errors.password?.message}
        />

        <MaskField
          label="Telefone"
          control={control}
          name="phone"
          pattern="(00) 0 0000-0000"
          inputMode="numeric"
          errorMessage={errors.phone?.message}
          defaultValue={currentValues.phone}
        />

        <SwitchField
          {...register('isWhatsapp')}
          id="isWhatsapp"
          label="É Whatsapp"
        />

        <SwitchField {...register('status')} id="status" label="Status" />
      </div>

      <footer className="w-full flex gap-4 justify-end mt-8">
        <DialogClose asChild>
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
        </DialogClose>
        <Button size="lg" onClick={handleNextStep}>
          Avançar
        </Button>
      </footer>
    </>
  )
}
