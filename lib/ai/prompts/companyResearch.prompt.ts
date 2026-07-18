type BuildPromptProps = {
  company: any;
  entrySheets: any[];
  interviews: any[];
  rejectionReports: any[];
};

export function buildCompanyResearchPrompt({
  company,
  entrySheets,
  interviews,
  rejectionReports,
}: BuildPromptProps) {
  const esText = (entrySheets ?? [])
    .map(
      (es) => `
タイトル: ${es.title}

内容:
${es.content}

AI添削:
${es.review_result ?? "なし"}
`
    )
    .join("\n");

  const interviewText = (interviews ?? [])
    .map(
      (interview) => `
質問:
${interview.question}

回答:
${interview.answer}

メモ:
${interview.memo ?? "なし"}
`
    )
    .join("\n");

  const rejectionText = (rejectionReports ?? [])
    .map(
      (report) => `
理由:
${report.reason ?? "なし"}

改善点:
${report.improvement ?? "なし"}
`
    )
    .join("\n");

  return `
あなたはCareer Compass専属の企業研究AIです。

会社情報を分析し、
指定されたJSON Schemaに従って企業研究データを作成してください。

【企業】
会社名: ${company?.company_name}
業界: ${company?.industry}
選考状況: ${company?.status}

【ES】
${esText}

【面接】
${interviewText}

【不採用分析】
${rejectionText}
`;
}