export type AuthSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  user: { id: string; email?: string };
};

const SESSION_KEY = "abs-admin-session";

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export function isSupabaseConfigured() {
  return Boolean(config());
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(SESSION_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as AuthSession;
  } catch {
    return null;
  }
}

export async function signInWithPassword(email: string, password: string) {
  const c = config();
  if (!c) throw new Error("Supabase is not configured.");

  const response = await fetch(`${c.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: c.key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg || data?.error_description || "Unable to sign in.");
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  return data as AuthSession;
}

async function refreshStoredSession(session: AuthSession): Promise<AuthSession | null> {
  const c = config();
  if (!c || !session.refresh_token) return null;

  const response = await fetch(`${c.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: c.key, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });

  if (!response.ok) return null;
  const refreshed = (await response.json()) as AuthSession;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
  return refreshed;
}

export async function getCurrentUser() {
  const c = config();
  let session = getStoredSession();
  if (!c || !session) return null;

  let response = await fetch(`${c.url}/auth/v1/user`, {
    headers: { apikey: c.key, Authorization: `Bearer ${session.access_token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    session = await refreshStoredSession(session);
    if (!session) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    response = await fetch(`${c.url}/auth/v1/user`, {
      headers: { apikey: c.key, Authorization: `Bearer ${session.access_token}` },
      cache: "no-store",
    });
  }

  if (!response.ok) {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }

  return response.json() as Promise<{ id: string; email?: string }>;
}

export async function signOut() {
  const c = config();
  const session = getStoredSession();
  if (c && session) {
    await fetch(`${c.url}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: c.key, Authorization: `Bearer ${session.access_token}` },
    }).catch(() => undefined);
  }
  if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
}
