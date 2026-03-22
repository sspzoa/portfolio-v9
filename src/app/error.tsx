"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-spacing-400">
      <h2 className="font-semibold text-title">문제가 발생했습니다</h2>
      <p className="text-body text-content-standard-secondary">잠시 후 다시 시도해주세요.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-radius-400 bg-components-translucent-primary px-spacing-600 py-spacing-400 font-semibold text-content-standard-secondary text-label duration-100 hover:bg-components-interactive-hover">
        다시 시도
      </button>
    </div>
  );
}
