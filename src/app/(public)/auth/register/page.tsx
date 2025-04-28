import { Metadata } from 'next'

import { CustomCard, LineBadge } from '@m-care/features/@shared/components'
import { RegisterCompanyForm } from '@m-care/features/auth/register/components'

export const metadata: Metadata = {
  title: 'Registro'
}

export default function RegisterPage() {
  return (
    <>
      <section className="flex justify-center w-full mt-16">
        <CustomCard className="w-[56rem]">
          <LineBadge size="lg" />
          <h1 className="text-xl font-medium pb-6">Cadastro</h1>

          <RegisterCompanyForm />
        </CustomCard>
      </section>
    </>
  )
}
