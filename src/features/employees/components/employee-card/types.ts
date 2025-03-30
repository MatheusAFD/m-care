import { CustomCard } from '@m-care/features/@shared/components'
import React from 'react'

type CustomCardProps = React.ComponentProps<typeof CustomCard>

export interface EmployeeCardProps extends CustomCardProps {
  name: string
  color: string
}
