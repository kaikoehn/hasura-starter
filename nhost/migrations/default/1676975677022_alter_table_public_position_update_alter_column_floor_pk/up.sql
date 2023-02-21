ALTER TABLE public.position_update RENAME COLUMN floor_pk TO map_pk;
ALTER TABLE public.position_update ADD CONSTRAINT position_update_map_pk_fkey FOREIGN KEY (map_pk) REFERENCES public.map (pk) ON UPDATE CASCADE ON DELETE SET NULL;
