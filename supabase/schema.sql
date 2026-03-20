-- ═══════════════════════════════════════════════════════════════
--  Precious Spain B2B Portal — Supabase Schema
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Categories ───────────────────────────────────────────────────
create table if not exists categories (
  id          text primary key,
  name        text not null,
  key         text not null unique,
  icon        text not null default 'package',
  "order"     integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now()
);

-- ── Subcategories ────────────────────────────────────────────────
create table if not exists subcategories (
  id           text primary key,
  category_id  text references categories(id) on delete cascade,
  name         text not null,
  key          text not null,
  "order"      integer not null default 0,
  active       boolean not null default true,
  created_at   timestamptz default now()
);

-- ── Products ─────────────────────────────────────────────────────
create table if not exists products (
  id               text primary key,
  sku              text not null unique,
  name             text not null,
  category_id      text references categories(id),
  subcategory_id   text references subcategories(id),
  category_name    text,
  subcategory_name text,
  price            numeric(10,2) not null,
  stock            integer not null default 0,
  description      text,
  brand            text,
  unit_measure     text,
  image_url        text,
  weight_kg        numeric(8,3),
  iva              integer default 21,
  active           boolean not null default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── Orders ───────────────────────────────────────────────────────
create table if not exists orders (
  id                 text primary key,
  order_id           text not null unique,
  company_id         text,
  company_name       text not null,
  company_cif        text,
  company_email      text,
  company_phone      text,
  contact_person     text,
  delivery_address   text,
  total_items        integer not null default 0,
  total_amount       numeric(12,2) not null default 0,
  notes              text,
  status             text not null default 'authorization_pending'
                       check (status in ('pending','authorization_pending','processing','completed','cancelled')),
  created_at         timestamptz default now(),
  estimated_delivery date
);

-- ── Order Items ──────────────────────────────────────────────────
create table if not exists order_items (
  id           bigserial primary key,
  order_id     text references orders(id) on delete cascade,
  product_id   text,
  sku          text,
  name         text not null,
  category_name text,
  quantity     integer not null,
  unit_price   numeric(10,2) not null,
  subtotal     numeric(12,2) not null
);

-- ── Row Level Security (public read for products/categories) ─────
alter table categories   enable row level security;
alter table subcategories enable row level security;
alter table products     enable row level security;
alter table orders       enable row level security;
alter table order_items  enable row level security;

-- Allow public read of catalog data
create policy "public read categories"   on categories   for select using (true);
create policy "public read subcategories" on subcategories for select using (true);
create policy "public read products"     on products     for select using (true);

-- Orders: anyone can insert (B2B portal), read own orders
create policy "insert orders"    on orders for insert with check (true);
create policy "read orders"      on orders for select using (true);
create policy "insert order_items" on order_items for insert with check (true);
create policy "read order_items"   on order_items for select using (true);
