-- Run this in the Supabase SQL Editor, or apply it with the Supabase CLI.
create extension if not exists "pgcrypto";

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text not null,
  slug text not null unique check (slug ~ '^[a-z0-9_-]+$'),
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  partner_slug text not null references public.partners(slug) on update cascade on delete restrict,
  lead_name text not null,
  lead_email text not null,
  form_source text,
  created_at timestamptz not null default now()
);

create index leads_partner_slug_idx on public.leads (partner_slug);
create index leads_created_at_idx on public.leads (created_at desc);

alter table public.partners enable row level security;
alter table public.leads enable row level security;
-- The application uses the server-only service-role key for dashboard writes and lead ingestion.
