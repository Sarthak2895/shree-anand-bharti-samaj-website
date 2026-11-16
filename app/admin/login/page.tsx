"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, LockKeyhole, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getStoredSession,
  signInWithPassword,
} from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      const session = getStoredSession();
      if (!user || !session) return;

      const response = await fetch("/api/admin/gallery", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      });
      if (response.ok) router.replace("/admin/gallery");
    })();
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      const session = await signInWithPassword(email, password);
      const response = await fetch("/api/admin/gallery", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "This account does not have administrator access.");
      }
      router.replace("/admin/gallery");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="auth-icon"><LockKeyhole size={25} /></span>
        <p className="eyebrow mt-6">Administrator only</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-[#17233A]">Gallery approval login</h1>
        <p className="mt-4 leading-7 text-[#637083]">
          Public visitors do not need an account. This login is only for the administrator who reviews submitted gallery images.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-4">
          <label className="field-label">
            Administrator email
            <input name="email" type="email" className="field-input" autoComplete="email" required />
          </label>
          <label className="field-label">
            Password
            <input name="password" type="password" className="field-input" autoComplete="current-password" required />
          </label>
          <button className="button-dark mt-2" disabled={loading}>
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? "Signing in…" : "Sign in as administrator"}
          </button>
        </form>

        {message && <p className="form-message" role="status">{message}</p>}

        <Link href="/" className="text-link mt-7"><ArrowLeft size={17} /> Back to website</Link>
      </section>
    </main>
  );
}
