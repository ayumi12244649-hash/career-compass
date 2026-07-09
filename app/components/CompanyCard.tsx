"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Company } from "@/types/company";

type Props = {
  company: Company;
  onDelete: (id: string) => void;
};

export default function CompanyCard({
  company,
  onDelete,
}: Props) {
const router = useRouter();
  const statusColor = () => {
    switch (company.status) {
      case "応募予定":
        return "bg-gray-100 text-gray-700";

      case "応募済み":
        return "bg-blue-100 text-blue-700";

      case "書類選考":
        return "bg-yellow-100 text-yellow-700";

      case "一次面接":
        return "bg-purple-100 text-purple-700";

      case "二次面接":
        return "bg-indigo-100 text-indigo-700";

      case "最終面接":
        return "bg-pink-100 text-pink-700";

      case "内定":
        return "bg-green-100 text-green-700";

      case "不採用":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
  onClick={() => router.push(`/companies/${company.id}`)}
  className="cursor-pointer rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
>

      <h2 className="text-2xl font-bold">
        🏢 {company.company_name}
      </h2>

      <div className="mt-5 space-y-3">

        <p>
          <span className="font-semibold">
            💼 業界：
          </span>{" "}
          {company.industry}
        </p>

        <p>
          <span className="font-semibold">
            📅 応募日：
          </span>{" "}
          {company.applied_date ?? "-"}
        </p>

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${statusColor()}`}
          >
            {company.status}
          </span>
        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <Link
  onClick={(e) => e.stopPropagation()}
          href={`/companies/${company.id}`}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
        >
          詳細を見る
        </Link>

        <button
         onClick={(e) => {
  e.stopPropagation();
  onDelete(company.id);
}} 
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          削除
        </button>

      </div>

    </div>
  );
}