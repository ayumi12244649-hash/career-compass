"use client";

import type { InterviewNote } from "@/types/interview";

type Props = {
  note: InterviewNote;
  onEdit: (note: InterviewNote) => void;
  onDelete: (id: string) => void;
};

export default function InterviewItem({
  note,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">

      <h4 className="font-bold text-lg">
        Q. {note.question}
      </h4>

      <div className="mt-3">
        <p className="font-semibold text-slate-600">
          回答
        </p>

        <p className="whitespace-pre-wrap">
          {note.answer}
        </p>
      </div>

      {note.memo && (
        <div className="mt-3">
          <p className="font-semibold text-slate-600">
            メモ
          </p>

          <p className="whitespace-pre-wrap text-gray-700">
            {note.memo}
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(note)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
        >
          ✏️ 編集
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          🗑 削除
        </button>

      </div>

    </div>
  );
}