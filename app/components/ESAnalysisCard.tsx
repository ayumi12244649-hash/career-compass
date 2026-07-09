"use client";

import { useState } from "react";

type Props = {
  userId: string;
};

export default function ESAnalysisCard({
  userId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  async function analyzeES() {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/es-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        📄 AI ES分析
      </h2>

      <button
        onClick={analyzeES}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "分析中..." : "ES分析する"}
      </button>

      {analysis && (
        <div className="mt-4 whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
          {analysis}
        </div>
      )}
    </div>
  );
}