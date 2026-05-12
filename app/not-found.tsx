import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find
        what you need.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/machines">Browse Machines</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
      <div className="mt-12 text-sm text-muted-foreground">
        <p>Need help finding parts? Call us at</p>
        <a href="tel:+17139410170" className="font-semibold text-primary hover:underline">
          (713) 941-0170
        </a>
      </div>
    </main>
  )
}
