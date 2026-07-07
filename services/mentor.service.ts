import { supabase } from "@/lib/supabase";
import type { MentorMessage } from "@/types/mentor";

/**
 * メッセージ一覧取得
 */
export async function fetchMessages(companyId: string) {
  const { data, error } = await supabase
    .from("mentor_messages")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data as MentorMessage[];
}

/**
 * メッセージ保存
 */
export async function saveMessage(
  message: Omit<MentorMessage, "id" | "created_at">
) {
  const { error } = await supabase
    .from("mentor_messages")
    .insert(message);

  if (error) throw error;
}

/**
 * AIメンターへ質問
 */
export async function askMentor(
  companyId: string,
  message: string
) {
  const res = await fetch("/api/ai/mentor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyId,
      message,
    }),
  });

  if (!res.ok) {
    throw new Error("AIメンターへの問い合わせに失敗しました。");
  }

  return await res.json();
}