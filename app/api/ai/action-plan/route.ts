import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
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
あなたはCareer Compass専属AIです。

目的はユーザーを内定へ導くことです。

あなたは優秀なキャリアアドバイザーとして回答してください。

=========================
現在の情報
=========================

【応募企業】
${JSON.stringify(company, null, 2)}

【ES】
${JSON.stringify(entrySheets, null, 2)}

【面接】
${JSON.stringify(interviews, null, 2)}

【AI分析】
${analysis}

【Career Score】
${careerScore}

【成長状況】
${growth}

【今日のMission】
${JSON.stringify(missions, null, 2)}

【企業状況】
${JSON.stringify(companyStatus, null, 2)}

=========================
やること
=========================

次の内容を分析してください。

・応募企業数
・選考状況
・ESの完成度
・面接状況
・Career Score
・成長状況
・今日やるべきこと

以下の条件を守ってください。

① 優先度は
高
中
低

のみ使用すること。

② due_typeは

今日
今週
今月

のみ使用すること。

③ taskは
今すぐ行動できる内容にしてください。

④ 同じ内容は繰り返さないこと。

⑤ summaryは
100文字以内で今日の総評を書くこと。

⑥ motivationは
80文字以内で前向きなメッセージを書くこと。

JSON以外は絶対に出力しないでください。

必ず次の形式で返してください。

{
  "plans": [
    {
      "task": "",
      "priority": "高",
      "due_type": "今日"
    },
    {
      "task": "",
      "priority": "中",
      "due_type": "今週"
    },
    {
      "task": "",
      "priority": "低",
      "due_type": "今月"
    },
    {
      "task": "",
      "priority": "中",
      "due_type": "今週"
    },
    {
      "task": "",
      "priority": "高",
      "due_type": "今日"
    }
  ],

  "summary": "",

  "motivation": ""
}
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
        ],
        "summary": "今日はESのブラッシュアップを優先しましょう。",
        "motivation": "焦らず一歩ずつ積み重ねれば必ず前進できます！"
      }`;

    console.log("===== AI RESPONSE =====");
    console.log(text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
      } catch (error) {

    console.error("===== AI ACTION PLAN ERROR =====");
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
            task: "面接練習を30分行う",
            priority: "中",
            due_type: "今週",
          },
          {
            task: "逆質問を3つ考える",
            priority: "中",
            due_type: "今週",
          },
          {
            task: "企業理念を確認する",
            priority: "低",
            due_type: "今月",
          },
        ],

        summary:
          "AI分析を取得できなかったため、おすすめの就活プランを表示しています。",

        motivation:
          "焦らず一歩ずつ積み重ねれば、必ず内定に近づきます！",
      },
      {
        status: 200,
      }
    );
  }
}