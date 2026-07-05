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
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-bold">
          {sheet.title}
        </h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          ES
        </span>

      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-4">

        <p className="whitespace-pre-wrap leading-7">
          {sheet.content}
        </p>

      </div>

      {sheet.review_result && (

        <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4">

          <h4 className="mb-2 font-bold text-green-700">
            🤖 AI添削結果
          </h4>

          <p className="whitespace-pre-wrap text-sm leading-7">
            {sheet.review_result}
          </p>

        </div>

      )}

      <div className="mt-6 flex gap-3">

       <button
  onClick={() => {
    console.log("編集クリック");
    onEdit(sheet);
  }}
  className="flex-1 rounded-lg bg-amber-500 py-2 text-white"
>
  ✏️ 編集
</button>

        <button
          onClick={() => {
            if (confirm("このESを削除しますか？")) {
              onDelete(sheet.id);
            }
          }}
          className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white hover:bg-red-700"
        >
          🗑️ 削除
        </button>

      </div>

    </div>
  );
}