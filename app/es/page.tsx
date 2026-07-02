"use client";

import { useState } from "react";

export default function ESPage() {
  const [esText, setEsText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReview() {
    if (!esText.trim()) {
      alert("ESを入力してください。");
      return;
    }

    setLoading(true);
    setResult("AIが添削中です...");

    try {
      const res = await fetch("/api/ai/es", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          es: esText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "AI添削に失敗しました。");
        setLoading(false);
        return;
      }

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("通信エラーが発生しました。");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          🤖 AI ES添削
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <label className="block text-xl font-bold mb-4">
            ESを入力
          </label>

          <textarea
            value={esText}
            onChange={(e) => setEsText(e.target.value)}
            rows={12}
            className="w-full border rounded-xl p-4 resize-none"
            placeholder="自己PR・志望動機などを入力してください"
          />

          <button
            onClick={handleReview}
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl"
          >
            {loading ? "🤖 添削中..." : "🤖 AI添削する"}
          </button>

        </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI添削結果
          </h2>

          {result ? (
            <div className="whitespace-pre-wrap leading-8 border rounded-xl p-4 bg-slate-50">
              {result}
            </div>
          ) : (
            <p className="text-slate-400">
              添削結果はここに表示されます。
            </p>
          )}

        </div>

      </div>
    </main>
  );
}