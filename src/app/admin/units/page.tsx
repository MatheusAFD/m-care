import { Suspense } from 'react'
import { Metadata } from 'next'

import { Plus } from 'lucide-react'

import {
  Container,
  Loading,
  SearchFilter
} from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'
import {
  UnitRegistrationModal,
  UnitsContainer
} from '@m-care/features/units/components'

export const metadata: Metadata = {
  title: 'Unidades',
  description: 'Gerenciamento de unidades'
}

export default function UnitsPage() {
  return (
    <Container className="flex flex-col w-full p-8 gap-8">
      <header className="flex w-full flex-row flex-wrap gap-3">
        <UnitRegistrationModal>
          <Button>
            <Plus />
            Criar unidade
          </Button>
        </UnitRegistrationModal>

        <Suspense>
          <SearchFilter placeholder="Pesquisar unidade" />
        </Suspense>
      </header>

      <Suspense fallback={<Loading />}>
        <UnitsContainer />
      </Suspense>
    </Container>
  )
}
