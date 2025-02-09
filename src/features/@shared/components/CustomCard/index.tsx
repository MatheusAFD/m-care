import { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const CustomCard = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={twMerge(
        'w-auto p-12 shadow-md rounded-lg bg-white',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
