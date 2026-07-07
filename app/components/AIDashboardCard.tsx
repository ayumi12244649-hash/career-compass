"use client";

import { useMemory } from "@/hooks/useMemory";

type Props = {
  companyId: string;
};

export default function AIDashboardCard({
  companyId,
}: Props) {
  const memory = useMemory(companyId);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        🧠 AI Dashboard
      </h2>

      {memory ? (
        <>
          <div className="bg-slate-100 rounded-lg p-4">
            <pre className="whitespace-pre-wrap">
              {memory.summary}
            </pre>
          </div>
        </>
      ) : (
        <p>AIが分析中です...</p>
      )}

    </div>
  );
}