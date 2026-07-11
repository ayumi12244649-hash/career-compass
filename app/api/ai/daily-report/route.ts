import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    // 最新のGrowth Snapshot取得
    const { data: snapshot, error } = await supabase
      .from("growth_snapshots")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!snapshot) {
  return NextResponse.json({
    report: "まだ十分なデータがありません。ESや面接を登録するとAIレポートが表示されます。",
  });
}

    const prompt = `
あなたはCareer Compass専属AIキャリアコーチです。

現在の就活状況

ES：${snapshot.es_count}
面接：${snapshot.interview_count}
Mission：${snapshot.mission_count}
AI相談：${snapshot.mentor_count}

200文字以内で

・今日の成長
・褒めること
・明日やること

を書いてください。
`;

    const completion = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const report = completion.output_text;

    const { error: insertError } = await supabase
      .from("daily_reports")
      .insert({
        company_id: companyId,
        report,
      });

    if (insertError) {
      console.error(insertError);

      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      report,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "AI Daily Report生成失敗",
      },
      {
        status: 500,
      }
    );
  }
}