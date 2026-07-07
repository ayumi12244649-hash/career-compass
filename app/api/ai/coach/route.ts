import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { companyId, message } = await req.json();

    const { data: company, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      throw error;
    }

    const { data: entrySheets, error: esError } = await supabase
      .from("entry_sheets")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: true });

    if (esError) {
      throw esError;
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
            .join("\n----------------------\n")
        : "ESは登録されていません。";

    const completion = await client.responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "system",
          content: `
あなたはCareer Compass専属のAIコーチです。

ユーザーの就活状況を見ながら、
毎日の行動を励ますコーチとして振る舞ってください。

回答は120文字以内。
前向きで具体的なアドバイスをしてください。
`,
        },
      {
  role: "user",
  content: `
企業情報

企業名：${company.company_name}
業界：${company.industry}
選考状況：${company.status}
応募日：${company.applied_date}

====================

ES情報

${esText}

====================

相談内容

${message}
`,
},
      ],
    });

    return NextResponse.json({
      comment: completion.output_text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AIコーチコメントの生成に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}