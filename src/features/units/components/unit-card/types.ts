import React from 'react'

import { CustomCard } from '@m-care/features/@shared/components'

import { Unit } from '../../types'

type CustomCardProps = React.ComponentProps<typeof CustomCard>

export type UnitCardProps = {
  unit: Unit
  onEdit: () => void
} & CustomCardProps
