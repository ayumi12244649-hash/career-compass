import { supabase } from "@/lib/supabase";

export async function analyzeRejection(
  companyName: string,
  reason: string
) {
  const response = await fetch("/api/ai/rejection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName,
      reason,
    }),
  });

  if (!response.ok) {
    throw new Error("AI分析に失敗しました。");
  }

  const data = await response.json();

  return data.result as string;
}

export async function saveRejectionReport(
  companyId: string,
  reason: string,
  analysis: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてください。");
  }

  const { error } = await supabase
    .from("rejection_reports")
    .insert({
      company_id: companyId,
      user_id: user.id,
      reason,
      analysis,
    });

  if (error) {
    throw error;
  }
}