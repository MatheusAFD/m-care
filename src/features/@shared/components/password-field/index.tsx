'use client'

import { InputHTMLAttributes, useState } from 'react'

import { Eye, EyeClosed } from 'lucide-react'

import { TextField } from '../'
import { Button } from '../ui'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  isRequired?: boolean
}

export const PasswordField = ({ ...props }: TextFieldProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleVisible = () => setIsVisible((prevState) => !prevState)

  return (
    <div className="relative">
      <TextField type={isVisible ? 'text' : 'password'} {...props} />

      <Button
        size="icon"
        variant="outline"
        className="absolute right-2 top-[43px] -translate-y-1/2"
        onClick={handleVisible}
      >
        {isVisible && (
          <Eye className="text-green-principal animate-fadeRender" />
        )}

        {!isVisible && (
          <EyeClosed className="text-green-principal animate-fadeRender" />
        )}
      </Button>
    </div>
  )
}
