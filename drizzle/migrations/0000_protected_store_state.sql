CREATE TABLE public.store_state (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  revision integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.store_state TO service_role;
ALTER TABLE public.store_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.store_state IS 'Private dashboard state. Only cookie-authorized server handlers access this table; browser roles have no privileges.';
CREATE TABLE public.site_events (
  id uuid PRIMARY KEY,
  data jsonb NOT NULL,
  at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.site_events TO service_role;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX site_events_at_idx ON public.site_events (at DESC);
COMMENT ON TABLE public.site_events IS 'Public telemetry is validated by server handlers; reads require the admin session.';