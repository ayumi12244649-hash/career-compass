"use client";

import { useState } from "react";
import { saveFailureAnalysis } from "@/services/failure-analysis.service";
type Props = {
  company: any;
  entrySheets: any[];
  interviews: any[];
  careerScore: any;
  analysis: any;
};

type FailureAnalysisResult = {
  reason: string;
  weak_points: string[];
  improvements: string[];
  score: number;
  encouragement: string;
};

export default function AIFailureAnalysisCard({
  company,
  entrySheets,
  interviews,
  careerScore,
  analysis,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<FailureAnalysisResult | null>(null);

  async function analyzeFailure() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/failure-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          entrySheets,
          interviews,
          careerScore,
          analysis,
        }),
      });

      const data = await res.json();
console.log("API Response:", data);
      setResult(data);
      await saveFailureAnalysis(
  company.id,
  data.reason,
  data.weak_points,
  data.improvements,
  data.score,
  data.encouragement
);
    } catch (e) {
      console.error(e);
      alert("AI分析に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        🤖 AI 不採用分析
      </h2>

      <button
        onClick={analyzeFailure}
        disabled={loading}
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "分析中..." : "AI分析する"}
      </button>
            {result && (
        <div className="mt-6 space-y-6">

          <div>
            <h3 className="font-bold text-red-600">
              不採用になった可能性が高い理由
            </h3>

            <p className="mt-2 whitespace-pre-wrap">
              {result.reason}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-orange-600">
              改善ポイント
            </h3>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              {result.weak_points?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-600">
              次回への改善案
            </h3>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              {result.improvements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-blue-600">
              AI評価スコア
            </h3>

            <div className="mt-2 text-3xl font-bold">
              {result.score} / 100
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <h3 className="font-bold text-green-700">
              AIからのメッセージ
            </h3>

            <p className="mt-2 whitespace-pre-wrap">
              {result.encouragement}
            </p>
          </div>

        </div>
      )}
          </div>
  );
}