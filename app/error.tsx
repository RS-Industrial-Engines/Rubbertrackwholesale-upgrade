"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-destructive">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        We encountered an error loading this page. Please try again or contact us for assistance.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button variant="outline" asChild>
          <a href="tel:+17139410170">Call (713) 941-0170</a>
        </Button>
      </div>
    </main>
  )
}
