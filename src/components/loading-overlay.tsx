import { useAppSelector } from '@/store/hooks'
import { Spinner } from '@/components/ui/spinner'

export function LoadingOverlay() {
  const { isLoading, loadingText, isSmall } = useAppSelector((state) => state.loading)

  if (!isLoading) return null

  if (isSmall) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
        <Spinner size="sm" className="text-primary" />
        {loadingText && (
          <p className="text-muted-foreground text-sm font-medium">{loadingText}</p>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary" />
        {loadingText && (
          <p className="text-muted-foreground font-medium">{loadingText}</p>
        )}
      </div>
    </div>
  )
} 