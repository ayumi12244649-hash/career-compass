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

  function parseSections(message: string) {
    const current =
      message.match(/# 📌 現状([\s\S]*?)---/)?.[1]?.trim() ?? "";

    const issue =
      message.match(/# 🔍 課題([\s\S]*?)---/)?.[1]?.trim() ?? "";

    const action =
      message.match(/# 💡 今日の一歩([\s\S]*?)---/)?.[1]?.trim() ?? "";

    const support =
      message
        .match(/# 🌱 応援([\s\S]*)/)?.[1]
        ?.replace(/\{[\s\S]*$/, "")
        .trim() ?? "";

    return {
      current,
      issue,
      action,
      support,
    };
  }

  async function handleSend() {
    if (!text.trim()) return;

    await sendMessage(text);

    setText("");
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

      <div className="mb-10 border-b border-slate-200 pb-6">

        <h2 className="text-3xl font-bold flex items-center gap-3">
          🤖 AIメンター
        </h2>

        <p className="text-gray-500 mt-2">
          あなた専属のAIキャリアコーチが、
          今日やるべきことを整理してサポートします。
        </p>

      </div>
{loading && (
  <div className="flex justify-start">
    <div className="rounded-2xl bg-slate-100 border border-slate-200 px-5 py-4 shadow-sm">

      <div className="flex items-center gap-3">

        <span className="text-xl">🤖</span>

        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
          <span
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

        <span className="text-gray-500">
          AIメンターが入力中...
        </span>

      </div>

    </div>
  </div>
)}
      <div className="space-y-6 max-h-[700px] overflow-y-auto">
              {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "flex justify-end"
                : "w-full"
            }
          >
            {m.role === "assistant" ? (
              (() => {
                const section =
                  parseSections(m.message);

                return (
                  <div className="
w-full
rounded-3xl
border
border-slate-200
bg-slate-50
shadow-md
p-8
animate-[fadeIn_.4s_ease]
">

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex gap-3 mb-8">

  <a
    href="#today-mission"
    className="
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-4
      py-2
      text-sm
      transition
    "
  >
    🎯 Today's Missionを見る
  </a>

</div>

  <h3 className="text-2xl font-bold flex items-center gap-3">
    🤖 AIメンターからの回答
  </h3>

  <span className="text-sm text-slate-500">
    {new Date().toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>

</div>

                    <div className="grid md:grid-cols-2 gap-6">

                      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6 min-h-[220px] shadow-sm">
                        <h4 className="text-lg font-bold text-pink-600 mb-4">
                          📌 現状
                        </h4>

                        <p className="leading-8 whitespace-pre-wrap">
                          {section.current}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 min-h-[220px] shadow-sm">
                        <h4 className="text-lg font-bold text-blue-600 mb-4">
                          🔍 課題
                        </h4>

                        <p className="leading-8 whitespace-pre-wrap">
                          {section.issue}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 min-h-[220px] shadow-sm">
                        <h4 className="text-lg font-bold text-yellow-700 mb-4">
                          💡 今日の一歩
                        </h4>

                        <p className="leading-8 whitespace-pre-wrap">
                          {section.action}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 min-h-[220px] shadow-sm">
                        <h4 className="text-lg font-bold text-green-600 mb-4">
                          🌱 応援
                        </h4>

                        <p className="text-[17px] leading-9 whitespace-pre-wrap text-slate-700">
                          {section.support}
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })()
            ) : (
              <div className="inline-block max-w-[75%] bg-blue-600 text-white rounded-3xl px-6 py-4 shadow-lg">
                <ReactMarkdown>
                  {m.message}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
            <div className="mt-8">

        <label className="block text-xl font-bold mb-4">
          💬 AIへ相談
        </label>

        <textarea
          className="w-full rounded-3xl border border-slate-300 bg-white p-5 text-[17px] leading-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="相談したいことを書いてください..."
        />

        <button
          onClick={handleSend}
          disabled={loading}
        className="mt-5 w-full rounded-3xl bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-200 text-white text-lg font-bold py-5 disabled:bg-gray-400"
        >
          {loading ? (
  <span className="flex items-center justify-center gap-3">
    <span className="h-3 w-3 rounded-full bg-white animate-ping"></span>

    AIが考えています...
  </span>
) : (
  "🚀 AIメンターに相談する"
)}
        </button>

      </div>

    </div>
  );
}