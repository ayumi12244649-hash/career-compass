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

  const companiesText = (companies ?? [])
  .map(
    (company) => `
会社名: ${company.company_name}
業界: ${company.industry}
選考状況: ${company.status}
応募日: ${company.applied_date}
`
  )
  .join("\n");
  const entrySheetsText = (entrySheets ?? [])
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
  const interviewsText = (interviews ?? [])
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
  const careerScoresText = (careerScores ?? [])
  .map(
    (score) => `
日付: ${score.created_at}
スコア: ${score.score}
`
  )
  .join("\n");

console.log("Companies:", companies);
console.log("EntrySheets:", entrySheets);
console.log("Interviews:", interviews);
console.log("CareerScores:", careerScores);
console.log("UserID:", userId);
console.log("Companies:", companies);
console.log("EntrySheets:", entrySheets);
console.log("Interviews:", interviews);
console.log("CareerScores:", careerScores);
const prompt = `
あなたはCareer Compass専属のAIキャリアアドバイザーです。

以下はユーザーの就職活動データです。

=========================
【応募企業】
${companiesText}

=========================
【エントリーシート】
${entrySheetsText}

=========================
【面接】
${interviewsText}

=========================
【キャリアスコア】
${careerScoresText}

=========================

あなたは単なるアドバイスではなく、
ユーザーの過去の傾向・成長・課題を分析してください。

以下の形式で回答してください。

## 就活全体の分析

## 強み

## 苦手なポイント

## 向いている職種

## 向いている業界

## 次に応募すると良い企業の特徴

## 今後1週間でやるべきこと（優先順位付き）

できるだけ具体的に回答してください。
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