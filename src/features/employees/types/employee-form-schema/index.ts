import { z } from 'zod'

export const EmployeeFormSchema = z.object({
  name: z
    .string()
    .nonempty('Nome é obrigatório')
    .refine(
      (value) => value.trim().split(' ').length > 1,
      'Informe o nome completo'
    ),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório')
    .min(11, 'O telefone deve ter pelo menos 11 caracteres'),
  email: z.string().email('Endereço de e-mail inválido'),
  address: z.string().nonempty('Endereço é obrigatório'),
  city: z.string().nonempty('Cidade é obrigatória'),
  state: z.string().nonempty('Estado é obrigatório'),
  number: z.string().nonempty('Número é obrigatório'),
  neighborhood: z.string().nonempty('Bairro é obrigatório'),
  zipcode: z.string().nonempty('O CEP é obrigatório').min(8, 'CEP inválido')
})

export type EmployeeFormSchemaType = z.infer<typeof EmployeeFormSchema>
