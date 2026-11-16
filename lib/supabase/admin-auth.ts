import { NextResponse } from "next/server";

export type AdminIdentity = {
  id: string;
  email: string;
};

export async function requireAdmin(request: Request): Promise<AdminIdentity | NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!url || !publishableKey || !adminEmail) {
    return NextResponse.json(
      { error: "Administrator authentication is not configured." },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!token) {
    return NextResponse.json({ error: "Administrator login is required." }, { status: 401 });
  }

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Your administrator session is invalid or expired." }, { status: 401 });
  }

  const user = (await response.json()) as { id: string; email?: string };
  const email = user.email?.trim().toLowerCase() || "";

  if (!email || email !== adminEmail) {
    return NextResponse.json({ error: "This account is not an administrator." }, { status: 403 });
  }

  return { id: user.id, email };
}
