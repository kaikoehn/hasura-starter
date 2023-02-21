ALTER TABLE public.entity DROP COLUMN IF EXISTS meta;
ALTER TABLE public.entity ALTER COLUMN data DROP DEFAULT;
ALTER TABLE public.entity ADD meta jsonb DEFAULT jsonb_build_object() NOT NULL;
ALTER TABLE public.entity DROP COLUMN IF EXISTS meta;
ALTER TABLE public.entity ALTER COLUMN data DROP DEFAULT;
ALTER TABLE public.entity ADD meta jsonb DEFAULT jsonb_build_object() NOT NULL;
