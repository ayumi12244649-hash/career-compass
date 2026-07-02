"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  companyId: string;
};

type EntrySheet = {
  id: string;
  title: string;
  content: string;
};

export default function ESCard({ companyId }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entrySheets, setEntrySheets] = useState<EntrySheet[]>([]);

  const [reviewResult, setReviewResult] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    fetchEntrySheets();
  }, []);

  async function fetchEntrySheets() {
    const { data, error } = await supabase
      .from("entry_sheets")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setEntrySheets(data ?? []);
  }

  async function saveES() {
    if (!title || !content) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    const { error } = await supabase.from("entry_sheets").insert({
      company_id: companyId,
      title,
      content,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("ESを保存しました！");

    setTitle("");
    setContent("");

    fetchEntrySheets();
  }

  async function handleReview() {
    if (!content) {
      alert("ESを入力してください。");
      return;
    }

    setLoadingReview(true);
    setReviewResult("");

    try {
      const res = await fetch("/api/ai/es", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          es: content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "AI添削に失敗しました。");
        return;
      }

      setReviewResult(data.result);
    } catch (err) {
      console.error(err);
      alert("AI添削に失敗しました。");
    } finally {
      setLoadingReview(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        📝 ES
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="タイトル"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="ESの内容を入力してください"
          className="w-full border rounded p-2 h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-3">

          <button
            onClick={saveES}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            保存
          </button>

          <button
            onClick={handleReview}
            disabled={loadingReview}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loadingReview ? "添削中..." : "🤖 AI添削"}
          </button>

        </div>

        {reviewResult && (

          <div className="bg-green-50 border border-green-300 rounded-lg p-4">

            <h3 className="font-bold text-lg mb-2">
              AI添削結果
            </h3>

            <pre className="whitespace-pre-wrap text-sm">
              {reviewResult}
            </pre>

          </div>

        )}

      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-4">
        📄 保存済みES
      </h3>

      {entrySheets.length === 0 ? (
        <p className="text-gray-500">
          まだ保存されたESはありません。
        </p>
      ) : (
        <div className="space-y-4">

          {entrySheets.map((sheet) => (

            <div
              key={sheet.id}
              className="border rounded-lg p-4"
            >

              <h4 className="font-bold text-lg">
                {sheet.title}
              </h4>

              <p className="whitespace-pre-wrap mt-2 text-gray-700">
                {sheet.content}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}