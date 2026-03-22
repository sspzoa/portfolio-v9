import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-spacing-400">
      <h2 className="font-semibold text-title">404</h2>
      <p className="text-body text-content-standard-secondary">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-radius-400 bg-components-translucent-primary px-spacing-600 py-spacing-400 font-semibold text-content-standard-secondary text-label duration-100 hover:bg-components-interactive-hover">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
