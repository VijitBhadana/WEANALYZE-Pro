import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  username: string;
  email: string;
  real_name?: string;
  contact_number?: string;
  department?: string;
  access_level?: string;
  project_access_level?: string;
  avatar_url?: string;
  created_at: string;
};

export type Ticket = {
  id: string;
  ticket_no: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assigned_to?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  team_member?: string;
  remark?: string;
};

export type Feedback = {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};