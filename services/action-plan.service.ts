import { supabase } from "@/lib/supabase";
import type { ActionPlan } from "@/types/action-plan";

export async function fetchActionPlans(companyId: string) {
  const { data, error } = await supabase
    .from("action_plans")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data as ActionPlan[];
}

export async function saveActionPlans(
  plans: Omit<ActionPlan, "id" | "created_at">[]
) {
  const { error } = await supabase
    .from("action_plans")
    .insert(plans);

  if (error) throw error;
}

export async function updateActionPlan(
  id: string,
  completed: boolean
) {
  const { error } = await supabase
    .from("action_plans")
    .update({ completed })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteActionPlans(companyId: string) {
  const { error } = await supabase
    .from("action_plans")
    .delete()
    .eq("company_id", companyId);

  if (error) throw error;
}