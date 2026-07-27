import { isConfigError } from "@/shared/lib/portfolio-data";

// Shared section error copy: config errors (4xx) vs transient failures.
export function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}
