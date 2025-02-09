import { toast } from 'sonner'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { registerCompanyFormData } from '../components/RegisterCompanyForm'

export const registerCompany = async (data: registerCompanyFormData) => {
  const [error, response] = await httpClientFetch({
    method: 'POST',
    url: '/companies',
    baseURL: 'http://localhost:3000',
    data: {
      userName: data.name,
      companyName: data.fantasyName,
      cnpj: data.cnpj,
      email: data.email,
      password: data.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (error) {
    toast.error('Erro ao cadastrar empresa.')
    return [error, null]
  }

  toast.success('Empresa cadastrada com sucesso!')

  return [null, response]
}
