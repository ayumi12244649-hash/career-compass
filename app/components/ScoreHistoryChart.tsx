"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { fetchCareerScores } from "@/services/score.service";

type Score = {
  score: number;
  created_at: string;
};

export default function ScoreHistoryChart() {
  const [data, setData] = useState<Score[]>([]);

  useEffect(() => {
    loadScores();
  }, []);

  async function loadScores() {
    const scores = await fetchCareerScores();

    setData(scores);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        📈 Career Score推移
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="created_at"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString()
              }
            />

            <YAxis
              domain={[0, 100]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}