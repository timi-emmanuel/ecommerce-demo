function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/80">
      <div className="h-52 animate-pulse bg-muted/80" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-20 animate-pulse rounded bg-muted/80" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted/80" />
        <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted/70" />
        <div className="h-6 w-24 animate-pulse rounded bg-muted/80" />
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <div className="h-4 w-24 animate-pulse rounded bg-muted/80" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded bg-muted/80" />
        <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-muted/70" />
      </section>

      <section className="space-y-4 rounded-xl border border-border/60 bg-card/65 p-4 sm:p-5">
        <div className="h-10 w-full animate-pulse rounded bg-muted/70 md:max-w-sm" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-20 animate-pulse rounded-md bg-muted/70"
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    </div>
  );
}
