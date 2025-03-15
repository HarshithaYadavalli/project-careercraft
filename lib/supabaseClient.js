import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ifhxjkheqquhgcogqvfh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmaHhqa2hlcXF1aGdjb2dxdmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMzgyMzIsImV4cCI6MjA1NzYxNDIzMn0.3nIXxJpVQdaUHGgQJT9R4BUKuBNWs6FyP2IrmGtjNN4'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);