import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = "https://pvwhvwwczmnzqiepvasz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d2h2d3djem1uenFpZXB2YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MDgwMzEsImV4cCI6MjA3ODA4NDAzMX0.HApYGLsLIa13ERbcX2Hh6zwCw93ZngTJKXX1XdxtVNQ";

export const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true }
});

// browser থেকে globally access করার জন্য
window.$supa = supa;

