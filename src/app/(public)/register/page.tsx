import { Metadata } from 'next'

import { RegisterCompanyForm } from '@m-care/features/register/components'
import { LineBadge } from '@m-care/features/@shared/components'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Registro'
}

export default function RegisterPage() {
  return (
    <>
      <Image
        src="/register-background.svg"
        width={400}
        height={400}
        alt="Ondas verdes"
        className="fixed left-0 w-full"
        priority
      />
      <main className="p-8 h-screen relative">
        <section className=" flex justify-center w-full mt-8">
          <div className="w-[56rem] p-12 shadow-md rounded-lg bg-white">
            <LineBadge />
            <h1 className="text-xl font-medium pb-6">Cadastro</h1>

            <RegisterCompanyForm />
          </div>
        </section>
      </main>
    </>
  )
}
