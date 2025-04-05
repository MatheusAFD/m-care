import { Edit } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@m-care/features/@shared/components/ui'
import { CustomCard } from '@m-care/features/@shared/components'

import { getNameInitials } from '@m-care/features/@shared/utils'
import { EmployeeCardProps } from './types'

export const EmployeeCard = (props: EmployeeCardProps) => {
  const { name, color, onEdit, ...cardProps } = props

  const nameInitials = getNameInitials(name)

  return (
    <CustomCard
      className="relative p-0 w-72 h-40 flex flex-col items-center justify-center overflow-hidden"
      {...cardProps}
    >
      <div
        className="absolute top-0 h-2 w-full"
        style={{ backgroundColor: color }}
      />

      <Avatar className="size-16 border-2 " style={{ borderColor: color }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </Avatar>
      <div className="mt-4 py-1 px-4 rounded-lg border max-w-56">
        <p className="text-xs text-center text-black font-medium ">{name}</p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute top-4 right-2"
            variant="outline"
            size="icon"
            onClick={onEdit}
          >
            <Edit />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Editar colaborador</TooltipContent>
      </Tooltip>
    </CustomCard>
  )
}
