"use client";

import { useMemory } from "@/hooks/useMemory";

type Props = {
  companyId: string;
};

export default function AIMemoryCard({
  companyId,
}: Props) {
  const memory = useMemory(companyId);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🧠 AI Memory
      </h2>

      {memory ? (
        <pre className="whitespace-pre-wrap text-sm">
          {memory.summary}
        </pre>
      ) : (
        <p>まだMemoryはありません。</p>
      )}
    </div>
  );
}