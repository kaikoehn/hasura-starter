CREATE TABLE public.entity (pk int4 GENERATED ALWAYS AS IDENTITY, uuid uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL, type varchar, data jsonb NOT NULL, PRIMARY KEY (pk));
