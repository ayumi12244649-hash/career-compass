"use client";

import { useEffect, useState } from "react";

import type { Company } from "@/types/company";
import type { AIData } from "@/services/ai-data.service";

type ActionPlan = {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
};

type AIResponse = {
  plans: ActionPlan[];
  summary: string;
  motivation: string;
};

type Props = {
  company: Company;
  aiData: AIData;
};

export default function AIActionPlanCardV2({
  company,
  aiData,
}: Props) {
  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [summary, setSummary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    fetchActionPlan();
  }, [company, aiData]);

  async function fetchActionPlan() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/ai/action-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: aiData.company,
            entrySheets: aiData.entrySheets,
            interviews: aiData.interviews,
            analysis: aiData.failureAnalysis,
            careerScore: aiData.careerScore,
            growth: aiData.growth,
            missions: aiData.missions,
            companyStatus: company.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI Action Planの取得に失敗しました");
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
      setMotivation(
        "時間を空けてもう一度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  }
    if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          🤖 AI Action Plan V2
        </h2>

        <div className="animate-pulse space-y-3">
          <div className="h-5 rounded bg-slate-200" />
          <div className="h-5 rounded bg-slate-200" />
          <div className="h-5 rounded bg-slate-200" />
          <div className="h-5 rounded bg-slate-200" />
        </div>

        <p className="mt-5 text-sm text-slate-500">
          AIが最新データを分析しています...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          🤖 AI Action Plan V2
        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
          {plans.length} Tasks
        </span>
      </div>
            <div className="space-y-4">
        {plans.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
            <p className="text-lg font-semibold">
              AIプランを作成できませんでした
            </p>

            <p className="mt-2 text-slate-500">
              少し時間をおいて再度お試しください。
            </p>
          </div>
        ) : (
          plans.map((plan, index) => (
            <div
              key={`${plan.task}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {plan.task}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    優先度：
                    <span className="font-bold">
                      {plan.priority}
                    </span>
                    ・期限：
                    <span className="font-bold">
                      {plan.due_type}
                    </span>
                  </p>
                </div>

                <div>
                  {plan.priority === "高" && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                      🔴 高
                    </span>
                  )}

                  {plan.priority === "中" && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                      🟡 中
                    </span>
                  )}

                  {plan.priority === "低" && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      🟢 低
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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