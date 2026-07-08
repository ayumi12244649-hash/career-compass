import { supabase } from "@/lib/supabase";

export type DailyReport = {
  id: string;
  company_id: string;
  report: string;
  created_at: string;
};

/**
 * AI Daily Report生成
 */
export async function generateDailyReport(
  companyId: string
) {
  const res = await fetch("/api/ai/daily-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error ?? "AI Daily Report生成失敗"
    );
  }

  return data;
}

/**
 * 最新レポート取得
 */
export async function fetchLatestDailyReport(
  companyId: string
) {
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data as DailyReport | null;
}