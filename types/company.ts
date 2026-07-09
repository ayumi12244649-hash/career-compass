export interface Company {
  id: string;
  user_id: string;

  company_name: string;
  industry: string;

  status: string;

  applied_date: string;

  created_at: string;

  // 追加
  esCount?: number;
  interviewCount?: number;
}