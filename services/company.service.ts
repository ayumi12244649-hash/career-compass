import { supabase } from "@/lib/supabase";
import type { Company } from "@/types/company";

export async function fetchCompany(id: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Company;
}

export async function fetchCompanies() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Company[];
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