import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = () => setIsOpen((prevState) => !prevState)

  const onClose = () => setIsOpen(false)

  return { isOpen, onOpenChange, onClose }
}
