import { supabase } from "@/lib/supabase";

export type GrowthSnapshot = {
  id: string;
  company_id: string;
  es_count: number;
  interview_count: number;
  mission_count: number;
  mentor_count: number;
  created_at: string;
};

/**
 * 最新2件取得
 */
export async function fetchLatestSnapshots(
  companyId: string
) {
  const { data, error } = await supabase
    .from("growth_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: false,
    })
    .limit(2);

  if (error) throw error;

  return data as GrowthSnapshot[];
}

/**
 * 成長差分計算
 */
export function calculateGrowthDiff(
  current: GrowthSnapshot,
  previous?: GrowthSnapshot
) {
  if (!previous) {
    return {
      es: 0,
      interview: 0,
      mission: 0,
      mentor: 0,
    };
  }

  return {
    es:
      current.es_count -
      previous.es_count,

    interview:
      current.interview_count -
      previous.interview_count,

    mission:
      current.mission_count -
      previous.mission_count,

    mentor:
      current.mentor_count -
      previous.mentor_count,
  };
}

/**
 * 現在の状態をSnapshotとして保存
 */
export async function saveGrowthSnapshot(
  companyId: string
) {
  // ES件数
  const { count: esCount } =
    await supabase
      .from("entry_sheets")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("company_id", companyId);

  // 面接件数
  const { count: interviewCount } =
    await supabase
      .from("interview_notes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("company_id", companyId);

  // Mission件数
  const { count: missionCount } =
    await supabase
      .from("missions")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("company_id", companyId);

  // Mentor件数
  const { count: mentorCount } =
    await supabase
      .from("mentor_messages")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("company_id", companyId);

  const { data, error } = await supabase
    .from("growth_snapshots")
    .insert({
      company_id: companyId,
      es_count: esCount ?? 0,
      interview_count: interviewCount ?? 0,
      mission_count: missionCount ?? 0,
      mentor_count: mentorCount ?? 0,
    })
    .select();

  console.log("Snapshot Insert:", data);

  if (error) {
    console.error("Snapshot Error:", error);
    throw error;
  }
}
/**
 * 成長履歴を取得
 */
export async function fetchGrowthHistory(
  companyId: string
) {
  const { data, error } = await supabase
    .from("growth_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data as GrowthSnapshot[];
}