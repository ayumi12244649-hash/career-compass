export type InterviewNote = {
  id: string;
  company_id: string;

  question: string;
  answer: string;
  memo: string;

  ai_review: string | null;

  created_at: string;
};