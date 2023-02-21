CREATE TABLE public.position_update (pk int4 GENERATED ALWAYS AS IDENTITY, beacon_pk int4 NOT NULL, entity_pk int4, x float4 NOT NULL, y float4 NOT NULL, floor_pk int4, created_at timestamptz DEFAULT now() NOT NULL, PRIMARY KEY (pk), FOREIGN KEY (beacon_pk) REFERENCES public.beacon (pk) ON UPDATE CASCADE ON DELETE SET NULL, FOREIGN KEY (entity_pk) REFERENCES public.entity (pk) ON UPDATE CASCADE ON DELETE SET NULL);
