create table public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  whatsapp text,
  email text,
  photo_url text,
  agency text,
  created_at timestamp with time zone not null default now()
);

alter table public.agents enable row level security;

create policy "Anyone can read agents"
on public.agents for select
using (true);

create policy "Anyone can insert agents"
on public.agents for insert
with check (
  length(trim(name)) between 1 and 100
  and (phone is null or length(phone) <= 30)
  and (whatsapp is null or length(whatsapp) <= 30)
  and (email is null or length(email) <= 200)
  and (photo_url is null or length(photo_url) <= 500)
  and (agency is null or length(agency) <= 100)
);