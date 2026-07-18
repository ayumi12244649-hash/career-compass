"use client";

import AIActionPlanCardV2 from "./AIActionPlanCardV2";

const mockCompany = {
  id: "demo-company",
  user_id: "demo-user",
  company_name: "株式会社サンプル",
  industry: "IT",
  status: "一次面接",
  applied_date: "2026-07-14",
};

const mockAIData = {
  company: mockCompany,

  entrySheets: [
    {
      title: "自己PR",
      content: "私は継続力があります。",
    },
  ],

  interviews: [
    {
      question: "自己紹介をしてください。",
      answer: "○○です。",
    },
  ],

  careerScore: {
    score: 82,
  },

  growth: [],

  missions: [
    {
      title: "ESを完成させる",
      completed: false,
    },
  ],

  failureAnalysis: [],
};

export default function AIActionPlanCardV2Preview() {
  return (
    <AIActionPlanCardV2
      company={mockCompany}
      aiData={mockAIData}
    />
  );
}