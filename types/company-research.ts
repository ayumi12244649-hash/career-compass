export type CompanyResearch = {
  id: string;
  company_id: string;

  summary: string;
  business: string;
  culture: string;
  ideal_candidate: string;

  strengths: string[];
  weaknesses: string[];

  application_points: string[];
  interview_questions: string[];
  reverse_questions: string[];

  created_at: string;
  updated_at: string;
};