import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();
// 企業情報取得
const { data: company, error: companyError } = await supabase
  .from("companies")
  .select("*")
  .eq("id", companyId)
  .single();

if (companyError) {
  throw companyError;
}
// ES取得
const { data: entrySheets, error: esError } = await supabase
  .from("entry_sheets")
  .select("*")
  .eq("company_id", companyId)
  .order("created_at", { ascending: true });

if (esError) {
  throw esError;
}
// 面接メモ取得
const { data: interviews, error: interviewError } = await supabase
  .from("interview_notes")
  .select("*")
  .eq("company_id", companyId)
  .order("created_at", { ascending: true });

if (interviewError) {
  throw interviewError;
}
// 不採用分析取得
const { data: rejectionReports, error: rejectionError } = await supabase
  .from("rejection_reports")
  .select("*")
  .eq("company_id", companyId)
  .order("created_at", { ascending: true });

if (rejectionError) {
  throw rejectionError;
}
// AIメンター履歴取得
const { data: mentorHistory, error: mentorError } = await supabase
  .from("mentor_messages")
  .select("*")
  .eq("company_id", companyId)
  .order("created_at", { ascending: true })
  .limit(20);

if (mentorError) {
  throw mentorError;
}
const esText =
  entrySheets && entrySheets.length > 0
    ? entrySheets
        .map(
          (es, index) => `
ES${index + 1}

タイトル:
${es.title}

内容:
${es.content}

AI添削:
${es.review_result ?? "なし"}
`
        )
        .join("\n-------------------------\n")
    : "ESは登録されていません。";
    const interviewText =
  interviews && interviews.length > 0
    ? interviews
        .map(
          (note, index) => `
面接メモ${index + 1}

タイトル:
${note.title}

内容:
${note.content}
`
        )
        .join("\n-------------------------\n")
    : "面接メモは登録されていません。";
    const rejectionText =
  rejectionReports && rejectionReports.length > 0
    ? rejectionReports
        .map(
          (report, index) => `
不採用分析${index + 1}

内容:
${report.content}
`
        )
        .join("\n-------------------------\n")
    : "不採用分析は登録されていません。";
 const mentorHistoryText =
  mentorHistory && mentorHistory.length > 0
    ? mentorHistory
        .map(
          (chat) => `
${chat.role === "user" ? "ユーザー" : "AI"}

${chat.message}
`
        )
        .join("\n-------------------------\n")
    : "相談履歴はありません。";

const completion = await client.responses.create({
  model: "gpt-5.5",
  input: [
    {
      role: "system",
      content: `
あなたはCareer CompassのAI Memoryです。

あなたの仕事は就活状況を要約することです。

以下の形式で出力してください。

【現在の目標】
...

【現在の強み】
...

【現在の課題】
...

【最近の成長】
...

【次に優先すること】
...

300文字以内でまとめてください。
`,
    },
    {
      role: "user",
      content: `
企業情報

企業名：${company.company_name}
業界：${company.industry}
選考状況：${company.status}

====================

ES

${esText}

====================

面接メモ

${interviewText}

====================

不採用分析

${rejectionText}

====================

相談履歴

${mentorHistoryText}
`,
    },
  ],
});

const summary = completion.output_text;

const { error: saveError } = await supabase
  .from("ai_memory")
  .upsert(
    {
      company_id: companyId,
      summary,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "company_id",
    }
  );

if (saveError) {
  throw saveError;
}

  mentorHistory && mentorHistory.length > 0
    ? mentorHistory
        .map(
          (chat) => `
${chat.role === "user" ? "ユーザー" : "AI"}

${chat.message}
`
        )
        .join("\n-------------------------\n")
    : "相談履歴はありません。";
     
    return NextResponse.json({
  summary,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Memory生成に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}