import { z } from 'zod'

export const EmployeeFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().min(11, 'O telefone deve ter pelo menos 11 caracteres'),
  email: z.string().email('Endereço de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  zipCode: z.string().min(5, 'O CEP deve ter pelo menos 5 caracteres'),
  status: z.boolean(),
  isWhatsapp: z.boolean()
})

export type EmployeeFormSchemaType = z.infer<typeof EmployeeFormSchema>
