"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import ESCard from "@/app/components/ESCard";
import InterviewCard from "@/app/components/InterviewCard";
import StatusBadge from "@/app/companies/StatusBadge";

type Company = {
  id: string;
  company_name: string;
  industry: string;
  status: string;
  applied_date: string;
};

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  async function fetchCompany() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setCompany(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="p-8">
        <p>読み込み中...</p>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-500">
          企業が見つかりません
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h1 className="text-3xl font-bold mb-4">
            {company.company_name}
          </h1>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <p className="text-gray-500">業界</p>
              <p>{company.industry}</p>
            </div>

            <div>
              <p className="text-gray-500">応募日</p>
              <p>{company.applied_date}</p>
            </div>

            <div>
              <p className="text-gray-500">選考状況</p>
              <StatusBadge status={company.status} />
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-4">
      ES
    </h2>

    <ESCard companyId={company.id} />

  </div>

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-4">
      面接メモ
    </h2>

    <InterviewCard companyId={company.id} />

  </div>

</div>

      </div>
    </main>
  );
}