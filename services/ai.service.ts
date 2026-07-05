export async function reviewES(es: string) {
  const response = await fetch("/api/ai/es", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      es,
    }),
  });

  if (!response.ok) {
    throw new Error("AI添削に失敗しました。");
  }

  const data = await response.json();

  return data.result as string;
}

export async function generateReport(
  companyCount: number,
  esCount: number,
  interviewCount: number,
  score: number
) {
  const response = await fetch("/api/ai/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyCount,
      esCount,
      interviewCount,
      score,
    }),
  });

  if (!response.ok) {
    throw new Error("AI分析に失敗しました。");
  }

  const data = await response.json();

  return data.result as string;
}

export async function askAI(prompt: string) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("AIとの通信に失敗しました。");
  }

  const data = await response.json();

  return data.result as string;
}