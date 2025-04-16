import { PropsWithChildren } from 'react'

interface ConditionalProps {
  condition: boolean
}

export const Conditional = (props: PropsWithChildren<ConditionalProps>) => {
  const { condition, children } = props

  if (!condition) {
    return
  }

  return <>{children}</>
}
