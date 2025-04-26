'use client'

import { FormEvent } from 'react'

import { Search } from 'lucide-react'

import { TextField } from '../text-field'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '../ui'

import { useUrlFilters } from '../../hooks'

interface SearchFilterProps {
  placeholder?: string
}

export const SearchFilter = (props: SearchFilterProps) => {
  const { placeholder = 'Pesquisar' } = props

  const { search, handleSearch } = useUrlFilters()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchValue = formData.get('search') as string

    handleSearch(searchValue)
  }

  return (
    <form className="flex flex-row-reverse gap-1" onSubmit={handleSubmit}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="submit"
            className=" text-green-principal hover:text-green-dark transition-colors"
          >
            <Search />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Pesquisar</TooltipContent>
      </Tooltip>

      <TextField
        name="search"
        type="search"
        fieldSize="small"
        placeholder={placeholder}
        defaultValue={search}
      />
    </form>
  )
}
