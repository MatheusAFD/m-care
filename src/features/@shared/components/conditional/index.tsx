import { PropsWithChildren, isValidElement, cloneElement } from 'react'

interface ConditionalProps {
  condition: boolean
  withFadeRender?: boolean
}

export const Conditional = (props: PropsWithChildren<ConditionalProps>) => {
  const { condition, withFadeRender = true, children } = props

  if (!condition) {
    return
  }

  if (withFadeRender && isValidElement(children)) {
    const childElement = children as React.ReactElement<{ className?: string }>
    return cloneElement(childElement, {
      className: [childElement.props.className || '', 'animate-fadeRender']
        .filter(Boolean)
        .join(' ')
    })
  }

  return <>{children}</>
}
