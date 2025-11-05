-- Habilitar Row Level Security en analytics_events
alter table if exists public.analytics_events enable row level security;

-- Política: permitir inserciones anónimas (solo datos no sensibles)
create policy if not exists "allow insert anonymous analytics"
on public.analytics_events
for insert
to anon
with check (true);

-- Bloquear updates y deletes desde rol anon (por si viene con privilegios por defecto)
revoke update, delete on public.analytics_events from anon;

-- Nota: si se requieren lecturas públicas, añadir una política select acorde a la necesidad.


