'use client'

import { InputHTMLAttributes, useMemo, useState } from 'react'

import IMask from 'imask'
import { Controller, FieldValues } from 'react-hook-form'

import { TextField } from '../TextField'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  pattern: string
  errorMessage?: string
  isRequired?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: FieldValues | any
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
  ...props
}: TextFieldProps) => {
  const [maskedValue, setMaskedValue] = useState('')

  const masked = useMemo(
    () =>
      IMask.createMask({
        mask: pattern
      }),
    [pattern]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    masked.resolve(inputValue)

    setMaskedValue(masked.value)
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
            value={maskedValue}
            errorMessage={errorMessage}
            isRequired={isRequired}
            onChange={(e) => {
              const unmaskedValue = unmask(e.target.value)

              if (unmask(pattern).length < unmaskedValue.length) {
                return
              }

              handleChange(e)
              field.onChange(e.target.value.replace(/\D/g, ''))
            }}
            placeholder={placeholder}
            {...props}
          />
        )}
      />
    </div>
  )
}
