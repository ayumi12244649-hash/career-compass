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
  careerScore,
  growth,
  missions,
  companyStatus,
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

あなたはCareer Compass専属AIです。

最優先はユーザーが内定を獲得することです。

次の情報から

・締切
・選考状況
・ESの完成度
・面接予定
・Career Score
・成長状況

を分析してください。

重要度の高い順に5件提案してください。

優先順位は

高
中
低

のみ使用してください。

due_typeは

今日
今週
今月

のみ使用してください。

同じ内容を繰り返さないでください。

ユーザーが今すぐ行動できる内容だけ返してください。

JSON以外は絶対に出力しないでください。
Markdownも説明文も不要です。


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
  ],
  "summary": "今日はES提出を最優先にしてください。",
  "motivation": "一歩ずつ進めば内定に近づきます！"
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
console.log(text);

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