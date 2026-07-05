import { supabase } from "@/lib/supabase";
import { askAI } from "./ai.service";

export async function analyzeInterview(
  question: string,
  answer: string
) {
  const prompt = `
あなたは就職活動専門の面接官です。

以下の回答を100点満点で採点してください。

【質問】
${question}

【回答】
${answer}

以下の形式で返してください。

【総合評価】

【良かった点】

【改善点】

【模範回答】
`;

  return await askAI(prompt);
}

export async function saveInterviewPractice(
  companyId: string,
  question: string,
  answer: string,
  feedback: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("ログインしてください");

  const { error } = await supabase
    .from("interview_practice")
    .insert({
      company_id: companyId,
      user_id: user.id,
      question,
      answer,
      feedback,
    });

  if (error) throw error;
}

export async function fetchInterviewPractice(
  companyId: string
) {
  const { data, error } = await supabase
    .from("interview_practice")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}