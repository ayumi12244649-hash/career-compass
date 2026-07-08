"use client";

import { useEffect, useState } from "react";
import {
  fetchLatestSnapshots,
  type GrowthSnapshot,
} from "@/services/growth.service";

type Props = {
  companyId: string;
};

export default function GrowthDashboardCard({
  companyId,
}: Props) {
  const [snapshot, setSnapshot] =
    useState<GrowthSnapshot | null>(null);

  useEffect(() => {
    loadSnapshot();
  }, [companyId]);

  async function loadSnapshot() {
    try {
      const data =
        await fetchLatestSnapshots(companyId);

      if (data.length > 0) {
        setSnapshot(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function width(value: number) {
    return `${Math.min(value * 10, 100)}%`;
  }
const total =
  (snapshot?.es_count ?? 0) +
  (snapshot?.interview_count ?? 0) +
  (snapshot?.mission_count ?? 0) +
  (snapshot?.mentor_count ?? 0);

function getLevel(score: number) {
  if (score >= 40) return "🏆 Master";
  if (score >= 25) return "🌳 Advanced";
  if (score >= 15) return "🌿 Intermediate";
  if (score >= 5) return "🌱 Beginner";
  return "🥚 New";
}

function getComment(score: number) {
  if (score >= 40) {
    return "ここまで積み重ねてきた努力は大きな強みです。自信を持って選考に挑みましょう！";
  }

  if (score >= 25) {
    return "経験が着実に増えています。この調子で挑戦を続けましょう！";
  }

  if (score >= 15) {
    return "就活の基礎が身についてきています。振り返りを続けることでさらに成長できます。";
  }

  if (score >= 5) {
    return "最初の一歩を踏み出せています。ESや面接の経験を積み重ねていきましょう。";
  }

  return "まずはESを書いたりAIメンターに相談したりして、最初の記録を作ってみましょう！";
}
  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        🌱 AI Growth Dashboard
      </h2>

      <div className="space-y-6">

        {/* ES */}

        <div>

          <div className="flex justify-between mb-2">

            <span>📝 ES</span>

            <span>
              {snapshot?.es_count ?? 0}件
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-slate-200">

            <div
              className="h-3 rounded-full bg-blue-500 transition-all"
              style={{
                width: width(
                  snapshot?.es_count ?? 0
                ),
              }}
            />

          </div>

        </div>

        {/* 面接 */}

        <div>

          <div className="flex justify-between mb-2">

            <span>🎤 面接</span>

            <span>
              {snapshot?.interview_count ?? 0}件
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-slate-200">

            <div
              className="h-3 rounded-full bg-green-500 transition-all"
              style={{
                width: width(
                  snapshot?.interview_count ?? 0
                ),
              }}
            />

          </div>

        </div>

        {/* Mission */}

        <div>

          <div className="flex justify-between mb-2">

            <span>🎯 Mission</span>

            <span>
              {snapshot?.mission_count ?? 0}件
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-slate-200">

            <div
              className="h-3 rounded-full bg-yellow-500 transition-all"
              style={{
                width: width(
                  snapshot?.mission_count ?? 0
                ),
              }}
            />

          </div>

        </div>

        {/* Mentor */}

        <div>

          <div className="flex justify-between mb-2">

            <span>🤖 AI相談</span>

            <span>
              {snapshot?.mentor_count ?? 0}件
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-slate-200">

            <div
              className="h-3 rounded-full bg-purple-500 transition-all"
              style={{
                width: width(
                  snapshot?.mentor_count ?? 0
                ),
              }}
            />

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-100 p-5">

  <h3 className="font-bold mb-2">
    📈 Career Growth
  </h3>

  <p className="text-gray-500">
    現在レベル
  </p>

  <p className="text-xl font-bold mt-2">
    {getLevel(total)}
  </p>

  <p className="mt-4 text-gray-600 leading-relaxed">
    🤖 {getComment(total)}
  </p>

</div>
    </div>
  );
}
