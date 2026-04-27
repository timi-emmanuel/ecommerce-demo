import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/config";
import { type Database } from "@/types/database";

export function createSupabaseAdminClient() {
  const env = getSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!env || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(env.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
