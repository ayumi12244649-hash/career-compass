"use client";

import { useEffect, useState } from "react";

import { fetchCareerScores } from "@/services/score.service";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

type CareerScore = {
  score: number;
  created_at: string;
};

export default function ScoreTrendCard({
  companyCount,
  esCount,
  interviewCount,
}: Props) {

  const [diff, setDiff] = useState(0);

  const score = Math.min(
    companyCount * 10 +
      esCount * 15 +
      interviewCount * 20,
    100
  );

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const history = (await fetchCareerScores()) as CareerScore[];

    if (history.length < 2) {
      setDiff(0);
      return;
    }

    const previous = history[history.length - 2].score;

    setDiff(score - previous);
  }

  function reason() {
    const items = [];

    if (companyCount >= 5)
      items.push("応募企業数が増えています。");

    if (esCount >= 3)
      items.push("ES作成が進みました。");

    if (interviewCount >= 1)
      items.push("面接経験が増えました。");

    return items;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        📈 スコア変化分析
      </h2>

      <div className="text-4xl font-bold">

        {diff > 0 && (
          <span className="text-green-600">
            +{diff}
          </span>
        )}

        {diff === 0 && (
          <span className="text-slate-500">
            ±0
          </span>
        )}

        {diff < 0 && (
          <span className="text-red-600">
            {diff}
          </span>
        )}

      </div>

      <p className="mt-4">

        {diff > 0 &&
          "前回よりスコアがアップしました！"}

        {diff === 0 &&
          "前回と同じスコアです。"}

        {diff < 0 &&
          "前回よりスコアが下がっています。"}

      </p>

      <div className="mt-6">

        <h3 className="font-semibold mb-2">
          改善理由
        </h3>

        <ul className="list-disc ml-6">

          {reason().map((r, i) => (
            <li key={i}>{r}</li>
          ))}

        </ul>

      </div>

    </div>
  );
}