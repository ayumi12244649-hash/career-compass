export interface ActionPlan {
  id: string;
  user_id: string;
  company_id: string;
  task: string;

  priority: string;
due_type: string;

  completed: boolean;
  created_at: string;
}