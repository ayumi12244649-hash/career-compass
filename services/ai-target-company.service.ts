import type { Company } from "@/types/company";

const STATUS_PRIORITY: Record<string, number> = {
  "最終面接": 7,
  "二次面接": 6,
  "一次面接": 5,
  "書類選考": 4,
  "応募済み": 3,
  "応募予定": 2,
  "内定": 1,
  "不採用": 0,
};

export function getTargetCompany(
  companies: Company[]
): Company | null {
  if (companies.length === 0) {
    return null;
  }

  const sorted = [...companies].sort((a, b) => {
    const aPriority = STATUS_PRIORITY[a.status] ?? 0;
    const bPriority = STATUS_PRIORITY[b.status] ?? 0;

    return bPriority - aPriority;
  });

  return sorted[0];
}