import Image from 'next/image'

import { Edit, Map, MapPin } from 'lucide-react'

import { CustomCard } from '@m-care/features/@shared/components'
import {
  Avatar,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@m-care/features/@shared/components/ui'

import { UnitCardProps } from './types'

export const UnitCard = ({ unit, onEdit, ...props }: UnitCardProps) => {
  const { name, address, neighborhood, state, city, number } = unit

  return (
    <CustomCard
      className="relative w-80 h-56 flex flex-col items-center "
      {...props}
    >
      <Avatar className="size-16 border-2">
        <Image
          alt="Imagem de prédios com um icone roxo de mapa ao fundo."
          width={64}
          height={64}
          src="/unit-background.svg"
        />
      </Avatar>

      <section>
        <div className="mt-4 py-1 px-4 rounded-lg border max-w-56 min-h-10">
          <p className="text-xs text-center text-black font-medium ">{name}</p>
          <p className="text-xs text-center font-semibold">{neighborhood}</p>
        </div>

        <hr className="w-full h-[1px] left-0 bg-gray-200 mt-2 absolute" />
      </section>

      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center gap-1 mt-2">
          <MapPin size={16} className="text-green-principal" />
          <p className="text-xs font-medium">{`${city}/${state}`}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Map size={16} className="text-green-principal" />
          <p className="text-xs font-medium">{`${address} - ${number}`}</p>
        </div>
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
        <TooltipContent>Editar unidade</TooltipContent>
      </Tooltip>
    </CustomCard>
  )
}
