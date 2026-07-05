"use client";

import InterviewItem from "./InterviewItem";

import type { InterviewNote } from "@/types/interview";

type Props = {
  notes: InterviewNote[];
  onEdit: (note: InterviewNote) => void;
  onDelete: (id: string) => void;
};

export default function InterviewList({
  notes,
  onEdit,
  onDelete,
}: Props) {
  if (notes.length === 0) {
    return (
      <p className="text-gray-500">
        まだ保存されていません。
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <InterviewItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}