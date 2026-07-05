"use client";

import InterviewPracticeHistory from "@/app/components/InterviewPracticeHistory";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchCompany } from "@/services/company.service";
import type { Company } from "@/types/company";

import ESCard from "@/app/components/ESCard";
import InterviewCard from "@/app/components/InterviewCard";
import RejectionAnalysisCard from "@/app/components/RejectionAnalysisCard";
import InterviewPracticeCard from "@/app/components/InterviewPracticeCard";

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
  <ESCard
  companyId={companyId}
/>

<InterviewPracticeCard
  companyId={company.id}
/>

<InterviewPracticeHistory
  companyId={company.id}
/>

<RejectionAnalysisCard
  companyId={company.id}
  companyName={company.company_name}
/>
      </div>
          </main>
  );
}