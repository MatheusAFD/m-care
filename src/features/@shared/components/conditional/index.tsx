import React, { PropsWithChildren, isValidElement, cloneElement } from 'react'

interface ConditionalProps {
  condition: boolean
  withFadeRender?: boolean
}

export const Conditional = (props: PropsWithChildren<ConditionalProps>) => {
  const { condition, withFadeRender = true, children } = props

  if (!condition) {
    return
  }

  if (withFadeRender) {
    const childArray = React.Children.toArray(children)
    const processedChildren = childArray.map((child) => {
      if (isValidElement(child)) {
        const childElement = child as React.ReactElement<{ className?: string }>
        return cloneElement(childElement, {
          className: [childElement.props.className || '', 'animate-fadeRender']
            .filter(Boolean)
            .join(' ')
        })
      }
      return child
    })
    return <>{processedChildren}</>
  }

  return <>{children}</>
}
