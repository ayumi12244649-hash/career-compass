"use client";

import type { EntrySheet } from "@/types/es";
import ESItem from "./ESItem";

type Props = {
  entrySheets: EntrySheet[];
  onEdit: (sheet: EntrySheet) => void;
  onDelete: (id: string) => void;
};

export default function ESList({
  entrySheets,
  onEdit,
  onDelete,
}: Props) {
  if (entrySheets.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-lg text-slate-500">
          📄 まだESは登録されていません
        </p>

        <p className="mt-2 text-sm text-slate-400">
          上のフォームから最初のESを作成しましょう。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entrySheets.map((sheet) => (
        <ESItem
          key={sheet.id}
          sheet={sheet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}