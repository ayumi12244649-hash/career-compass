import { saveGrowthSnapshot } from "./growth.service";
import { checkBadges } from "./badge.service";
import { generateDailyReport } from "./daily-report.service";

export async function afterESSaved(
  companyId: string
) {
  console.log("① saveGrowthSnapshot");

  await saveGrowthSnapshot(companyId);

  console.log("② checkBadges");

  await checkBadges(companyId);

  console.log("③ generateDailyReport");

  await generateDailyReport(companyId);

  console.log("④ complete");
}

export async function afterInterviewSaved(
  companyId: string
) {
  await saveGrowthSnapshot(companyId);
  await checkBadges(companyId);
  await generateDailyReport(companyId);
}

export async function afterMissionCompleted(
  companyId: string
) {
  await saveGrowthSnapshot(companyId);
  await checkBadges(companyId);
  await generateDailyReport(companyId);
}

export async function afterMentorMessage(
  companyId: string
) {
  await saveGrowthSnapshot(companyId);
  await checkBadges(companyId);
  await generateDailyReport(companyId);
}