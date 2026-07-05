"use client";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { useState } from "react";
import Button from "@/app/components/ui/Button";
import {
  analyzeRejection,
  saveRejectionReport,
} from "@/services/rejection.service";

type Props = {
  companyId: string;
  companyName: string;
};

export default function RejectionAnalysisCard({
  companyId,
  companyName,
}: Props) {
  const [reason, setReason] = useState("");

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!reason.trim()) {
      alert("不採用理由を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const result =
        await analyzeRejection(
          companyName,
          reason
        );

      setAnalysis(result);

      await saveRejectionReport(
        companyId,
        reason,
        result
      );

    } catch (error) {
      console.error(error);

      alert("AI分析に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

     <SectionHeader
  emoji="❌"
  title="AI不採用分析"
/>

      <textarea
        value={reason}
        onChange={(e) =>
          setReason(e.target.value)
        }
        placeholder="不採用理由や面接で気になった点を入力してください"
        className="h-40 w-full resize-none rounded-xl border p-4"
      />

    <Button
  onClick={handleAnalyze}
  disabled={loading}
  variant="danger"
>
  {loading
    ? "分析中..."
    : "🤖 AI分析する"}
</Button>
      <div className="mt-6 min-h-[220px] rounded-xl bg-slate-100 p-6">

        {analysis ? (
          <div className="whitespace-pre-wrap leading-8">
            {analysis}
          </div>
        ) : (
          <p className="text-slate-400">
            AI分析結果がここに表示されます。
          </p>
        )}

      </div>

    </div>
  );
}