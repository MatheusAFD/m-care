'use client'

import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from '@m-care/features/@shared/components/ui'
import { UnitForm } from '../unit-form-container'
import { createUnit } from '../../services/create-unit'
import { UnitFormData } from '../../types'
import { toast } from 'sonner'

export const UnitRegistrationModal = ({ children }: PropsWithChildren) => {
  const onSubmit = async (data: UnitFormData) => {
    const [error] = await createUnit(data)

    if (error) {
      toast.error('Erro', {
        description: 'Erro ao criar unidade'
      })

      return
    }

    toast.success('Sucesso', {
      description: 'Unidade criada com sucesso'
    })

    return
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-[35rem]">
        <DialogHeader>
          <DialogTitle asChild>
            <h1 className="text-lg font-medium">Criação de unidade</h1>
          </DialogTitle>
        </DialogHeader>

        <UnitForm saveText="Criar unidade" onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
