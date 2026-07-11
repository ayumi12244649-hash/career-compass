import { NextResponse } from "next/server";

import { buildContext } from "@/lib/ai/buildContext";
import { generateMentorReply } from "@/lib/ai/generateMentorReply";
import { saveMissions } from "@/lib/ai/saveMissions";
import { updateMemory } from "@/lib/ai/updateMemory";
import { buildMentorPrompt } from "./buildMentorPrompt";
import { saveGrowthSnapshot } from "@/services/growth.service";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { companyId, message } = await req.json();

   const context = await buildContext(companyId);

const prompt = await buildMentorPrompt(
  companyId,
  context
);

const reply = await generateMentorReply(
  prompt,
  message
);


try {
  await saveMissions(companyId, reply);
} catch (e) {
  console.error("saveMissions", e);
}

try {
  await updateMemory(companyId);
} catch (e) {
  console.error("updateMemory", e);
}

try {
  await saveGrowthSnapshot(companyId);
} catch (e) {
  console.error("saveGrowthSnapshot", e);
}

try {
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
} catch (e) {
  console.error("mentor_messages", e);
}
  
    // JSON部分だけ画面表示から除外
    const cleanReply = reply.replace(
      /\{[\s\S]*"missions"[\s\S]*\}\s*$/,
      ""
    ).trim();

    return NextResponse.json({
      reply: cleanReply,
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