'use client'

import { toast } from 'sonner'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle
} from '@m-care/features/@shared/components/ui'
import { EmployeeForm } from '../employee-form'
import { EmployeeFormStepsProvider } from '../../contexts'

import { FormProgressSteps } from '../form-progress-steps'
import { EmployeeFormData } from '../../types'

import { DialogProps } from '@m-care/features/@shared/types'
import { getEmployee } from '../../services/get-employee'
import { editEmployee } from '../../services/edit-employee'

interface EmployeeEditFormProps extends DialogProps {
  employeeId: string
}

export const EmployeeEditModal = (props: EmployeeEditFormProps) => {
  const { employeeId, isOpen, onOpenChange, onClose } = props

  const onSubmit = async (data: EmployeeFormData) => {
    const [error] = await editEmployee({ employeeId, data })

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao editar colaborador.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Colaborador editado com sucesso.'
    })

    onOpenChange()

    return
  }

  const defaultValues = async () => {
    const [error, employee] = await getEmployee({
      employeeId
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao buscar colaborador.'
      })

      return
    }

    return employee
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange()

        if (open === false) {
          onClose?.()
        }
      }}
    >
      <EmployeeFormStepsProvider>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <h1 className="text-lg font-medium">Edição de colaborador</h1>
            </DialogTitle>

            <FormProgressSteps />
          </DialogHeader>

          <EmployeeForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            saveText="Editar colaborador"
          />
        </DialogContent>
      </EmployeeFormStepsProvider>
    </Dialog>
  )
}
