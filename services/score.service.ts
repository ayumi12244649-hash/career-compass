import { supabase } from "@/lib/supabase";

export async function saveCareerScore(score: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("career_scores")
    .insert({
      user_id: user.id,
      score,
    });

  if (error) {
    console.error(error);
  }
}

export async function fetchCareerScores() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("career_scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}