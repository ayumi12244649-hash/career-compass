import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

import { buildCompanyResearchPrompt } from "@/lib/ai/prompts/companyResearch.prompt";
import { companyResearchSchema } from "@/lib/ai/schemas/companyResearch.schema";
import { CompanyResearch } from "@/types/company-research";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    console.log("🔥 NEW COMPANY RESEARCH API");
    // ① company取得
    const { companyId } = await req.json();

    const { data: company, error: companyError } = await supabaseAdmin
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (companyError || !company) {
      throw new Error("企業情報が見つかりません。");
    }

    // ② ES取得
    const { data: entrySheets } = await supabaseAdmin
      .from("entry_sheets")
      .select("*")
      .eq("company_id", companyId);

    // ③ 面接取得
    const { data: interviews } = await supabaseAdmin
      .from("interviews")
      .select("*")
      .eq("company_id", companyId);

    // ④ 不採用分析取得
    const { data: rejectionReports } = await supabaseAdmin
      .from("rejection_reports")
      .select("*")
      .eq("company_id", companyId);

    // ⑤ Prompt生成
    const prompt = buildCompanyResearchPrompt({
      company,
      entrySheets: entrySheets ?? [],
      interviews: interviews ?? [],
      rejectionReports: rejectionReports ?? [],
    });

    // ⑥ OpenAIで企業研究
    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          ...companyResearchSchema,
        },
      },
    });
console.log("===== OUTPUT_TEXT =====");
console.log(response.output_text);

    const research = JSON.parse(
      response.output_text
    ) as CompanyResearch;

console.log("===== RESEARCH =====");
console.log(research);

    // ⑦ Supabaseへ保存
    const { error: saveError } = await supabaseAdmin
      .from("company_research")
      .upsert(
        {
          company_id: companyId,

          summary: research.summary,
          business: research.business,
          culture: research.culture,
          ideal_candidate: research.ideal_candidate,

          strengths: research.strengths,
          weaknesses: research.weaknesses,
          application_points: research.application_points,
          interview_questions: research.interview_questions,
          reverse_questions: research.reverse_questions,
        },
        {
          onConflict: "company_id",
        }
      );

       if (saveError) {
  console.error("SAVE ERROR:", saveError);

  return NextResponse.json(
    {
      error: saveError.message,
      detail: saveError,
    },
    {
      status: 500,
    }
  );
}

    console.log(research);

    return NextResponse.json(research);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "企業研究に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}