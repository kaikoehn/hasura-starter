ALTER TABLE public.entity ADD beacon_pk int4 NOT NULL;
ALTER TABLE public.entity ADD CONSTRAINT entity_beacon_pk_fkey FOREIGN KEY (beacon_pk) REFERENCES public.beacon (pk) ON UPDATE CASCADE ON DELETE SET NULL;
