interface CardSkeletonProps {
  hasImage?: boolean;
  hasIcon?: boolean;
  hasTags?: boolean;
  hasDescription?: boolean;
}

export function CardSkeleton({ hasImage = false, hasTags = false, hasDescription = false }: CardSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-spacing-400 md:flex-row">
      {hasImage && (
        <div className="aspect-video w-full max-w-[382px] animate-pulse rounded-radius-400 bg-components-fill-standard-secondary md:h-56 md:w-96" />
      )}
      <div className="flex w-full flex-col gap-spacing-300">
        <div className="flex flex-row items-center gap-spacing-300">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-radius-200 bg-components-fill-standard-secondary" />
          <div className="flex flex-col gap-spacing-100">
            <div className="h-[18px] w-48 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
            <div className="h-[14px] w-32 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
          </div>
        </div>
        {hasTags && <TagsSkeleton />}
        {hasDescription && <DescriptionSkeleton />}
      </div>
    </div>
  );
}

export function DescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-spacing-200">
      <div className="h-[20px] w-full animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
      <div className="h-[20px] w-full animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
      <div className="h-[20px] w-3/4 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="flex flex-row flex-wrap gap-spacing-150">
      <div className="h-[26px] w-20 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
      <div className="h-[26px] w-24 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
      <div className="h-[26px] w-20 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex flex-row items-baseline gap-spacing-300 border-line-divider border-b py-spacing-300 last:border-b-0">
      <div className="flex flex-1 flex-col gap-spacing-100">
        <div className="h-[18px] w-2/3 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
        <div className="h-[14px] w-1/2 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
      </div>
    </div>
  );
}
