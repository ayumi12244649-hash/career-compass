"use client";

import HeroSection from "./HeroSection";
import PrioritySection from "./PrioritySection";
import ActionPlanSection from "./ActionPlanSection";
import ScoreSection from "./ScoreSection";
import GrowthSection from "./GrowthSection";

type ActionPlan = {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
};

type Props = {
  companyName: string;
  score: number;
  scoreDiff: number;
  message: string;
  plans: ActionPlan[];

  esCount: number;
  interviewCount: number;
  missionCount: number;
  mentorCount: number;
};


export default function AITodayDashboard({
  companyName,
  score,
  scoreDiff,
  message,
  plans,
  esCount,
  interviewCount,
  missionCount,
  mentorCount,
}: Props) {

const safePlans = plans ?? [];

const topPlan =
  safePlans.length > 0
    ? safePlans[0]
    : {
        task: "今日のプランはありません",
        priority: "低" as const,
        due_type: "今日" as const,
      };

  return (
    <div className="space-y-8">

      <HeroSection
        companyName={companyName}
        score={score}
        message={message}
      />

      <PrioritySection
        task={topPlan.task}
        priority={topPlan.priority}
        due={topPlan.due_type}
      />
          <ActionPlanSection
  plans={safePlans}
/>

      <ScoreSection
        score={score}
        diff={scoreDiff}
      />
      <GrowthSection
  esCount={esCount}
  interviewCount={interviewCount}
  missionCount={missionCount}
  mentorCount={mentorCount}
/>
    </div>
  );
}