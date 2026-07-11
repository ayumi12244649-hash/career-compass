import { supabase } from "@/lib/supabase";

import type { Company } from "@/types/company";
import { fetchEntrySheetCount } from "./es.service";
import { fetchInterviewCount } from "./interview.service";

export async function fetchCompany(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("ログインしてください。");
  }

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  return data as Company;
}

export async function fetchCompanies() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  const companies = (data ?? []) as Company[];

  const companiesWithStats = await Promise.all(
    companies.map(async (company) => {
      const esCount =
        await fetchEntrySheetCount(company.id);

      const interviewCount =
        await fetchInterviewCount(company.id);

      const aiScore = Math.min(
        50 + esCount * 10 + interviewCount * 15,
        100
      );

      return {
        ...company,
        esCount,
        interviewCount,
        aiScore,
      };
    })
  );

  return companiesWithStats;
}
 
export async function updateCompany(
  id: string,
  values: Partial<Company>
) {
  const { error } = await supabase
    .from("companies")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteCompany(id: string) {
  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) throw error;
}