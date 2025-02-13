import { Suspense } from 'react'

import { Loading } from '@m-care/features/@shared/components'
import { PlansOptions } from '@m-care/features/plans/components'

export default function PlansPage() {
  return (
    <main className="w-full flex flex-col items-center">
      <header className="pt-20">
        <h1 className="text-center text-4xl font-medium">
          We offer great <span className="text-green-principal">price</span>{' '}
          plan for the <br />
          application
        </h1>
      </header>

      <section className="pt-20">
        <Suspense fallback={<Loading />}>
          <PlansOptions />
        </Suspense>
      </section>
    </main>
  )
}
