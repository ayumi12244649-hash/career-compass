import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      company,
      entrySheets,
      interviews,
      careerScore,
      analysis,
    } = await req.json();

    const prompt = `
あなたは一流の就活アドバイザーです。

以下の情報から、不採用になった可能性の高い原因を分析してください。

【企業】
${JSON.stringify(company, null, 2)}

【ES】
${JSON.stringify(entrySheets, null, 2)}

【面接メモ】
${JSON.stringify(interviews, null, 2)}

【Career Score】
${JSON.stringify(careerScore, null, 2)}

【これまでのAI分析】
${JSON.stringify(analysis, null, 2)}

以下のJSON形式のみで返してください。

{
  "reason": "不採用になった可能性の高い理由",
  "weak_points": [
    "改善点1",
    "改善点2",
    "改善点3"
  ],
  "improvements": [
    "次回こうすると良い",
    "改善案2",
    "改善案3"
  ],
  "score": 75,
  "encouragement": "前向きなメッセージ"
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-5.5",
    
      messages: [
        {
          role: "system",
          content:
            "あなたは就職活動専門のキャリアアドバイザーです。分析は具体的かつ建設的に行い、根拠のない断定は避けてください。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
console.log(
  "AI Raw Response:",
  completion.choices[0].message.content
);
    const result = JSON.parse(
      completion.choices[0].message.content ?? "{}"
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failure Analysis Error:", error);

    return NextResponse.json(
      {
        error: "AI分析に失敗しました。",
      },
      {
        status: 500,
      }
    );
  }
}