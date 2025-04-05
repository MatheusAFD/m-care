'use client'

import { useRef } from 'react'
import { Switch } from '../ui'
import { SwitchFieldProps } from './types'
import { Controller, Control } from 'react-hook-form'

interface Props extends SwitchFieldProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

export const SwitchField = ({
  label,
  isRequired,
  id,
  name,
  control,
  ...rest
}: Props) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    ref?.current?.click()
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className="flex items-center justify-between space-x-2 font-medium w-full h-12 max-h-12 px-3 py-[10px] rounded-md border border-grey text-sm cursor-pointer"
          onClick={handleClick}
        >
          <label
            className="text-black text-xs"
            htmlFor={id}
            onClick={(e) => e.stopPropagation()}
          >
            {label} {isRequired && '*'}
          </label>

          <Switch
            {...rest}
            id={id}
            ref={ref}
            checked={field.value}
            onCheckedChange={field.onChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    />
  )
}
