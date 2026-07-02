export async function reviewES(content: string): Promise<string> {
  const res = await fetch("/api/ai/es", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      es: content,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "AI添削に失敗しました。");
  }

  return data.result;
}