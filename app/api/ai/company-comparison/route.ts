import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // AI企業分析結果を取得
    const { data: companyLearning } = await supabase
      .from("company_learning")
      .select(`
        *,
        companies (
          company_name,
          industry,
          status
        )
      `)
      .eq("user_id", userId);

    console.log(companyLearning);

    // AIが読みやすい文章へ変換
    const learningText = (companyLearning ?? [])
      .map(
        (item: any) => `
=========================

会社名: ${item.companies?.company_name}

業界: ${item.companies?.industry}

選考状況: ${item.companies?.status}

AI企業分析:
${item.analysis}
`
      )
      .join("\n");

    // AIへ送るプロンプト
    const prompt = `
あなたはCareer Compass専属AIキャリアアナリストです。

以下はユーザーが応募した企業ごとの分析結果です。

${learningText}

これらを比較分析してください。

## 通過しやすい企業の特徴

## 苦手な企業の特徴

## 共通して評価されている強み

## 共通する改善点

## 次に応募すべき企業

## 今後1か月の就活戦略

企業ごとの違いも比較しながら、
具体的に回答してください。
`;

    // OpenAIへ送信
    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    // 結果を返す
    return NextResponse.json({
      comparison: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "企業比較分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}