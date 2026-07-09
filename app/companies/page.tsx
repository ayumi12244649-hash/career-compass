"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Company } from "@/types/company";

import {
  fetchCompanies,
  deleteCompany,
} from "@/services/company.service";

import CompanyModal from "@/app/components/CompanyModal";
import AIIntelligenceDashboard from "@/app/components/AIIntelligenceDashboard";
import HomeSummaryCard from "@/app/components/HomeSummaryCard";
import DailyMissionCard from "@/app/components/DailyMissionCard";
import AICoachCard from "@/app/components/AICoachCard";
import CareerScoreCard from "@/app/components/CareerScoreCard";
import CompanyCard from "@/app/components/CompanyCard";
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

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        {/* AI Intelligence Dashboard */}
        <div className="mb-8">
          <AIIntelligenceDashboard
            userId={companies[0]?.user_id ?? ""}
          />
        </div>

        {/* Summary */}
        <div className="mb-8">
          <HomeSummaryCard
            companyCount={companies.length}
            esCount={0}
            interviewCount={0}
            score={82}
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">

          <DailyMissionCard
            companyId={companies[0]?.id ?? ""}
          />

          <AICoachCard />

          <CareerScoreCard
            companyCount={companies.length}
            esCount={0}
            interviewCount={0}
          />

        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            🏢 応募企業一覧
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ＋ 企業追加
          </button>

        </div>
{/* Company Cards */}

{!loading && companies.length > 0 && (

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mb-8">

    {companies.map((company) => (

      <CompanyCard
        key={company.id}
        company={company}
        onDelete={handleDelete}
      />

    ))}

  </div>

)}
  

            {open && (
        <CompanyModal
          open={open}
          company={null}
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            loadCompanies();
          }}
        />
      )}

      </div>
    </main>
  );
}