import React from 'react'

import { CustomCard } from '@m-care/features/@shared/components'

type CustomCardProps = React.ComponentProps<typeof CustomCard>

export interface EmployeeCardProps extends CustomCardProps {
  name: string
  color: string
  onEdit: VoidFunction
}
