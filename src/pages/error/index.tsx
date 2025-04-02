import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function ErrorPage() {
  const error = useRouteError()
  let errorMessage = 'Something went wrong'
  let errorCode = '500'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || 'Page not found'
    errorCode = error.status.toString()
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold text-primary">{errorCode}</h1>
        <h2 className="text-2xl font-semibold">{errorMessage}</h2>
        <p className="text-muted-foreground max-w-md">
          {errorCode === '404' 
            ? "The page you're looking for doesn't exist or has been moved."
            : "We're sorry, but something went wrong. Please try again later."}
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 