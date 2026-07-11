import { NextResponse } from "next/server";

import { buildContext } from "@/lib/ai/buildContext";
import { generateMentorReply } from "@/lib/ai/generateMentorReply";
import { saveMissions } from "@/lib/ai/saveMissions";
import { updateMemory } from "@/lib/ai/updateMemory";

import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    console.log("① Mentor API Start");

    const { companyId, message } =
      await req.json();

    console.log("② Request OK", companyId, message);

    const context =
      await buildContext(companyId);

    console.log("③ Context OK");

    const reply =
      await generateMentorReply(
        context,
        message
      );

    console.log("④ Reply OK");

    await saveMissions(
      companyId,
      reply
    );

    console.log("⑤ Mission Saved");

    await updateMemory(
      companyId
    );

    console.log("⑥ Memory Updated");

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

    console.log("⑦ Messages Saved");

    return NextResponse.json({
      reply,
    });

  } catch (error) {
    console.error("Mentor Error:", error);

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