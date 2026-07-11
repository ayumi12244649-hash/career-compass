export interface GenerateActionPlanRequest {
  company: string;
  entrySheets: string;
  interviews: string;
  analysis: string;
}

export interface ActionPlanItem {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
}

export interface GenerateActionPlanResponse {
  plans: ActionPlanItem[];
}

export async function generateActionPlan(
  payload: GenerateActionPlanRequest
): Promise<ActionPlanItem[]> {
  const response = await fetch("/api/ai/action-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("AI行動プランの生成に失敗しました");
  }

  const data: GenerateActionPlanResponse = await response.json();

  return data.plans;
}