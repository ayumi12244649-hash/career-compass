"use client";

import Dialog from "@/app/components/common/Dialog";
import Toast from "@/app/components/common/Toast";
import Button from "@/app/components/common/Button";
import EmptyState from "@/app/components/common/EmptyState";
import Loading from "@/app/components/common/Loading";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import AITodayDashboardContainer from "@/app/components/ai/AITodayDashboardContainer";
import { useEffect, useState } from "react";
import AITodayDashboardPreview from "@/app/components/ai/AITodayDashboardPreview";
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
import { getTargetCompany } from "@/services/ai-target-company.service";
import { fetchAIData } from "@/services/ai-data.service";
export default function CompaniesPage() {
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [aiData, setAIData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
const [toast, setToast] = useState<{
  message: string;
  type: "success" | "error";
} | null>(null);
const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");
  const [industryFilter, setIndustryFilter] = useState("すべて");

  useEffect(() => {
  loadCompanies();
}, []);
useEffect(() => {
  if (!toast) return;

  const timer = setTimeout(() => {
    setToast(null);
  }, 3000);

  return () => clearTimeout(timer);
}, [toast]);

async function loadAIData(companyId: string) {
  try {
    const data = await fetchAIData(companyId);
    setAIData(data);
  } catch (error) {
    console.error(error);
  }
}

async function loadCompanies() {
  try {
    setLoading(true);
    setError("");

    const data = await fetchCompanies();

    setCompanies(data);

    const target = getTargetCompany(data);

    if (target) {
      await loadAIData(target.id);
    }
  } catch (error) {
    console.error(error);
    setError("企業一覧の取得に失敗しました。");
  } finally {
    setLoading(false);
  }
}

  async function handleDelete(id: string) {

   async function handleDelete(id: string) {
  setDeleteTargetId(id);
}

    try {

      await deleteCompany(id);
await loadCompanies();

setToast({
  message: "企業を削除しました",
  type: "success",
});


    } catch (error) {
  console.error(error);

  
}setError("企業の削除に失敗しました。");
setToast({
  message: "企業の削除に失敗しました",
  type: "error",
});
  }
const industries = [
  "すべて",
  ...new Set(
    companies
      .map((company) => company.industry)
      .filter(
        (industry): industry is string =>
          Boolean(industry)
      )
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

const targetCompany = getTargetCompany(companies);
  
  return (
    <main className="min-h-screen bg-slate-100 p-8">
  <div className="mx-auto max-w-7xl">

{toast && (
  <Toast
    message={toast.message}
    type={toast.type}
  />
)}

    {/* AI Intelligence Dashboard */}
   {targetCompany && (
  <div className="mb-8">
    <AIIntelligenceDashboard
      userId={targetCompany.user_id}
    />
  </div>
)}

    {/* Summary */}
    <div className="mb-8">
  <HomeSummaryCard
  companyCount={companies.length}
  esCount={0}
  interviewCount={0}
  score={0}
/>
    </div>

<AIActionPlanCard
  companies={companies}
  aiData={aiData}
/>
<div className="mt-8">
  <AITodayDashboardContainer
    aiData={aiData}
  />
</div>

    {/* Dashboard Cards */}
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">  

      {targetCompany && (
  <DailyMissionCard
    companyId={targetCompany.id}
  />
)}

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

      <Button
  variant="primary"
  onClick={() => setOpen(true)}
>
  ＋企業追加
</Button>
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

{error ? (
  <div className="mb-8">
    <ErrorMessage
      message={error}
      onRetry={loadCompanies}
    />
  </div>
) : loading ? (
  <Loading
    message="企業一覧を読み込んでいます..."
  />
) : filteredCompanies.length === 0 ? (
  <EmptyState
  title="該当する企業がありません"
  description="検索条件を変更するか、新しい企業を追加してください。"
  buttonText="企業を追加"
  onClick={() => setOpen(true)}
/>

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
<Dialog
  open={deleteTargetId !== null}
  title="企業を削除しますか？"
  message="この操作は取り消せません。"
  onCancel={() => setDeleteTargetId(null)}
  onConfirm={async () => {
  if (!deleteTargetId) return;

  try {
    await deleteCompany(deleteTargetId);
    await loadCompanies();

    setToast({
      message: "企業を削除しました",
      type: "success",
    });
  } catch (error) {
    console.error(error);

    setError("企業の削除に失敗しました。");

    setToast({
      message: "企業の削除に失敗しました",
      type: "error",
    });
  } finally {
    setDeleteTargetId(null);
  }
}}
/>

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