import { supabase } from "@/lib/supabase";
import type { InterviewNote } from "@/types/interview";

export async function fetchInterviewNotes(companyId: string) {
  const { data, error } = await supabase
    .from("interview_notes")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as InterviewNote[];
}

export async function saveInterviewNote(
  companyId: string,
  question: string,
  answer: string,
  memo: string
) {
  const { error } = await supabase
    .from("interview_notes")
    .insert({
      company_id: companyId,
      question,
      answer,
      memo,
    });

  if (error) throw error;
}

export async function updateInterviewNote(
  id: string,
  question: string,
  answer: string,
  memo: string
) {
  const { error } = await supabase
    .from("interview_notes")
    .update({
      question,
      answer,
      memo,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteInterviewNote(id: string) {
  const { error } = await supabase
    .from("interview_notes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function saveInterviewReview(
  id: string,
  review: string
) {
  const { error } = await supabase
    .from("interview_notes")
    .update({
      ai_review: review,
    })
    .eq("id", id);

  if (error) throw error;
}
export async function fetchInterviewCount(
  companyId: string
) {
  const { count, error } = await supabase
    .from("interview_notes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("company_id", companyId);

  if (error) throw error;

  return count ?? 0;
}