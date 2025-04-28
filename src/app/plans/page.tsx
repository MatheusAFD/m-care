import { Suspense } from 'react'

import { Metadata } from 'next'

import { Loading } from '@m-care/features/@shared/components'
import { PlansOptions } from '@m-care/features/plans/components'

export const metadata: Metadata = {
  title: 'Assinatura de planos'
}

export default function PlansPage() {
  return (
    <main className="w-full flex flex-col">
      <header className="pt-20 text-center">
        <h1 className=" text-4xl font-medium">
          We offer great{' '}
          <strong className="text-green-principal font-medium">price</strong>{' '}
          plan for the <br />
          application
        </h1>
        <h2 className="pt-4 text-gray-600 text-xl animate-pulse">
          A cobrança do plano é realizada mensalmente.
        </h2>
      </header>

      <section className="pt-8">
        <Suspense fallback={<Loading />}>
          <PlansOptions />
        </Suspense>
      </section>
    </main>
  )
}
