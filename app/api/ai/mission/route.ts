import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    const { data: company, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      throw error;
    }

    const completion = await client.responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "system",
          content: `
あなたはCareer Compass専属AIコーチです。

ユーザーが今日やるべき就活タスクを3つだけ考えてください。

条件
・1つ15文字程度
・具体的な行動
・今日中に終わる内容
・JSON以外は出力しない

出力形式

[
  "ミッション1",
  "ミッション2",
  "ミッション3"
]
`,
        },
        {
          role: "user",
          content: `
企業名: ${company.company_name}
業界: ${company.industry}
選考状況: ${company.status}
`,
        },
      ],
    });

    return NextResponse.json({
      missions: completion.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "ミッション生成に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}