"use client";

import AICoachCard from "@/app/components/AICoachCard";
import DailyMissionCard from "@/app/components/DailyMissionCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import CareerScoreCard from "@/app/components/CareerScoreCard";
import type { Company } from "@/types/company";

import {
  fetchCompanies,
  deleteCompany,
} from "@/services/company.service";

import CompanyModal from "@/app/components/CompanyModal";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (error) {
      console.error(error);
      alert("企業一覧の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("この企業を削除しますか？");

    if (!ok) return;

    try {
      await deleteCompany(id);
      await loadCompanies();
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    }
  }

  const missions = [
  {
    id: 1,
    title: "志望動機を1文改善する",
    done: false,
  },
  {
    id: 2,
    title: "面接練習を3問やる",
    done: false,
  },
  {
    id: 3,
    title: "企業研究を15分する",
    done: false,
  },
];
  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

<div className="mb-8">
  <DailyMissionCard
    missions={missions}
  />
</div>

<div className="mb-8">
  <AICoachCard />
</div>
        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            🏢 応募企業一覧
          </h1>


          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
          >
            ＋ 企業追加
          </button>

        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-200">

              <tr>

                <th className="p-4 text-left">企業名</th>

                <th className="p-4 text-left">業界</th>

                <th className="p-4 text-left">選考状況</th>

                <th className="p-4 text-left">応募日</th>

                <th className="p-4 text-center">操作</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-8 text-center"
                  >
                    読み込み中...
                  </td>

                </tr>

              ) : companies.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-500"
                  >
                    登録された企業はありません
                  </td>

                </tr>

              ) : (

                companies.map((company) => (

                  <tr
                    key={company.id}
                    className="border-t"
                  >

                    <td className="p-4 font-semibold">

                      <Link
                        href={`/companies/${company.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {company.company_name}
                      </Link>

                    </td>

                    <td className="p-4">
                      {company.industry}
                    </td>

                    <td className="p-4">
                      {company.status}
                    </td>

                    <td className="p-4">
                      {company.applied_date ?? "-"}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          handleDelete(company.id)
                        }
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        削除
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <div className="mt-8">
          <CareerScoreCard
            companyCount={companies.length}
            esCount={0}
            interviewCount={0}
          />
        </div>

      </div>

{open && (
  <CompanyModal
    open={open}
    company={null}
    onClose={() => {
      setOpen(false);
    }}
    onSaved={() => {
      setOpen(false);
      loadCompanies();
    }}
  />
)}
</main>
);
}