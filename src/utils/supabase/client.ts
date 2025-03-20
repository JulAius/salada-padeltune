
import { createClient } from '@supabase/supabase-js';

// Set default environment variables if they are not provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
