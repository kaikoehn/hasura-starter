alter table "public"."beacon" add column "created_at" timestamptz
 null default now();
