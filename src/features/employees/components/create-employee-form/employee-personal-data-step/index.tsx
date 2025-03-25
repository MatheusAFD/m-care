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
    formState: { errors }
  } = useFormContext<EmployeeFormSchemaType>()

  const handleNextStep = () => {
    updateFormStep(EmployeeFormStepEnum.Address)
  }

  return (
    <>
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 animate-fadeRender">
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

        <PasswordField
          {...register('password')}
          id="password"
          label="Senha"
          placeholder="Senha"
          errorMessage={errors.password?.message}
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

        <SwitchField
          {...register('isWhatsapp')}
          id="isWhatsapp"
          label="É Whatsapp"
        />

        <SwitchField {...register('status')} id="status" label="Status" />
      </div>

      <footer className="w-full flex gap-3 justify-end mt-8">
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
