"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  companyId: string;
};

type InterviewNote = {
  id: string;
  question: string;
  answer: string;
  memo: string;
};

export default function InterviewCard({ companyId }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [memo, setMemo] = useState("");
  const [notes, setNotes] = useState<InterviewNote[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("interview_notes")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data ?? []);
  }

  async function saveNote() {
    if (!question || !answer) {
      alert("質問と回答を入力してください。");
      return;
    }

    const { error } = await supabase
      .from("interview_notes")
      .insert({
        company_id: companyId,
        question,
        answer,
        memo,
      });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("面接メモを保存しました！");

    setQuestion("");
    setAnswer("");
    setMemo("");

    fetchNotes();
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        🎤 面接メモ
      </h2>

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
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          保存
        </button>

      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-4">
        📋 保存済み面接メモ
      </h3>

      {notes.length === 0 ? (
        <p className="text-gray-500">
          まだ保存されていません。
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border rounded-lg p-4"
            >
              <h4 className="font-bold text-lg">
                Q. {note.question}
              </h4>

              <p className="mt-2 whitespace-pre-wrap">
                <strong>回答：</strong>
                {note.answer}
              </p>

              {note.memo && (
                <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                  <strong>メモ：</strong>
                  {note.memo}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}