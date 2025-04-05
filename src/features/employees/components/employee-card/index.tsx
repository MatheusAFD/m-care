import { Avatar } from '@m-care/features/@shared/components/ui'
import { EmployeeCardProps } from './types'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { getNameInitials } from '@m-care/features/@shared/utils'
import { CustomCard } from '@m-care/features/@shared/components'

export const EmployeeCard = (props: EmployeeCardProps) => {
  const { name } = props

  const nameInitials = getNameInitials(name)

  return (
    <CustomCard>
      <Avatar>
        <AvatarFallback>{nameInitials}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium">{name}</p>
    </CustomCard>
  )
}
