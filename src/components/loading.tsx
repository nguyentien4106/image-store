import React from 'react'
import { Spinner } from './ui/spinner'

export default function Loading({ loadingText }: { loadingText: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary" />
        {loadingText && (
          <p className="text-muted-foreground font-medium">{loadingText}</p>
        )}
      </div>
  )
}
