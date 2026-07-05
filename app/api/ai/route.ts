import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "promptがありません。" },
        { status: 400 }
      );
    }

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
        error: "AIとの通信に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}