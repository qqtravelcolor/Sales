import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createSupabaseServerClient() {
  if (!url || !serviceKey) throw new Error("Missing Supabase server environment variables.");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export function isSupabaseConfigured() { return Boolean(url && anonKey && serviceKey); }
