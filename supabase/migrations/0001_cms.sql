-- ---------------------------------------------------------------------------
-- Supabase CMS – Schema, RLS und Storage
-- ---------------------------------------------------------------------------
-- Ausführen im SQL-Editor des NEUEN Supabase-Projekts
-- (Dashboard > SQL Editor > New query > einfügen > Run)
-- oder via Supabase CLI:  supabase db push
-- ---------------------------------------------------------------------------

-- Inhalts-Dokumente: pro (key, locale) ein JSONB-Blob, der exakt den TypeScript-
-- Typen aus src/content/* entspricht. Bewusst nicht relational normalisiert,
-- da die Inhalte tief verschachtelt sind.
create table if not exists public.cms_documents (
  key         text        not null,
  locale      text        not null check (locale in ('de', 'en')),
  data        jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  uuid        references auth.users (id) on delete set null,
  primary key (key, locale)
);

comment on table public.cms_documents is
  'CMS-Inhalte als JSONB-Dokument je (key, locale). Öffentlich lesbar, schreibbar nur für eingeloggte Redakteure.';

-- updated_at automatisch pflegen
create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_documents_set_updated_at on public.cms_documents;
create trigger cms_documents_set_updated_at
  before update on public.cms_documents
  for each row execute function public.cms_set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.cms_documents enable row level security;

-- Öffentliche Inhalte: jeder darf lesen (Website rendert serverseitig mit anon-Key)
drop policy if exists "cms_documents_public_read" on public.cms_documents;
create policy "cms_documents_public_read"
  on public.cms_documents
  for select
  using (true);

-- Schreiben/Ändern/Löschen nur für eingeloggte Nutzer (Redakteure)
drop policy if exists "cms_documents_auth_insert" on public.cms_documents;
create policy "cms_documents_auth_insert"
  on public.cms_documents
  for insert
  to authenticated
  with check (true);

drop policy if exists "cms_documents_auth_update" on public.cms_documents;
create policy "cms_documents_auth_update"
  on public.cms_documents
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "cms_documents_auth_delete" on public.cms_documents;
create policy "cms_documents_auth_delete"
  on public.cms_documents
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage: öffentlicher Bucket "media" für Bilder
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Öffentliches Lesen der Bilder
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects
  for select
  using (bucket_id = 'media');

-- Upload / Aktualisieren / Löschen nur für eingeloggte Redakteure
drop policy if exists "media_auth_insert" on storage.objects;
create policy "media_auth_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_auth_update" on storage.objects;
create policy "media_auth_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "media_auth_delete" on storage.objects;
create policy "media_auth_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');
