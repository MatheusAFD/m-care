'use client'

import { toast } from 'sonner'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle
} from '@m-care/features/@shared/components/ui'

import { DialogProps } from '@m-care/features/@shared/types'

import { UnitForm } from '../unit-form-container'
import { UnitFormData } from '../../types'
import { getUnit, updateUnit } from '../../services'

interface EmployeeEditFormProps extends DialogProps {
  unitId: string
}

export const UnitEditModal = (props: EmployeeEditFormProps) => {
  const { unitId, isOpen, onOpenChange, onClose } = props

  const onSubmit = async (data: UnitFormData) => {
    const [error] = await updateUnit({ unitId, data })

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao editar unidade.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Unidade editado com sucesso.'
    })

    onOpenChange()

    return
  }

  const defaultValues = async () => {
    const [error, employee] = await getUnit({
      unitId
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao buscar unidade.'
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h1 className="text-lg font-medium">Edição de unidade</h1>
          </DialogTitle>
        </DialogHeader>

        <UnitForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          saveText="Salvar"
        />
      </DialogContent>
    </Dialog>
  )
}
