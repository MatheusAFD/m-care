import Image, { ImageProps } from 'next/image'

interface NoDataBackgroundProps extends ImageProps {
  text: string
}

export const NoDataBackground = (props: NoDataBackgroundProps) => {
  const { text } = props

  return (
    <div className="flex gap-8 flex-col items-center">
      <Image width={640} height={640} {...props} />

      <p className="text-3xl font-medium animate-pulse">{text}</p>
    </div>
  )
}
