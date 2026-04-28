import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminSessionCheckResult =
  | { ok: true; userId: string }
  | { error: string; ok: false; status: 401 | 403 | 500 };

export async function verifyAdminSession(): Promise<AdminSessionCheckResult> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: false,
      status: 500,
      error: "Supabase client is not configured.",
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      ok: false,
      status: 401,
      error: "Unauthorized.",
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return {
      ok: false,
      status: 403,
      error: "Forbidden.",
    };
  }

  if (!profile?.is_admin) {
    return {
      ok: false,
      status: 403,
      error: "Forbidden.",
    };
  }

  return {
    ok: true,
    userId: user.id,
  };
}
