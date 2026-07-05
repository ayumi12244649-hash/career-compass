"use client";

import { useEffect, useState } from "react";

import type { AIReport } from "@/types/aiReport";

import {
  fetchLatestAIReport,
} from "@/services/aiReport.service";

export default function AIReportHistory() {

  const [report, setReport] =
    useState<AIReport | null>(null);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const data =
        await fetchLatestAIReport();

      setReport(data);

    } catch (error) {
      console.error(error);
    }
  }

  if (!report) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          📜 最新AI分析
        </h2>

        <p className="text-slate-500">
          まだAI分析履歴がありません。
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-4 text-2xl font-bold">
        📜 最新AI分析
      </h2>

      <p className="mb-2 text-sm text-slate-500">
        {new Date(
          report.created_at
        ).toLocaleString()}
      </p>

      <div className="whitespace-pre-wrap leading-8">
        {report.report}
      </div>

    </div>
  );
}