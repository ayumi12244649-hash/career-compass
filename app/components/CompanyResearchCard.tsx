"use client";

import { useState } from "react";

type Props = {
  companyId: string;
};

export default function CompanyResearchCard({
  companyId,
}: Props) {
  console.log("✅ CompanyResearchCard Render");

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const fetchResearch = async () => {
    console.log("✅ CompanyResearchボタンが押されました");

    try {
      setLoading(true);

      const res = await fetch("/api/ai/company-research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId,
        }),
      });

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Response JSON");
console.log(JSON.stringify(data, null, 2));

      if (!res.ok) {
        throw new Error(
          data.error ?? "企業研究に失敗しました。"
        );
      }

      setAnalysis(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        🏢 AI企業研究
      </h2>

      <div className="text-gray-500 mb-6">
        まだ企業研究はありません。
      </div>

      <button
        onClick={fetchResearch}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "分析中..." : "AI分析する"}
      </button>

      {analysis && (
        <div className="mt-6 whitespace-pre-wrap rounded-lg bg-gray-100 p-4">
          {analysis}
        </div>
      )}
    </div>
  );
}