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
        <div className="aspect-video w-full max-w-[382px] animate-pulse rounded-radius-200 border border-line-outline bg-components-fill-standard-secondary md:h-54 md:w-96" />
      )}
      <div className="flex w-full flex-col gap-spacing-400">
        <div
          className={`w-full rounded-radius-400 border border-line-outline bg-components-fill-standard-secondary ${hasDescription || hasTags ? "h-[76px]" : "h-[44px]"}`}></div>
        {hasTags && <TagsSkeleton />}
        {hasDescription && <DescriptionSkeleton />}
      </div>
    </div>
  );
}

export function DescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-spacing-200">
      <div className="h-[20px] w-full animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
      <div className="h-[20px] w-full animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
      <div className="h-[20px] w-3/4 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="flex flex-row flex-wrap gap-spacing-200">
      <div className="h-[30px] w-20 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
      <div className="h-[30px] w-24 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
      <div className="h-[30px] w-22 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
    </div>
  );
}
