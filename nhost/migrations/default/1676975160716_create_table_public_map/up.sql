CREATE TABLE public.map (pk int4 NOT NULL, uuid uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL, name varchar DEFAULT 'new-map' NOT NULL, floor_data jsonb DEFAULT jsonb_build_object() NOT NULL, meta jsonb DEFAULT jsonb_build_object() NOT NULL, created_at timestamptz DEFAULT now() NOT NULL, PRIMARY KEY (pk));
