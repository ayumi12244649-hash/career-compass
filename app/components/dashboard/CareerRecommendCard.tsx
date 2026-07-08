"use client";

import { useState } from "react";

type Props = {
  userId: string;
};

export default function CareerRecommendCard({
  userId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  async function generateRecommendation() {
    setLoading(true);

    const res = await fetch("/api/ai/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const data = await res.json();

    setRecommendation(data.recommendation);

    setLoading(false);
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🎯 AIキャリアレコメンド
      </h2>

      <button
        onClick={generateRecommendation}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "分析中..." : "キャリア分析する"}
      </button>

      {recommendation && (
        <div className="mt-4 whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
          {recommendation}
        </div>
      )}
    </div>
  );
}