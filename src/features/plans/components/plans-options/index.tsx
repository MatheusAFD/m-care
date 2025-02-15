import { formatToMonetaryValue } from '@m-care/features/@shared/utils'
import { getPlans } from '../../services/get-plans/get-plans'

import { PlanCard } from '../plan-card'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@m-care/features/@shared/components/ui'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@m-care/features/@shared/components/ui/tooltip'
import { Info } from 'lucide-react'

export const PlansOptions = async () => {
  const [error, plans] = await getPlans()

  console.log(plans)

  return (
    <>
      {!!error && <div>Algo deu errado</div>}
      <div className="flex flex-wrap gap-2 justify-center items-end place-self-center">
        {plans?.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>

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
    </>
  )
}
