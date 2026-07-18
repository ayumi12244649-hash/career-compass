"use client";

import AITodayDashboard from "./AITodayDashboard";

const plans = [
  {
    task: "ESを提出する",
    priority: "高" as const,
    due_type: "今日" as const,
  },
  {
    task: "面接練習を30分行う",
    priority: "中" as const,
    due_type: "今週" as const,
  },
  {
    task: "企業研究をする",
    priority: "低" as const,
    due_type: "今月" as const,
  },
];

export default function AITodayDashboardPreview() {
  return (
    <div className="mx-auto max-w-6xl p-8">
     <AITodayDashboard
  companyName="株式会社サンプル"
  score={82}
  scoreDiff={5}
  message="今日はES提出を最優先にしましょう。"
  plans={plans}
  esCount={3}
  interviewCount={2}
  missionCount={8}
  mentorCount={5}
/>
    </div>
  );
}