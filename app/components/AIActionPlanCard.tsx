"use client";

import { useEffect, useState } from "react";

type AIData = {
  company: any;
  entrySheets: any[];
  interviews: any[];
  careerScore: any;
  growth: any[];
  missions: any[];
  failureAnalysis: any[];
};

type Props = {
  companies: {
    id: string;
    company_name: string;
    status: string;
    industry?: string;
  }[];

  aiData: AIData | null;
};

type ActionPlan = {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
};

type AIResponse = {
  plans: ActionPlan[];
  summary?: string;
  motivation?: string;
};

const priorityStyle = {
  高: {
    icon: "🔴",
    color: "text-red-600",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
  },
  中: {
    icon: "🟡",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
  },
  低: {
    icon: "🟢",
    color: "text-green-600",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
};

export default function AIActionPlanCard({
  companies,
  aiData,
}: Props) {

  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [summary, setSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (companies.length === 0 || !aiData) {
    setLoading(false);
    return;
  }

  fetchActionPlan();
}, [companies, aiData]);

  async function fetchActionPlan() {
    try {
      setLoading(true);

      const response = await fetch("/api/ai/action-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  company: aiData!.company,
  entrySheets: aiData!.entrySheets,
  interviews: aiData!.interviews,
  analysis: aiData!.failureAnalysis,
  careerScore: aiData!.careerScore,
  growth: aiData!.growth,
  missions: aiData!.missions,
  companyStatus: companies,
}),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI Action Plan");
      }

      const data: AIResponse = await response.json();

      setPlans(data.plans ?? []);

      setSummary(
        data.summary ??
          "今日の就活プランを作成しました。"
      );

      setMotivation(
        data.motivation ??
          "今日も一歩ずつ前進しましょう！"
      );
    } catch (error) {
      console.error(error);

      setPlans([]);
      setSummary("AIプランを取得できませんでした。");
      setMotivation("時間を空けてもう一度試してください。");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          🤖 今日のAIプラン
        </h2>

        <div className="animate-pulse space-y-3">
          <div className="h-5 rounded bg-slate-200"></div>
          <div className="h-5 rounded bg-slate-200"></div>
          <div className="h-5 rounded bg-slate-200"></div>
          <div className="h-5 rounded bg-slate-200"></div>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          AIがあなた専用の今日の行動プランを作成しています...
        </p>
      </div>
    );
  }
    if (companies.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          🤖 今日のAIプラン
        </h2>

        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
          <p className="text-lg font-semibold">
            まだ応募企業がありません
          </p>

          <p className="mt-3 text-slate-500">
            最初の企業を登録すると、
            AIが毎日やるべきことを提案します。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          🤖 今日のAIプラン
        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
          {plans.length} Tasks
        </span>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
          <p className="font-semibold">
            AIプランを生成できませんでした
          </p>

          <p className="mt-2 text-sm text-slate-500">
            少し時間をおいてもう一度お試しください。
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.task}
              className={`rounded-xl border p-5 ${priorityStyle[plan.priority].bg}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`text-lg font-bold ${priorityStyle[plan.priority].color}`}
                >
                  {priorityStyle[plan.priority].icon}{" "}
                  {plan.task}
                </div>

                <div className="flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${priorityStyle[plan.priority].badge}`}
                  >
                    {plan.priority}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow">
                    {plan.due_type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
            <div className="mt-8 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-5">
        <h3 className="text-lg font-bold text-blue-700">
          💬 AI総評
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          {summary}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-5">
        <h3 className="text-lg font-bold text-emerald-700">
          🚀 今日のメッセージ
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          {motivation}
        </p>
      </div>
    </div>
  );
}