"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { supabase } from "@/lib/supabase";

type ChartData = {
  status: string;
  count: number;
};

export default function StatusChart() {

  const [data, setData] =
    useState<ChartData[]>([]);

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {

    const { data, error } =
      await supabase
        .from("companies")
        .select("status");

    if (error) {
      console.error(error);
      return;
    }

    const map = new Map<
      string,
      number
    >();
        data.forEach((company) => {

      const status =
        company.status ?? "未設定";

      map.set(
        status,
        (map.get(status) ?? 0) + 1
      );

    });

    const chartData = Array.from(
      map.entries()
    ).map(([status, count]) => ({
      status,
      count,
    }));

    setData(chartData);

  }

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h3 className="mb-6 text-2xl font-bold">
        📊 選考状況グラフ
      </h3>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="status"
            />

            <YAxis />

            <Tooltip />

           <Bar
  dataKey="count"
  fill="#2563eb"
  radius={[8, 8, 0, 0]}
/>
                      </BarChart>

        </ResponsiveContainer>

      </div>

      {data.length === 0 && (
        <p className="mt-4 text-center text-slate-500">
          まだ応募企業が登録されていません。
        </p>
      )}

    </div>

  );
}
