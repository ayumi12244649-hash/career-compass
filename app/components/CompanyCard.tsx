"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Company } from "@/types/company";
import AIAnalysisModal from "@/app/components/AIAnalysisModal";

type Props = {
  company: Company;
  onDelete: (id: string) => void;
};

export default function CompanyCard({
  company,
  onDelete,
}: Props) {
  const router = useRouter();
const [loadingAnalysis, setLoadingAnalysis] = useState(false);
const [analysisOpen, setAnalysisOpen] = useState(false);
const [analysis, setAnalysis] = useState("");
  // ----------------------------
  // Progress
  // ----------------------------
  const progress = () => {
    switch (company.status) {
      case "応募予定":
        return 10;

      case "応募済み":
        return 25;

      case "書類選考":
        return 45;

      case "一次面接":
        return 60;

      case "二次面接":
        return 75;

      case "最終面接":
        return 90;

      case "内定":
      case "不採用":
        return 100;

      default:
        return 0;
    }
  };

  // ----------------------------
  // AI Score（仮）
  // ----------------------------
  const aiScore = Math.min(progress() + 20, 100);

  // ----------------------------
  // Status Color
  // ----------------------------
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
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl"
    >
          {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <h2 className="text-2xl font-bold leading-tight text-slate-800">
          🏢 {company.company_name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor()}`}
        >
          {company.status}
        </span>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">

          <span>📈 選考進捗</span>

          <span className="font-semibold">
            {progress()}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
            style={{
              width: `${progress()}%`,
            }}
          />

        </div>

      </div>

      {/* Dashboard */}
      <div className="mt-6 grid grid-cols-3 gap-3">

        <div className="rounded-xl bg-indigo-50 p-4 text-center">

          <p className="text-xs text-slate-500">
            🤖 AI
          </p>

          <p className="mt-1 text-2xl font-bold text-indigo-600">
            {company.aiScore ?? aiScore}
          </p>

        </div>

        <div className="rounded-xl bg-green-50 p-4 text-center">

          <p className="text-xs text-slate-500">
            📝 ES
          </p>

          <p className="mt-1 text-2xl font-bold text-green-600">
            {company.esCount ?? 0}
          </p>

        </div>

        <div className="rounded-xl bg-amber-50 p-4 text-center">

          <p className="text-xs text-slate-500">
            🎤 面接
          </p>

          <p className="mt-1 text-2xl font-bold text-amber-600">
            {company.interviewCount ?? 0}
          </p>

        </div>

      </div>
            {/* Company Information */}
      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600">
              💼 業界
            </span>

            <span>
              {company.industry || "未設定"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600">
              📅 応募日
            </span>

            <span>
              {company.applied_date || "未設定"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600">
              📝 メモ
            </span>

            {company.memo?.trim() ? (
              <span className="font-semibold text-green-600">
                あり
              </span>
            ) : (
              <span className="text-slate-400">
                なし
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600">
              🕒 更新日
            </span>

            <span>
              今日
            </span>
          </div>

        </div>

      </div>

      {/* AI Advice */}
      <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4">

        <p className="mb-3 font-bold text-indigo-700">
          🤖 AIアドバイス
        </p>

        <p className="text-sm leading-6 text-slate-700">

          {progress() < 30 &&
            "まずは応募を完了させましょう。"}

          {progress() >= 30 &&
            progress() < 60 &&
            "ESをブラッシュアップすると通過率が上がりそうです。"}

          {progress() >= 60 &&
            progress() < 90 &&
            "面接対策を始めるベストタイミングです。"}

          {progress() >= 90 &&
            "あと少しでゴールです！自信を持って進みましょう。"}

        </p>

      </div>
            {/* Buttons */}
      <div className="mt-8 grid grid-cols-3 gap-3">

        <Link
          href={`/companies/${company.id}`}
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
        >
          詳細
        </Link>

        <button
  onClick={async (e) => {
    e.stopPropagation();

    try {
      setLoadingAnalysis(true);

      const res = await fetch("/api/ai/company-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: company.company_name,
          status: company.status,
          esCount: company.esCount ?? 0,
          interviewCount: company.interviewCount ?? 0,
          memo: company.memo,
        }),
      });

      const data = await res.json();

if (!data.success) {
  alert(data.message ?? "AI分析に失敗しました。");
  return;
}

setAnalysis(data.analysis);
setAnalysisOpen(true);
    } catch (error) {
      console.error(error);
      alert("AI分析に失敗しました。");
    } finally {
      setLoadingAnalysis(false);
    }
  }}
  disabled={loadingAnalysis}
  className="rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
>
  {loadingAnalysis ? "分析中..." : "AI分析"}
</button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(company.id);
          }}
          className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          削除
        </button>

      </div>
<AIAnalysisModal
        open={analysisOpen}
        analysis={analysis}
        onClose={() => setAnalysisOpen(false)}
      />
    </div>
  );
}