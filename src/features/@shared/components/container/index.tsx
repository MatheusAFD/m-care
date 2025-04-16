import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@m-care/features/@shared/lib/utils'

const containerVariants = cva(' flex flex-col mx-auto w-full', {
  variants: {
    size: {
      default: 'max-w-[1136px]',
      small: 'max-w-[850px]'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

const Container: React.FC<ContainerProps> = ({
  className,
  size,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants }
