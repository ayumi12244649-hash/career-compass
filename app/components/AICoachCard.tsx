"use client";

import { useEffect, useState } from "react";

export default function AICoachCard() {
  const [comment, setComment] = useState("読み込み中...");

  useEffect(() => {
    async function loadComment() {
      try {
        const res = await fetch("/api/ai/coach", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyId: "a55bfa65-a15d-412c-b5ef-40b664903a9c",
            message: "今日の就活アドバイスをください。",
          }),
        });

        const data = await res.json();

console.log(data);
setComment(data.comment);
        
      } catch (error) {
        console.error(error);
        setComment("AIコーチコメントを取得できませんでした。");
      }
    }

    loadComment();
  }, []);

  return (
    <div className="rounded-xl bg-white shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        🤖 AIコーチより
      </h2>

      <p className="leading-8 text-slate-700">
        {comment}
      </p>
    </div>
  );
}