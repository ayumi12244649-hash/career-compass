"use client";

import { useState } from "react";

type Props = {
  companyId: string;
};

export default function AICompanyLearningCard({
  companyId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  async function analyzeCompany() {
    setLoading(true);

    const res = await fetch("/api/ai/company-learning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId,
      }),
    });

    const data = await res.json();

    setAnalysis(data.analysis);

    setLoading(false);
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🏢 AI企業分析
      </h2>

      <button
        onClick={analyzeCompany}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "分析中..." : "企業分析する"}
      </button>

      {analysis && (
        <div className="mt-4 whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
          {analysis}
        </div>
      )}
    </div>
  );
}