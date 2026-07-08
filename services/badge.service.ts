import { supabase } from "@/lib/supabase";

export type Badge = {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
};

export type UserBadge = {
  id: string;
  company_id: string;
  badge_code: string;
  unlocked_at: string;
};

/**
 * 全バッジ取得
 */
export async function fetchBadges() {
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .order("created_at");

  if (error) throw error;

  return data as Badge[];
}

/**
 * 獲得済みバッジ取得
 */
export async function fetchUserBadges(
  companyId: string
) {
  const { data, error } = await supabase
    .from("user_badges")
    .select("*")
    .eq("company_id", companyId);

  if (error) throw error;

  return data as UserBadge[];
}

/**
 * バッジ付与
 */
export async function unlockBadge(
  companyId: string,
  badgeCode: string
) {
  const { data } = await supabase
    .from("user_badges")
    .select("id")
    .eq("company_id", companyId)
    .eq("badge_code", badgeCode)
    .maybeSingle();

  if (data) return;

  const { error } = await supabase
    .from("user_badges")
    .insert({
      company_id: companyId,
      badge_code: badgeCode,
    });

  if (error) throw error;
}
import { fetchLatestSnapshots } from "./growth.service";

/**
 * バッジ判定
 */
export async function checkBadges(
  companyId: string
) {
  const snapshots =
    await fetchLatestSnapshots(companyId);

  if (snapshots.length === 0) return;

  const latest = snapshots[0];

  const score =
    latest.es_count * 3 +
    latest.interview_count * 5 +
    latest.mission_count +
    latest.mentor_count * 0.2;

  if (latest.es_count >= 1) {
    await unlockBadge(companyId, "first_es");
  }

  if (latest.es_count >= 5) {
    await unlockBadge(companyId, "es_5");
  }

  if (latest.interview_count >= 3) {
    await unlockBadge(companyId, "interview_3");
  }

  if (latest.mission_count >= 10) {
    await unlockBadge(companyId, "mission_10");
  }

  if (latest.mentor_count >= 20) {
    await unlockBadge(companyId, "mentor_20");
  }

  if (score >= 20) {
    await unlockBadge(companyId, "growth_20");
  }

  if (score >= 100) {
    await unlockBadge(companyId, "growth_100");
  }
}