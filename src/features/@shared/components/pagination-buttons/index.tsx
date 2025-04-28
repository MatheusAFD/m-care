import { HTMLAttributes } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../ui'

interface PaginationButtonsProps extends HTMLAttributes<HTMLDivElement> {
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  handlePageChange: (page: number) => void
}

export const PaginationButtons = (props: PaginationButtonsProps) => {
  const {
    page = 1,
    totalPages = 1,
    hasNextPage = false,
    hasPrevPage = false,
    handlePageChange
  } = props

  const hasThreeOrMorePages = (totalPages ?? 0) >= 3
  const shouldRenderThirdPage = hasThreeOrMorePages && page <= 1

  const handlePrevPage = () => {
    handlePageChange(page - 1)
  }

  const handleNextPage = () => {
    handlePageChange(page + 1)
  }

  return (
    <div
      className={twMerge('w-full flex justify-center gap-2', props.className)}
    >
      <Button
        variant="outline"
        disabled={!hasPrevPage}
        onClick={handlePrevPage}
      >
        <ArrowLeft className="text-green-principal" />
      </Button>
      {hasPrevPage && (
        <Button variant="outline" size="icon" onClick={handlePrevPage}>
          {page - 1}
        </Button>
      )}
      <Button>{page}</Button>

      {hasNextPage && (
        <Button variant="outline" size="icon" onClick={handleNextPage}>
          {page + 1}
        </Button>
      )}

      {shouldRenderThirdPage && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(3)}
        >
          3
        </Button>
      )}
      <Button
        variant="outline"
        disabled={!hasNextPage}
        onClick={handleNextPage}
      >
        <ArrowRight className="text-green-principal" />
      </Button>
    </div>
  )
}
