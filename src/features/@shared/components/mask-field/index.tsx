'use client'

import { InputHTMLAttributes, useMemo, useState } from 'react'

import IMask from 'imask'
import { Controller, FieldValues } from 'react-hook-form'

import { TextField } from '../text-field'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  pattern: string
  errorMessage?: string
  isRequired?: boolean
  isValid?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: FieldValues | any
  onValidate?: (value: string) => void | Promise<void>
}

export const MaskField = ({
  label = '',
  type = 'text',
  name,
  pattern,
  placeholder,
  errorMessage,
  isRequired = true,
  control,
  isValid,
  onValidate,
  ...props
}: TextFieldProps) => {
  const [maskedValue, setMaskedValue] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const masked = useMemo(
    () =>
      IMask.createMask({
        mask: pattern
      }),
    [pattern]
  )

  const handleMasking = (value: string) => {
    masked.resolve(value)
    return masked.value
  }

  const unmask = (value: string) => {
    return value.replace(/\D/g, '')
  }

  return (
    <div className="w-full flex flex-col">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            value={maskedValue || handleMasking(field.value || '')}
            errorMessage={errorMessage}
            isRequired={isRequired}
            disabled={isValidating || props.disabled}
            onBlur={async (e) => {
              setIsValidating(true)

              field.onBlur()

              const { value } = e.target

              if (isValid) {
                await onValidate?.(value)
              }

              setIsValidating(false)
            }}
            onChange={(e) => {
              const inputValue = e.target.value
              const unmaskedValue = unmask(inputValue)

              if (unmask(pattern).length < unmaskedValue.length) {
                return
              }

              const newMaskedValue = handleMasking(inputValue)
              setMaskedValue(newMaskedValue)

              field.onChange(unmaskedValue)
            }}
            placeholder={placeholder}
            {...props}
          />
        )}
      />
    </div>
  )
}
