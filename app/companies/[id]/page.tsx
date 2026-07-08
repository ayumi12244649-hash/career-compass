"use client";
import DailyReportCard
  from "@/app/components/DailyReportCard";
import BadgeCard
  from "@/app/components/BadgeCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GrowthDashboardCard from "@/app/components/GrowthDashboardCard";
import type { Company } from "@/types/company";
import { fetchCompany } from "@/services/company.service";
import MissionCard from "@/app/components/MissionCard";
import AIDashboardCard from "@/app/components/AIDashboardCard";
import AICoachCard from "@/app/components/AICoachCard";
import AIMemoryCard from "@/app/components/AIMemoryCard";
import GrowthHistoryChart
  from "@/app/components/GrowthHistoryChart";
import ESCard from "@/app/components/ESCard";
import InterviewCard from "@/app/components/InterviewCard";
import InterviewPracticeCard from "@/app/components/InterviewPracticeCard";
import InterviewPracticeHistory from "@/app/components/InterviewPracticeHistory";
import RejectionAnalysisCard from "@/app/components/RejectionAnalysisCard";
import MentorChat from "@/app/components/MentorChat";
import CareerRecommendCard from "@/app/components/dashboard/CareerRecommendCard";

export default function CompanyDetailPage() {
  const params = useParams();

  const companyId = params.id as string;

  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCompany();
  }, [companyId]);

  async function loadCompany() {
    try {
      const data = await fetchCompany(companyId);
      setCompany(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-10">
        <p>読み込み中...</p>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="p-10">
        <p>企業が見つかりません。</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 企業情報 */}
        <div className="bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold">
            {company.company_name}
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div>
              <p className="text-gray-500">
                業界
              </p>

              <p className="font-semibold">
                {company.industry}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                選考状況
              </p>

              <p className="font-semibold">
                {company.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                応募日
              </p>

              <p className="font-semibold">
                {company.applied_date ?? "-"}
              </p>
            </div>

          </div>

        </div>

 {/* AI Dashboard */}
<AIDashboardCard
  companyId={company.id}
/>


<GrowthDashboardCard
  companyId={company.id}
/>

<GrowthHistoryChart
  companyId={company.id}
/>

<BadgeCard
  companyId={company.id}
/>

<DailyReportCard
  companyId={company.id}
/>
{/* Today's Mission */}
<MissionCard
  companyId={company.id}
/>
<CareerRecommendCard userId={company.user_id} />


{/* ES */}
<ESCard
  companyId={companyId}
/>

        {/* AI Coach */}
        <AICoachCard />
        

        {/* 面接練習 */}
        <InterviewPracticeCard
          companyId={company.id}
        />

        {/* AI Mentor */}
        <MentorChat
          companyId={company.id}
          userId={company.user_id}
        />

        {/* AI Memory */}
        <AIMemoryCard
          companyId={company.id}
        />

        {/* 面接練習履歴 */}
        <InterviewPracticeHistory
          companyId={company.id}
        />

        {/* 不採用分析 */}
        <RejectionAnalysisCard
          companyId={company.id}
          companyName={company.company_name}
        />

      </div>
    </main>
  );
}