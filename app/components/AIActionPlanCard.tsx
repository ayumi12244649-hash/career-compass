"use client";

import { useEffect, useState } from "react";
export default function AIActionPlanCard({
  companies,
}: Props) {

  return (
    <div className="mb-8 rounded-2xl bg-red-500 p-6 text-white text-2xl">
      AIActionPlanCard 表示成功！
    </div>
  );
type Props = {
  companies: {
    company_name: string;
    status: string;
    industry?: string;
  }[];
};

type ActionPlan = {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
};

const priorityStyle = {
  高: {
    icon: "🔴",
    color: "text-red-600",
  },
  中: {
    icon: "🟡",
    color: "text-yellow-600",
  },
  低: {
    icon: "🟢",
    color: "text-green-600",
  },
};

export default function AIActionPlanCard({
  companies,
}: Props) {

  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (companies.length === 0) {
    setLoading(false);
    return;
  }

  fetchActionPlan();
}, [companies]);

  async function fetchActionPlan() {
    try {
      const response = await fetch("/api/ai/action-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  company: companies,
  entrySheets: [],
  interviews: [],
  analysis: "",
}),
      });

      const data = await response.json();
      console.log(data);
      setPlans(data.plans ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        AIが今日のプランを考えています...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        🤖 今日のAIプラン
      </h2>

      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <div
              className={`font-semibold ${priorityStyle[plan.priority].color}`}
            >
              {priorityStyle[plan.priority].icon} {plan.task}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              期限：{plan.due_type}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-700">
          💬 AIコメント
        </h3>

        <p className="mt-2 text-sm text-gray-700">
          AIがあなたの就活状況を分析して、今日の行動を提案しています。
        </p>
      </div>
    </div>
  );
}