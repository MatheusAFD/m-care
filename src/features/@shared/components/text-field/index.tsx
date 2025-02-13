import { InputHTMLAttributes, useId } from 'react'

import { twMerge } from 'tailwind-merge'
import { CircleX } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  isRequired?: boolean
  ref?: React.Ref<HTMLInputElement>
}

export const TextField = ({
  name,
  label = '',
  type = 'text',
  errorMessage,
  className,
  ref,
  isRequired = true,
  ...props
}: TextFieldProps) => {
  const id = useId()

  return (
    <div className="w-full flex flex-col">
      <label className="text-black text-xs mb-1" htmlFor={`${id}-${name}`}>
        {label}: {isRequired && '*'}
      </label>
      <TooltipProvider>
        <Tooltip open={!!errorMessage}>
          <TooltipTrigger asChild>
            <input
              ref={ref}
              name={name}
              id={`${id}-${name}`}
              type={type}
              className={twMerge(
                'w-full h-12 max-h-12 px-3 py-[10px] rounded-md border border-grey',
                'placeholder:text-xs placeholder:text-grey',
                errorMessage && 'border-red-400 placeholder:text-red-400',
                className
              )}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent
            className="shadow-sm bg-white border border-red-400 text-red-400"
            side="bottom"
            align="end"
            sideOffset={-2}
          >
            <div className="flex gap-1 items-center">
              <CircleX size={20} className="fill-red-500 text-white" />

              <p>{errorMessage}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
