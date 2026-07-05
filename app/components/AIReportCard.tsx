"use client";

import { useState } from "react";
import { generateReport } from "@/services/ai.service";
import { saveAIReport } from "@/services/aiReport.service";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
  score: number;
};

export default function AIReportCard({
  companyCount,
  esCount,
  interviewCount,
  score,
}: Props) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);

    try {
      const result = await generateReport(
companyCount,
  esCount,
  interviewCount,
  score
);

setReport(result);

await saveAIReport(
  result,
  score,
  companyCount,
  esCount,
  interviewCount
);
    } catch (error) {
      console.error(error);
      alert("AI分析に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          🤖 AI就活分析
        </h2>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "分析中..." : "AI分析する"}
        </button>

      </div>

      <div className="mt-8 rounded-xl bg-slate-100 p-6 min-h-[300px]">

        {report ? (
          <div className="whitespace-pre-wrap leading-8">
            {report}
          </div>
        ) : (
          <p className="text-slate-400">
            「AI分析する」を押すと、
            あなた専用の就活分析レポートを生成します。
          </p>
        )}

      </div>

    </div>
  );
}