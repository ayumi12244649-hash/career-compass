"use client";

import { useEffect, useState } from "react";
import { generateActionPlan }
  from "@/services/ai-action-plan.service";


import type { ActionPlan } from "@/types/action-plan";

import {
  fetchActionPlans,
  updateActionPlan,
  saveActionPlans,
  deleteActionPlans,
} from "@/services/action-plan.service";

interface Props {
  companyId: string;
  companyName: string;
  userId: string;
}

export default function ActionPlanCard({
  companyId,
  companyName,
  userId,
}: Props) {

  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  

  // この下に関数が続く
 

async function generatePlans() {
  try {
    const generatedPlans = await generateActionPlan({
      company: companyName,
      entrySheets: "",
      interviews: "",
      analysis: "",
    });

await deleteActionPlans(companyId);

    await saveActionPlans(
  generatedPlans.map((plan) => ({
    user_id: userId,
    company_id: companyId,
    task: plan.task,
    priority: plan.priority,
    due_type: plan.due_type,
    completed: false,
  }))
);
  

    await loadPlans();

  } catch (error) {
    console.error(error);
    alert("AIプラン生成に失敗しました。");
  }
}

async function loadPlans() {
  setLoading(true);

  try {
    const data = await fetchActionPlans(companyId);
    setPlans(data);
  } catch (error) {
    console.error(error);
    alert("行動プランの取得に失敗しました。");
  } finally {
    setLoading(false);
  }
}



  useEffect(() => {
    loadPlans();
  }, [companyId]);

  async function toggle(plan: ActionPlan) {
    await updateActionPlan(
      plan.id,
      !plan.completed
    );

    loadPlans();
  }

  const completed = plans.filter(
    (p) => p.completed
  ).length;

  const progress =
    plans.length === 0
      ? 0
      : Math.round((completed / plans.length) * 100);
const sortedPlans = [...plans].sort((a, b) => {

  // 完了したものを一番下へ
  if (a.completed !== b.completed) {
    return a.completed ? 1 : -1;
  }

  const priorityOrder = {
    高: 0,
    中: 1,
    低: 2,
  };

  const dueOrder = {
    今日: 0,
    今週: 1,
    今月: 2,
  };

  const priorityDiff =
    priorityOrder[a.priority as keyof typeof priorityOrder] -
    priorityOrder[b.priority as keyof typeof priorityOrder];

  if (priorityDiff !== 0) {
    return priorityDiff;
  }

  return (
    dueOrder[a.due_type as keyof typeof dueOrder] -
    dueOrder[b.due_type as keyof typeof dueOrder]
  );
});

 
  return (
    <div className="rounded-2xl bg-white shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🎯 AI Action Planner
      </h2>
      <button
  onClick={generatePlans}
  className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
>
  🤖 AIプラン生成
</button>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        進捗 {completed} / {plans.length}
      </p>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div className="space-y-3">
          {sortedPlans.map((plan) => (
            <label
              key={plan.id}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={plan.completed}
                onChange={() => toggle(plan)}
              />

              <div className="flex items-center gap-2">

  <span
    className={`rounded-full px-2 py-1 text-xs font-bold text-white ${
      plan.priority === "高"
        ? "bg-red-500"
        : plan.priority === "中"
        ? "bg-yellow-500"
        : "bg-green-500"
    }`}
  >
    {plan.priority}
  </span>
<span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
  📅 {plan.due_type}
</span>
  <span
    className={
      plan.completed
        ? "line-through text-gray-400"
        : ""
    }
  >
    {plan.task}
  </span>

</div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}