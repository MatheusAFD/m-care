'use client'

import { PropsWithChildren } from 'react'

import { toast } from 'sonner'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from '@m-care/features/@shared/components/ui'
import { EmployeeForm } from '../employee-form'
import { EmployeeFormStepsProvider } from '../../contexts'

import { FormProgressSteps } from '../form-progress-steps'
import { EmployeeFormData } from '../../types'
import { createEmployee } from '../../services'

export const EmployeeRegistrationModal = ({ children }: PropsWithChildren) => {
  const onSubmit = async (data: EmployeeFormData) => {
    const [error] = await createEmployee(data)

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao criar colaborador.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Colaborador criado com sucesso.'
    })

    return
  }

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

          <EmployeeForm onSubmit={onSubmit} />
        </DialogContent>
      </EmployeeFormStepsProvider>
    </Dialog>
  )
}
