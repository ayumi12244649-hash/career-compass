"use client";

import { toast } from "sonner";
import { useState } from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Button from "@/app/components/ui/Button";

import {
  analyzeInterview,
  saveInterviewPractice,
} from "@/services/interviewPractice.service";

type Props = {
  companyId: string;
};

export default function InterviewPracticeCard({
  companyId,
}: Props) {
  const [question, setQuestion] = useState(
    "自己紹介をお願いします。"
  );

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!answer.trim()) {
      toast.error("回答を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const result = await analyzeInterview(
        question,
        answer
      );

      setFeedback(result);

      await saveInterviewPractice(
        companyId,
        question,
        answer,
        result
      );
      toast.success("AI採点が完了しました。");
    } catch (error) {
      console.error(error);
      toast.error("AI採点に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
     <SectionHeader
  emoji="🎤"
  title="AI面接練習"
/>

      <div className="mb-4">
        <label
          htmlFor="question"
          className="mb-2 block font-medium"
        >
          質問
        </label>

        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="answer"
          className="mb-2 block font-medium"
        >
          あなたの回答
        </label>

        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="h-48 w-full resize-none rounded-xl border p-4"
        />
      </div>

      <Button
  onClick={handleAnalyze}
  disabled={loading}
>
  {loading ? "採点中..." : "🤖 AI採点する"}
</Button>

      <div className="mt-6 min-h-[240px] rounded-xl bg-slate-100 p-6">
        {feedback ? (
          <div className="whitespace-pre-wrap leading-8">
            {feedback}
          </div>
        ) : (
          <p className="text-slate-400">
            AI採点結果がここに表示されます。
          </p>
        )}
      </div>
    </div>
  );
}