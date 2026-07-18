"use client";

import { useEffect, useState } from "react";
import { fetchFailureAnalysis } from "@/services/failure-analysis.service";

type Props = {
  companyId: string;
};

type FailureAnalysis = {
  id: string;
  reason: string;
  weak_points: string[];
  improvements: string[];
  score: number;
  encouragement: string;
  created_at: string;
};

export default function FailureAnalysisHistoryCard({
  companyId,
}: Props) {
  const [history, setHistory] = useState<
    FailureAnalysis[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHistory();
  }, [companyId]);

  async function loadHistory() {
    try {
      const data =
        await fetchFailureAnalysis(companyId);
 console.log("Failure History:", data);
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-red-200 p-6 shadow mt-6">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow mt-6">

      <h2 className="text-2xl font-bold mb-6">
        📚 AI分析履歴
      </h2>
            {history.length === 0 ? (
        <p className="text-gray-500">
          まだ分析履歴はありません。
        </p>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border p-5"
            >
              <div className="flex justify-between items-center">

                <h3 className="font-bold text-lg">
                  AI分析結果
                </h3>

                <span className="text-sm text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString("ja-JP")}
                </span>

              </div>

              <div className="mt-4">

                <p className="font-bold text-red-600">
                  不採用理由
                </p>

                <p className="mt-1 whitespace-pre-wrap">
                  {item.reason}
                </p>

              </div>

              <div className="mt-4">

  <p className="font-bold text-orange-600">
    AI評価スコア
  </p>

  <p className="text-3xl font-bold mt-2">
    {item.score} / 100
  </p>

</div>

<div className="mt-6">

  <p className="font-bold text-orange-600">
    改善ポイント
  </p>

  <ul className="list-disc pl-6 mt-2">
    {item.weak_points?.map((point, index) => (
      <li key={index}>
        {point}
      </li>
    ))}
  </ul>

</div>

<div className="mt-6">

  <p className="font-bold text-green-600">
    次回への改善案
  </p>

  <ul className="list-disc pl-6 mt-2">
    {item.improvements?.map((item2, index) => (
      <li key={index}>
        {item2}
      </li>
    ))}
  </ul>

</div>
<div className="mt-6 rounded-xl bg-green-50 p-4">
  <p className="font-bold text-green-700">
    AIからのメッセージ
  </p>

  <p className="mt-2">
    {item.encouragement}
  </p>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}