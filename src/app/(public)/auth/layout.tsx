import { Metadata } from 'next'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Entrar'
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Image
        src="/register-background.svg"
        width={400}
        height={400}
        alt="Ondas verdes"
        className="fixed left-0 w-full"
        priority
      />
      <main className="p-8 h-screen relative">{children}</main>
    </>
  )
}
