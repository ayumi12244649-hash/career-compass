"use client";

import { useState } from "react";
import { useMentor } from "@/hooks/useMentor";
import ReactMarkdown from "react-markdown";

type Props = {
  companyId: string;
  userId: string;
};

export default function MentorChat({
  companyId,
  userId,
}: Props) {
  const { messages, loading, sendMessage } =
    useMentor(companyId, userId);

  const [text, setText] = useState("");

  async function handleSend() {
    if (!text.trim()) return;

    await sendMessage(text);

    setText("");
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        AIメンター
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "text-right"
                : "text-left"
            }
          >
            <div
  className={
    m.role === "user"
      ? "inline-block bg-blue-500 text-white rounded-lg px-4 py-2"
      : "inline-block bg-gray-200 rounded-lg px-4 py-2"
  }
>
  <ReactMarkdown>
    {m.message}
  </ReactMarkdown>
</div>
          </div>
        ))}
      </div>

      <textarea
        className="w-full border rounded-lg p-3"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="相談したいことを書いてください"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "送信中..." : "相談する"}
      </button>
    </div>
  );
}