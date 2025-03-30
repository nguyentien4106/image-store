import { useAppSelector } from '@/store/hooks'
import { Spinner } from '@/components/ui/spinner'

export function LoadingOverlay() {
  const { isLoading, loadingText } = useAppSelector((state) => state.loading)

  if (!isLoading) return null

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