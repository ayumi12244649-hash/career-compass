import { supabase } from "@/lib/supabase";

export async function saveFailureAnalysis(
  companyId: string,
  reason: string,
  weakPoints: string[],
  improvements: string[],
  score: number,
  encouragement: string
) {
  const { error } = await supabase
    .from("failure_analysis")
    .insert({
      company_id: companyId,
      reason,
      weak_points: weakPoints,
      improvements,
      score,
      encouragement,
    });

  if (error) {
  console.error("Save Failure Analysis:", error);
  throw error;
}
}

export async function fetchFailureAnalysis(
  companyId: string
) {
  const { data, error } = await supabase
    .from("failure_analysis")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}