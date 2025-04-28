import { PropsWithChildren } from 'react'

import { env } from '@m-care/env'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export const StripeProvider = ({ children }: PropsWithChildren) => {
  const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return <Elements stripe={stripePromise}>{children}</Elements>
}
