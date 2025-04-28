import { PropsWithChildren } from 'react'

import { RolesEnum } from '@m-care/features/@shared/enums'

interface RestrictedProps {
  requiredRoles?: RolesEnum[]
  userRole?: RolesEnum
}

export const Restricted = ({
  userRole,
  requiredRoles,
  children
}: PropsWithChildren<RestrictedProps>) => {
  const hasRequiredRoles = requiredRoles?.some((role) => role === userRole)

  if (!hasRequiredRoles) {
    return null
  }

  return children
}
