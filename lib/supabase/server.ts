function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

function adminConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export function isServerSupabaseConfigured() {
  return Boolean(adminConfig());
}

function secretHeaders(key: string, extra: Record<string, string> = {}) {
  const headers: Record<string, string> = { apikey: key, ...extra };
  // New sb_secret_* keys are opaque and should be sent through apikey only.
  // Legacy service_role keys are JWTs and also use Authorization for Storage/RLS bypass.
  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  return headers;
}

export async function publicRest<T>(path: string): Promise<T | null> {
  const c = publicConfig();
  if (!c) return null;

  const response = await fetch(`${c.url}/rest/v1/${path}`, {
    headers: { apikey: c.key },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Supabase public request failed", response.status);
    return null;
  }

  return response.json() as Promise<T>;
}

export async function adminRestSingle<T>(path: string): Promise<T | null> {
  const c = adminConfig();
  if (!c) return null;

  const response = await fetch(`${c.url}/rest/v1/${path}`, {
    headers: secretHeaders(c.key, {
      Accept: "application/vnd.pgrst.object+json",
    }),
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export async function adminInsert<T>(
  table: string,
  row: Record<string, unknown>,
): Promise<T | null> {
  const c = adminConfig();
  if (!c) return null;

  const response = await fetch(`${c.url}/rest/v1/${table}`, {
    method: "POST",
    headers: secretHeaders(c.key, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Supabase insert failed", response.status, await response.text());
    return null;
  }

  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

export async function adminUpload(
  bucket: string,
  path: string,
  file: File,
): Promise<boolean> {
  const c = adminConfig();
  if (!c) return false;

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${c.url}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: "POST",
    headers: secretHeaders(c.key, {
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    }),
    body: file,
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Supabase upload failed", response.status, await response.text());
  }

  return response.ok;
}

export async function adminDeleteObject(bucket: string, path: string) {
  const c = adminConfig();
  if (!c) return;

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  await fetch(`${c.url}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: "DELETE",
    headers: secretHeaders(c.key),
    cache: "no-store",
  }).catch(() => undefined);
}

export async function adminDownload(bucket: string, path: string) {
  const c = adminConfig();
  if (!c) return null;

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${c.url}/storage/v1/object/${bucket}/${encodedPath}`, {
    headers: secretHeaders(c.key),
    cache: "no-store",
  });

  return response.ok ? response : null;
}

export async function adminRest<T>(path: string): Promise<T | null> {
  const c = adminConfig();
  if (!c) return null;

  const response = await fetch(`${c.url}/rest/v1/${path}`, {
    headers: secretHeaders(c.key),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Supabase admin request failed", response.status, await response.text());
    return null;
  }

  return response.json() as Promise<T>;
}

export async function adminUpdate<T>(
  table: string,
  filter: string,
  row: Record<string, unknown>,
): Promise<T | null> {
  const c = adminConfig();
  if (!c) return null;

  const response = await fetch(`${c.url}/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    headers: secretHeaders(c.key, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Supabase update failed", response.status, await response.text());
    return null;
  }

  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}
