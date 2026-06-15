"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col items-center justify-center gap-spacing-500 px-spacing-500 py-spacing-800 text-center">
          <div className="flex flex-col items-center gap-spacing-200">
            <h2 className="font-semibold text-content-standard-primary text-title tracking-tight">
              일시적인 오류가 발생했습니다
            </h2>
            <p className="max-w-md text-body text-content-standard-secondary">
              페이지를 렌더링하는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-radius-400 bg-content-standard-primary px-spacing-500 py-spacing-300 font-medium text-background-standard-primary text-label transition-colors hover:bg-content-standard-secondary">
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
