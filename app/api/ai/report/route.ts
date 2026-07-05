import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {

  try {

    const {
      companyCount,
      esCount,
      interviewCount,
      score,
    } = await req.json();
        const prompt = `
あなたは就職活動専門のAIキャリアアドバイザーです。

以下の情報を分析してください。

応募企業数：${companyCount}

ES数：${esCount}

面接数：${interviewCount}

Career Score：${score}

以下の形式で回答してください。

【総合評価】

【あなたの強み】

【改善ポイント】

【今週やるべきこと】
`;

    const response =
      await client.responses.create({
        model: "gpt-5.5",
        input: prompt,
      });
          return NextResponse.json({
      result: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}