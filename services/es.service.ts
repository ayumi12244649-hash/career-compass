import { supabase } from "@/lib/supabase";
import type { EntrySheet } from "@/types/es";

export async function fetchEntrySheets(companyId: string) {
  const { data, error } = await supabase
    .from("entry_sheets")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as EntrySheet[];
}

export async function saveEntrySheet(
  companyId: string,
  title: string,
  content: string
) {
  const { error } = await supabase
    .from("entry_sheets")
    .insert({
      company_id: companyId,
      title,
      content,
    });

  if (error) throw error;
}

export async function updateEntrySheet(
  id: string,
  title: string,
  content: string
) {
  const { error } = await supabase
    .from("entry_sheets")
    .update({
      title,
      content,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteEntrySheet(id: string) {
  const { error } = await supabase
    .from("entry_sheets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function saveReviewResult(
  id: string,
  reviewResult: string
) {
  const { error } = await supabase
    .from("entry_sheets")
    .update({
      review_result: reviewResult,
    })
    .eq("id", id);

  if (error) throw error;
}
export async function fetchEntrySheetCount(
  companyId: string
) {
  const { count, error } = await supabase
    .from("entry_sheets")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("company_id", companyId);

  if (error) throw error;

  return count ?? 0;
}