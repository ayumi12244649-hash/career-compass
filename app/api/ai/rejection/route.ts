import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      companyName,
      reason,
    } = await req.json();

    if (!companyName || !reason) {
      return NextResponse.json(
        {
          error: "会社名と不採用理由を入力してください。",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: `
あなたは就職活動専門のキャリアアドバイザーです。

以下の内容を分析してください。

会社名
${companyName}

不採用理由
${reason}

以下の形式で回答してください。

【考えられる原因】

【改善ポイント】

【次回の対策】

【励ましのメッセージ】
`,
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