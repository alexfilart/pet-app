-- Pet App database schema
-- Run in Supabase SQL Editor
 
create table owners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  created_at timestamp with time zone default now()
);
 
create table pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references owners(id) not null,
  name text not null,
  species text not null,
  breed text,
  birth_date date,
  notes text,
  created_at timestamp with time zone default now()
);
 
-- RLS is intentionally disabled for now — no auth yet, single-user project.
-- Re-enable and add proper policies once real user accounts are added.
alter table owners disable row level security;
alter table pets disable row level security;
 
-- Default owner (temporary, single-user setup)
-- Replace with real multi-owner logic once auth is added.
alter table pets alter column owner_id set default '1924eafa-517f-4419-b9e3-b26c118ed7c7';