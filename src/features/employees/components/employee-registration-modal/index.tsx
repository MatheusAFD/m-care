import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@m-care/features/@shared/components/ui'
import { CreateEmployeeForm } from '../create-employee-form'
import { EmployeeFormStepsProvider } from '../../contexts'

export const EmployeeRegistrationModal = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle asChild>
            <h1 className="text-lg font-medium">Criação de colaborador</h1>
          </DialogTitle>
        </DialogHeader>

        <EmployeeFormStepsProvider>
          <CreateEmployeeForm />
        </EmployeeFormStepsProvider>
      </DialogContent>
    </Dialog>
  )
}
