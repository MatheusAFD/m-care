'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  MaskField,
  PasswordField,
  TextField
} from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerCompany } from '../../services'

const registerCompanySchema = z.object({
  name: z.string().nonempty({ message: 'O campo é obrigatório' }),
  fantasyName: z.string().nonempty({ message: 'O campo é obrigatório' }),
  cnpj: z.string().nonempty({ message: 'O campo é obrigatório' }),
  email: z.string().email({ message: 'O campo é obrigatório' }),
  password: z.string().nonempty({ message: 'O campo é obrigatório' })
})

export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>

export const RegisterCompanyForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<RegisterCompanyFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      cnpj: ''
    }
  })

  const onSubmit = async (formData: RegisterCompanyFormData) => {
    const [error, data] = await registerCompany(formData)

    if (error) {
      toast.error('Erro ao cadastrar empresa.')
      return error
    }

    toast.success('Empresa cadastrada com sucesso!')

    return data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-4">
      <TextField
        {...register('name')}
        label="Nome"
        placeholder="Informe o nome do gestor"
        errorMessage={errors?.name?.message}
        isRequired
      />

      <TextField
        {...register('fantasyName')}
        label="Nome fantasia"
        placeholder="Informe o nome fantasia"
        errorMessage={errors?.fantasyName?.message}
        isRequired
      />

      <MaskField
        name="cnpj"
        control={control}
        pattern="00.000.000/0000-00"
        label="CNPJ"
        placeholder="Informe o CNPJ"
        errorMessage={errors?.cnpj?.message}
        isRequired
      />

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        placeholder="Informe o email"
        errorMessage={errors?.email?.message}
        isRequired
      />

      <PasswordField
        {...register('password')}
        label="Senha"
        placeholder="Crie uma senha"
        errorMessage={errors?.password?.message}
        isRequired
      />

      <Button
        type="submit"
        size="lg"
        className="place-self-end col-span-2"
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      >
        Finalizar
      </Button>
    </form>
  )
}
