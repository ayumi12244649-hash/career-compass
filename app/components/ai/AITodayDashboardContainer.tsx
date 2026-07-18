"use client";

import AITodayDashboard from "./AITodayDashboard";
import type { AIData } from "@/services/ai-data.service";

type Props = {
  aiData: AIData | null;
};

export default function AITodayDashboardContainer({
  aiData,
}: Props) {
  if (!aiData || !aiData.company) {
    return null;
  }

  const latestGrowth =
    aiData.growth.length > 0
      ? aiData.growth[0]
      : null;

  const score =
    aiData.careerScore?.score ?? 0;

  const scoreDiff = 0;

  const message =
    aiData.failureAnalysis.length > 0
      ? aiData.failureAnalysis[0].encouragement
      : "今日も一歩ずつ進みましょう！";
        return (
    <AITodayDashboard
      companyName={
        aiData.company.company_name
      }

      score={score}

      scoreDiff={scoreDiff}

      message={message}

      plans={aiData.actionPlans ?? []}

      esCount={
        aiData.entrySheets.length
      }

      interviewCount={
        aiData.interviews.length
      }

      missionCount={
        aiData.missions.length
      }

      mentorCount={
        latestGrowth?.mentor_count ?? 0
      }
          />
  );
}