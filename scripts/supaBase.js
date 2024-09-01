// import ESM-version of supaBase.js library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// my Supabase URL and Anon Key from the dashboard
const supabaseUrl = 'https://xlruypezdsagzfyyifmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscnV5cGV6ZHNhZ3pmeXlpZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMDk2NjYsImV4cCI6MjA0MDc4NTY2Nn0.2eitt0ipOqWdLkX9Sbgraxv3Q3TZC0FsYIiXIL5pNzw';

// create a single supaBase client for interacting with the database  
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
