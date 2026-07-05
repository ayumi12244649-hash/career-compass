"use client";

import { useEffect, useState } from "react";

import { fetchInterviewPractice } from "@/services/interviewPractice.service";

type Props = {
  companyId: string;
};

type InterviewPractice = {
  id: string;
  question: string;
  answer: string;
  feedback: string;
  created_at: string;
};

export default function InterviewPracticeHistory({
  companyId,
}: Props) {
  const [history, setHistory] = useState<InterviewPractice[]>([]);

  useEffect(() => {
    loadHistory();
  }, [companyId]);

  async function loadHistory() {
    try {
      const data = await fetchInterviewPractice(companyId);
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        📚 面接練習履歴
      </h2>

      {history.length === 0 ? (
        <p className="text-slate-400">
          まだ履歴はありません。
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="mb-6 rounded-xl border p-5"
          >
            <p className="font-bold">
              質問
            </p>

            <p className="mb-4">
              {item.question}
            </p>

            <p className="font-bold">
              回答
            </p>

            <p className="mb-4 whitespace-pre-wrap">
              {item.answer}
            </p>

            <p className="font-bold">
              AI評価
            </p>

            <div className="whitespace-pre-wrap rounded-lg bg-slate-100 p-4">
              {item.feedback}
            </div>
          </div>
        ))
      )}
    </div>
  );
}