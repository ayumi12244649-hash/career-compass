import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { es } = await req.json();

    if (!es) {
      return NextResponse.json(
        { error: "ES内容がありません。" },
        { status: 400 }
      );
    }

    const prompt = `
あなたは就職活動のプロです。

以下のESを添削してください。

【総合評価】
【良い点】
【改善点】
【改善後の例文】

ES:
${es}
`;

    const response = await client.responses.create({
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
        error: "AI添削に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}