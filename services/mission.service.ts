import { supabase } from "@/lib/supabase";

export type Mission = {
  id: string;
  company_id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

/**
 * ミッション一覧取得
 */
export async function fetchMissions(companyId: string) {
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data as Mission[];
}

/**
 * ミッション追加
 */
export async function createMission(
  companyId: string,
  title: string
) {
  const { error } = await supabase
    .from("missions")
    .insert({
      company_id: companyId,
      title,
    });

  if (error) throw error;
}

/**
 * 完了切り替え
 */
export async function toggleMission(
  id: string,
  completed: boolean
) {
  const { error } = await supabase
    .from("missions")
    .update({
      completed,
    })
    .eq("id", id);

  if (error) throw error;
}