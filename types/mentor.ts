export interface MentorMessage {
  id: number;
  created_at: string;

  user_id: string;
  company_id: string;

  role: "user" | "assistant";

  message: string;
}