'use client'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form'

interface Props<T> {
  fields: Path<T>[]
}

export const usePartialFormValidation = <T extends FieldValues>({
  fields
}: Props<T>) => {
  const { control } = useFormContext<T>()
  const [isValid, setIsValid] = useState(false)
  const formValues = useWatch<T>({ name: fields })

  const validateFields = useCallback(async () => {
    const { errors } = await control._executeSchema(fields)
    const allValid = fields.every((name) => !errors[name])
    setIsValid(allValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues])

  useEffect(() => void validateFields(), [validateFields])

  return { isValid }
}
