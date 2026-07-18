"use client";

import { useEffect, useState } from "react";
import { fetchFailureAnalysis } from "@/services/failure-analysis.service";

type Props = {
  companyId: string;
};

export default function FailureAnalysisCompareCard({
  companyId,
}: Props) {
  const [currentScore, setCurrentScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores();
  }, [companyId]);

  async function loadScores() {
    try {
      const history =
        await fetchFailureAnalysis(companyId);

     console.log(
  "Compare Scores:",
  history.map((item) => ({
    score: item.score,
    created_at: item.created_at,
  }))
);

      if (history.length > 0) {
        setCurrentScore(history[0].score);
      }

      if (history.length > 1) {
        setPreviousScore(history[1].score);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow mt-6">
        読み込み中...
      </div>
    );
  }

  const diff = currentScore - previousScore;

  const percent =
    previousScore === 0
      ? 0
      : Math.round((diff / previousScore) * 100);

  return (
    <div className="rounded-xl bg-white p-6 shadow mt-6">

      <h2 className="text-2xl font-bold mb-6">
        📈 前回との比較
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="rounded-xl bg-slate-100 p-5">
          <p className="text-gray-500">
            前回
          </p>

          <p className="text-4xl font-bold mt-2">
            {previousScore}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-5">
          <p className="text-gray-500">
            今回
          </p>

          <p className="text-4xl font-bold mt-2">
            {currentScore}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-5">
          <p className="font-bold text-blue-600">
            スコア差
          </p>

          <p className="text-4xl font-bold mt-2">
            {diff >= 0 ? "+" : ""}
            {diff}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-5">
          <p className="font-bold text-green-600">
            成長率
          </p>

          <p className="text-4xl font-bold mt-2">
            {percent >= 0 ? "+" : ""}
            {percent}%
          </p>
        </div>

      </div>

      {previousScore === 0 && (
        <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-300 p-4">
          <p className="text-yellow-700">
            初回分析のため比較データはありません。
          </p>
        </div>
      )}

    </div>
  );
}