import { z } from 'zod'

export const UnitFormSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório')
    .min(11, 'O telefone deve ter pelo menos 11 caracteres'),
  address: z.string().nonempty('Endereço é obrigatório'),
  city: z.string().nonempty('Cidade é obrigatória'),
  state: z.string().nonempty('Estado é obrigatório'),
  number: z.string().nonempty('Número é obrigatório'),
  neighborhood: z.string().nonempty('Bairro é obrigatório'),
  zipcode: z.string().nonempty('O CEP é obrigatório').min(8, 'CEP inválido')
})

export type UnitFormData = z.infer<typeof UnitFormSchema>
