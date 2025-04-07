import { Suspense } from 'react'
import { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { SearchFilter } from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'
import { UnitRegistrationModal } from '@m-care/features/units/components'

export const metadata: Metadata = {
  title: 'Unidades',
  description: 'Gerenciamento de unidades'
}

export default function UnitsPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-wrap items-start gap-3 p-8">
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
    </div>
  )
}
