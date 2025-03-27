import { z } from 'zod'

export const EmployeeFormSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório')
    .min(11, 'O telefone deve ter pelo menos 11 caracteres'),
  email: z.string().email('Endereço de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  address: z.string().nonempty('Endereço é obrigatório'),
  city: z.string().nonempty('Cidade é obrigatória'),
  state: z.string().nonempty('Estado é obrigatório'),
  number: z.string().nonempty('Número é obrigatório'),
  neighborhood: z.string().nonempty('Bairro é obrigatório'),
  zipCode: z.string().nonempty('O CEP é obrigatório').min(8, 'CEP inválido'),
  status: z.boolean(),
  isWhatsapp: z.boolean()
})

export type EmployeeFormSchemaType = z.infer<typeof EmployeeFormSchema>
