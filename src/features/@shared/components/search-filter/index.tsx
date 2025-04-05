'use client'

import { FormEvent } from 'react'

import { Search } from 'lucide-react'

import { TextField } from '../text-field'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '../ui'

import { useUrlFilters } from '../../hooks'

export const SearchFilter = () => {
  const { search, handleSearch } = useUrlFilters()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchValue = formData.get('search') as string

    handleSearch(searchValue)
  }

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-principal hover:text-green-dark transition-colors"
          >
            <Search />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Pesquisar</TooltipContent>
      </Tooltip>

      <TextField
        name="search"
        type="search"
        placeholder="Pesquisar colaborador"
        defaultValue={search}
      />
    </form>
  )
}
