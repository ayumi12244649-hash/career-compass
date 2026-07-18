import { supabase } from "@/lib/supabase";

import type { CompanyResearch } from "@/types/company-research";

/**
 * 企業研究を取得
 */
export async function fetchCompanyResearch(companyId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてください。");
  }

  const { data, error } = await supabase
    .from("company_research")
    .select("*")
    .eq("company_id", companyId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data as CompanyResearch | null;
}

/**
 * 企業研究を保存
 */
export async function saveCompanyResearch(
  values: Omit<
    CompanyResearch,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("company_research")
    .insert(values)
    .select()
    .single();

  if (error) throw error;

  return data as CompanyResearch;
}

/**
 * 企業研究を更新
 */
export async function updateCompanyResearch(
  id: string,
  values: Partial<CompanyResearch>
) {
  const { error } = await supabase
    .from("company_research")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}

/**
 * 企業研究を削除
 */
export async function deleteCompanyResearch(id: string) {
  const { error } = await supabase
    .from("company_research")
    .delete()
    .eq("id", id);

  if (error) throw error;
}