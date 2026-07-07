import { NextResponse } from "next/server";

import { buildContext } from "@/lib/ai/buildContext";
import { generateMentorReply } from "@/lib/ai/generateMentorReply";
import { saveMissions } from "@/lib/ai/saveMissions";
import { updateMemory } from "@/lib/ai/updateMemory";

import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { companyId, message } =
      await req.json();

    // AIへ渡すContext生成
    const context =
      await buildContext(companyId);

    // AI回答生成
    const reply =
      await generateMentorReply(
        context,
        message
      );
          // Today's Mission保存
    await saveMissions(
      companyId,
      reply
    );

    // AI Memory更新
    await updateMemory(
      companyId
    );

    // チャット履歴保存
    await supabase
      .from("mentor_messages")
      .insert([
        {
          company_id: companyId,
          role: "user",
          message,
        },
        {
          company_id: companyId,
          role: "assistant",
          message: reply,
        },
      ]);
          return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AIメンターの応答に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}