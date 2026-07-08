import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

   // 企業情報取得
const { data: companies } = await supabase
  .from("companies")
  .select("*")
  .eq("user_id", userId);

// ES取得
const { data: entrySheets } = await supabase
  .from("entry_sheets")
  .select("*")
  .eq("user_id", userId);

// 面接取得
const { data: interviews } = await supabase
  .from("interviews")
  .select("*")
  .eq("user_id", userId);

// キャリアスコア取得
const { data: careerScores } = await supabase
  .from("career_scores")
  .select("*")
  .eq("user_id", userId)
  .order("created_at", { ascending: true });

    const prompt = `
あなたはCareer Compass専属のAIキャリアアドバイザーです。

以下の情報を分析してください。

【企業】
${JSON.stringify(companies, null, 2)}

【ES】
${JSON.stringify(entrySheets, null, 2)}

【面接】
${JSON.stringify(interviews, null, 2)}

【キャリアスコア】
${JSON.stringify(careerScores, null, 2)}

以下の形式で回答してください。

## 向いている職種
## 強み
## 改善点
## 今後挑戦すべき業界
## 次にやるべきこと
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    return NextResponse.json({
      recommendation: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "レコメンドの生成に失敗しました。" },
      { status: 500 }
    );
  }
}