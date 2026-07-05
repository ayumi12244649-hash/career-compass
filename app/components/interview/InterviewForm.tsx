"use client";

type Props = {
  question: string;
  answer: string;
  memo: string;

  setQuestion: (value: string) => void;
  setAnswer: (value: string) => void;
  setMemo: (value: string) => void;

  saveNote: () => void;

  isEditing: boolean;
};

export default function InterviewForm({
  question,
  answer,
  memo,
  setQuestion,
  setAnswer,
  setMemo,
  saveNote,
  isEditing,
}: Props) {
  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="質問"
        className="w-full border rounded p-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <textarea
        placeholder="自分の回答"
        className="w-full border rounded p-2 h-32"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <textarea
        placeholder="メモ"
        className="w-full border rounded p-2 h-24"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      <button
        onClick={saveNote}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
      >
        {isEditing ? "更新" : "保存"}
      </button>

    </div>
  );
}