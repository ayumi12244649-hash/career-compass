import { supabase } from "@/lib/supabase";
import type { AIReport } from "@/types/aiReport";

export async function saveAIReport(
  report: string,
  score: number,
  companyCount: number,
  esCount: number,
  interviewCount: number
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてください。");
  }

  const { error } = await supabase
    .from("ai_reports")
    .insert({
      user_id: user.id,
      report,
      score,
      company_count: companyCount,
      es_count: esCount,
      interview_count: interviewCount,
    });

  if (error) throw error;
}

export async function fetchAIReports() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("ai_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as AIReport[];
}

export async function fetchLatestAIReport() {
  const reports = await fetchAIReports();

  return reports.length > 0 ? reports[0] : null;
}