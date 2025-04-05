import { InputHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CircleX } from 'lucide-react'
import { cn } from '@m-care/features/@shared/lib/utils'

const textFieldVariants = cva(
  'w-full rounded-md border border-grey text-sm placeholder:text-xs placeholder:text-grey disabled:opacity-70 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-1',
  {
    variants: {
      fieldSize: {
        default: 'h-12 max-h-12 px-3 py-[10px]',
        small: 'h-9 max-h-9 px-3 py-1.5'
      }
    },
    defaultVariants: {
      fieldSize: 'default'
    }
  }
)

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label?: string
  errorMessage?: string
  isRequired?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label = '',
      type = 'text',
      errorMessage,
      className,
      id,
      isRequired = true,
      fieldSize: size,
      ...props
    },
    ref
  ) => {
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
          className={cn(
            textFieldVariants({ fieldSize: size }),
            errorMessage && 'border-red-400 placeholder:text-red-400',
            className
          )}
          {...props}
        />

        <div
          className={cn(
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
)

TextField.displayName = 'TextField'

export { TextField, textFieldVariants }
