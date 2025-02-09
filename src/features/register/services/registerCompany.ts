import { httpClientFetch } from '@m-care/features/@shared/lib'
import { RegisterCompanyFormData } from '../components/RegisterCompanyForm'

export const registerCompany = async (data: RegisterCompanyFormData) => {
  const [error, response] = await httpClientFetch({
    method: 'POST',
    url: '/companies',
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
    return [error, null]
  }

  return [null, response]
}
