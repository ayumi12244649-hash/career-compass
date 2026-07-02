"use client";

import type { EntrySheet } from "@/types/es";

type Props = {
  sheet: EntrySheet;
  onEdit: (sheet: EntrySheet) => void;
  onDelete: (id: string) => void;
};

export default function ESItem({
  sheet,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 transition hover:shadow-lg">

      {/* タイトル */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800">
          {sheet.title}
        </h3>

        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          ES
        </span>
      </div>

      {/* 本文 */}
      <div className="bg-slate-50 rounded-lg p-4 border">
        <p className="whitespace-pre-wrap text-slate-700 leading-7">
          {sheet.content}
        </p>
      </div>

      {/* AI添削 */}
      {sheet.review_result && (
        <div className="mt-5 rounded-lg border border-green-300 bg-green-50 p-4">
          <h4 className="font-bold text-green-700 mb-3">
            🤖 AI添削結果
          </h4>

          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {sheet.review_result}
          </p>
        </div>
      )}

      {/* ボタン */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(sheet)}
          className="flex-1 rounded-lg bg-amber-500 py-2 text-white font-semibold transition hover:bg-amber-600"
        >
          ✏️ 編集
        </button>

        <button
          onClick={() => {
            if (confirm("このESを削除しますか？")) {
              onDelete(sheet.id);
            }
          }}
          className="flex-1 rounded-lg bg-red-600 py-2 text-white font-semibold transition hover:bg-red-700"
        >
          🗑️ 削除
        </button>

      </div>
    </div>
  );
}