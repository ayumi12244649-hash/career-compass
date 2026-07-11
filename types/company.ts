export interface Company {
  id: string;
  user_id: string;

  company_name: string;
  industry: string;

  status: string;

  applied_date: string;

  created_at: string;

  memo: string | null;

  // Sprint7
  esCount?: number;
  interviewCount?: number;

  // Sprint7.2
  updated_at?: string;
  aiScore?: number;
}