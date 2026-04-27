import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/config";
import { type Database } from "@/types/database";

export function createSupabasePublicClient() {
  const env = getSupabaseEnv();

  if (!env) {
    return null;
  }

  return createClient<Database>(env.url, env.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
