import { supabase } from "@/lib/supabase";

export async function saveMissions(
  companyId: string,
  reply: string
) {
  let missions: string[] = [];

  try {
    const match = reply.match(/\{[\s\S]*"missions"[\s\S]*\}/);

    if (!match) return;

    const json = JSON.parse(match[0]);

    if (!Array.isArray(json.missions)) return;

    missions = json.missions;

    console.log("Mission JSON:", json);
    console.log("Mission一覧:", missions);
  } catch (error) {
    console.error("Mission JSON解析失敗", error);
    return;
  }

  // 古いMissionを削除
  await supabase
    .from("missions")
    .delete()
    .eq("company_id", companyId);

  // 新しいMissionを保存
  const { data, error } = await supabase
    .from("missions")
    .insert(
      missions.map((title) => ({
        company_id: companyId,
        title,
        completed: false,
      }))
    );

  console.log("Mission Insert:", data);

  if (error) {
    console.error("Mission Insert Error", error);
  }
}