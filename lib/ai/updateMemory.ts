import { supabase } from "@/lib/supabase";

export async function updateMemory(
  companyId: string
) {
  try {
    const res = await fetch(
      "http://localhost:3000/api/ai/memory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId,
        }),
      }
    );

    console.log(
      "Memory API Status:",
      res.status
    );

    const text = await res.text();

    console.log(
      "Memory API Response:",
      text
    );
  } catch (error) {
    console.error(
      "Memory更新失敗",
      error
    );
  }
}