import { CustomCard, LineBadge } from '@m-care/features/@shared/components'

import { SigninForm } from '@m-care/features/sign-in/components'

export default function SigninPage() {
  return (
    <section className="flex justify-center mt-16">
      <CustomCard>
        <LineBadge />
        <h1 className="text-xl text-black">
          Bem vindo ao <br /> <strong className="font-medium"> M - Care</strong>
        </h1>

        <SigninForm />
      </CustomCard>
    </section>
  )
}
