import { Skeleton } from '../../ui'

export const AvatarSkeleton = () => {
  return (
    <div className="flex items-center space-x-2 mb-8 px-4 py-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-40" />
        <Skeleton className="h-2 w-40" />
      </div>
    </div>
  )
}
