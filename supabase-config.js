// Supabase Configuration
// Production values - these should match your Supabase project
const SUPABASE_URL = 'https://ismgrqngrvtsvpnfyipa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWdycW5ncnZ0c3ZwbmZ5aXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTk5MzgsImV4cCI6MjA3NTQzNTkzOH0.bqUFecZKjuTeNxGfusv7YvlzgM0DV3pg9SUbKHMX0DQ';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;