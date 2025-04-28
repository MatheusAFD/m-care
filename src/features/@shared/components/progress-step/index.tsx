import React from 'react'

import { Check, LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Step {
  name: string
  icon: LucideIcon
}

interface StepControlProps {
  steps: Step[]
  currentStep: number
}

export const StepControl = ({ steps, currentStep }: StepControlProps) => {
  return (
    <div className="flex justify-center w-full relative px-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = currentStep > index
        const isLast = index === steps.length - 1

        return (
          <div
            key={step.name}
            className={twMerge(
              'flex flex-col justify-start',
              !isLast && 'min-w-[7rem]'
            )}
          >
            <div className="flex items-center">
              <div
                className={twMerge(
                  'relative z-10 flex items-center justify-center size-8 rounded-full shadow-md',
                  isActive
                    ? ' bg-green-principal text-white animate-pulse duration-[2000ms]'
                    : isCompleted
                      ? ' bg-green-dark text-white'
                      : ' bg-gray-300 text-gray-500'
                )}
              >
                {isCompleted && <Check className="size-4 text-grey-lite" />}
                {!isCompleted && (
                  <step.icon className="size-4 text-grey-lite" />
                )}
              </div>

              {!isLast && (
                <div
                  className={twMerge(
                    'w-24 h-[2px] mx-3 bg-gray-300 transition-all duration-[2000ms] origin-left',
                    isCompleted
                      ? 'bg-green-principal scale-x-100'
                      : 'bg-gray-300',
                    isActive && 'animate-progress-pulse'
                  )}
                />
              )}
            </div>
            <p className="text-left text-xs font-normal mt-2">{step.name}</p>
          </div>
        )
      })}
    </div>
  )
}
