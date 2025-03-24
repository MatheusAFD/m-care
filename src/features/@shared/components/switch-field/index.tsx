import { Switch } from '../ui'
import { SwitchFieldProps } from './types'

export const SwitchField = (props: SwitchFieldProps) => {
  const { label, isRequired, id } = props

  return (
    <div className="flex items-center space-x-2 font-medium">
      <Switch {...props} />

      <label className="text-black text-xs" htmlFor={id}>
        {label}: {isRequired && '*'}
      </label>
    </div>
  )
}
