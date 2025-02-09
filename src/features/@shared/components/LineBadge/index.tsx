import { cn } from '@m-care/features/@shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

const badgeVariants = cva('rounded-lg mb-1', {
  variants: {
    variant: {
      default: 'bg-green-principal',
      dark: 'bg-green-dark'
    },
    size: {
      default: 'w-10 h-[6px]',
      sm: 'w-8 h-[6px]',
      lg: 'w-14 h-[6px]'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

export const LineBadge = ({
  children,
  size,
  variant,
  className,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  return (
    <>
      <div
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
      {children}
    </>
  )
}
