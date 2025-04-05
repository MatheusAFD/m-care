import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dismissDialog = () =>
    (document.querySelector('[data-state="open"]') as HTMLDivElement).click()

  const onOpenChange = () => setIsOpen((prevState) => !prevState)

  const onClose = () => setIsOpen(false)

  return { isOpen, dismissDialog, onOpenChange, onClose }
}
