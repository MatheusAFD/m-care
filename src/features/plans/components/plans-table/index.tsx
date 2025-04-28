import { Info } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@m-care/features/@shared/components/ui'
import { formatToMonetaryValue } from '@m-care/features/@shared/utils'

import { Plan } from '../../services'

interface PlansTableProps {
  plans: Plan[] | null
}

export const PlansTable = ({ plans }: PlansTableProps) => {
  return (
    <Table className="max-w-[44rem] place-self-center mt-4">
      <TableCaption>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="flex gap-2 items-center justify-center">
                Uma lista com as limitações de cada plano.
                <Info className="animate-pulse">Hover</Info>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              <p className="max-w-60 text-center">
                Máximo de cadastros por funcionalidade, conforme o plano.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Plano</TableHead>
          <TableHead>Unidades</TableHead>
          <TableHead>Salas</TableHead>
          <TableHead>Colaboradores</TableHead>
          <TableHead className="text-right">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans?.map((plan) => {
          return (
            <TableRow key={plan.id}>
              <TableCell className="font-medium">{plan.name}</TableCell>
              <TableCell>{plan.limitations.maxUnits}</TableCell>
              <TableCell>{plan.limitations.maxRooms}</TableCell>
              <TableCell>{plan.limitations.maxEmployees}</TableCell>
              <TableCell className="font-medium text-right">
                {plan.isFree ? 'Free' : formatToMonetaryValue(plan.price)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
