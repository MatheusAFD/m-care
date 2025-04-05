import { Button } from '@m-care/features/@shared/components/ui'
import { EmployeeRegistrationModal } from '@m-care/features/employees/components'
import { Plus } from 'lucide-react'

export default function EmployeesPage() {
  return (
    <main className="p-6">
      <header>
        <EmployeeRegistrationModal>
          <Button>
            <Plus />
            Criar colaborador
          </Button>
        </EmployeeRegistrationModal>
      </header>
    </main>
  )
}
