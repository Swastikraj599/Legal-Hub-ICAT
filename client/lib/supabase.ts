import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (supabase) return supabase;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (url && anon) {
    supabase = createClient(url, anon);
    return supabase;
  }
  console.warn("Supabase env not set; using local sample data mode.");
  return null;
}
