import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      company,
      status,
      esCount,
      interviewCount,
      memo,
    } = await req.json();

    const prompt = `
あなたはCareer Compass専属のAI就活アナリストです。

以下の情報を分析してください。

【企業名】
${company}

【現在の選考状況】
${status}

【ES件数】
${esCount}

【面接件数】
${interviewCount}

【メモ】
${memo || "なし"}

以下の形式で回答してください。

## 総合評価
100点満点で評価してください。

## 現在の状況

## 強み

## 改善点

## 次にやること
3つ

## 通過率予測
○%
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const result = response.output_text;
        return NextResponse.json({
      success: true,
      analysis: result,
    });

  } catch (error) {
    console.error("Company Analysis Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "AI分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}