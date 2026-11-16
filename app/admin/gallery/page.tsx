"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  Image as ImageIcon,
  LoaderCircle,
  LogOut,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getStoredSession,
  signOut,
} from "@/lib/supabase/browser";

type Status = "pending" | "published" | "rejected";

type GallerySubmission = {
  id: string;
  submitted_by: string | null;
  title_en: string;
  title_mr: string | null;
  caption_en: string | null;
  caption_mr: string | null;
  department_slug: string | null;
  event_date: string | null;
  storage_path: string;
  status: Status;
  reviewed_at: string | null;
  reviewed_by_email: string | null;
  created_at: string;
};

function label(status: Status) {
  if (status === "published") return "Published";
  if (status === "rejected") return "Rejected";
  return "Pending";
}

function ProtectedPreview({ id, title }: { id: string; title: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    (async () => {
      const session = getStoredSession();
      if (!session) return;
      const response = await fetch(`/api/admin/gallery/file/${id}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      });
      if (!response.ok) return;
      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      if (active) setUrl(objectUrl);
    })();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id]);

  if (!url) {
    return <div className="secure-image-preview secure-image-loading">Loading preview…</div>;
  }

  return (
    <div
      className="secure-image-preview"
      role="img"
      aria-label={title}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GallerySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Checking administrator access…");
  const [filter, setFilter] = useState<Status>("pending");
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const session = getStoredSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }

    const response = await fetch("/api/admin/gallery", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        router.replace("/admin/login");
        return;
      }
      throw new Error(data?.error || "Unable to load gallery submissions.");
    }
    setItems(data.items || []);
  }, [router]);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      try {
        await load();
        setMessage("");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load submissions.");
      } finally {
        setLoading(false);
      }
    })();
  }, [load, router]);

  const counts = useMemo(() => ({
    pending: items.filter((item) => item.status === "pending").length,
    published: items.filter((item) => item.status === "published").length,
    rejected: items.filter((item) => item.status === "rejected").length,
  }), [items]);

  const visible = useMemo(
    () => items.filter((item) => item.status === filter),
    [filter, items],
  );

  async function review(id: string, status: Status) {
    const session = getStoredSession();
    if (!session) return;
    setActionId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Review action failed.");
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Review action failed.");
    } finally {
      setActionId(null);
    }
  }

  async function logout() {
    await signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-shell flex items-center gap-3">
          <LoaderCircle className="animate-spin text-[#2F6FA5]" />
          <p>{message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-wide">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Administrator control</p>
            <h1 className="mt-2 font-heading text-4xl font-bold text-[#17233A]">Gallery approval</h1>
            <p className="mt-3 max-w-3xl leading-7 text-[#637083]">
              Every public upload remains private until you approve it. Only published images appear in the public gallery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="button-outline button-compact" onClick={() => load()}>
              <RefreshCw size={16} /> Refresh
            </button>
            <Link href="/gallery" className="button-outline button-compact">
              <ArrowLeft size={16} /> Public gallery
            </Link>
            <button className="button-dark button-compact" onClick={logout}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </header>

        {message && <p className="form-message">{message}</p>}

        <section className="admin-summary-grid">
          <button className={`admin-stat-button ${filter === "pending" ? "admin-stat-active" : ""}`} onClick={() => setFilter("pending")}>
            <Clock3 /><strong>{counts.pending}</strong><span>pending approval</span>
          </button>
          <button className={`admin-stat-button ${filter === "published" ? "admin-stat-active" : ""}`} onClick={() => setFilter("published")}>
            <ShieldCheck /><strong>{counts.published}</strong><span>published images</span>
          </button>
          <button className={`admin-stat-button ${filter === "rejected" ? "admin-stat-active" : ""}`} onClick={() => setFilter("rejected")}>
            <X /><strong>{counts.rejected}</strong><span>rejected images</span>
          </button>
        </section>

        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <p className="eyebrow">{label(filter)}</p>
              <h2>{label(filter)} gallery submissions</h2>
            </div>
            <p>Preview the submitted image and details before changing its publication status.</p>
          </div>

          <div className="admin-review-grid">
            {visible.length === 0 ? (
              <p className="admin-empty">No {label(filter).toLowerCase()} gallery submissions.</p>
            ) : visible.map((item) => (
              <article className="review-card" key={item.id}>
                <ProtectedPreview id={item.id} title={item.title_en} />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <span className="review-icon"><ImageIcon size={20} /></span>
                  <span className={`status-badge status-${item.status}`}>{label(item.status)}</span>
                </div>
                <h3>{item.title_en}</h3>
                {item.caption_en && <p className="review-excerpt">{item.caption_en}</p>}
                <p><strong>Submitted by:</strong> {item.submitted_by || "Anonymous visitor"}</p>
                <p><strong>Department:</strong> {item.department_slug || "Not specified"}</p>
                <p><strong>Submitted:</strong> {new Date(item.created_at).toLocaleString("en-IN")}</p>

                <div className="review-actions">
                  <button
                    className="review-button review-approve"
                    disabled={actionId === item.id || item.status === "published"}
                    onClick={() => review(item.id, "published")}
                  >
                    {actionId === item.id ? <LoaderCircle size={15} className="animate-spin" /> : <Check size={15} />}
                    Approve & publish
                  </button>
                  <button
                    className="review-button review-reject"
                    disabled={actionId === item.id || item.status === "rejected"}
                    onClick={() => review(item.id, "rejected")}
                  >
                    <X size={15} /> Reject
                  </button>
                  {item.status !== "pending" && (
                    <button
                      className="review-button"
                      disabled={actionId === item.id}
                      onClick={() => review(item.id, "pending")}
                    >
                      Return to pending
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
