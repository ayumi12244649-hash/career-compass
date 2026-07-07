import { fetchRecentMessages } from "@/services/mentor.service";

export async function buildMentorPrompt(
  companyId: string,
  memory: string
) {
  const messages =
    await fetchRecentMessages(companyId);

  const history = messages
    .map(
      (m) =>
        `${m.role === "user" ? "ユーザー" : "AI"}：${m.message}`
    )
    .join("\n");

  return `
==========================
AI Memory
==========================

${memory}

==========================
最近の会話
==========================

${history}

==========================
会話ルール
==========================

・前回の会話を覚えている前提で話してください。
・同じ説明は繰り返さない。
・以前のアドバイスとのつながりを意識する。
・成長を褒めながら伴走してください。
`;
}