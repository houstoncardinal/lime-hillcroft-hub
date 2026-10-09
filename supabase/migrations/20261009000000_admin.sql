-- TIC Wireless store dashboard schema. Mirrors src/admin/types.ts.
-- Apply with Lovable Cloud / Supabase. Money is stored in integer cents.
-- Security model: only signed-in staff listed in public.admin_users can read or write
-- business data; the public website can only INSERT analytics events.

create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'manager' check (role in ('owner', 'manager')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  brand text not null default '',
  category text not null,
  condition text not null default 'New',
  location text not null default 'Back stock',
  cost integer not null default 0 check (cost >= 0),
  price integer not null default 0 check (price >= 0),
  quantity integer not null default 0 check (quantity >= 0),
  reorder_point integer not null default 2 check (reorder_point >= 0),
  barcode text not null default '',
  notes text not null default '',
  financeable boolean not null default false,
  shopify_product_id text,
  shopify_variant_id text unique,
  shopify_inventory_item_id text,
  sync_status text not null default 'unlinked'
    check (sync_status in ('unlinked', 'synced', 'pending', 'error')),
  updated_at timestamptz not null default now()
);
create index products_barcode_idx on public.products (barcode) where barcode <> '';

create table public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  delta integer not null,
  reason text not null
    check (reason in ('Received', 'Sold', 'Returned', 'Adjusted', 'Damaged', 'Shopify sync')),
  note text not null default '',
  by text not null default '',
  at timestamptz not null default now()
);
create index stock_movements_product_idx on public.stock_movements (product_id, at desc);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  email text not null default '',
  phone text not null default '',
  hourly_rate integer not null check (hourly_rate >= 0),
  pin_hash text not null,
  color text not null default '#3987e5',
  active boolean not null default true,
  start_date date not null default current_date
);
create unique index employees_active_pin_idx on public.employees (pin_hash) where active;

create table public.time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees (id) on delete restrict,
  clock_in timestamptz not null,
  clock_out timestamptz check (clock_out is null or clock_out > clock_in),
  break_minutes integer not null default 0 check (break_minutes >= 0),
  note text not null default '',
  edited_by text
);
create index time_entries_employee_idx on public.time_entries (employee_id, clock_in desc);
-- One open shift per employee.
create unique index time_entries_open_idx on public.time_entries (employee_id) where clock_out is null;

create table public.payroll_runs (
  id uuid primary key default gen_random_uuid(),
  period_start timestamptz not null unique,
  period_end timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'paid')),
  lines jsonb not null default '[]',
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  paid_at timestamptz
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('pageview', 'call', 'directions', 'language')),
  path text not null check (char_length(path) <= 200),
  lang text not null check (lang in ('en', 'es')),
  referrer text not null default '' check (char_length(referrer) <= 200),
  device text not null check (device in ('mobile', 'desktop')),
  session_id text not null check (char_length(session_id) <= 64),
  at timestamptz not null default now()
);
create index analytics_events_at_idx on public.analytics_events (at desc);

create table public.settings (
  id boolean primary key default true check (id),
  store_name text not null default 'TIC Wireless',
  overtime_threshold numeric not null default 40,
  overtime_multiplier numeric not null default 1.5,
  pay_period text not null default 'biweekly' check (pay_period in ('weekly', 'biweekly'))
);
insert into public.settings default values;

-- Row-level security
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.stock_movements enable row level security;
alter table public.employees enable row level security;
alter table public.time_entries enable row level security;
alter table public.payroll_runs enable row level security;
alter table public.analytics_events enable row level security;
alter table public.settings enable row level security;

create policy "admins read admin list" on public.admin_users for select using (public.is_admin());

do $$
declare t text;
begin
  foreach t in array array['products', 'stock_movements', 'employees', 'time_entries', 'payroll_runs', 'settings']
  loop
    execute format('create policy "admins manage %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

create policy "admins read analytics" on public.analytics_events for select using (public.is_admin());
-- The public website may only add events, never read them.
create policy "anyone records analytics" on public.analytics_events for insert to anon, authenticated with check (at > now() - interval '5 minutes' and at < now() + interval '5 minutes');
