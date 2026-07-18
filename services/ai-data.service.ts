import { fetchCompanies } from "./company.service";
import { fetchEntrySheets } from "./es.service";
import { fetchInterviewPractice } from "./interviewPractice.service";
import { fetchLatestCareerScore } from "./score.service";
import { fetchLatestSnapshots } from "./growth.service";
import { fetchMissions } from "./mission.service";
import { fetchFailureAnalysis } from "./failure-analysis.service";
import { fetchActionPlans } from "./action-plan.service";


export type AIData = {
  company: any | null;
  entrySheets: any[];
  interviews: any[];
  careerScore: any;
  growth: any[];
  missions: any[];
  failureAnalysis: any[];
  actionPlans: any[];
};

export async function fetchAIData(
  companyId: string
): Promise<AIData> {
  const companies = await fetchCompanies();

  const company =
    companies.find((c) => c.id === companyId) ?? null;

  if (!company) {
    return {
  company: null,
  entrySheets: [],
  interviews: [],
  careerScore: null,
  growth: [],
  missions: [],
  failureAnalysis: [],
  actionPlans: [],
};
  }
    const [
  entrySheets,
  interviews,
  careerScore,
  growth,
  missions,
  failureAnalysis,
  actionPlans,
] = await Promise.all([
    fetchEntrySheets(companyId),
    fetchInterviewPractice(companyId),
    fetchLatestCareerScore(),
    fetchLatestSnapshots(companyId),
    fetchMissions(companyId),
    fetchFailureAnalysis(companyId),
    fetchActionPlans(companyId),
  ]);

  return {
  company,
  entrySheets,
  interviews,
  careerScore,
  growth,
  missions,
  failureAnalysis,
  actionPlans,
};
  }