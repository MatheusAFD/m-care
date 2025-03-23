import {
  PasswordField,
  SwitchField,
  TextField
} from '@m-care/features/@shared/components'

export const CreateEmployeeForm = () => {
  return (
    <form className="w-full grid gap-4 grid-cols-2">
      <div className="col-span-2">
        <TextField id="name" label="Nome" className="col-span-2" />
      </div>
      <TextField id="email" label="E-mail" />
      <PasswordField id="password" label="Senha" />

      <SwitchField id="status" label="Ativo" />
    </form>
  )
}
