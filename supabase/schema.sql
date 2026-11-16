-- Shree Anand Bharti Samaj website
-- Gallery moderation + public Library publishing
-- Run this complete file in Supabase -> SQL Editor -> New query.
-- It is designed to upgrade the earlier direct-upload versions safely.

create extension if not exists pgcrypto;

-- Compatibility table retained for older project versions.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  role text not null default 'viewer',
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  submitted_by text,
  title_en text not null,
  title_mr text,
  caption_en text,
  caption_mr text,
  department_slug text,
  event_date date,
  storage_path text not null unique,
  status text not null default 'pending'
    check (status in ('pending','published','rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_by_email text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safely upgrade gallery tables created by earlier project versions.
alter table public.gallery_items add column if not exists submitted_by text;
alter table public.gallery_items add column if not exists reviewed_by_email text;
alter table public.gallery_items add column if not exists reviewed_at timestamptz;
alter table public.gallery_items alter column owner_id drop not null;
alter table public.gallery_items alter column status set default 'pending';

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  title_en text not null,
  title_mr text,
  abstract_en text,
  abstract_mr text,
  body_en text,
  body_mr text,
  authors text not null,
  publication_type text not null
    check (publication_type in ('article','research_paper','historical_document','educational_resource')),
  language text not null default 'English',
  pdf_path text unique,
  status text not null default 'published'
    check (status in ('pending','published','rejected')),
  published_at timestamptz default now(),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    coalesce(length(body_en),0) + coalesce(length(body_mr),0) > 0
    or pdf_path is not null
  )
);

alter table public.publications alter column owner_id drop not null;
alter table public.publications alter column status set default 'published';
alter table public.publications alter column published_at set default now();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();

drop trigger if exists publications_set_updated_at on public.publications;
create trigger publications_set_updated_at
before update on public.publications
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.gallery_items enable row level security;
alter table public.publications enable row level security;

-- Remove policies from older versions before creating the final public-read rules.
drop policy if exists "users read own profile" on public.profiles;
drop policy if exists "admins read contributor profiles" on public.profiles;
drop policy if exists "users update own display name" on public.profiles;

drop policy if exists "published gallery is public" on public.gallery_items;
drop policy if exists "approved gallery contributors insert" on public.gallery_items;
drop policy if exists "owners update pending gallery" on public.gallery_items;

drop policy if exists "published publications are public" on public.publications;
drop policy if exists "approved library publishers insert" on public.publications;
drop policy if exists "owners update pending publications" on public.publications;

-- Public visitors can see only administrator-approved Gallery images.
create policy "published gallery is public"
on public.gallery_items for select
to anon, authenticated
using (status = 'published');

-- Library remains directly published in this project version.
create policy "published publications are public"
on public.publications for select
to anon, authenticated
using (status = 'published');

-- Public submission routes and administrator actions use SUPABASE_SECRET_KEY
-- on the Next.js server, so no anonymous INSERT/UPDATE policy is exposed.

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'gallery-media',
  'gallery-media',
  false,
  4194304,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update
set public=false,
    file_size_limit=4194304,
    allowed_mime_types=array['image/jpeg','image/png','image/webp'];

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'library-documents',
  'library-documents',
  false,
  4194304,
  array['application/pdf']
)
on conflict (id) do update
set public=false,
    file_size_limit=4194304,
    allowed_mime_types=array['application/pdf'];

-- Remove old direct authenticated Storage policies. The buckets stay private.
drop policy if exists "approved users upload gallery files" on storage.objects;
drop policy if exists "owners read gallery files" on storage.objects;
drop policy if exists "approved users upload library files" on storage.objects;
drop policy if exists "owners read library files" on storage.objects;
