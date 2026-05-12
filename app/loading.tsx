export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-4 w-48 rounded bg-muted" />

        {/* Title skeleton */}
        <div className="mb-4 h-10 w-3/4 rounded bg-muted" />
        <div className="mb-8 h-6 w-1/2 rounded bg-muted" />

        {/* Content skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
