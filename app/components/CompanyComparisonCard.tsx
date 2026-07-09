"use client";

import { useState } from "react";

type Props = {
  userId: string;
};

export default function CompanyComparisonCard({
  userId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState("");

  async function compareCompanies() {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/company-comparison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      setComparison(data.comparison);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        📊 AI企業比較分析
      </h2>

      <button
        onClick={compareCompanies}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "分析中..." : "企業比較分析する"}
      </button>

      {comparison && (
        <div className="mt-4 whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
          {comparison}
        </div>
      )}
    </div>
  );
}