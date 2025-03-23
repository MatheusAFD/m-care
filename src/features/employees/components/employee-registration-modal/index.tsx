import { PropsWithChildren } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@m-care/features/@shared/components/ui'
import { CreateEmployeeForm } from '../create-employee-form'

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

        <CreateEmployeeForm />

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outline" size="lg">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" size="lg">
            Criar colaborador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
