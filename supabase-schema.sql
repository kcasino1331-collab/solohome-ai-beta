create table if not exists public.beta_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 90),
  category text not null check (category in (
    'Home repair',
    'HVAC',
    'Plumbing',
    'Roofing',
    'Pool',
    'Pest',
    'Landscaping',
    'Something else'
  )),
  note text not null default '' check (char_length(note) <= 420),
  status text not null default 'Received' check (status in ('Received', 'In review', 'Resolved')),
  created_at timestamptz not null default now()
);

create index if not exists beta_requests_user_created_idx
  on public.beta_requests (user_id, created_at desc);

alter table public.beta_requests enable row level security;

drop policy if exists "Testers can read their own beta requests" on public.beta_requests;
create policy "Testers can read their own beta requests"
  on public.beta_requests for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Testers can submit their own beta requests" on public.beta_requests;
create policy "Testers can submit their own beta requests"
  on public.beta_requests for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

grant select, insert on public.beta_requests to authenticated;
revoke update, delete on public.beta_requests from authenticated, anon;
revoke all on public.beta_requests from anon;
