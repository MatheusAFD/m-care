'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { signin } from '../../services'

import { PasswordField, TextField } from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'

const signinSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().nonempty({ message: 'O campo é obrigatório' })
})

export type SigninFormData = z.infer<typeof signinSchema>

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<SigninFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signinSchema)
  })

  const onSubmit = async (formData: SigninFormData) => {
    const [error, response] = await signin(formData)

    if (error) {
      toast.error('Erro ao entrar, email ou senha inválidos.', {
        position: 'top-center'
      })

      return error
    }

    toast.success('Sucesso!', {
      position: 'top-center'
    })

    return response
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-4 py-4"
    >
      <TextField
        {...register('email')}
        type="email"
        label="Email"
        errorMessage={errors.email?.message}
      />
      <PasswordField
        {...register('password')}
        label="Senha"
        errorMessage={errors.password?.message}
      />

      <Button
        type="submit"
        size="lg"
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      >
        Entrar
      </Button>
    </form>
  )
}
