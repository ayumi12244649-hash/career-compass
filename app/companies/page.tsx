"use client";

import { useEffect, useState } from "react";

import type { Company } from "@/types/company";
import InstallButton from "@/app/components/InstallButton";
import {
  fetchCompanies,
  deleteCompany,
} from "@/services/company.service";
import AIActionPlanCard from "@/app/components/AIActionPlanCard";
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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");
  const [industryFilter, setIndustryFilter] = useState("すべて");

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      setLoading(true);

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

  const industries = [
    "すべて",
    ...new Set(
      companies
        .map((company) => company.industry)
        .filter(Boolean)
    ),
  ];

  const filteredCompanies = companies
    .filter((company) =>
      company.company_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((company) =>
      statusFilter === "すべて"
        ? true
        : company.status === statusFilter
    )
    .filter((company) =>
      industryFilter === "すべて"
        ? true
        : company.industry === industryFilter
    );

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
<div className="mb-8 rounded-2xl bg-red-500 p-6 text-white text-2xl">
  CompaniesPageです
</div>

<AIActionPlanCard
  companies={companies}
/>

    {/* Dashboard Cards */}
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

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
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

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

    {/* Search */}
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
 <InstallButton />
      <input
        type="text"
        placeholder="🔍 会社名で検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="すべて">すべて</option>
        <option value="応募予定">応募予定</option>
        <option value="応募済み">応募済み</option>
        <option value="書類選考">書類選考</option>
        <option value="一次面接">一次面接</option>
        <option value="二次面接">二次面接</option>
        <option value="最終面接">最終面接</option>
        <option value="内定">内定</option>
        <option value="不採用">不採用</option>
      </select>

      <select
        value={industryFilter}
        onChange={(e) => setIndustryFilter(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none"
      >
        {industries.map((industry) => (
          <option
            key={industry}
            value={industry}
          >
            {industry}
          </option>
        ))}
      </select>

    </div>
        {/* Company Cards */}

    {loading ? (

      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-slate-500">
          読み込み中...
        </p>
      </div>

    ) : filteredCompanies.length === 0 ? (

      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="mb-2 text-xl font-bold">
          該当する企業がありません
        </h2>

        <p className="text-slate-500">
          検索条件を変更するか、新しい企業を追加してください。
        </p>
      </div>

    ) : (

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredCompanies.map((company) => (

          <CompanyCard
            key={company.id}
            company={company}
            onDelete={handleDelete}
          />

        ))}

      </div>

    )}
        {/* Company Modal */}
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