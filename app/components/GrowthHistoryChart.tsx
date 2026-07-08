"use client";

import { useEffect, useState } from "react";

import {
  fetchGrowthHistory,
  type GrowthSnapshot,
} from "@/services/growth.service";

type Props = {
  companyId: string;
};

export default function GrowthHistoryChart({
  companyId,
}: Props) {
  const [history, setHistory] = useState<
    GrowthSnapshot[]
  >([]);

  useEffect(() => {
    loadHistory();
  }, [companyId]);

  async function loadHistory() {
    try {
      const data =
        await fetchGrowthHistory(companyId);

      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  }

  function calcScore(item: GrowthSnapshot) {
    return (
      item.es_count * 3 +
      item.interview_count * 5 +
      item.mission_count +
      item.mentor_count * 0.2
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        📈 Growth History
      </h2>

      <div className="space-y-4">

        {history.length === 0 && (
          <p className="text-gray-500">
            成長履歴はまだありません。
          </p>
        )}

        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-slate-100 p-4"
          >
            <div className="flex justify-between">

              <span>
                {new Date(
                  item.created_at
                ).toLocaleDateString("ja-JP")}
              </span>

              <span className="font-bold">

                Score {calcScore(item)}

              </span>

            </div>

            <div className="mt-2 h-3 rounded-full bg-slate-300">

              <div
                className="h-3 rounded-full bg-blue-500"
                style={{
                  width: `${Math.min(
                    calcScore(item),
                    100
                  )}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}