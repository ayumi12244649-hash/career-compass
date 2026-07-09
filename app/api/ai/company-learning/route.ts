import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    // 企業
    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    // ES
    const { data: entrySheets } = await supabase
      .from("entry_sheets")
      .select("*")
      .eq("company_id", companyId);

    // 面接
    const { data: interviews } = await supabase
      .from("interviews")
      .select("*")
      .eq("company_id", companyId);

    // 不採用分析
    const { data: rejectionReports } = await supabase
      .from("rejection_reports")
      .select("*")
      .eq("company_id", companyId);

    console.log(company);
    console.log(entrySheets);
    console.log(interviews);
    console.log(rejectionReports);

    const esText = (entrySheets ?? [])
  .map(
    (es) => `
タイトル: ${es.title}

内容:
${es.content}

AI添削:
${es.review_result ?? "なし"}
`
  )
  .join("\n");

const interviewText = (interviews ?? [])
  .map(
    (interview) => `
質問:
${interview.question}

回答:
${interview.answer}

メモ:
${interview.memo ?? "なし"}
`
  )
  .join("\n");

const rejectionText = (rejectionReports ?? [])
  .map(
    (report) => `
理由:
${report.reason ?? "なし"}

改善点:
${report.improvement ?? "なし"}
`
  )
  .join("\n");

const prompt = `
あなたはCareer Compass専属のAI企業分析官です。

以下は一人のユーザーの就職活動データです。

【企業】
会社名: ${company?.company_name}
業界: ${company?.industry}
選考状況: ${company?.status}

【ES】
${esText}

【面接】
${interviewText}

【不採用分析】
${rejectionText}

以下を分析してください。

## この企業が評価する人物像

## ESで重視されるポイント

## 面接傾向

## この企業で評価される強み

## 改善すべき点

## 次回この企業を受けるなら何を改善すべきか

具体的に回答してください。
`;

const response = await client.responses.create({
  model: "gpt-5.5",
  input: prompt,
});

await supabase
  .from("company_learning")
  .insert({
    company_id: companyId,
    user_id: company?.user_id,
    analysis: response.output_text,
  });

return NextResponse.json({
  analysis: response.output_text,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "企業分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}