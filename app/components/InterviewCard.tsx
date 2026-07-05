"use client";

import { useState } from "react";

import { useInterview } from "@/hooks/useInterview";

import InterviewForm from "./interview/InterviewForm";
import InterviewList from "./interview/InterviewList";

import type { InterviewNote } from "@/types/interview";

type Props = {
  companyId: string;
};

export default function InterviewCard({
  companyId,
}: Props) {
  const {
    notes,
    loading,
    save,
    update,
    remove,
  } = useInterview(companyId);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [memo, setMemo] = useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);
      async function saveNote() {
    if (!question || !answer) {
      alert("質問と回答を入力してください。");
      return;
    }

    try {
      if (isEditing && editingId) {
        await update(
          editingId,
          question,
          answer,
          memo
        );

        alert("更新しました！");
      } else {
        await save(
          question,
          answer,
          memo
        );

        alert("保存しました！");
      }

      setQuestion("");
      setAnswer("");
      setMemo("");

      setEditingId(null);
      setIsEditing(false);

    } catch (error) {
      console.error(error);
      alert("保存に失敗しました。");
    }
  }

  function startEdit(note: InterviewNote) {
    setEditingId(note.id);

    setQuestion(note.question);
    setAnswer(note.answer);
    setMemo(note.memo ?? "");

    setIsEditing(true);
  }

  async function deleteNote(id: string) {
    const ok = confirm(
      "この面接メモを削除しますか？"
    );

    if (!ok) return;

    try {
      await remove(id);
    } catch (error) {
      console.error(error);
      alert("削除できませんでした。");
    }
  }
    return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        🎤 面接メモ
      </h2>

      <InterviewForm
        question={question}
        answer={answer}
        memo={memo}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
        setMemo={setMemo}
        saveNote={saveNote}
        isEditing={isEditing}
      />

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-4">
        📋 保存済み面接メモ
      </h3>
            {loading ? (
        <p className="text-gray-500">
          読み込み中...
        </p>
      ) : (
        <InterviewList
          notes={notes}
          onEdit={startEdit}
          onDelete={deleteNote}
        />
      )}
          </div>
  );
}