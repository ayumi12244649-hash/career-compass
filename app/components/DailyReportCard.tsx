"use client";

import { useEffect, useState } from "react";

import {
  fetchLatestDailyReport,
  type DailyReport,
} from "@/services/daily-report.service";

type Props = {
  companyId: string;
};

export default function DailyReportCard({
  companyId,
}: Props) {
  const [report, setReport] =
    useState<DailyReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadReport();
  }, [companyId]);

  async function loadReport() {
    try {
      const data =
        await fetchLatestDailyReport(companyId);

      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-lg p-8">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Daily Report
      </h2>

      {report ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(
              report.created_at
            ).toLocaleString("ja-JP")}
          </p>

          <div className="rounded-xl bg-slate-100 p-6">

            <p className="leading-8 whitespace-pre-wrap">
              {report.report}
            </p>

          </div>
        </>
      ) : (
        <p className="text-gray-500">
          まだレポートはありません。
        </p>
      )}

    </div>
  );
}