import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // 企業
    const { data: companies } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", userId);

    // company_id一覧
    const companyIds = (companies ?? []).map((c) => c.id);

    // ES
    const { data: entrySheets } = await supabase
      .from("entry_sheets")
      .select("*")
      .in("company_id", companyIds);

    // 面接
    const { data: interviews } = await supabase
      .from("interviews")
      .select("*")
      .in("company_id", companyIds);

    // キャリアスコア
    const { data: careerScores } = await supabase
      .from("career_scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: true,
      });

    // AI企業分析
    const { data: companyLearning } = await supabase
      .from("company_learning")
      .select("*")
      .eq("user_id", userId);

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

    const scoreText = (careerScores ?? [])
      .map(
        (score) => `
日付: ${score.created_at}
スコア: ${score.score}
`
      )
      .join("\n");

    const learningText = (companyLearning ?? [])
      .map(
        (item) => `
${item.analysis}
`
      )
      .join("\n");

    const allData = `
【応募企業】
${companiesText}

【ES】
${esText}

【面接】
${interviewText}

【キャリアスコア】
${scoreText}

【企業分析】
${learningText}
`;

    const prompt = `
あなたはCareer Compass専属AIキャリアアナリストです。

以下の就活データを分析してください。

${allData}

必ずJSON形式のみで回答してください。

{
  "score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "industries": [],
  "actions": []
}

scoreは0〜100の整数で評価してください。

評価基準

90〜100：内定レベル

80〜89：かなり良い

70〜79：平均以上

60〜69：改善が必要

0〜59：大幅な改善が必要

JSON以外の文章は一切出力しないでください。

`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const result = JSON.parse(response.output_text);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI Intelligence取得失敗",
      },
      {
        status: 500,
      }
    );
  }
}