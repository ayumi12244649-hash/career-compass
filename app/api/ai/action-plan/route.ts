import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });


  try {
    const {
      company,
      entrySheets,
      interviews,
      analysis,
    } = await req.json();

    const prompt = `
あなたはCareer Compass専属のAI就活メンターです。

以下の情報を分析してください。

【企業】
${company}

【ES】
${entrySheets}

【面接メモ】
${interviews}

【AI分析】
${analysis}

ユーザーが今日やるべき行動を5個考えてください。

必ずJSONのみ返してください。


{
  "plans": [
    {
      "task": "タスク",
      "priority": "高",
      "due_type": "今日"
    },
    {
      "task": "タスク",
      "priority": "中",
      "due_type": "今週"
    },
    {
      "task": "タスク",
      "priority": "低",
      "due_type": "今月"
    },
    {
      "task": "タスク",
      "priority": "中",
      "due_type": "今週"
    },
    {
      "task": "タスク",
      "priority": "高",
      "due_type": "今日"
    }
  ]
}

priorityは必ず
「高」「中」「低」

due_typeは必ず
「今日」「今週」「今月」

のいずれかにしてください。


`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const text =
  response.output_text ??
  `{
    "plans": [
      {
        "task": "企業研究を進める",
        "priority": "高",
        "due_type": "今日"
      },
      {
        "task": "ESを見直す",
        "priority": "高",
        "due_type": "今日"
      },
      {
        "task": "面接対策をする",
        "priority": "中",
        "due_type": "今週"
      },
      {
        "task": "逆質問を考える",
        "priority": "中",
        "due_type": "今週"
      },
      {
        "task": "企業理念を確認する",
        "priority": "低",
        "due_type": "今月"
      }
    ]
  }`;



    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
      plans: [
  {
    task: "企業研究を進める",
    priority: "高",
    due_type: "今日",
  },
  {
    task: "ESを見直す",
    priority: "高",
    due_type: "今日",
  },
  {
    task: "面接対策をする",
    priority: "中",
    due_type: "今週",
  },
  {
    task: "逆質問を考える",
    priority: "中",
    due_type: "今週",
  },
  {
    task: "企業理念を確認する",
    priority: "低",
    due_type: "今月",
  },
],
      },
      { status: 200 }
    );
  }
}