"use client";

import { useState } from "react";
import AIScoreCard from "@/app/components/AIScoreCard";

type Intelligence = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  industries: string[];
  actions: string[];
};

type Props = {
  userId: string;
};

export default function AIIntelligenceDashboard({
  userId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [intelligence, setIntelligence] =
    useState<Intelligence | null>(null);

  async function generateIntelligence() {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      setIntelligence(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        🧠 AI Intelligence Dashboard
      </h2>

      <button
        onClick={generateIntelligence}
        className="mb-6 rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        {loading
          ? "分析中..."
          : "AI総合分析する"}
      </button>

      <div className="mb-8">
        <AIScoreCard
          score={intelligence?.score ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AI総合評価 */}
        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="font-bold text-lg">
            🎯 AI総合評価
          </h3>

          <p className="mt-3 whitespace-pre-wrap">
            {intelligence?.summary ??
              "まだ分析していません。"}
          </p>
        </div>

        {/* 強み */}
        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="font-bold text-lg">
            💪 あなたの強み
          </h3>

          <ul className="mt-3 space-y-2">
            {intelligence?.strengths?.map(
              (item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* 改善ポイント */}
        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="font-bold text-lg">
            ⚠ 改善ポイント
          </h3>

          <ul className="mt-3 space-y-2">
            {intelligence?.weaknesses?.map(
              (item, index) => (
                <li key={index}>
                  ⚠ {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* 相性の良い業界 */}
        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="font-bold text-lg">
            🏢 相性の良い業界
          </h3>

          <ul className="mt-3 space-y-2">
            {intelligence?.industries?.map(
              (item, index) => (
                <li key={index}>
                  🏢 {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* 今日やること */}
        <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">
          <h3 className="font-bold text-lg">
            ✅ 今日やること
          </h3>

          <ul className="mt-4 space-y-3">
            {intelligence?.actions?.map(
              (item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded"
                  />

                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

      </div>

    </div>
  );
}