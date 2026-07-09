import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // 企業取得
    const { data: companies } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", userId);

    // company_id一覧
    const companyIds = (companies ?? []).map((c) => c.id);

    // ES取得
    const { data: entrySheets } = await supabase
      .from("entry_sheets")
      .select("*")
      .in("company_id", companyIds);

    console.log("Companies:", companies);
    console.log("ES:", entrySheets);

    const companiesText = (companies ?? [])
      .map(
        (company) => `
会社名: ${company.company_name}
業界: ${company.industry}
選考状況: ${company.status}
`
      )
      .join("\n");

    const esText = (entrySheets ?? [])
      .map(
        (es) => `
=========================
タイトル: ${es.title}

内容:
${es.content}

AI添削:
${es.review_result ?? "なし"}
`
      )
      .join("\n");

    const prompt = `
あなたはCareer Compass専属のAI ES分析官です。

以下はユーザーがこれまで作成したESです。

【応募企業】
${companiesText}

【ES一覧】
${esText}

以下を分析してください。

## ES全体の傾向

## よく使う強み

## 志望動機の傾向

## 改善された点

## 改善されていない点

## 次のESで意識すること

できるだけ具体的に回答してください。
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    return NextResponse.json({
      analysis: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "ES分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}