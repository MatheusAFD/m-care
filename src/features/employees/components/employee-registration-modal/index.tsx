import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from '@m-care/features/@shared/components/ui'
import { CreateEmployeeForm } from '../create-employee-form'
import { EmployeeFormStepsProvider } from '../../contexts'

import { FormProgressSteps } from '../form-progress-steps'

export const EmployeeRegistrationModal = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <EmployeeFormStepsProvider>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <h1 className="text-lg font-medium">Criação de colaborador</h1>
            </DialogTitle>

            <FormProgressSteps />
          </DialogHeader>

          <CreateEmployeeForm />
        </DialogContent>
      </EmployeeFormStepsProvider>
    </Dialog>
  )
}
