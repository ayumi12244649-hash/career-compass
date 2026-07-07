import { supabase } from "@/lib/supabase";

export async function fetchMemory(companyId: string) {
  const { data, error } = await supabase
    .from("ai_memory")
    .select("*")
    .eq("company_id", companyId)
    .single();

  if (error) throw error;

  return data;
}