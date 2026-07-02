export interface EntrySheet {
  id: string;
  company_id: string;

  title: string;
  content: string;

  review_result: string | null;

  created_at: string;
}