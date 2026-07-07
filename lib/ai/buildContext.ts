import { supabase } from "@/lib/supabase";

export async function buildContext(companyId: string) {
  // 企業情報
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (companyError) throw companyError;

  // ES
  const { data: entrySheets, error: esError } = await supabase
    .from("entry_sheets")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (esError) throw esError;

  // 面接メモ
  const { data: interviews, error: interviewError } = await supabase
    .from("interview_notes")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (interviewError) throw interviewError;

  // 不採用分析
  const { data: rejections, error: rejectionError } = await supabase
    .from("rejection_reports")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (rejectionError) throw rejectionError;

  // メンター履歴
  const { data: history, error: historyError } = await supabase
    .from("mentor_messages")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true })
    .limit(10);

  if (historyError) throw historyError;

  // ==========================
  // ES
  // ==========================

  const esText =
    entrySheets?.length
      ? entrySheets
          .map(
            (es, i) => `
ES${i + 1}

タイトル：
${es.title}

内容：
${es.content}

AI添削：
${es.review_result ?? "なし"}
`
          )
          .join("\n-------------------------\n")
      : "ESは登録されていません。";

  // ==========================
  // 面接
  // ==========================

  const interviewText =
    interviews?.length
      ? interviews
          .map(
            (note, i) => `
面接メモ${i + 1}

タイトル：
${note.title}

内容：
${note.content}
`
          )
          .join("\n-------------------------\n")
      : "面接メモは登録されていません。";

  // ==========================
  // 不採用分析
  // ==========================

  const rejectionText =
    rejections?.length
      ? rejections
          .map(
            (report, i) => `
不採用分析${i + 1}

${report.content}
`
          )
          .join("\n-------------------------\n")
      : "不採用分析は登録されていません。";

  // ==========================
  // チャット履歴
  // ==========================

  const historyText =
    history?.length
      ? history
          .map(
            (chat) => `
${chat.role === "user" ? "ユーザー" : "AI"}

${chat.message}
`
          )
          .join("\n-------------------------\n")
      : "過去の相談履歴はありません。";

  // ==========================
  // 成長情報
  // ==========================

  const growthText = `
応募企業数：1

登録ES数：${entrySheets?.length ?? 0}

面接メモ数：${interviews?.length ?? 0}

不採用分析数：${rejections?.length ?? 0}

最近の相談数：${history?.length ?? 0}
`;
const diffText = `
前回との差分

登録ES数：${entrySheets?.length ?? 0}

面接メモ数：${interviews?.length ?? 0}

不採用分析数：${rejections?.length ?? 0}

相談履歴数：${history?.length ?? 0}
`;

  // ==========================
  // AIへ渡すContext
  // ==========================

  return `
企業情報

企業名：${company.company_name}
業界：${company.industry}
選考状況：${company.status}
応募日：${company.applied_date}

====================

ES

${esText}

====================

面接メモ

${interviewText}

====================

不採用分析

${rejectionText}

====================

最近の成長

${growthText}

====================

前回との差分

${diffText}
====================

過去の相談履歴

${historyText}
`;
}