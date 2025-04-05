import { InputHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'
import { CircleX } from 'lucide-react'

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
  id,
  isRequired = true,
  ...props
}: TextFieldProps) => {
  const hasLabel = Boolean(label)

  return (
    <div className="w-full flex flex-col font-medium transition-all">
      {hasLabel && (
        <label
          className="text-black text-xs mb-1"
          htmlFor={`data-test-id-${id}`}
        >
          {label}: {isRequired && '*'}
        </label>
      )}

      <input
        ref={ref}
        name={name}
        id={`data-test-id-${id}`}
        type={type}
        className={twMerge(
          'w-full h-12 max-h-12 px-3 py-[10px] rounded-md border border-grey text-sm',
          'placeholder:text-xs placeholder:text-grey',
          'disabled:opacity-70 disabled:cursor-not-allowed',
          errorMessage && 'border-red-400 placeholder:text-red-400',
          className
        )}
        {...props}
      />

      <div
        className={twMerge(
          'transition-all duration-300 ease-in-out overflow-hidden',
          errorMessage ? 'max-h-10 mt-1' : 'max-h-0'
        )}
      >
        {errorMessage && (
          <div className="flex gap-1 items-center">
            <CircleX size={20} className="fill-red-500 text-white" />
            <p className="font-medium text-xs text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
